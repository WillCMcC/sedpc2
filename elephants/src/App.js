import * as THREE from "three";
import { Suspense, useState, cloneElement, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Text3D,
  OrbitControls,
  Cloud,
  FlyControls,
  FirstPersonControls,
  PresentationControls,
} from "@react-three/drei";
import { LayerMaterial, Depth, Noise } from "lamina";
import Mammos from "./Mammos";
import Mammo from "./Mammo";
import { Will } from "./Will";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

const HoverIcon = ({ icon, url }) => {
  const [active, setActive] = useState(false);
  const color = active ? "orange" : "black";
  return (
    <a
      href={url}
      onMouseEnter={() => {
        console.log("ok");
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      {cloneElement(icon, { color: color })}
    </a>
  );
};
export default function App() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "flex",
          zIndex: 1000,
          gap: 15,
        }}
      >
        <HoverIcon
          url={"https://www.github.com/willcmcc"}
          icon={<AiFillGithub size={15} />}
        />
        <HoverIcon
          url={"https://www.twitter.com/will_fotl"}
          icon={<AiFillTwitterCircle size={15} />}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          zIndex: 1000,
          gap: 15,
        }}
      >
        <span>will@squidmaps.com</span>
      </div>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 22 }}>
        <Rig />
        <Bg />
        <Suspense fallback={<Mammo />}>
          <Will />
          <Mammos />
          <Caption
            scale={0.7}
            x={-3.7}
            y={0.75}
            depth={-1}
          >{`Will McCambley`}</Caption>
          <Caption
            x={-3}
            y={-0.25}
            depth={1}
            scale={0.25}
          >{`Software Engineer`}</Caption>
          <Caption
            x={-3}
            y={-0.575}
            depth={1}
            scale={0.2}
          >{`Developing performant imaging solutions for the web`}</Caption>
          {/* <Rig /> */}
          <Cloud
            opacity={0.1}
            // color={"#E7B473"}
            speed={0.4} // Rotation speed
            width={1} // Width of the full cloud
            depth={0.1} // Z-dir depth
            segments={20} // Number of particles
            scale={0.15} // Size of the particles
            position={[1.75, 1.75, -0.75]} // Position of the cloud
          />
        </Suspense>

        {/* <ambientLight intensity={0.8} /> */}

        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <spotLight
          position={[-10, -10, -100]}
          angle={0.15}
          penumbra={1}
          color={"#bb78f0"}
        /> */}
        {/* <FirstPersonControls maxDistance={100} minDistance={1} /> */}
        <OrbitControls maxDistance={100} minDistance={1} makeDefault />
      </Canvas>
    </>
  );
}

function Caption({ children, depth, x, y, scale }) {
  const { width, height } = useThree((state) => state.viewport);
  return (
    <Text3D
      position={[x, y, depth]}
      scale={0.5}
      font={"roboto.json"}
      color="black"
      scale={scale}
    >
      {children}
      <meshNormalMaterial />
    </Text3D>
  );
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(-4, +3, 15), 0.005);
  });
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth
          colorB="#702963"
          colorA="black"
          alpha={1}
          mode="normal"
          near={130}
          far={200}
          origin={[100, 100, -100]}
        />
        {/* <Noise
          mapping="local"
          type="white"
          scale={1000}
          colorA="white"
          colorB="black"
          mode="subtract"
          alpha={0.2}
        /> */}
      </LayerMaterial>
    </mesh>
  );
}
