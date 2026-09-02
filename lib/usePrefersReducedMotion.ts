import { useEffect, useState } from "react";

/**
 * Tracks `(prefers-reduced-motion: reduce)`, read once on mount and kept in sync.
 *
 * Starts `false` so the server and first client render agree; the effect corrects
 * it before paint matters. Consumers that pass options to a library at init time
 * (Embla) need the value known synchronously after mount rather than applied late,
 * which is why this is a hook and not a media-query listener inside the component.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
