"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";

/**
 * Mobile particle field — 5,000 gold particles that react to
 * touch drag and device gyroscope (DeviceOrientation).
 */
function MobileParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const input = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const [positions] = useState(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  useEffect(() => {
    const canvas = gl.domElement;

    // --- Touch drag support ---
    let lastTouch: { x: number; y: number } | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!lastTouch) return;
      const dx = e.touches[0].clientX - lastTouch.x;
      const dy = e.touches[0].clientY - lastTouch.y;
      input.current.x += dx * 0.003;
      input.current.y += dy * 0.003;
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      lastTouch = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    // --- Gyroscope support (DeviceOrientation) ---
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null) return;
      input.current.x = ((e.gamma ?? 0) / 45) * 0.8;
      input.current.y = (((e.beta ?? 45) - 45) / 45) * 0.5;
    };

    // Request permission on iOS 13+
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
        .requestPermission()
        .then((res: string) => {
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [gl]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    pointsRef.current.rotation.x +=
      (input.current.y * 0.5 - pointsRef.current.rotation.x) * 0.04;
    pointsRef.current.rotation.z +=
      (-input.current.x * 0.3 - pointsRef.current.rotation.z) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.035} sizeAttenuation />
    </points>
  );
}

/**
 * IntroSceneMobile — full-screen scene with logo overlay and brand tagline.
 * Gold particles react to touch drag and gyroscope tilt on mobile devices.
 */
export default function IntroSceneMobile() {
  return (
    <section className="intro-scene intro-scene-touch">
      <div className="intro-scene-overlay">
        <Image
          src="/images/logo.png"
          alt="Glam'more Logo"
          className="intro-scene-logo intro-scene-logo-compact"
          width={280}
          height={105}
          priority
        />
        <p className="intro-scene-caption">Where beauty begins</p>
      </div>

      <Canvas camera={{ position: [0, 0, 5] }} style={{ touchAction: "none" }}>
        <ambientLight intensity={1} />
        <MobileParticleField />
      </Canvas>
    </section>
  );
}
