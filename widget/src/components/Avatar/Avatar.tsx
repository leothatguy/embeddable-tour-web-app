import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarModelProps {
	stepIndex: number;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ stepIndex: _stepIndex }) => {
	const groupRef = useRef<THREE.Group>(null);
	const headRef = useRef<THREE.Mesh>(null);

	// Animate on step change
	useFrame((state) => {
		if (groupRef.current) {
			// Gentle bobbing animation
			groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
		}

		if (headRef.current) {
			// Gentle head rotation
			headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Body */}
			<mesh position={[0, -0.5, 0]}>
				<cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
				<meshStandardMaterial color="#eabe7b" />
			</mesh>

			{/* Head */}
			<mesh ref={headRef} position={[0, 0.5, 0]}>
				<sphereGeometry args={[0.4, 32, 32]} />
				<meshStandardMaterial color="#f5c98e" />
			</mesh>

			{/* Eyes */}
			<mesh position={[-0.15, 0.55, 0.3]}>
				<sphereGeometry args={[0.08, 16, 16]} />
				<meshStandardMaterial color="#1e293b" />
			</mesh>
			<mesh position={[0.15, 0.55, 0.3]}>
				<sphereGeometry args={[0.08, 16, 16]} />
				<meshStandardMaterial color="#1e293b" />
			</mesh>

			{/* Smile */}
			<mesh position={[0, 0.35, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
				<meshStandardMaterial color="#1e293b" />
			</mesh>
		</group>
	);
};

interface AvatarProps {
	stepIndex: number;
}

export const Avatar: React.FC<AvatarProps> = ({ stepIndex }) => {
	return (
		<div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 3]} />
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={0.8} />
				<pointLight position={[-5, -5, -5]} intensity={0.4} />
				<AvatarModel stepIndex={stepIndex} />
				<OrbitControls enableZoom={false} enablePan={false} />
			</Canvas>
		</div>
	);
};
