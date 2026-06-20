"use client";

import { useEffect, useRef } from "react";

export default function AudioBranding() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // Instantiate background audio loop
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15; // Set a soft background level

    const handleFirstInteraction = () => {
      if (startedRef.current || !audioRef.current) return;
      
      audioRef.current.play()
        .then(() => {
          startedRef.current = true;
          // Remove listener once successfully started
          window.removeEventListener("click", handleFirstInteraction);
          window.removeEventListener("scroll", handleFirstInteraction);
        })
        .catch((err) => {
          console.log("Audio autoplay waiting for valid user interaction:", err);
        });
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Return null so no visual HTML elements or branding pills are rendered in the DOM
  return null;
}
