import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  footerQuickLinks,
  footerServiceLinks,
  legalLinks,
  primaryNav,
  stubRoutes,
} from "@/content/site";

/**
 * Placeholder for every route the shell links to but that has not been built yet.
 *
 * Rather than let navigation 404, each known route resolves to this page.
 * `dynamicParams = false` means genuinely unknown paths still return a real 404
 * rather than a stub. `stubRoutes` is derived from `builtRoutes` in
 * `content/site.ts`, so shipping a page removes its stub in the same edit.
 */

const labels = new Map(
  [...primaryNav, ...footerQuickLinks, ...footerServiceLinks, ...legalLinks].map(
    (item) => [item.href, item.label] as const,
  ),
);

function labelFor(pathname: string): string {
  return (
    labels.get(pathname) ??
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1)!
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return stubRoutes.map((route) => ({ slug: route.replace(/^\//, "").split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = labelFor(`/${slug.join("/")}`);
  return {
    title,
    description: `${title} — Industrial Growth Consultancy. This page is in production.`,
    robots: { index: false, follow: true },
  };
}

export default async function StubPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;
  const title = labelFor(pathname);

  return (
    <section className="bg-surface">
      <div className="shell flex min-h-[60vh] flex-col justify-center py-24">
        <p className="label flex items-center gap-3 text-blue">
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          In production
        </p>

        <h1 className="display-xl mt-5 max-w-[20rem]">{title}</h1>

        <p className="measure mt-6 text-slate">
          This section is being rebuilt. The homepage and the services index are
          live in the new design system; the remaining routes follow in the next
          pass.
        </p>

        <p className="mt-5 font-mono text-[0.8125rem] text-slate-muted">{pathname}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="secondary">
            Get Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
