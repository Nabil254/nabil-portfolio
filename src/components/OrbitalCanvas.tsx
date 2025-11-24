'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;
const THEME_EVENT = "themechange";

const getCssVariable = (variable: string, fallback: string) => {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
};

const getParticleColor = () => getCssVariable("--orbital-particle", "#60a5fa");
const getBackgroundColor = () => getCssVariable("--orbital-bg", "rgba(248, 250, 252, 0.85)");

export default function OrbitalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const getParticleBudget = () => {
      if (typeof window === "undefined") return PARTICLE_COUNT;
      if (window.innerWidth < 640) return 500;
      if (window.innerWidth < 1024) return 900;
      return PARTICLE_COUNT;
    };

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const initialBackground = getBackgroundColor();
    renderer.domElement.style.background = initialBackground;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 60;

    const particleCount = getParticleBudget();
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = 0.0008 + Math.random() * 0.0018;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.6,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color(getParticleColor()),
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrame: number;
    const pointer = new THREE.Vector3(0, 0, 0);
    let pointerActive = false;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const applyPointerForce = (positionAttribute: THREE.BufferAttribute, index: number) => {
      if (!pointerActive) return;
      const px = positionAttribute.getX(index);
      const py = positionAttribute.getY(index);
      const pz = positionAttribute.getZ(index);
      const particle = new THREE.Vector3(px, py, pz);
      const distance = particle.distanceTo(pointer);
      if (distance < 4) {
        const force = particle.sub(pointer).normalize().multiplyScalar((4 - distance) * 0.3);
        positionAttribute.setXYZ(index, px + force.x, py + force.y, pz + force.z);
      }
    };

    const animate = () => {
      const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const x = positionAttribute.getX(i);
        const z = positionAttribute.getZ(i);
        const radius = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x) + speeds[i];
        positionAttribute.setX(i, Math.cos(angle) * radius);
        positionAttribute.setZ(i, Math.sin(angle) * radius);
        applyPointerForce(positionAttribute, i);
      }
      positionAttribute.needsUpdate = true;

      points.rotation.y += 0.0005;
      points.rotation.x += 0.00012;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const applyThemeColors = () => {
      material.color.set(getParticleColor());
      renderer.domElement.style.background = getBackgroundColor();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x * 20, y * 12, 0);
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    animate();
    applyThemeColors();
    container.appendChild(renderer.domElement);
    window.addEventListener("resize", onResize);
    window.addEventListener(THEME_EVENT, applyThemeColors);
    if (isFinePointer) {
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(THEME_EVENT, applyThemeColors);
      if (isFinePointer) {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-80" />;
}

