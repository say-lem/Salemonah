"use client";

import { useEffect, useState } from "react";

const LINKS = ["about", "work", "experience", "play", "facts", "contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LINKS[0]);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(18,20,26,0.82)] backdrop-blur-[10px] border-b border-line">
      <div className="max-w-[880px] mx-auto py-4 px-7 flex items-center justify-between">
        <div className="font-mono text-[14px] text-gold tracking-[0.5px]">
          {" "}
          {"< Salem Onah />"}
        </div>
        <button
          className="hidden max-sm:block bg-transparent border border-line text-text font-mono text-[13px] py-1.5 px-2.5 rounded cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          menu
        </button>
        <ul
          className={`flex gap-[22px] list-none max-sm:fixed max-sm:top-[53px] max-sm:right-0 max-sm:left-0 max-sm:flex-col max-sm:gap-0 max-sm:bg-surface max-sm:border-b max-sm:border-line max-sm:overflow-hidden max-sm:transition-[max-height] max-sm:duration-300 ${
            open ? "max-sm:max-h-[300px]" : "max-sm:max-h-0"
          }`}
        >
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className={`font-mono text-[13px] text-text-dim py-1.5 px-3.5 rounded-full border border-transparent transition-colors duration-200 hover:text-text max-sm:py-3.5 max-sm:px-7 max-sm:border-t max-sm:border-line max-sm:rounded-none max-sm:block ${
                  active === link
                    ? "text-text bg-white/[7%] border-white/[14%] backdrop-blur max-sm:border-l-0 max-sm:border-r-0 max-sm:rounded-none"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
