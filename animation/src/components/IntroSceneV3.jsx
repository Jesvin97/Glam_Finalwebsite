import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import logo from "../assets/glammore-logo.png";

// A separate particle component that reads mouse position and reacts to it
function ReactiveParticleField() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const positions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  // Track mouse position normalized to -1 to 1
  useEffect(() => {
    const canvas = gl.domElement;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow base rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;

      // Smoothly tilt the particle field towards where the mouse is
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
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.03} />
    </points>
  );
}

export default function IntroSceneV3() {
  return (
    <section className="scene">
      <div className="scene-overlay">
        <img
          src={logo}
          alt="Glammore Logo"
          className="scene-logo"
        />
        <p className="scene-caption">
          Move your mouse
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <ReactiveParticleField />
      </Canvas>
    </section>
  );
}
