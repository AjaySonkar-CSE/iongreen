"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContentWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimatedContentWrapper({ children, className }: AnimatedContentWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Track scroll progress as the container enters the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Start at bottom of viewport, finish at top
        offset: ["start 100%", "start 0%"],
    });

    /**
     * Animation Logic:
     * We want the "dome" (rounded shape) to persist longer. 
     * It should only start flattening out into a rectangle after the scroll is "a bit further in".
     */

    // Progress control:
    // 0% -> 40%: Keeps the deep dome shape (holds the curve)
    // 40% -> 90%: Smoothly transitions to rectangle
    // 90% -> 100%: Final polish
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.8, 0.9, 1]);
    const radiusProgress = useTransform(scrollYProgress, [0, 0.4, 0.9], [50, 50, 0]); // Deep curve stays until 40% scroll
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1]);

    // Derived styling hooks (must be top level)
    const topLeftRadius = useTransform(radiusProgress, (v) => `${v}vw`);
    const topRightRadius = useTransform(radiusProgress, (v) => `${v}vw`);

    return (
        <div
            ref={containerRef}
            className="relative w-full z-10 mt-[100vh]"
            style={{ isolation: 'isolate', minHeight: '100vh' }}
        >
            {mounted ? (
                <motion.div
                    style={{
                        scale,
                        opacity,
                        borderTopLeftRadius: topLeftRadius,
                        borderTopRightRadius: topRightRadius,
                    }}
                    className={cn(
                        "bg-white origin-top will-change-transform backface-hidden",
                        "shadow-[0_-70px_140px_rgba(0,0,0,0.3)]",
                        "min-h-screen overflow-hidden",
                        className
                    )}
                >
                    {children}
                </motion.div>
            ) : (
                <div
                    className={cn(
                        "bg-white min-h-screen border-t border-white/10",
                        className
                    )}
                    style={{
                        borderTopLeftRadius: '50vw',
                        borderTopRightRadius: '50vw',
                        transform: "scale(0.8)",
                        opacity: 0.6
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
