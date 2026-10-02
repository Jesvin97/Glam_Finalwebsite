"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// Minimal typing for the parts of the YouTube IFrame API we use.
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  setVolume(volume: number): void;
  setLoop(loop: boolean): void;
  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  getPlaylist(): string[] | null;
  getPlaylistIndex(): number;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      host?: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("YouTube API failed to load"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

export default function TestimonialVideos({ playlistId }: { playlistId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const userPausedRef = useRef(false);

  const [started, setStarted] = useState(false); // load the player only when the section nears the screen
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Load lazily and pause when scrolled out of view (saves data, avoids sound from off-screen).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          if (!userPausedRef.current) playerRef.current?.playVideo();
        } else {
          playerRef.current?.pauseVideo();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !mountRef.current) return;
    let cancelled = false;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !mountRef.current) return;
        playerRef.current = new YT.Player(mountRef.current, {
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            listType: "playlist",
            list: playlistId,
            autoplay: 1,
            mute: 1, // browsers only allow autoplay when muted; the visitor taps for sound
            controls: 0,
            playsinline: 1,
            loop: 1,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
          },
          events: {
            onReady: (e) => {
              e.target.setLoop(true);
              e.target.playVideo();
              setReady(true);
            },
            onStateChange: (e) => {
              const { ENDED, PLAYING, PAUSED } = YT.PlayerState;
              if (e.data === PLAYING) setPlaying(true);
              if (e.data === PAUSED) setPlaying(false);
              // Safety net for the loop: if the last video ends and the playlist didn't restart, start over.
              if (e.data === ENDED) {
                const list = e.target.getPlaylist();
                if (list && e.target.getPlaylistIndex() >= list.length - 1) e.target.playVideoAt(0);
              }
            },
            onError: () => setFailed(true),
          },
        });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [started, playlistId]);

  const toggleSound = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.setVolume(100);
      p.playVideo();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }, [muted]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      userPausedRef.current = true;
      p.pauseVideo();
    } else {
      userPausedRef.current = false;
      p.playVideo();
    }
  }, [playing]);

  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <div className="tv-section" ref={wrapRef}>
      <h3 className="tv-title">Watch Our Clients&apos; Stories</h3>
      <p className="tv-sub">Real moments from Glam&apos;more Unisex Salon, Thiruvalla.</p>

      <div className="tv-phone">
        {failed ? (
          <div className="tv-fallback">
            <p>The video couldn&apos;t load here.</p>
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
          </div>
        ) : (
          <>
            <div className="tv-player" ref={mountRef} />
            {!ready && started && <div className="tv-loading">Loading…</div>}
            {ready && muted && (
              <button type="button" className="tv-sound-hint" onClick={toggleSound}>
                <FaVolumeUp /> Tap for sound
              </button>
            )}
          </>
        )}
      </div>

      {ready && !failed && (
        <div className="tv-controls" role="group" aria-label="Video controls">
          <button type="button" onClick={() => playerRef.current?.previousVideo()} aria-label="Previous video">
            <FaStepBackward />
          </button>
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button type="button" onClick={() => playerRef.current?.nextVideo()} aria-label="Next video">
            <FaStepForward />
          </button>
        </div>
      )}
    </div>
  );
}
