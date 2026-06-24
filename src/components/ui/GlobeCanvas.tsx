"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

export interface GlobeMarker {
  id: string;
  location: [number, number];
  label?: string;
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

interface GlobeCanvasProps {
  markers: GlobeMarker[];
  arcs: GlobeArc[];
  activeMarkerId?: string;
  className?: string;
  speed?: number;
}

const EMERALD: [number, number, number] = [0.0863, 0.5608, 0.3647];
const GOLD: [number, number, number] = [0.6784, 0.902, 0.6471];
const NAVY: [number, number, number] = [0.0588, 0.1412, 0.1882];
const SLATE: [number, number, number] = [0.2431, 0.3451, 0.4078];

export function GlobeCanvas({
  markers,
  arcs,
  activeMarkerId,
  className = "",
  speed = 0.003,
}: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  const buildMarkers = useCallback(
    () =>
      markers.map((m) => ({
        location: m.location,
        size: m.id === activeMarkerId ? 0.07 : 0.045,
        color: m.id === activeMarkerId ? GOLD : EMERALD,
        id: m.id,
      })),
    [markers, activeMarkerId]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let animationId: number;
    let phi = 0;
    let ro: ResizeObserver | null = null;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globeRef.current) return;

      const globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: NAVY,
        markerColor: EMERALD,
        glowColor: SLATE,
        markerElevation: 0.02,
        markers: buildMarkers(),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: EMERALD,
        arcWidth: 1,
        arcHeight: 0.3,
        opacity: 0.85,
      });
      globeRef.current = globe;

      function animate() {
        if (!isPausedRef.current) phi += speed;
        const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
        const currentTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta;
        phiRef.current = currentPhi;
        thetaRef.current = currentTheta;
        globe.update({ phi: currentPhi, theta: currentTheta });
        // update label positions each frame
        updateLabelPositions(currentPhi, currentTheta, width);
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro?.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      ro?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      globeRef.current?.destroy();
      globeRef.current = null;
    };
    // arcs/speed are treated as stable for the lifetime of the globe instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    globeRef.current?.update({ markers: buildMarkers() });
  }, [buildMarkers]);

  // Project lat/lon to 2D orthographic coords and position HTML labels
  const updateLabelPositions = (cameraLon: number, cameraLat: number, width: number) => {
    const container = wrapperRef.current;
    const R = width / 2;
    if (!container) return;

    markers.forEach((m) => {
      const el = container.querySelector<HTMLDivElement>(`[data-marker-id=\"${m.id}\"]`);
      if (!el) return;
      const [latDeg, lonDeg] = m.location;
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180;

      const phi0 = cameraLat; // camera latitude (theta)
      const lambda0 = cameraLon; // camera longitude (phi)

      const cosc = Math.sin(lat) * Math.sin(phi0) + Math.cos(lat) * Math.cos(phi0) * Math.cos(lon - lambda0);
      const visible = cosc > 0;

      const x = Math.cos(lat) * Math.sin(lon - lambda0);
      const y = Math.sin(lat) * Math.cos(phi0) - Math.cos(lat) * Math.cos(lon - lambda0) * Math.sin(phi0);

      const projX = R + x * R;
      const projY = R - y * R; // flip y

      // position the label (account for container offset)
      const rect = container.getBoundingClientRect();

      el.style.transform = `translate(${projX - 40}px, ${projY - 12}px)`; // offset to center label
      el.style.opacity = visible ? "1" : "0";
      el.style.pointerEvents = visible ? "auto" : "none";
    });
  };

  return (
    <div ref={wrapperRef} className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />

      {/* HTML labels overlayed on top of canvas; positioned in updateLabelPositions */}
      <div className="absolute inset-0 pointer-events-none">
        {markers.map((m) => (
          <div
            key={m.id}
            data-marker-id={m.id}
            className={`absolute w-32 transition-all duration-150 pointer-events-auto select-none`}
            style={{
              transform: "translate(-9999px,-9999px)",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <div className="px-2 py-1 rounded-md bg-white/10 text-xs text-white font-semibold border border-white/5 shadow-sm">
              {m.label ?? m.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
