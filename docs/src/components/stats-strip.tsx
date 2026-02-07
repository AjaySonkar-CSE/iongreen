"use client";

import { getSiteContent } from "@/lib/content";
import { useCounter } from "@/hooks/useCounter";

const stats = getSiteContent().highlights;

interface StatCardProps {
  value: string;
  label: string;
  helper?: string;
}

function StatCard({ value, label, helper }: StatCardProps) {
  // Extract the numeric value and the plus sign if it exists
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const hasPlus = value.includes('+');
  const isGWh = value.includes('GWh');
  
  // Use the useCounter hook with the numeric value
  const { count, counterRef } = useCounter(numericValue, 2000);

  return (
    <div 
      ref={counterRef}
      className="group space-y-2 rounded-2xl border border-slate-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-100"
    >
      <p className="text-3xl font-bold text-slate-900 transition-all duration-500 group-hover:text-green-600">
        {isGWh ? `${count}GWh` : count}
        {hasPlus && '+'}
      </p>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
      {helper && (
        <p className="text-xs text-slate-400 mt-1">{helper}</p>
      )}
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard 
              key={stat.label} 
              value={stat.value} 
              label={stat.label} 
              helper={stat.helper}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

