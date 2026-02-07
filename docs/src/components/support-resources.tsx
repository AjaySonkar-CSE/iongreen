import { getSiteContent } from "@/lib/content";
import { SectionHeading } from "./section-heading";

const support = getSiteContent().support;

export function SupportResources() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Support"
          title="Downloads & FAQ"
          description="Full-service support with documentation, certifications, and quick answers."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-slate-900">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {support.resources.map((resource) => (
                <li key={resource.title}>
                  <p className="font-semibold text-slate-900">{resource.title}</p>
                  <p>{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-slate-900">FAQ</h3>
            <div className="space-y-4 text-sm text-slate-600">
              {support.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-slate-100 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

