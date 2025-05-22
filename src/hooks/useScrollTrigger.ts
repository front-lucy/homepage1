import { useEffect, useRef, useState } from "react";

interface UseScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  downOnly?: boolean; // 아래로 스크롤할 때만 트리거
}

export const useScrollTrigger = ({
  threshold = 0.3,
  rootMargin = "0px",
  triggerOnce = true,
  downOnly = true,
}: UseScrollTriggerOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  console.log("useScrollTrigger 초기화:", {
    threshold,
    rootMargin,
    triggerOnce,
    downOnly,
  });

  // 스크롤 방향 감지
  useEffect(() => {
    console.log("스크롤 이벤트 리스너 등록");

    const handleScroll = () => {
      const current = window.scrollY;
      const scrollingDown = current > lastScrollY.current;
      setIsScrollingDown(scrollingDown);
      lastScrollY.current = current;

      console.log("스크롤 감지:", {
        currentScrollY: current,
        isScrollingDown: scrollingDown,
        lastScrollY: lastScrollY.current,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("스크롤 이벤트 리스너 제거");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // inView 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        console.log("Intersection 감지:", {
          isIntersecting,
          isScrollingDown,
          downOnly,
          triggerOnce,
        });

        if (isIntersecting) {
          if (downOnly && !isScrollingDown) return;
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else {
          if (!triggerOnce) setInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, isScrollingDown, downOnly]);

  return { ref, inView, isScrollingDown };
};
