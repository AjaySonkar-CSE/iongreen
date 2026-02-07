import Link from "next/link";
import { getSiteContent } from "@/lib/content";

const cta = getSiteContent().cta;

export function CTAPanel() {
  return (
    <section className="bg-gradient-to-r from-green-500 to-emerald-400 py-16 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-800/80">Get Started</p>
          <h3 className="text-3xl font-semibold">{cta.title}</h3>
          <p className="text-base text-slate-800">{cta.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={cta.primary.href}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            {cta.primary.label}
          </Link>
          <Link
            href={cta.secondary.href}
            className="rounded-full border border-slate-900/30 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            {cta.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

