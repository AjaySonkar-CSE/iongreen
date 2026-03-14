import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";
import { Hero } from "@/components/hero";
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

interface CaseStudyPageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function CaseStudyDetailPage(props: CaseStudyPageProps) {
    const { slug } = await props.params;

    const study = await dbService.getCaseStudyBySlug(slug);

    // If not found in DB, check default cases
    const defaultCases = [
        {
            title: "Commercial Energy Storage System",
            slug: "commercial-energy-storage",
            region: "North America",
            summary: "Deployed a 2MWh energy storage system for a commercial complex, reducing peak demand charges by 40%.",
            impact: ["40% reduction in peak demand charges", "30% increase in renewable energy usage", "Seamless backup during grid outages"],
            image_url: "/case1.jpg",
            challenge: "High peak demand charges and grid instability were significantly impacting operational costs for a large commercial complex.",
            solution: "ION Green deployed a customized 2MWh battery energy storage system (BESS) integrated with the existing building management system.",
            results: "The system successfully reduced peak demand charges by 40% and provided 100% backup for critical loads during two major grid outages."
        },
        {
            title: "Industrial Microgrid Project",
            slug: "industrial-microgrid",
            region: "Europe",
            summary: "Implemented a 5MWh microgrid solution for an industrial facility, ensuring 24/7 power availability.",
            impact: ["99.9% power reliability", "50% reduction in carbon footprint", "ROI achieved in 3.5 years"],
            image_url: "/case2.jpg",
            challenge: "An industrial facility required ultra-reliable power for precision manufacturing processes that could not tolerate even micro-interruptions.",
            solution: "A 5MWh industrial-scale microgrid featuring ION Green's advanced power electronics and lithium-ion storage modules.",
            results: "Achieved 99.9% power reliability and enabled the facility to disconnect from the grid during high-tariff periods."
        },
        {
            title: "Residential Community Storage",
            slug: "residential-community-storage",
            region: "Asia",
            summary: "Deployed community energy storage for a residential complex, enabling energy sharing and cost savings.",
            impact: ["25% reduction in energy costs", "Improved grid stability", "Enhanced renewable energy integration"],
            image_url: "/case3.jpg",
            challenge: "A new residential development aimed to minimize its environmental impact and provide residents with stable energy costs.",
            solution: "Installation of a distributed community energy storage network allowing residents to share solar energy generated across rooftops.",
            results: "Reduced average household energy bills by 25% and created a self-sustaining energy community model."
        }
    ];

    const item = study || defaultCases.find(c => c.slug === slug);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-transparent">
            <Hero
                page="case"
                title={item.title}
                description={(item as any).region ? `Region: ${(item as any).region}` : "Success Stories & Case Studies"}
            />

            <AnimatedContentWrapper>
                <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 bg-white min-h-screen">
                    {/* Breadcrumbs */}
                    <nav className="flex mb-8 text-sm text-gray-500">
                        <Link href="/" className="hover:text-green-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/case" className="hover:text-green-600">Case Studies</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium truncate">{item.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                        <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-4">
                            <Image
                                src={item.image_url || "/images/casegreen.jpeg"}
                                alt={item.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        <div className="space-y-8">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-4">
                                    {(item as any).region}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Project Overview</h2>
                                <p className="text-xl text-gray-600 mb-8 italic">
                                    "{(item as any).summary}"
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">The Challenge</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.challenge}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Solution</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.solution}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">The Results</h3>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {item.results}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="mt-16 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-600/20"
                        >
                            Start Your Own Project
                        </Link>
                    </div>
                </div>
            </AnimatedContentWrapper>
        </div>
    );
}
