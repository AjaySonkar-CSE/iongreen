'use client';

import dynamic from 'next/dynamic';

const LabEquipmentShowcase = dynamic(
  () => import('@/components/lab-equipment-showcase'),
  { ssr: false }
);

export default function LabEquipmentShowcaseClient() {
  return <LabEquipmentShowcase />;
}
