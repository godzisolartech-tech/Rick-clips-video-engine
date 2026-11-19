import React from "react";
import {
  AbsoluteFill,
  Composition,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  registerRoot,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";

const Character = ({ position, clothes, hat }) => (
  <group position={position}>
    {/* Body */}
    <mesh position={[0, 0.85, 0]}>
      <capsuleGeometry args={[0.25, 0.65, 4, 8]} />
      <meshStandardMaterial color={clothes} />
    </mesh>

    {/* Head */}
    <mesh position={[0, 1.55, 0]}>
      <sphereGeometry args={[0.34, 16, 12]} />
      <meshStandardMaterial color="#f0c69a" />
    </mesh>

    {/* Eyes */}
    <mesh position={[-0.12, 1.6, 0.29]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color="#171717" />
    </mesh>
    <mesh position={[0.12, 1.6, 0.29]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color="#171717" />
    </mesh>

    {/* Hat */}
    {hat && (
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.16, 8]} />
        <meshStandardMaterial color="#46372a" />
      </mesh>
    )}

    {/* Arms */}
    {[-1, 1].map((side) => (
      <mesh
        key={side}
        position={[side * 0.34, 0.95, 0]}
        rotation={[0, 0, side * -0.3]}
      >
        <capsuleGeometry args={[0.09, 0.45, 4, 8]} />
        <meshStandardMaterial color={clothes} />
      </mesh>
    ))}

    {/* Legs */}
    {[-1, 1].map((side) => (
      <mesh key={side} position={[side * 0.13, 0.22, 0]}>
        <boxGeometry args={[0.15, 0.55, 0.17]} />
        <meshStandardMaterial color="#40352d" />
      </mesh>
    ))}
  </group>
);

const ConstructionScene = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const cameraZ = interpolate(frame, [0, 180], [10, 8.5], {
    extrapolateRight: "clamp",
  });

  const riceMovement = Math.sin(frame / 12) * 0.035;

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 3.2, cameraZ], fov: 42 }}
      style={{ backgroundColor: "#b7a18a" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#927454" />
      </mesh>

      {/* Stone wall */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((__, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              (col - 2) * 0.9 + (row % 2) * 0.4,
              row * 0.48 + 0.25,
              -2,
            ]}
          >
            <boxGeometry args={[0.85, 0.43, 0.55]} />
            <meshStandardMaterial color="#9b9284" />
          </mesh>
        ))
      )}

      {/* Mason */}
      <Character position={[-1.4, 0, 0]} clothes="#8a5438" />

      {/* Soldiers */}
      <Character position={[1.4, 0, -1]} clothes="#6b7549" hat />
      <Character position={[2.3, 0, -1.5]} clothes="#77654d" hat />

      {/* Rice sack */}
      <mesh position={[-0.3, 0.42, 0.5]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.38, 0.48, 0.8, 10]} />
        <meshStandardMaterial color="#c7ae7e" />
      </mesh>

      {/* Rice grains */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.3 + Math.cos(i * 2.4) * 0.3,
            0.87 + riceMovement + (i % 3) * 0.025,
            0.5 + Math.sin(i * 2.4) * 0.3,
          ]}
        >
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshStandardMaterial color="#f5e9ca" />
        </mesh>
      ))}

      {/* Wooden construction beam */}
      <mesh position={[0, 0.3, -0.8]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[3.5, 0.15, 0.18]} />
        <meshStandardMaterial color="#65432b" />
      </mesh>
    </ThreeCanvas>
  );
};

const RickClipVideo = () => (
  <AbsoluteFill>
    <ConstructionScene />
  </AbsoluteFill>
);

const RemotionRoot = () => (
  <Composition
    id="RickClipVideo"
    component={RickClipVideo}
    durationInFrames={180}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(RemotionRoot);
