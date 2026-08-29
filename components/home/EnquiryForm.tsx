"use client";

import { useId, useRef, useState } from "react";
import { aboutSection } from "@/content/home";
import { contact } from "@/content/site";
import { validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";

type Status = "idle" | "submitting" | "sent" | "error";

/**
 * The homepage enquiry form.
 *
 * Every field has a real <label> rather than a placeholder standing in for one:
 * placeholder-as-label disappears the moment someone types, which is exactly
 * when a person filling a five-field form on a phone needs it most.
 *
 * Errors are announced twice over — inline text tied to the input with
 * `aria-describedby`, and a polite live region for the form-level result. The
 * first invalid field takes focus on a failed submit so keyboard and screen
 * reader users are not left to hunt for what went wrong.
 *
 * Validation is imported from `lib/enquiry.ts` and re-run server-side; the
 * client pass exists to save a round trip, not to be trusted.
 *
 * The framing copy is overridable so the same form can sit on more than one
 * page without either page carrying the other's pitch. Only the wording moves —
 * the fields, the validation and the endpoint are fixed, because a lead that
 * arrives from /services has to reach the same place as one from the homepage.
 */
export function EnquiryForm({
  heading = aboutSection.form.heading,
  body = aboutSection.form.body,
}: {
  heading?: string;
  body?: string;
} = {}) {
  const formId = useId();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const field = (name: string) => `${formId}-${name}`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      terms: data.get("terms") === "on",
      website: String(data.get("website") ?? ""),
    };

    const found = validateEnquiry(payload);
    setErrors(found);

    const firstInvalid = (["name", "email", "phone", "terms"] as const).find((key) => found[key]);
    if (firstInvalid) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(field(firstInvalid))}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="on-dark rounded-card bg-navy p-8 shadow-lift sm:p-10">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-light/20"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-5 w-5 text-blue-light"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 8.5 3.2 3.2L13 5" />
          </svg>
        </div>

        {/* Announced on arrival: the form it replaces has just left the DOM. */}
        <h3 className="display-md mt-6" role="status">
          Enquiry received
        </h3>
        <p className="mt-3 text-[0.9375rem] text-ink-invert">
          Thank you. A consultant will get back to you within one working day. For anything
          urgent, call{" "}
          <a href={`tel:+${contact.phoneDigits}`} className="font-semibold text-blue-light underline underline-offset-4">
            {contact.phonePrimary}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="on-dark rounded-card bg-navy p-8 shadow-lift sm:p-10">
      <h3 className="display-md">{heading}</h3>
      <p className="mt-3 text-[0.9375rem] text-ink-invert">{body}</p>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <Field
          id={field("name")}
          name="name"
          label="Name / Company Name"
          autoComplete="organization"
          error={errors.name}
        />

        <Field
          id={field("email")}
          name="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          error={errors.email}
        />

        <div>
          <label htmlFor={field("phone")} className="label block text-white">
            Mobile Number
          </label>
          <div className="mt-2.5 flex">
            {/* A static prefix, not a country selector. ICF serves India; a
                240-entry dropdown here would be theatre. */}
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center rounded-l-btn border border-r-0 border-[var(--rule-on-dark)] bg-white/10 px-3.5 text-[0.9375rem] font-medium text-white"
            >
              +{contact.countryCode}
            </span>
            <input
              id={field("phone")}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${field("phone")}-error` : undefined}
              className="w-full rounded-r-btn border border-[var(--rule-on-dark)] bg-white px-4 py-2.5 text-[0.9375rem] text-navy placeholder:text-slate-muted focus:border-blue-light"
            />
          </div>
          <FieldError id={`${field("phone")}-error`} message={errors.phone} />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id={field("terms")}
              name="terms"
              type="checkbox"
              aria-invalid={errors.terms ? true : undefined}
              aria-describedby={errors.terms ? `${field("terms")}-error` : undefined}
              className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-blue-light"
            />
            <label htmlFor={field("terms")} className="text-[0.875rem] leading-relaxed text-ink-invert">
              {aboutSection.form.terms}
            </label>
          </div>
          <FieldError id={`${field("terms")}-error`} message={errors.terms} />
        </div>

        {/* Honeypot. Off-screen rather than display:none — some bots skip fields
            that are not rendered. Never announced, never tabbed to. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor={field("website")}>Website</label>
          <input id={field("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-btn bg-white px-6 py-3.5 text-[0.9375rem] font-semibold text-navy transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-blue-light disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit Request"}
        </button>

        {/* One polite region for the form-level outcome. Empty until there is
            something worth interrupting for. */}
        <p aria-live="polite" className="text-[0.875rem] text-ink-invert">
          {status === "error"
            ? "Something went wrong sending your enquiry. Please try again, or call us directly."
            : ""}
        </p>
      </form>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block text-white">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        // No `focus:outline-none`. It used to be here with `focus:border-blue-light`
        // standing in for the ring, which left a 1px border tint as the only
        // keyboard focus indicator on a white field — too weak to satisfy
        // "focus visible", and it silently opted these inputs out of the
        // `.on-dark :focus-visible` rule in globals.css. The border change stays
        // as reinforcement; the outline does the work.
        className="mt-2.5 w-full rounded-btn border border-[var(--rule-on-dark)] bg-white px-4 py-2.5 text-[0.9375rem] text-navy placeholder:text-slate-muted focus:border-blue-light"
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    // #ffb4ad on navy is 7.6:1. The blue-light accent would read as a hint here,
    // not a problem, so errors get their own colour.
    <p id={id} className="mt-2 text-[0.8125rem] font-medium text-[#ffb4ad]">
      {message}
    </p>
  );
}
