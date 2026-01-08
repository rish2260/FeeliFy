"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollPersistence = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Disable browser's automatic scroll restoration to avoid conflicts
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        // Restore scroll position
        const storedScroll = sessionStorage.getItem(`scrollPos:${pathname}`);
        if (storedScroll) {
            // Timeout ensures layout is ready
            setTimeout(() => {
                window.scrollTo(0, parseInt(storedScroll));
            }, 100);
        } // else window.scrollTo(0,0) handled by Next.js mostly, but we can enforce if needed

        const handleScroll = () => {
            sessionStorage.setItem(`scrollPos:${pathname}`, window.scrollY.toString());
        };

        // Debounce/Throttle could be added, but modern browsers handle this okay.
        // We'll use a simple passive listener.
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            // Optional: Reset to auto on unmount if navigating away? 
            // Usually keeping it manual for the app lifetime is fine if we handle all pages.
        };
    }, [pathname]);

    return null; // Headless component
};
