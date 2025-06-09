import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

interface TechIconProps {
  position: [number, number, number];
  text: string;
  color: string;
}

function TechIcon({ position, text, color }: TechIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={position}>
      <Text
        ref={meshRef}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {text}
      </Text>
    </group>
  );
}

function RotatingGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const techPositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      text: string;
      color: string;
    }> = [];
    const radius = 4;
    const allSkills = skills.flatMap((category) => category.items);

    allSkills.forEach((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / allSkills.length);
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      const colors = [
        "#6366f1",
        "#8b5cf6",
        "#06b6d4",
        "#10b981",
        "#f59e0b",
        "#ef4444",
      ];
      const color = colors[index % colors.length];

      positions.push({
        position: [x, y, z],
        text: skill.name,
        color,
      });
    });

    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Wire frame sphere */}
      <Sphere ref={sphereRef} args={[4, 32, 32]}>
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Tech icons */}
      {techPositions.map((tech, index) => (
        <TechIcon
          key={index}
          position={tech.position}
          text={tech.text}
          color={tech.color}
        />
      ))}

      {/* Connecting lines */}
      {techPositions.map((tech, index) => {
        if (index === 0) return null;

        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...techPositions[index - 1].position),
          new THREE.Vector3(...tech.position),
        ]);

        return (
          <line key={`line-${index}`} geometry={geometry}>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.3} />
          </line>
        );
      })}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-[500px] lg:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <RotatingGlobe />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
