"use client";

import JaedamLogoENG from "@/assets/Logo-Jaedam-Eng.png";
import SpeechBubbleSVG from "@/assets/visua-bubblel.svg";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div<{ isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  overflow: hidden;
  z-index: 10;
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const TextLine = styled(motion.div)`
  display: flex;
  gap: 16px;
  font-size: 140px;
  font-family: Pretendard;
  line-height: 1;
  color: #111;
`;

const Bold = styled.span`
  font-weight: 800;
`;

const Light = styled.span`
  font-weight: 300;
`;

const Tag = styled(motion.div)<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #22d4dd;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: "Pretendard", sans-serif;
  padding: 8px 18px;
  border-radius: 900px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(34, 212, 221, 0.1);
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg);
  z-index: 2;
`;

const tags = [
  { label: "WEBTOON", x: -588.18, y: -266.67, angle: -13.45 },
  { label: "COMIC BOOK", x: -649.0, y: -45.76, angle: -1.61 },
  { label: "CHARACTER", x: -545.13, y: 185.31, angle: 14.32 },
  { label: "WEB NOVEL", x: 320.73, y: -257.9, angle: 10.71 },
  { label: "MOVIE", x: 537.89, y: -69.4, angle: 3.7 },
  { label: "IP BIZ", x: 416.33, y: 156.13, angle: -9.73 },
];

export default function IntroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const [step, setStep] = useState(1);
  const [expandBubble, setExpandBubble] = useState(false);
  const [bubbleIn, setBubbleIn] = useState(false);
  const isFixed = step < 5;
  const MotionSpeechBubble = motion(SpeechBubbleSVG);
  const MotionLogo = motion.img;

  useEffect(() => {
    if (step === 3) {
      setBubbleIn(true);
    }
    if (step === 4) {
      setExpandBubble(true);
    }
  }, [step]);

  useEffect(() => {
    let scrollLock = false;
    const handleScroll = (e: WheelEvent) => {
      if (scrollLock) return;
      scrollLock = true;
      e.preventDefault();
      setStep((prev) => Math.min(prev + 1, 5));
      setTimeout(() => {
        scrollLock = false;
      }, 1000);
    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const hexToRGBA = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const createDot = (): Dot => ({
      active: true,
      diameter: Math.random() * 4,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocity: {
        x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15,
        y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15,
      },
      alpha: 0.05,
      hex: "#22D4DD",
      color: hexToRGBA("#22D4DD", 0.05),
    });
    const updateDot = (dot: Dot) => {
      if (dot.alpha < 0.4) {
        dot.alpha += 0.005;
        dot.color = hexToRGBA(dot.hex, dot.alpha);
      }
      dot.x += dot.velocity.x;
      dot.y += dot.velocity.y;
      if (
        dot.x > canvas.width + 10 ||
        dot.x < -10 ||
        dot.y > canvas.height + 10 ||
        dot.y < -10
      ) {
        dot.active = false;
      }
    };
    const drawDot = (dot: Dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.diameter, 0, Math.PI * 2);
      ctx.fill();
    };
    const animate = () => {
      if (dotsRef.current.length < 30) {
        for (let i = dotsRef.current.length; i < 30; i++) {
          dotsRef.current.push(createDot());
        }
      }
      dotsRef.current.forEach(updateDot);
      dotsRef.current = dotsRef.current.filter((dot) => dot.active);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current.forEach(drawDot);
      requestAnimationFrame(animate);
    };
    const resize = () => {
      dotsRef.current = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <Wrapper isFixed={isFixed}>
      <Canvas ref={canvasRef} />
      {step >= 1 && (
        <Overlay>
          <TextLine
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: expandBubble ? 0 : 1 }}
            transition={{ duration: 0.8, opacity: { duration: 0.5 } }}
          >
            <Bold>세상</Bold>
            <Light>의 모든</Light>
          </TextLine>
          <TextLine
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: expandBubble ? 0 : 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              opacity: { duration: 0.5, delay: 0.2 },
            }}
          >
            <Bold>재미</Bold>
            <Light>를 담다</Light>
          </TextLine>
          {step >= 2 &&
            tags.map((tag) => (
              <Tag
                key={tag.label}
                angle={tag.angle}
                style={{ rotate: `${-tag.angle}deg` }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                animate={{
                  x: tag.x,
                  y: tag.y,
                  opacity: expandBubble ? 0 : 1,
                  scale: 1,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {tag.label}
              </Tag>
            ))}
        </Overlay>
      )}
      {step === 3 && bubbleIn && (
        <MotionSpeechBubble
          style={{
            position: "absolute",
            left: "36%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            width: "454px",
            zIndex: -1,
          }}
          initial={{ top: "100%", scale: 1, opacity: 0 }}
          animate={{ top: "30%", scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
      {step === 4 && expandBubble && (
        <>
          <MotionSpeechBubble
            style={{
              position: "absolute",
              left: "36%",
              top: "30%",
              transform: "translate(-50%, -50%)",
              width: "454px",
              zIndex: -1,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 10 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <MotionLogo
            src={JaedamLogoENG.src}
            alt="Jaedam Logo"
            style={{
              position: "absolute",
              top: "40%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              width: "667px",
              height: "auto",
              zIndex: 0,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}
          />
        </>
      )}
    </Wrapper>
  );
}

interface Dot {
  active: boolean;
  diameter: number;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  alpha: number;
  hex: string;
  color: string;
}
