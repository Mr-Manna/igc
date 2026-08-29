import { NextResponse } from "next/server";
import { isBot, validateEnquiry, type EnquiryPayload } from "@/lib/enquiry";

/**
 * Homepage enquiry endpoint.
 *
 * Delivery is deliberately pluggable and currently unwired: set
 * ENQUIRY_WEBHOOK_URL (Zapier, Make, a Google Apps Script bound to a Sheet, a
 * CRM endpoint) and payloads POST there. With no URL set, enquiries are written
 * to the server log so the form is testable end to end without an account
 * anywhere. Swapping to Resend or SMTP later means editing `deliver()` alone.
 *
 * The route is dynamic; the homepage that posts to it stays static.
 */

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

/**
 * In-memory and therefore per-instance: it resets on redeploy and does nothing
 * across serverless instances. It is a speed bump for casual abuse, not a
 * defence. Put a real limiter at the edge before this endpoint matters.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

async function deliver(payload: EnquiryPayload): Promise<void> {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhook) {
    console.info("[enquiry] no ENQUIRY_WEBHOOK_URL set — logging only", {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      source: "icf-homepage",
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Silent success. Telling a bot it was caught only helps it try again.
  if (isBot(body)) {
    return NextResponse.json({ ok: true });
  }

  // Validate before counting against the limit. A person fixing a mistyped
  // email should not spend their hourly quota doing it — only submissions that
  // would actually be delivered are worth rationing.
  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Please try again later." },
      { status: 429 },
    );
  }

  try {
    await deliver({
      name: body.name!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.replace(/\D/g, ""),
      terms: true,
    });
  } catch (error) {
    // Log the cause; return nothing that describes our infrastructure.
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
