"use client";

import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";

interface Dot {
  active: boolean;
  diameter: number;
  x: number;
  y: number;
  velocity: {
    x: number;
    y: number;
  };
  alpha: number;
  hex: string;
  color: string;
}

interface CanvasDotsProps {
  maximum?: number;
  colors?: string[];
}

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const CanvasDots: React.FC<CanvasDotsProps> = ({
  maximum = 30,
  colors = ["#22D4DD", "#22D4DD", "#22D4DD", "#22D4DD"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);

  const hexToRGBA = (hex: string, alpha: number): string => {
    const trimHex = (h: string) =>
      h.charAt(0) === "#" ? h.substring(1, 7) : h;
    const hexTrimmed = trimHex(hex);
    const red = parseInt(hexTrimmed.substring(0, 2), 16);
    const green = parseInt(hexTrimmed.substring(2, 4), 16);
    const blue = parseInt(hexTrimmed.substring(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  };

  const createDot = (canvas: HTMLCanvasElement): Dot => ({
    active: true,
    diameter: Math.random() * 4, // 작게
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    velocity: {
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15, // 느리게
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15,
    },
    alpha: 0.05,
    hex: colors[Math.floor(Math.random() * colors.length)],
    color: hexToRGBA(colors[Math.floor(Math.random() * colors.length)], 0.05),
  });

  const updateDot = (dot: Dot, canvas: HTMLCanvasElement) => {
    if (dot.alpha < 0.4) {
      dot.alpha += 0.005;
      dot.color = hexToRGBA(dot.hex, dot.alpha);
    }

    dot.x += dot.velocity.x;
    dot.y += dot.velocity.y;

    // 범위 벗어나면 비활성화
    if (
      dot.x > canvas.width + 10 ||
      dot.x < -10 ||
      dot.y > canvas.height + 10 ||
      dot.y < -10
    ) {
      dot.active = false;
    }
  };

  const drawDot = (dot: Dot, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.diameter, 0, Math.PI * 2, false);
    ctx.fill();
  };

  const generateDots = (canvas: HTMLCanvasElement) => {
    while (dotsRef.current.length < maximum) {
      dotsRef.current.push(createDot(canvas));
    }
  };

  const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotsRef.current.forEach((dot) => drawDot(dot, ctx));
  };

  const update = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    generateDots(canvas);
    dotsRef.current.forEach((dot) => updateDot(dot, canvas));
    dotsRef.current = dotsRef.current.filter((dot) => dot.active);
    render(ctx, canvas);
    requestAnimationFrame(() => update(ctx, canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      dotsRef.current = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    update(ctx, canvas);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maximum, colors]);

  return <Canvas ref={canvasRef} />;
};

export default CanvasDots;
