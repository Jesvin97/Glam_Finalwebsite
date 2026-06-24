"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";

/**
 * Desktop particle field — 5,000 gold particles that react to mouse movement.
 */
function ReactiveParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
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
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x +=
        (mouse.current.y * 0.4 - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.z +=
        (-mouse.current.x * 0.2 - pointsRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.03} />
    </points>
  );
}

/**
 * IntroSceneDesktop — full-screen scene with logo overlay and brand tagline.
 * Gold particles react to mouse movement on desktop.
 */
export default function IntroSceneDesktop() {
  return (
    <section className="intro-scene">
      <div className="intro-scene-overlay">
        <Image
          src="/images/logo.png"
          alt="Glam'more Logo"
          className="intro-scene-logo"
          width={320}
          height={120}
          priority
        />
        <p className="intro-scene-caption">Where beauty begins</p>
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <ReactiveParticleField />
      </Canvas>
    </section>
  );
}
