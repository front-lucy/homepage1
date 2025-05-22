"use client";

import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Text = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const TextLine = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  overflow: hidden;
`;

const Bold = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 140px;
  line-height: 1;
  color: #111;
`;

const Light = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 300;
  font-size: 140px;
  line-height: 1;
  color: #111;
`;

const Tag = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #22d4dd;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: "Pretendard", "sans-serif";
  padding: 8px 18px;
  border-radius: 9999px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(34, 212, 221, 0.08);
`;

const tags = [
  { label: "WEBTOON", x: -320, y: -80 },
  { label: "COMIC BOOK", x: -340, y: 30 },
  { label: "CHARACTER", x: -280, y: 120 },
  { label: "WEB NOVEL", x: 320, y: -80 },
  { label: "MOVIE", x: 340, y: 30 },
  { label: "IP BIZ", x: 280, y: 120 },
];

export default function IntroText() {
  const { ref, inView } = useScrollTrigger({ threshold: 0.3 });

  return (
    <Wrapper ref={ref}>
      <Text>
        <TextLine
          initial={{ x: "-100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Bold>세상</Bold>
          <Light>의 모든</Light>
        </TextLine>
        <TextLine
          initial={{ x: "-100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Bold>재미</Bold>
          <Light>를 담다</Light>
        </TextLine>
      </Text>

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
    </Wrapper>
  );
}
