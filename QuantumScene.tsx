/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Line, Environment, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// --- BLOCKCHAIN NETWORK VISUALIZATION ---

interface NodeProps {
  position: [number, number, number];
  color: string;
}

const Node: React.FC<NodeProps> = ({ position, color }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <Icosahedron ref={ref} args={[0.2, 0]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe={true}
      />
    </Icosahedron>
  );
};

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
}

const Connection: React.FC<ConnectionProps> = ({ start, end }) => {
    return (
        <Line points={[start, end]} color="#444" opacity={0.2} transparent lineWidth={1} />
    )
}

const Network = () => {
    // Generate random nodes
    const nodes = useMemo(() => {
        const temp = [];
        for(let i=0; i<18; i++) {
            temp.push({
                pos: [
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6
                ] as [number, number, number],
                color: Math.random() > 0.7 ? "#FFFFFF" : "#444444" // White accents on dark gray
            })
        }
        return temp;
    }, []);

    const connections = useMemo(() => {
        const temp = [];
        for(let i=0; i<nodes.length; i++) {
            // Connect to nearest neighbors roughly
            for(let j=i+1; j<nodes.length; j++) {
                if (Math.random() > 0.75) {
                    temp.push({ start: nodes[i].pos, end: nodes[j].pos });
                }
            }
        }
        return temp;
    }, [nodes]);

    return (
        <group>
            {nodes.map((n, i) => <Node key={i} position={n.pos} color={n.color} />)}
            {connections.map((c, i) => <Connection key={i} start={c.start} end={c.end} />)}
        </group>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        {/* Subtle cool lighting */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
           <Network />
        </Float>

        <fog attach="fog" args={['#000000', 5, 20]} />
      </Canvas>
    </div>
  );
};

// --- SECURITY SHIELD SCENE ---

export const SecurityShieldScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#2997ff" />
        
        <Float rotationIntensity={0.5} floatIntensity={0.2} speed={2}>
            {/* The Shield Core */}
            <Octahedron args={[1.5, 0]} position={[0, 0, 0]}>
                 <meshStandardMaterial 
                    color="#111" 
                    roughness={0.2} 
                    metalness={0.8} 
                 />
            </Octahedron>
            
            {/* Wireframe Outer Shield */}
             <Octahedron args={[1.8, 1]} position={[0, 0, 0]}>
                 <meshStandardMaterial 
                    color="#888" 
                    wireframe={true}
                    transparent
                    opacity={0.1}
                 />
            </Octahedron>
        </Float>
      </Canvas>
    </div>
  );
}