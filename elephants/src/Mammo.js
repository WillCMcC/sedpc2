/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useState, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, Float, MeshWobbleMaterial } from "@react-three/drei";
import {
  LayerMaterial,
  Color,
  Depth,
  Fresnel,
  Noise,
  Gradient,
} from "lamina/vanilla";
import { Text3D } from "@react-three/drei";

const colorA = new THREE.Color("#2032A5").convertSRGBToLinear();
const colorB = new THREE.Color("#0F1C4D").convertSRGBToLinear();
const fresnel = new THREE.Color("#E7B473").convertSRGBToLinear();
const material = new LayerMaterial({
  layers: [
    new Color({ color: colorA }),
    new Depth({
      colorA: colorA,
      colorB: colorB,
      alpha: 0.5,
      mode: "normal",
      near: 0,
      far: 2,
      origin: [1, 1, 1],
    }),
    new Depth({
      colorA: "purple",
      colorB: colorB,
      alpha: 0.5,
      mode: "add",
      near: 3,
      far: 2,
      origin: [1, 1, 1],
    }),
    new Fresnel({
      mode: "add",
      color: fresnel,
      intensity: 0.3,
      power: 2.5,
      bias: 0.0,
    }),
    new Noise({
      mapping: "local",
      type: "simplex",
      scale: 1000,
      colorA: "#ffaf40",
      colorB: "black",
      mode: "overlay",
    }),
  ],
});

function Mammoth() {
  const { nodes } = useGLTF("/mammo.glb");
  const [geometry] = useState(() => nodes[`mesh_0`].geometry);
  const [speed] = useState(() => 0.1 + Math.random() / 10);
  const geoRef = useRef();

  return (
    <>
      <Float
        speed={speed}
        position={[0, 1, 0]}
        rotationIntensity={25}
        floatIntensity={20}
        dispose={null}
      >
        <mesh scale={1} ref={geoRef} geometry={geometry} material={material} />
      </Float>
      <Text3D position={[-3, 0, 0]} scale={0.1} font={"roboto.json"}>
        {" "}
        Loading....{" "}
      </Text3D>
    </>
  );
}

export default function Mammoths() {
  return Array.from({ length: 1 }, (_, i) => <Mammoth key={i} />);
}

useGLTF.preload("/mammo.glb");
