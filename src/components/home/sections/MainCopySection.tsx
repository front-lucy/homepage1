"use client";

import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoldText = styled.span`
  font-family: Pretendard;
  font-weight: 800;
  font-size: 140px;
  line-height: 100%;
  text-align: center;
`;

const LightText = styled.span`
  font-family: Pretendard;
  font-weight: 300;
  font-size: 140px;
  line-height: 100%;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const MainCopySection = () => {
  const { ref, inView } = useScrollTrigger({ threshold: 0.4 });

  return (
    <Section ref={ref}>
      <Row>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <BoldText>세상</BoldText>
        </motion.div>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LightText>의 모든</LightText>
        </motion.div>
      </Row>
      <Row>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <BoldText>재미</BoldText>
        </motion.div>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LightText>를 담다</LightText>
        </motion.div>
      </Row>
    </Section>
  );
};

export default MainCopySection;
