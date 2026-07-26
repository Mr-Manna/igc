import Link from "next/link";
import { contact, telHref } from "@/content/site";

/** Thin strip above the header carrying direct-contact affordances. */
export function UtilityBar() {
  return (
    <div className="on-dark bg-navy-deep text-ink-invert-muted">
      <div className="shell flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6 overflow-hidden">
          <a
            href={telHref}
            className="flex items-center gap-2 text-[0.8125rem] whitespace-nowrap transition-colors hover:text-white"
          >
            <PhoneIcon />
            {contact.phonePrimary}
          </a>
          <a
            href={`mailto:${contact.emailPrimary}`}
            className="hidden items-center gap-2 text-[0.8125rem] whitespace-nowrap transition-colors hover:text-white sm:flex"
          >
            <MailIcon />
            {contact.emailPrimary}
          </a>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden text-[0.8125rem] whitespace-nowrap lg:inline">
            {contact.hours[0].days}, {contact.hours[0].time}
          </span>
          <Link
            href="/about"
            className="hidden text-[0.8125rem] whitespace-nowrap transition-colors hover:text-white sm:inline"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-[0.8125rem] whitespace-nowrap transition-colors hover:text-white"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  className: "h-3.5 w-3.5 shrink-0",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 5h18v14H3z" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}
