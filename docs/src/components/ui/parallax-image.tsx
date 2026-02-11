"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    speed?: number; // Higher number = more movement
    priority?: boolean;
}

export function ParallaxImage({
    src,
    alt,
    className,
    containerClassName,
    speed = 0.2,
    priority = false
}: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to vertical movement
    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

    return (
        <div
            ref={ref}
            className={cn("relative overflow-hidden", containerClassName)}
        >
            <motion.div
                style={{ y, height: `${100 + speed * 100}%`, top: `-${speed * 50}%` }}
                className="absolute inset-x-0 w-full"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={cn("object-cover", className)}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>
        </div>
    );
}
