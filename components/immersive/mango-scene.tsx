"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function MangoCore() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 2.5, 18]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {[[-1.2, 0.7, 0], [1.1, 1.1, 0.6], [0.2, 1.5, -1.2]].map((pos, i) => (
        <Float speed={1.3 + i} key={i}>
          <Sphere args={[0.25, 20, 20]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#F4A261" emissive="#6b3f10" emissiveIntensity={0.4} />
          </Sphere>
        </Float>
      ))}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[1.65, 24, 24]} />
        <meshStandardMaterial color="#2f5f38" />
      </mesh>
    </group>
  );
}

export function MangoScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[2.4rem] border border-cream/20 bg-black/25 shadow-float">
      <Canvas camera={{ position: [0, 1.2, 6], fov: 45 }}>
        <ambientLight intensity={0.55} />
        <directionalLight intensity={1.1} position={[3, 4, 2]} />
        <MangoCore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
