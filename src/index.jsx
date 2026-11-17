import React from "react";
import {
  AbsoluteFill,
  Composition,
  useCurrentFrame,
  interpolate,
  registerRoot
} from "remotion";

const RickClipVideo = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const scale = interpolate(
    frame,
    [0, 60],
    [0.8, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#101014",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontSize: 65,
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        THE STORY BEGINS
      </div>
    </AbsoluteFill>
  );
};

const RemotionRoot = () => (
  <Composition
    id="RickClipVideo"
    component={RickClipVideo}
    durationInFrames={1800}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(RemotionRoot);
