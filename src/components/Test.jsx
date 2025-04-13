import * as THREE from "three";
import { useRef, useState, useEffect, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Cube = ({ position, refProp, onPointerDown, onPointerUp, onPointerMove }) => {
  const rubiksColors = [
    new THREE.MeshStandardMaterial({ color: "white" }),
    new THREE.MeshStandardMaterial({ color: "yellow" }),
    new THREE.MeshStandardMaterial({ color: "blue" }),
    new THREE.MeshStandardMaterial({ color: "green" }),
    new THREE.MeshStandardMaterial({ color: "red" }),
    new THREE.MeshStandardMaterial({ color: "orange" }),
  ];

  return (
    <group
      ref={refProp}
      position={position}
      onPointerDown={(e) => onPointerDown(e, position)}
      onPointerMove={(e) => onPointerMove(e)}
      onPointerUp={onPointerUp}
    >
      <mesh material={[...rubiksColors]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.01, 1.01, 1.01)]} />
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>
    </group>
  );
};

const RubiksCube = () => {
  const [cubeRefs, setCubeRefs] = useState([]);
  const rotateStatus = useRef(false);
  const initialMousePos = useRef(null);
  const selectedLayer = useRef(null);
  const rotationAxis = useRef(null);

  useEffect(() => {
    const refs = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const ref = createRef();
          refs.push({ ref, position: [x, y, z] });
        }
      }
    }
    setCubeRefs(refs);
  }, []);

  const onPointerDown = (event, position) => {
    event.stopPropagation();
    initialMousePos.current = { x: event.clientX, y: event.clientY };
    selectedLayer.current = position;
  };

  const onPointerMove = (event) => {
    if (!initialMousePos.current) return;

    const deltaX = event.clientX - initialMousePos.current.x;
    const deltaY = event.clientY - initialMousePos.current.y;

    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return; // Ignore small movements

    const moveVector = new THREE.Vector3(deltaX, deltaY, 0).normalize();

    // Determine the rotation axis using cross product
    if (!rotationAxis.current) {
      rotationAxis.current = determineRotationAxis(moveVector, selectedLayer.current);
    }

    rotateLayer(rotationAxis.current, selectedLayer.current);
    initialMousePos.current = null;
  };

  const onPointerUp = () => {
    initialMousePos.current = null;
    selectedLayer.current = null;
    rotationAxis.current = null;
  };

  const determineRotationAxis = (moveVector, position) => {
    const mainAxes = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
    ];

    let bestAxis = mainAxes[0];
    let maxDot = -Infinity;

    for (let axis of mainAxes) {
      const dot = Math.abs(axis.dot(moveVector));
      if (dot > maxDot) {
        maxDot = dot;
        bestAxis = axis;
      }
    }

    return bestAxis;
  };

  const rotateLayer = (axis, position) => {
    if (rotateStatus.current) return;
    rotateStatus.current = true;

    let layerCubes = cubeRefs.filter(({ position: pos }) => {
      if (axis.x !== 0) return pos[0] === position[0];
      if (axis.y !== 0) return pos[1] === position[1];
      if (axis.z !== 0) return pos[2] === position[2];
    });

    layerCubes.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.rotateOnWorldAxis(axis, Math.PI / 2);
      }
    });

    rotateStatus.current = false;
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [4, 2, 9] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <OrbitControls />
        <group>
          {cubeRefs.map(({ ref, position }, index) => (
            <Cube
              key={index}
              position={position}
              refProp={ref}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default RubiksCube;
