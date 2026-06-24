"use client";

import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleField — base component that renders 5,000 gold particles
 * with a slow auto-rotation. Used as a fallback when neither mouse
 * nor touch/gyro input is available.
 */
export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
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
