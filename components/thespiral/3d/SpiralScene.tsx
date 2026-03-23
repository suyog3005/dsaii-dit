"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function createSeededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function SpiralField() {
  const tunnelRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particles = useMemo(() => {
    const count = 4500;
    const positions = new Float32Array(count * 3);
    const random = createSeededRandom(20260321);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const t = (i / count) * Math.PI * 26;
      const radius = 1.2 + t * 0.045 + random() * 0.3;

      positions[i3] = Math.cos(t) * radius;
      positions[i3 + 1] = (random() - 0.5) * 10;
      positions[i3 + 2] = Math.sin(t) * radius;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const scrollProgress = window.scrollY / Math.max(window.innerHeight * 3, 1);
    const mousePosition = mouseRef.current;

    if (tunnelRef.current) {
      tunnelRef.current.rotation.y = elapsed * 0.2 + mousePosition.x * 0.22;
      tunnelRef.current.rotation.x = mousePosition.y * 0.16;
      tunnelRef.current.rotation.z = elapsed * 0.05;

      const scale = 1 + scrollProgress * 0.16;
      tunnelRef.current.scale.set(scale, scale, scale);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -elapsed * 0.1 + mousePosition.x * 0.18;
      particlesRef.current.rotation.x = mousePosition.y * 0.12;
      particlesRef.current.position.z = -scrollProgress * 2.1;
    }
  });

  return (
    <group>
      

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={1}
        />
      </points>
    </group>
  );
}

function SpiralScene() {
  const bgVideoUrl = process.env.NEXT_PUBLIC_BG_VIDEO ?? "/videos/bg1.mp4";

  return (
    <div className="scene-layer" aria-hidden>
      <video
        className="scene-video"
        src={bgVideoUrl}
        autoPlay
        muted={true}
        loop
        playsInline
        preload="auto"
      />

      <Canvas camera={{ position: [0, 0, 8], fov: 56 }} dpr={[1, 1.75]}>
        <fog attach="fog" args={["#000000", 8, 19]} />
        <ambientLight intensity={0.0} />
        <SpiralField />
      </Canvas>
    </div>
  );
}

export default memo(SpiralScene);