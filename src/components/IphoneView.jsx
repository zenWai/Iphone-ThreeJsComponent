import IphoneScene from "./IphoneScene";
import Lights from "./Lights.jsx";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function IphoneView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.2} />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.9}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <Suspense
          fallback={
            <Html>
              <div>Loading...</div>
            </Html>
          }
        >
          <IphoneScene
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default IphoneView;
