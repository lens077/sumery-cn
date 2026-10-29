"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/urls";
import type * as ThreeNS from "three";

/**
 * Lucy 3D IP 模型（复用自 blog 仓库的 lucy-low.glb，vanilla three.js 实现）。
 * 仅在浏览器端动态加载；WebGL 不可用或加载失败时降级为静态占位，
 * 不影响页面文本与 CTA。prefers-reduced-motion 时停止自动旋转。
 */
export function LucyViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) {
          throw new Error("webgl-unavailable");
        }
        const THREE = await import("three");
        const { GLTFLoader } =
          await import("three/addons/loaders/GLTFLoader.js");
        const { OrbitControls } =
          await import("three/addons/controls/OrbitControls.js");
        const { RoomEnvironment } =
          await import("three/addons/environments/RoomEnvironment.js");
        const { MeshoptDecoder } =
          await import("three/addons/libs/meshopt_decoder.module.js");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        const scene = new THREE.Scene();
        scene.environment = new THREE.PMREMGenerator(renderer).fromScene(
          new RoomEnvironment(),
          0.04,
        ).texture;

        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(0, 0.2, 6);

        const gltf = await new Promise<{ scene: ThreeNS.Group }>(
          (resolve, reject) => {
            new GLTFLoader()
              .setMeshoptDecoder(MeshoptDecoder)
              .load(withBase("/models/lucy-low.glb"), resolve, undefined, reject);
          },
        );
        if (disposed) {
          renderer.dispose();
          return;
        }
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        model.scale.setScalar(4 / size);
        box.setFromObject(model);
        model.position.sub(box.getCenter(new THREE.Vector3()));
        scene.add(model);

        const controls = new OrbitControls(camera, canvas);
        controls.enablePan = false;
        controls.enableZoom = false;
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        controls.autoRotate = !reducedMotion;
        controls.autoRotateSpeed = 1.2;

        const resize = () => {
          const { width, height } = canvas.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener("resize", resize);

        let raf = 0;
        const tick = () => {
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();

        setState("ready");
        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", resize);
          controls.dispose();
          renderer.dispose();
        };
      } catch (err) {
        console.error("lucy-viewer init failed:", err);
        if (!disposed) setState("fallback");
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="relative h-full w-full" data-lucy-state={state}>
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        aria-label="希曼的三维角色模型，可拖拽旋转"
        role="img"
      />
      {state === "loading" && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-ink-500">
          正在载入模型…
        </p>
      )}
      {state === "fallback" && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle,#f5a25c99,transparent_70%)]" />
        </div>
      )}
    </div>
  );
}
