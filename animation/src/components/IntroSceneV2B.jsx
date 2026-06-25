import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import logo from "../assets/glammore-logo.png";

// Touch + Gyroscope reactive particle field
function MobileParticleField() {
  const pointsRef = useRef();
  const input = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const positions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;

    // --- Touch drag support ---
    let lastTouch = null;
    const handleTouchStart = (e) => {
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchMove = (e) => {
      if (!lastTouch) return;
      const dx = e.touches[0].clientX - lastTouch.x;
      const dy = e.touches[0].clientY - lastTouch.y;
      input.current.x += dx * 0.003;
      input.current.y += dy * 0.003;
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => { lastTouch = null; };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    // --- Gyroscope support (DeviceOrientation) ---
    let gyroEnabled = false;
    const handleOrientation = (e) => {
      if (e.gamma === null) return;
      gyroEnabled = true;
      // gamma = left/right tilt (-90 to 90), beta = front/back tilt (-180 to 180)
      input.current.x = (e.gamma / 45) * 0.8;   // normalize to ~-1..1
      input.current.y = ((e.beta - 45) / 45) * 0.5;
    };

    // Request permission on iOS 13+
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((res) => {
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
    // Slow base auto-rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    // Smooth lerp toward touch/gyro input
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
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.035} sizeAttenuation />
    </points>
  );
}

export default function IntroSceneV2B() {
  return (
    <section className="scene scene-touch">
      <div className="scene-overlay">
        <img
          src={logo}
          alt="Glammore Logo"
          className="scene-logo scene-logo-compact"
        />
        <p className="scene-caption">
          Tilt or swipe
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 5] }} style={{ touchAction: "none" }}>
        <ambientLight intensity={1} />
        <MobileParticleField />
      </Canvas>
    </section>
  );
}
