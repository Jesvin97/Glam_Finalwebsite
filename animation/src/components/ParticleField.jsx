import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ParticleField() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y =
        state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial color="#d4af37" size={0.03} />
    </points>
  );
}
