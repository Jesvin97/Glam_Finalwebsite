"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioBranding() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We instantiate the audio object in useEffect to ensure it only runs on the client side.
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25; // Keep it soft in the background

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback block prevented auto-play:", err);
      });
    }
  };

  return (
    <div className="audio-branding-pill">
      <button
        onClick={togglePlayback}
        className="audio-play-btn"
        aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
      >
        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
      </button>

      <span className="audio-track-label">Ambient Luxe</span>

      <div className={`audio-bars ${isPlaying ? "playing" : ""}`}>
        <div className="audio-bar" />
        <div className="audio-bar" />
        <div className="audio-bar" />
      </div>
    </div>
  );
}
