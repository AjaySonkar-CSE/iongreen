export default function GlobalCoverageSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Global Coverage</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-3">
            Trusted by partners in 100+ countries with certified, safe energy storage systems.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
            <p className="text-3xl font-semibold text-slate-900">100+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-500">Countries</p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
            <p className="text-3xl font-semibold text-slate-900">25+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-500">Years</p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
            <p className="text-3xl font-semibold text-slate-900">5+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-500">Bases</p>
          </div>
        </div>
      </div>
    </section>
  );
}
