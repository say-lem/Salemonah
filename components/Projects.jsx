import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE } from "@/lib/styles";

const PROJECTS = [
  {
    tag: "Full-stack",
    name: "Project Name One",
    desc: "One or two sentences on the problem this solved and why it mattered. Keep it concrete — what did it actually do.",
    stack: ["Next.js", "MongoDB", "Stripe"],
  },
  {
    tag: "Web app",
    name: "Project Name Two",
    desc: "What it does, who it's for, and the one technical decision you're proudest of on this build.",
    stack: ["React", "Node", "Postgres"],
  },
  {
    tag: "Side project",
    name: "Project Name Three",
    desc: "A scrappier one — the kind you built because it bugged you that the thing didn't already exist.",
    stack: ["Next.js", "MongoDB"],
  },
  {
    tag: "Tool",
    name: "Project Name Four",
    desc: "Something you built for yourself or your team that ended up being genuinely useful.",
    stack: ["TypeScript", "API"],
  },
];

export default function Projects() {
  return (
    <section id="work" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>selected work</div>
        <h2 className={SECTION_TITLE}>Projects — replace with the real ones</h2>
        <div className="grid grid-cols-2 gap-[18px] max-sm:grid-cols-1">
          {PROJECTS.map((p) => (
            <div
              className="relative bg-surface border border-line rounded-[10px] p-[22px] transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-teal hover:shadow-[0_12px_30px_rgba(94,200,192,0.08)]"
              key={p.name}
            >
              <span className="absolute top-4 right-4 font-mono text-[9.5px] text-[#7a8090] border border-dashed border-line py-0.5 px-1.5 rounded">
                EDIT ME
              </span>
              <div className="font-mono text-[11px] text-teal tracking-[0.5px] uppercase">
                {p.tag}
              </div>
              <h3 className="font-display text-[1.2rem] mt-2.5 mb-2">
                {p.name}
              </h3>
              <p className="text-text-dim text-[0.92rem] mb-3.5">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {p.stack.map((s) => (
                  <span
                    className="font-mono text-[10.5px] text-text-dim bg-surface-2 border border-line py-[3px] px-2 rounded-[5px]"
                    key={s}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 font-mono text-[12px]">
                <a className="text-gold hover:underline" href="#">
                  live →
                </a>
                <a className="text-gold hover:underline" href="#">
                  code →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
