import { useEffect, useRef } from 'react';

/**
 * A custom React hook that uses the IntersectionObserver API to detect when
 * elements with the `.reveal` or `.reveal-stagger` classes enter the viewport.
 * Once visible, it adds the `.reveal-active` class to trigger hardware-accelerated CSS transitions.
 */
export default function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Initialize IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Stop observing once animation has triggered (animates once)
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -40px 0px', // Slight offset at bottom of viewport
      }
    );

    // Initial observation scan
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    revealElements.forEach((el) => {
      if (!el.classList.contains('reveal-active')) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  /**
   * Scans the DOM and registers any newly mounted elements with the observer.
   * Crucial in single-page apps where content mounts dynamically.
   */
  const refresh = () => {
    // Small timeout to allow React to paint the DOM
    setTimeout(() => {
      if (!observerRef.current) return;
      const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
      revealElements.forEach((el) => {
        if (!el.classList.contains('reveal-active')) {
          observerRef.current?.observe(el);
        }
      });
    }, 150);
  };

  return { refresh };
}
