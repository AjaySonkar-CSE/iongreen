import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SectionHeading } from "./section-heading";

const contact = getSiteContent().contact;

export function ContactChannels() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={contact.heading}
          description={contact.description}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {contact.channels.map((channel) => (
            <div key={channel.label} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-green-500">{channel.label}</p>
              <Link href={channel.href ?? "#"} className="mt-3 block text-xl font-semibold text-slate-900">
                {channel.value}
              </Link>
              <p className="text-sm text-slate-500">Available 24/7</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

