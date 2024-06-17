import { animateWithGsapTimeline } from "../utils/animations.js";
import { iphoneModels, iphoneSizes } from "../utils/iphoneInfo.js";
import { yellowImg } from "../utils/utils.js";
import IphoneView from "./IphoneView.jsx";
import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Iphone() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera control for the iphone view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }
    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="c-padding">
      <div className="c-screen-max-width">
        <h1 id="heading" className="c-section-title">
          Take a Closer Look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <IphoneView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <IphoneView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full sticky bottom-0">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="c-flex-center">
              <ul className="c-color-container">
                {iphoneModels.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                      style={{
                        backgroundColor: item.color[0],
                        borderColor:
                          model.title === item.title ? "white" : "transparent",
                        borderWidth: model.title === item.title ? "2px" : "0px",
                        borderStyle: "solid",
                      }}
                      onClick={() => setModel(item)}
                    />
                  );
                })}
              </ul>
              <button className="c-size-btn-container">
                {iphoneSizes.map(({ label, value }) => {
                  return (
                    <span
                      key={label}
                      className="c-size-btn"
                      style={{
                        backgroundColor:
                          size === value ? "white" : "transparent",
                        color: size === value ? "black" : "white",
                      }}
                      onClick={() => setSize(value)}
                    >
                      {label}
                    </span>
                  );
                })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Iphone;
