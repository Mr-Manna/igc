import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="shell flex min-h-[60vh] flex-col justify-center py-24">
        <p className="label flex items-center gap-3 text-blue">
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          Error 404
        </p>

        <h1 className="display-xl mt-5 max-w-[16rem]">Page not found</h1>

        <p className="measure mt-6 text-slate">
          The page you are looking for does not exist or has moved.
        </p>

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
