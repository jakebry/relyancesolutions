"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useCapability } from "@/components/ui/CapabilityProvider";

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fractal-noise gradient with subtle drift — used as the hero backdrop
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  // Simplex-ish noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    // 3 octaves is plenty for a slow-drift background — 5 was crushing the GPU
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.2;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.06;

    // Single warp layer (was two) — still looks organic, half the noise samples
    vec2 q = vec2(
      fbm(p + vec2(t, 0.0)),
      fbm(p + vec2(0.0, t * 1.2))
    );
    float f = fbm(p + 1.6 * q);

    // Palette stops — matches site tokens
    vec3 voidC    = vec3(0.019, 0.027, 0.055);   // #05070E
    vec3 surface  = vec3(0.043, 0.071, 0.125);   // #0B1220
    vec3 blueDeep = vec3(0.176, 0.423, 1.0);     // #2D6CFF
    vec3 cyanGlow = vec3(0.31, 0.764, 1.0);      // #4FC3FF

    vec3 col = mix(voidC, surface, smoothstep(-1.0, 1.0, f));
    col = mix(col, blueDeep, smoothstep(0.1, 0.9, length(q)) * 0.55);
    col = mix(col, cyanGlow, smoothstep(0.55, 0.95, f) * 0.4);

    // Subtle vignette
    float vig = smoothstep(1.1, 0.3, length(uv - 0.5));
    col *= mix(0.55, 1.0, vig);

    // Mouse-following soft highlight
    float md = distance(uv, uMouse);
    col += cyanGlow * 0.12 * smoothstep(0.4, 0.0, md);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1920,
          typeof window !== "undefined" ? window.innerHeight : 1080
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const target = state.pointer;
    mouse.current.x += ((target.x + 1) / 2 - mouse.current.x) * 0.05;
    mouse.current.y += ((target.y + 1) / 2 - mouse.current.y) * 0.05;
    matRef.current.uniforms.uMouse.value.copy(mouse.current);
    const { width, height } = state.size;
    matRef.current.uniforms.uResolution.value.set(width, height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 70% 30%, rgba(79,195,255,0.22), transparent 55%), " +
          "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(45,108,255,0.25), transparent 50%), " +
          "linear-gradient(180deg, #05070e 0%, #0b1220 55%, #05070e 100%)",
      }}
    />
  );
}

export function HeroShader() {
  const { capable, ready } = useCapability();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Until capability is determined, render the cheap gradient. If we turn out
  // to be capable, the Canvas mounts on the second frame — a small tradeoff
  // for never shipping Three.js to a low-end device.
  if (!ready || !capable) {
    return (
      <div ref={wrapRef} className="absolute inset-0">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        className="!absolute inset-0"
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 1], near: 0.01, far: 10 }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
