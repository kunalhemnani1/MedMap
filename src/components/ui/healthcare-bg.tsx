"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "@/components/providers/ThemeProvider";

interface HealthcareBgProps {
    className?: string;
}
// SVG path data for medical icons (clean, recognizable shapes)
const ICONS = {
    // Heart with pulse line
    heartPulse:
        "M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1111.999 5.28 5 5 0 1119.5 12.572z",
    // Pill capsule
    pill: "M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z M8.5 8.5l7 7",
    // Activity/ECG heartbeat line
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    // Medical cross (plus)
    cross: "M12 5v14 M5 12h14",
    // Thermometer
    thermometer: "M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z",
    // Plus in circle
    plusCircle: "M12 2a10 10 0 1010 10A10 10 0 0012 2z M12 8v8 M8 12h8",
    // Bandage/First Aid
    bandage: "M18 2l4 4 M14.5 5.5l5 5 M5 6.5L18.5 20 M6.5 5L20 18.5",
    // Droplet (blood)
    droplet: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
};

export function HealthcareBg({
    className = "",
}: HealthcareBgProps) {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        interface FloatingElement {
            x: number;
            y: number;
            size: number;
            speed: number;
            opacity: number;
            icon: keyof typeof ICONS;
            rotation: number;
            rotationSpeed: number;
        }

        const elements: FloatingElement[] = [];
        const elementCount = 14;
        const rect = canvas.getBoundingClientRect();
        const iconKeys = Object.keys(ICONS) as (keyof typeof ICONS)[];

        for (let i = 0; i < elementCount; i++) {
            elements.push({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                size: Math.random() * 16 + 28, // 28-44px - larger for visibility
                speed: Math.random() * 0.25 + 0.1,
                opacity: Math.random() * 0.12 + 0.06,
                icon: iconKeys[Math.floor(Math.random() * iconKeys.length)],
                rotation: 0, // No rotation for cleaner look
                rotationSpeed: 0,
            });
        }

        // Colors based on theme
        const primaryColor = theme === "dark" ? [20, 184, 166] : [14, 165, 233];
        const secondaryColor = theme === "dark" ? [168, 85, 247] : [99, 102, 241];

        const drawIcon = (el: FloatingElement, color: number[]) => {
            ctx.save();
            ctx.translate(el.x, el.y);

            // Scale the path to the desired size (original icons are 24x24)
            const scale = el.size / 24;
            ctx.scale(scale, scale);
            ctx.translate(-12, -12); // Center the icon

            ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${el.opacity})`;
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${el.opacity * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const path = new Path2D(ICONS[el.icon]);
            ctx.stroke(path);

            // Fill certain icons for more visibility
            if (
                el.icon === "plusCircle" ||
                el.icon === "heartPulse" ||
                el.icon === "droplet"
            ) {
                ctx.fill(path);
            }

            ctx.restore();
        };

        let animationId: number;

        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            elements.forEach((el, i) => {
                el.y -= el.speed;

                if (el.y < -el.size * 2) {
                    el.y = rect.height + el.size * 2;
                    el.x = Math.random() * rect.width;
                }

                const color = i % 2 === 0 ? primaryColor : secondaryColor;
                drawIcon(el, color);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
}
