"use client";

import React from "react";

type AsciiFrames = string[][];
type CatMode = "run" | "rest1" | "rest2";

const computeBounds = (frames: AsciiFrames) => {
  let minTop = Number.POSITIVE_INFINITY;
  let minLeft = Number.POSITIVE_INFINITY;
  let maxBottom = -1;
  let maxRight = -1;

  frames.forEach((frame) => {
    frame.forEach((line, y) => {
      for (let x = 0; x < line.length; x += 1) {
        if (line[x] !== " ") {
          if (y < minTop) minTop = y;
          if (x < minLeft) minLeft = x;
          if (y > maxBottom) maxBottom = y;
          if (x > maxRight) maxRight = x;
        }
      }
    });
  });

  if (maxRight === -1 || maxBottom === -1) {
    return { minTop: 0, minLeft: 0, maxBottom: 0, maxRight: 0 };
  }

  return { minTop, minLeft, maxBottom, maxRight };
};

const cropAndPad = (frames: AsciiFrames, bounds: ReturnType<typeof computeBounds>) => {
  const { minTop, minLeft, maxBottom, maxRight } = bounds;
  const width = Math.max(1, maxRight - minLeft + 1);
  const height = Math.max(1, maxBottom - minTop + 1);

  return frames.map((frame) => {
    const result: string[] = [];
    for (let y = minTop; y <= maxBottom; y += 1) {
      const line = frame[y] ?? "";
      const slice = line.slice(minLeft, maxRight + 1);
      result.push(slice.padEnd(width, " "));
    }
    while (result.length < height) result.push(" ".repeat(width));
    return result;
  });
};

