"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DetailModal } from "@/components/detail-modal";

interface SolutionCardProps {
  title: string;
  summary: string;
  bullets: string[];
  image: string;
  features: string[];
  applications: string[];
  advantages: string[];
  relatedProjects: string[];
}

export function SolutionCard({ 
  title, 
  summary, 
  bullets, 
  image,
  features,
  applications,
  advantages,
  relatedProjects
}: SolutionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Create detailed content for the modal
  const detailedContent = `
${summary}

Key Features:
${features.map((feature, i) => `${i + 1}. ${feature}`).join('\n')}

Applications:
${applications.map((app, i) => `${i + 1}. ${app}`).join('\n')}

Advantages:
${advantages.map((advantage, i) => `${i + 1}. ${advantage}`).join('\n')}

Related Projects:
${relatedProjects.map((project, i) => `${i + 1}. ${project}`).join('\n')}
`;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="h-56 w-full relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-600 mb-4 line-clamp-2 h-14">{summary}</p>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={openModal}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium text-center"
            >
              Read More
            </button>
            <Link 
              href="/contact"
              className="flex-1 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium text-center"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        image={image}
        description={summary}
        detailedContent={detailedContent}
      />
    </>
  );
}