import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1200,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasAnimated) {
      return;
    }

    const numericValue = Number(
      String(value).replace(/[^\d.-]/g, '')
    );

    // Si el valor no es numérico, mostrarlo directamente.
    if (!Number.isFinite(numericValue)) {
      setDisplayValue(String(value));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);

        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const easedProgress =
            1 - Math.pow(1 - progress, 3);

          const currentValue = Math.round(
            numericValue * easedProgress
          );

          setDisplayValue(
            String(value).replace(
              String(numericValue),
              String(currentValue)
            )
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(String(value));
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span
      ref={elementRef}
      className={className}
      aria-label={String(value)}
    >
      {displayValue}
    </span>
  );
};