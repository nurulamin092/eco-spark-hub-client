import { useInView } from "react-intersection-observer";
import { useEffect, useState, memo } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
}

export const Counter = memo(function Counter({
  target,
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;

    let start = 0;

    const duration = 1800;

    let animationFrame: number;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      start = Math.floor(easeOut * target);

      setCount(start);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target]);
  return (
    <span
      ref={ref}
      className=" tabular-nums
    transition-all
    duration-300"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
});
