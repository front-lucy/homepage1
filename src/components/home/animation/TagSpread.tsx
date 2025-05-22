"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Tag = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #22d4dd;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: "Pretendard", sans-serif;
  padding: 8px 18px;
  border-radius: 9999px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(34, 212, 221, 0.1);
`;

const tags = [
  { label: "WEBTOON", x: -320, y: -80 },
  { label: "COMIC BOOK", x: -340, y: 30 },
  { label: "CHARACTER", x: -280, y: 120 },
  { label: "WEB NOVEL", x: 320, y: -80 },
  { label: "MOVIE", x: 340, y: 30 },
  { label: "IP BIZ", x: 280, y: 120 },
];

interface TagSpreadProps {
  inView: boolean;
}

export default function TagSpread({ inView }: TagSpreadProps) {
  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag.label}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
          animate={
            inView
              ? { x: tag.x, y: tag.y, opacity: 1, scale: 1 }
              : { x: 0, y: 0, opacity: 0, scale: 0.5 }
          }
          transition={{
            delay: index * 0.1,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 14,
          }}
        >
          {tag.label}
        </Tag>
      ))}
    </>
  );
}
