import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface ProjectModelProps {
  title: string;
  technologies: string[];
  color?: string;
}

function FloatingBox({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <Box ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.8}
      />
    </Box>
  );
}

function ProjectStructure({
  technologies,
  color,
}: {
  technologies: string[];
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const techColors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <group ref={groupRef}>
      {/* Central hub */}
      <Box position={[0, 0, 0]} scale={1.5}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>

      {/* Tech stack boxes */}
      {technologies.slice(0, 5).map((tech, index) => {
        const angle = (index / 5) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={tech}>
            <FloatingBox
              position={[x, 0, z]}
              color={techColors[index % techColors.length]}
              scale={0.8}
            />
            <Text
              position={[x, -1.5, z]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTN1OVgaQA.woff2"
            >
              {tech}
            </Text>

            {/* Connecting lines */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, x, 0, z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={0.6} />
            </line>
          </group>
        );
      })}
    </group>
  );
}

export default function ProjectModel({
  title,
  technologies,
  color = "#6366f1",
}: ProjectModelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full h-[400px] relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color={color}
        />

        <ProjectStructure technologies={technologies} color={color} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={isHovered}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Project title overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-white/10 rounded-full text-white"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
