import { Carousel } from "@/components/ui/Carousel";
import { clients } from "@/content/home";

/**
 * Client wordmarks drifting continuously.
 *
 * TODO(real-data): these are set in the display face rather than rendered from
 * image files, because IGC has no logo assets and no `public/` directory. When
 * real logos arrive, swap the <span> for a `next/image` at a fixed height with
 * `grayscale` — the rail itself does not need to change.
 *
 * Drift is decorative, so the strip is `aria-hidden` and the same names are
 * exposed once, statically, to assistive technology. That avoids an
 * auto-advancing live region, which is the accessibility failure mode of every
 * logo marquee.
 */
export function ClientLogos() {
  return (
    <section className="border-b rule-light bg-canvas py-14 lg:py-16">
      <p className="shell label text-center text-slate-muted">
        Trusted by manufacturers across {clients.length}+ sectors
      </p>

      <div aria-hidden="true" className="mt-8">
        <Carousel ariaLabel="Client logos" autoScroll className="[--slide-gap:3rem]">
          {/* Duplicated so the loop has enough slides to cover a wide viewport
              without a visible gap at the wrap point. */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex min-w-0 shrink-0 grow-0 basis-auto items-center pr-12"
            >
              {/* Full `slate-muted`, not a faded version of it. These are text
                  stand-ins, so they are held to the small-text contrast floor
                  (5.4:1) like any other copy — an opacity that reads as
                  "logo grey" measured 2.9:1 and failed the audit. Real logo
                  images can be dimmed freely; type cannot. */}
              <span className="font-display text-[1.125rem] font-bold tracking-[-0.02em] whitespace-nowrap text-slate-muted sm:text-[1.375rem]">
                {client.name}
              </span>
            </div>
          ))}
        </Carousel>
      </div>

      <ul className="sr-only">
        {clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
    </section>
  );
}
