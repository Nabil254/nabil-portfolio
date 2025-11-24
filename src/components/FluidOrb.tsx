'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float distortion =
      sin(pos.x * 4.0 + uTime * 0.6) * uDistort +
      sin(pos.y * 5.0 + uTime * 0.8) * uDistort +
      sin(pos.z * 6.0 + uTime * 0.4) * uDistort;
    pos += normal * distortion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    float vignette = smoothstep(0.8, 0.1, length(vUv - 0.5));
    vec3 deepBlue = vec3(0.05, 0.15, 0.45);
    vec3 aqua = vec3(0.14, 0.77, 1.0);
    vec3 color = mix(deepBlue, aqua, vUv.y);
    gl_FragColor = vec4(color * vignette, 0.92);
  }
`;

export default function FluidOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 10;

    const geometry = new THREE.SphereGeometry(2.1, 160, 160);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uDistort: { value: 0.2 },
      },
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const glowGeometry = new THREE.SphereGeometry(2.7, 96, 96);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3b82f6"),
      transparent: true,
      opacity: 0.08,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    let animationFrame: number;
    const clock = new THREE.Clock();
    const targetRotation = new THREE.Vector2(0, 0);
    const rotation = new THREE.Vector2(0, 0);
    let isPointerActive = false;
    let isDragging = false;
    let lastPointer: { x: number; y: number } | null = null;
    let hasUserDragged = false;

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect) return;
      if (!isDragging || !lastPointer) return;
      const deltaX = (event.clientX - lastPointer.x) / rect.width;
      const deltaY = (event.clientY - lastPointer.y) / rect.height;
      targetRotation.y += deltaX * 5;
      targetRotation.x += deltaY * 5;
      lastPointer = { x: event.clientX, y: event.clientY };
      isPointerActive = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      hasUserDragged = true;
      lastPointer = { x: event.clientX, y: event.clientY };
      container.setPointerCapture(event.pointerId);
      isPointerActive = true;
    };

    const onPointerUp = (event: PointerEvent) => {
      isDragging = false;
      lastPointer = null;
      container.releasePointerCapture(event.pointerId);
      targetRotation.copy(rotation);
      isPointerActive = false;
    };

    const onPointerLeave = () => {
      targetRotation.copy(rotation);
      isPointerActive = false;
      isDragging = false;
      lastPointer = null;
    };

    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const pulse = 0.26 + Math.sin(elapsed * 1.4) * 0.12;
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uDistort.value = isPointerActive ? pulse + 0.08 : pulse;

      const idleRotation = {
        x: Math.sin(elapsed * 0.35) * 0.35,
        y: Math.cos(elapsed * 0.3) * 0.35,
      };

      const shouldIdle = !isPointerActive && !hasUserDragged;
      const targetX = shouldIdle ? idleRotation.x : targetRotation.x;
      const targetY = shouldIdle ? idleRotation.y : targetRotation.y;
      const lerpFactor = isPointerActive ? 0.14 : shouldIdle ? 0.04 : 0.02;

      rotation.x += (targetX - rotation.x) * lerpFactor;
      rotation.y += (targetY - rotation.y) * lerpFactor;
      orb.rotation.set(rotation.x, rotation.y, 0);
      glow.rotation.copy(orb.rotation);

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    container.appendChild(renderer.domElement);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      glowGeometry.dispose();
      material.dispose();
      glowMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}

