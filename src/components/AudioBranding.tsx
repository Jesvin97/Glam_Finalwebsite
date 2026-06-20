"use client";

import { useEffect, useRef, useCallback } from "react";
import AudioAutoplayTrigger from "./AudioAutoplayTrigger";

/**
 * AudioBranding component – sets up background audio and hands the start
 * logic to <AudioAutoplayTrigger/> which listens for the first user interaction
 * (click, scroll, or touch) and then triggers playback.
 */
export default function AudioBranding() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazily creates the Audio object and plays it. Wrapped in useCallback so the
  // function reference is stable for the trigger component.
  const startAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
      audio.loop = true;
      audio.volume = 0.15; // Soft background level
      audioRef.current = audio;
    }
    // play() returns a promise; catch any remaining autoplay block.
    audioRef.current?.play().catch(() => {
      console.log("Audio autoplay still blocked after user interaction");
    });
  }, []);

  // Ensure the audio is paused when the component unmounts (e.g., navigation)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // The trigger component does all the work – we just render it.
  return <AudioAutoplayTrigger startAudio={startAudio} />;
}
