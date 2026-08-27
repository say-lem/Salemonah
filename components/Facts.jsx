"use client";

import { useEffect, useRef, useState } from "react";
import { useFactsStore, facts } from "@/store/useFactsStore";
import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE } from "@/lib/styles";

const FACT_DURATION = 25000; // 25s — matches the copy in the section itself

export default function Facts() {
  const { index, init, next } = useFactsStore();
  const [displayText, setDisplayText] = useState(facts[0]);
  const [fade, setFade] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  // Pick a random starting fact client-side only (see store comment).
  useEffect(() => {
    init();
  }, [init]);

  // Fade the text out/in whenever the store's index changes.
  useEffect(() => {
    setFade(false);
    const t = setTimeout(() => {
      setDisplayText(facts[index]);
      setFade(true);
    }, 200);
    return () => clearTimeout(t);
  }, [index]);

  // Progress bar runs on rAF locally — too high-frequency to belong in the
  // shared store, it's pure presentation tied to this component's lifetime.
  useEffect(() => {
    const start = performance.now();
    function step(now) {
      const pct = Math.min(((now - start) / FACT_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index]);

  // Advance to the next fact on a fixed interval.
  useEffect(() => {
    const id = setInterval(next, FACT_DURATION);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="facts" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>did you know</div>
        <h2 className={SECTION_TITLE}>Algorithm trivia, on a timer</h2>
        <div className="relative bg-surface border border-line rounded-xl overflow-hidden py-[30px] px-7">
          <div className="font-mono text-[11px] text-teal tracking-[1px] mb-3.5">
            REFRESHES AUTOMATICALLY
          </div>
          <div
            className="font-display text-[1.15rem] leading-[1.5] min-h-[3.4em]"
            style={{ opacity: fade ? 1 : 0, transition: "opacity .4s ease" }}
          >
            {displayText}
          </div>
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gold"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Reveal>
    </section>
  );
}
