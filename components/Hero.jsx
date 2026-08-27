"use client";

import { useEffect, useState } from "react";
import { TAGS } from "@/data/tags";

const PHRASES = [
  "Salem Onah.",
  "Problem Solver.",
  "Fullstack Engineer.",
  "Systems Engineer.",
  "Software Engineer.",
];

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1400;
const PAUSE_TIME = 350;

export default function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setTyped(PHRASES[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let id;

    const tick = () => {
      const current = PHRASES[phraseIndex];
      let delay = deleting ? DELETE_SPEED : TYPE_SPEED;

      if (!deleting) {
        charIndex++;
        setTyped(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          delay = HOLD_TIME;
        }
      } else {
        charIndex--;
        setTyped(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          delay = PAUSE_TIME;
        }
      }

      id = setTimeout(tick, delay);
    };

    id = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-[60px] border-t-0">
      <div className="bg-surface border border-line rounded-[10px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 py-[11px] px-4 border-b border-line bg-surface-2">
          <span className="w-[10px] h-[10px] rounded-full bg-[#e0645a]"></span>
          <span className="w-[10px] h-[10px] rounded-full bg-[#e0b94e]"></span>
          <span className="w-[10px] h-[10px] rounded-full bg-[#5cbd6b]"></span>
          <span className="ml-2 font-mono text-[12px] text-text-dim">
            zsh — salem — 80x24
          </span>
        </div>
        <div className="pt-7 px-[26px] pb-[34px] font-mono">
          <div className="text-teal text-[14px] mb-1.5">
            <span className="text-gold">➜</span> ~ whoami
          </div>
          <div className="font-display font-bold text-[clamp(2.4rem,7vw,4.2rem)] leading-[1.05] mt-1.5 mb-3.5 min-h-[1.1em]">
            {typed}
            <span className="inline-block w-[3px] h-[0.9em] bg-gold ml-1 align-text-bottom animate-blink motion-reduce:animate-none motion-reduce:opacity-100"></span>
          </div>
          <p className="font-body text-text-dim text-[1.05rem] max-w-[56ch] mb-[22px]">
            I'm a Software Engineer specializing in scalable systems, distributed platforms, and a keen interest in payment infrastructure. Passionate about designing reliable, high-performance software that solves real-world problems and scales with growing businesses.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {TAGS.map((tag) => (
              <span
                className="font-mono text-[12px] text-text-dim border border-line py-[5px] px-2.5 rounded-[20px]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[34px] font-mono text-[12px] text-text-dim flex items-center gap-2 before:content-['↓'] before:text-gold before:animate-floaty motion-reduce:before:animate-none">
        scroll — there&apos;s a game further down
      </div>
    </section>
  );
}
