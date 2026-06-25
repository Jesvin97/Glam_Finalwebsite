"use client";

import { useState, useEffect } from "react";
import IntroSceneDesktop from "./intro/IntroSceneDesktop";
import IntroSceneMobile from "./intro/IntroSceneMobile";

const INTRO_DURATION = 4600;  // 4.6s hold
const FADE_DURATION = 400;    // 0.4s fade → total 5s

export default function IntroLoader() {
  const [showIntro, setShowIntro] = useState(false);
  const [fading, setFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on client
    if (sessionStorage.getItem("introSeen")) {
      return; // Skip intro
    }
    
    sessionStorage.setItem("introSeen", "true");
    
    const mobileCheck = 
      /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobileCheck);
    setShowIntro(true);

    const holdTimer = setTimeout(() => setFading(true), INTRO_DURATION);
    const removeTimer = setTimeout(
      () => setShowIntro(false),
      INTRO_DURATION + FADE_DURATION
    );

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showIntro) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease`,
        pointerEvents: fading ? "none" : "all",
        backgroundColor: "#000",
      }}
    >
      {isMobile ? <IntroSceneMobile /> : <IntroSceneDesktop />}

      {/* Subtle gold progress bar — signals activity without looking like an error */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "linear-gradient(90deg, #d4af37, #a07c20)",
          animation: `introProgress ${INTRO_DURATION}ms linear forwards`,
        }}
      />
    </div>
  );
}
