import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Sphere, Line, Points } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

interface TechIconProps {
  position: [number, number, number];
  text: string;
  color: string;
  scale: number;
  isHovered?: boolean;
}

interface ParticleSystemProps {
  count: number;
  radius: number;
}

function TechIcon({ position, text, color, scale, isHovered }: TechIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
      // Floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
      // Gentle rotation
      textRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Glowing sphere behind text */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hover || isHovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hover || isHovered ? 0.4 : 0.2}
        />
      </mesh>

      {/* Tech text */}
      <Text
        ref={textRef}
        fontSize={0.3 * scale}
        color={hover || isHovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
        outlineWidth={hover || isHovered ? 0.02 : 0}
        outlineColor={color}
      >
        {text}
      </Text>

      {/* Energy rings around hovered items */}
      {(hover || isHovered) && (
        <>
          {[1, 1.5, 2].map((ringScale, i) => (
            <mesh key={i} scale={ringScale}>
              <ringGeometry args={[0.4, 0.5, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.3 - i * 0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function ParticleSystem({ count, radius }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);
    }
    return positions;
  }, [count, radius]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function NeuralNetwork({ nodes, connections }) {
  const networkRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={networkRef}>
      {/* Neural connections */}
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...nodes[connection.from].position);
        const end = new THREE.Vector3(...nodes[connection.to].position);

        return (
          <Line
            key={index}
            points={[start, end]}
            color="#bf00ff"
            transparent
            opacity={0.3}
            lineWidth={2}
          />
        );
      })}

      {/* Neural nodes */}
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ff0080" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function RotatingGlobe({ hoveredSkill }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  const techPositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      text: string;
      color: string;
      scale: number;
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
        "#00ffff",
        "#bf00ff",
        "#ff0080",
        "#00ff88",
        "#ff8800",
        "#0088ff",
      ];
      const color = colors[index % colors.length];

      // Scale based on skill level
      const scale = 0.8 + (skill.level / 100) * 0.4;

      positions.push({
        position: [x, y, z],
        text: skill.name,
        color,
        scale,
      });
    });

    return positions;
  }, []);

  // Neural network nodes for background
  const neuralNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 20; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 6 + Math.random() * 2;

      nodes.push({
        position: [
          radius * Math.cos(phi) * Math.sin(theta),
          radius * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
        ],
      });
    }
    return nodes;
  }, []);

  const neuralConnections = useMemo(() => {
    const connections = [];
    for (let i = 0; i < neuralNodes.length - 1; i++) {
      if (Math.random() > 0.7) {
        connections.push({
          from: i,
          to: i + 1,
        });
      }
    }
    return connections;
  }, [neuralNodes]);

  return (
    <group ref={groupRef}>
      {/* Neural network background */}
      <NeuralNetwork nodes={neuralNodes} connections={neuralConnections} />

      {/* Particle system */}
      <ParticleSystem count={100} radius={7} />

      {/* Main wireframe sphere */}
      <Sphere ref={sphereRef} args={[4, 32, 32]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Secondary energy sphere */}
      <Sphere args={[4.2, 16, 16]}>
        <meshBasicMaterial
          color="#bf00ff"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>

      {/* Tech skill icons */}
      {techPositions.map((tech, index) => (
        <TechIcon
          key={index}
          position={tech.position}
          text={tech.text}
          color={tech.color}
          scale={tech.scale}
          isHovered={hoveredSkill === tech.text}
        />
      ))}

      {/* Energy core at center */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      {/* Connecting energy lines */}
      {techPositions.map((tech, index) => {
        if (index === 0) return null;

        const start = new THREE.Vector3(0, 0, 0);
        const end = new THREE.Vector3(...tech.position);

        return (
          <Line
            key={`line-${index}`}
            points={[start, end]}
            color={tech.color}
            transparent
            opacity={hoveredSkill === tech.text ? 0.6 : 0.2}
            lineWidth={hoveredSkill === tech.text ? 3 : 1}
          />
        );
      })}

      {/* Orbital rings */}
      {[5, 5.5, 6].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial
            color={["#00ffff", "#bf00ff", "#ff0080"][i]}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

interface TechGlobeProps {
  className?: string;
}

export default function TechGlobe({ className = "" }: TechGlobeProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  return (
    <motion.div
      className={`w-full h-[500px] lg:h-[600px] relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Control panel */}
      <motion.div
        className="absolute top-4 right-4 z-10 cyber-border rounded-lg p-3 bg-black/50 backdrop-blur-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="text-neon-cyan font-matrix text-sm hover:text-white transition-colors"
        >
          {isAutoRotating ? "PAUSE_ROTATION" : "RESUME_ROTATION"}
        </button>
      </motion.div>

      {/* Skill info panel */}
      {hoveredSkill && (
        <motion.div
          className="absolute bottom-4 left-4 cyber-border rounded-lg p-4 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h3 className="text-neon-cyan font-cyber text-lg">{hoveredSkill}</h3>
          <p className="text-white/70 font-matrix text-sm">
            Active Technology Node
          </p>
        </motion.div>
      )}

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} color="#00ffff" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#bf00ff"
        />
        <spotLight
          position={[0, 0, 15]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#ff0080"
        />

        <RotatingGlobe hoveredSkill={hoveredSkill} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate={isAutoRotating}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          maxDistance={15}
          minDistance={8}
        />
      </Canvas>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Energy pulses */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
