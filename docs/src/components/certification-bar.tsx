'use client';

import React from 'react';

export function CertificationBar() {
  // Static certifications data
  const certifications = [
    { label: "ION Green Certified" },
    { label: "UL9540" },
    { label: "UL1973" },
    { label: "CE/IEC Certified" },
    { label: "ISO9001" },
    { label: "ION Green LiFePO₄" },
    { label: "ROHS Compliant" },
    { label: "UN38.3 Tested" },
  ];

  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:px-6">
        {certifications.map((item, index) => (
          <span key={index} className="rounded-full border border-white/20 px-4 py-2">
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export default CertificationBar;