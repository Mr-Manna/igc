/**
 * Enquiry payload shape and validation, shared by the form and the route.
 *
 * Both sides import this so a field can never pass in the browser and fail on
 * the server with a different message. Hand-rolled rather than schema-driven:
 * five fields do not justify a validation dependency in a project that carries
 * three runtime deps in total.
 */

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  /** Honeypot. Real users never see this field, so anything in it is a bot. */
  website?: string;
};

export type EnquiryField = "name" | "email" | "phone" | "terms";

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/* Deliberately permissive. The job here is to catch typos and empty submits,
   not to adjudicate RFC 5322 — an over-strict pattern rejects real addresses
   and the only real proof of an address is delivery. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(input: Partial<EnquiryPayload>): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) {
    errors.name = "Enter your name or company name.";
  }

  const email = input.email?.trim() ?? "";
  if (!EMAIL.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  // Indian mobile numbers are ten digits. Strip separators before counting so
  // "98765 43210" and "98765-43210" both pass.
  const digits = (input.phone ?? "").replace(/\D/g, "");
  if (digits.length !== 10) {
    errors.phone = "Enter a 10-digit mobile number.";
  }

  if (input.terms !== true) {
    errors.terms = "Please accept the terms to continue.";
  }

  return errors;
}

export function isBot(input: Partial<EnquiryPayload>): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}
