import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE } from "@/lib/styles";

const ITEMS = [
  {
    date: "2025 — present",
    company: "Tenece Professional services",
    role: "Role Title @ Company Name",
    desc: "One or two lines on scope and impact. Numbers help — users, performance, revenue, whatever's true.",
  },
  {
    date: "May 24 - January 25",
    company: "Hordanso LLC",
    role: "Contract Frontend developer",
    desc: "What you owned, what shipped, what you learned the hard way.",
  },
  {
    date: "Sept 2019 — Jan 2020",
    company: "Tenece Professional services",
    role: "front-end Intern",
    desc: ".",
  },
  {
    date: "2017 — 2022",
    company: " University of Nigeria",
    role: "Bachelor of Science in Computer Science",
    desc: "What you owned, what shipped, what you learned the hard way.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>experience</div>
        <h2 className={SECTION_TITLE}>
          Where the work has happened 
        </h2>
        <div className="relative pl-[26px] before:content-[''] before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-line">
          {ITEMS.map((item) => (
            <div
              className="relative pb-[34px] last:pb-0 before:content-[''] before:absolute before:-left-[26px] before:top-1 before:w-[11px] before:h-[11px] before:rounded-full before:bg-bg before:border-2 before:border-gold"
              key={item.role + item.date}
            >
              
              <div className="font-mono text-[12px] text-teal">
                {item.date}
              </div>
              <div className="font-mono text-[14px] text-text-dim ">
                {item.company}
              </div>
              <div className="font-display text-[1.1rem] my-1.5">
                {item.role}
              </div>
              <div className="text-text-dim text-[0.92rem]">{item.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