export default function AsciiCat() {
  const [runFrames, setRunFrames] = React.useState<AsciiFrames | null>(null);
  const [rest1Frames, setRest1Frames] = React.useState<AsciiFrames | null>(null);
  const [rest2Frames, setRest2Frames] = React.useState<AsciiFrames | null>(null);
  const [frameIndex, setFrameIndex] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const [active, setActive] = React.useState(true);
  const [mode, setMode] = React.useState<CatMode>("run");
  const modeRef = React.useRef<CatMode>("run");
  const targetRef = React.useRef({ x: 80, y: 140 });
  const currentRef = React.useRef({ x: 80, y: 140 });
  const sizeRef = React.useRef({ w: 80, h: 40 });
  const lastMoveRef = React.useRef<number>(Date.now());
  const lastPointerRef = React.useRef<{ x: number; y: number } | null>(null);
  const idleRest1Ms = 0;
  const idleRest2Ms = 5000;
  const maxSpeed = 6;
  const reachThreshold = 10;
  const restOnReachDelayMs = 500;

  React.useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/cat-animation/ascii-frames.json").then((res) => res.json()),
      fetch("/cat-animation/cat-rest1.json").then((res) => res.json()),
      fetch("/cat-animation/cat-rest2.json").then((res) => res.json()),
    ])
      .then(([run, rest1, rest2]) => {
        if (!mounted) return;
        const runFramesRaw = Array.isArray(run) ? (run as AsciiFrames) : [];
        const rest1FramesRaw = Array.isArray(rest1) ? (rest1 as AsciiFrames) : [];
        const rest2FramesRaw = Array.isArray(rest2) ? (rest2 as AsciiFrames) : [];

        const allFrames = [...runFramesRaw, ...rest1FramesRaw, ...rest2FramesRaw];
        const bounds = computeBounds(allFrames);

        setRunFrames(cropAndPad(runFramesRaw, bounds));
        setRest1Frames(cropAndPad(rest1FramesRaw, bounds));
        setRest2Frames(cropAndPad(rest2FramesRaw, bounds));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    const frames =
      mode === "rest2" ? rest2Frames : mode === "rest1" ? rest1Frames : runFrames;
    if (!frames || frames.length === 0) return;
    const id = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 70);
    return () => window.clearInterval(id);
  }, [mode, runFrames, rest1Frames, rest2Frames]);

  React.useEffect(() => {
    const frames =
      mode === "rest2" ? rest2Frames : mode === "rest1" ? rest1Frames : runFrames;
    if (!frames || frames.length === 0) return;
    const measure = () => {
      if (!preRef.current) return;
      const rect = preRef.current.getBoundingClientRect();
      sizeRef.current = { w: rect.width || 80, h: rect.height || 40 };
    };
    const id = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [runFrames, rest1Frames, rest2Frames, mode, frameIndex]);

  React.useEffect(() => {
    const clampToViewport = (px: number, py: number) => {
      const minX = window.scrollX + 20;
      const maxX = window.scrollX + window.innerWidth - 20;
      const minY = window.scrollY + 20;
      const maxY = window.scrollY + window.innerHeight - 20;
      return {
        x: Math.min(maxX, Math.max(minX, px)),
        y: Math.min(maxY, Math.max(minY, py)),
      };
    };

    const setTargetFromClient = (clientX: number, clientY: number) => {
      const pageX = clientX + window.scrollX;
      const pageY = clientY + window.scrollY;
      const { x, y } = clampToViewport(pageX, pageY);
      const hovered = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      const avoidEl = hovered?.closest("#personal-card") as HTMLElement | null;

      if (avoidEl) {
        const rect = avoidEl.getBoundingClientRect();
        const hit = {
          left: rect.left + window.scrollX,
          right: rect.right + window.scrollX,
          top: rect.top + window.scrollY,
        };
        setActive(false);
        const margin = 12;
        const nx = Math.min(hit.right - margin, Math.max(hit.left + margin, x));
        const ny = hit.top - margin;
        targetRef.current = clampToViewport(nx, ny);
      } else {
        setActive(true);
        targetRef.current = { x, y };
      }
    };

    const onMove = (event: MouseEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setTargetFromClient(event.clientX, event.clientY);
      lastMoveRef.current = Date.now();
      if (modeRef.current !== "run") {
        modeRef.current = "run";
        setMode("run");
        setFrameIndex(0);
      }
    };

    const onScroll = () => {
      if (!lastPointerRef.current) return;
      setTargetFromClient(lastPointerRef.current.x, lastPointerRef.current.y);
      lastMoveRef.current = Date.now();
      if (modeRef.current !== "run") {
        modeRef.current = "run";
        setMode("run");
        setFrameIndex(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (wrapRef.current) {
        const { x: tx, y: ty } = targetRef.current;
        const current = currentRef.current;
        const dx = tx - current.x;
        const dy = ty - current.y;
        const dist = Math.hypot(dx, dy);
        if (modeRef.current !== "rest2") {
          if (dist > maxSpeed) {
            current.x += (dx / dist) * maxSpeed;
            current.y += (dy / dist) * maxSpeed;
          } else {
            current.x = tx;
            current.y = ty;
          }
          if (Math.abs(dx) > 2 && wrapRef.current) {
            wrapRef.current.style.setProperty("--cat-flip", dx < 0 ? "-1" : "1");
          }
        } else {
          // Lock position during deep rest
          targetRef.current = { x: current.x, y: current.y };
        }
        const { w, h } = sizeRef.current;
        const halfW = Math.max(20, w / 2);
        const halfH = Math.max(20, h / 2);
        const minX = window.scrollX + halfW;
        const maxX = window.scrollX + window.innerWidth - halfW;
        const minY = window.scrollY + halfH;
        const maxY = window.scrollY + window.innerHeight - halfH;
        const clampedX = Math.min(maxX, Math.max(minX, current.x));
        const clampedY = Math.min(maxY, Math.max(minY, current.y));
        wrapRef.current.style.setProperty("--cat-x", `${clampedX}px`);
        wrapRef.current.style.setProperty("--cat-y", `${clampedY}px`);
      }
      const idleMs = Date.now() - lastMoveRef.current;
      const distanceToTarget = Math.hypot(
        targetRef.current.x - currentRef.current.x,
        targetRef.current.y - currentRef.current.y
      );
      const reached = distanceToTarget <= reachThreshold;
      const reachedLongEnough = reached && idleMs >= restOnReachDelayMs;
      const nextMode: CatMode =
        idleMs >= idleRest2Ms ? "rest2" : reachedLongEnough ? "rest1" : "run";
      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setMode(nextMode);
        setFrameIndex(0);
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const frames =
    mode === "rest2" ? rest2Frames : mode === "rest1" ? rest1Frames : runFrames;
  if (!frames || frames.length === 0) return null;

  const frame = frames[frameIndex] ?? [];
  return (
    <div className={`cat-ascii-wrap ${active ? "cat-ascii-wrap--active" : ""}`} ref={wrapRef} aria-hidden="true">
      <pre className="cat-ascii" ref={preRef}>{frame.join("\n")}</pre>
    </div>
  );
}
