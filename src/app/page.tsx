"use client";

import IntroSection from "@/components/home/sections/IntroSection";

export default function Home() {
  return (
    <>
      <IntroSection />
      <div style={{ height: "3000px", background: "#f0f0f0" }}>
        {/* 임시 콘텐츠 – 실제 콘텐츠 들어올 자리 */}
        <h1 style={{ paddingTop: "100vh", textAlign: "center" }}>
          작품 리스트나 다음 화면 여기에 등장!
        </h1>
      </div>
    </>
  );
}
