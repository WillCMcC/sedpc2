import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useState, cloneElement, useEffect } from "react";
export const Will = () => {
  const { scene, animations } = useGLTF("/2_LOW_HELMET.glb");
  // const [flicker, setFlicker] = useState(0.5);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFlicker(Math.random());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  const animation = useAnimations(animations, scene);
  const { actions } = animation;
  useEffect(() => {
    animate();
  });

  const animate = async () => {
    const loop = actions["CHAR"];
    // loop.setDuration(3);

    loop.play();
  };

  return (
    <>
      <directionalLight
        position={[0, -2, 1]}
        intensity={0.8}
        castShadow={true}
      />
      <directionalLight
        position={[2, 0, 2]}
        intensity={0.3}
        castShadow={true}
        color={"purple"}
      />
      <directionalLight
        position={[-2, 0, 2]}
        intensity={0.1}
        castShadow={true}
        color={"orange"}
      />
      <primitive scale={1} position={[1.8, 1.1, -0.9]} object={scene} />
    </>
  );
};
useGLTF.preload("/2_LOW_HELMET.glb");
