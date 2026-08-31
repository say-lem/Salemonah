import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE } from "@/lib/styles";

const PROJECTS = [
  {
    tag: "Full-stack",
    name: "NativeMed Ed",
    desc: "A medical education platform that allows users come and subscribe for courses and mockcases in preparation for thier meical examination. Built with NextJs, NodeJs and typescript ",
    stack: ["Next.js", "postgress", "Stripe", "Expressjs", "Typescript" ],
    link: "https://native-med.vercel.app",
    // code: "#",
  },
  {
    tag: "Web app",
    name: "LuminEvents",
    desc: "A real-time Event Ticketing apllication, for event Management and ticket sales. ",
    stack: ["Nextjs", "Typescript "],
    link: "https://luminevent.com",
    code: "#",
  },
  {
    tag: "Full-stack",
    name: "Ventree",
    desc: "A platform to allow SMEs to be able to manage thier inventory and sales digitally with support for multiple profiles for those working for them so as to track each sale and who made it with oversight from the admin/business owner",
    stack: ["ExpressJs", "MongoDB", "React", "Typescript" ],
    link: "https://ventree.app/",
    code: "#",
  },
  {
    tag: "Frontend",
    name: "SafeGeeg",
    desc: "A Gig economy platform, including the chat section, Task bidding section, allowing users post any task they need done and people in the community who have put up thier verified credentials can bid on the task, get it done and get paid while the funds are held in an escrow account till the task is completed ",
    stack: ["TypeScript", "React"],
    link: "https://www.safegeeg.com",
    code: "#",
  },
];

function screenshotUrl(link) {
  const params = new URLSearchParams({
    url: link,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

export default function Projects() {
  return (
    <section id="work" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>selected work</div>
        <h2 className={SECTION_TITLE}>Projects</h2>
        <div className="grid grid-cols-2 gap-[18px] max-sm:grid-cols-1">
          {PROJECTS.map((p) => (
            <div
              className="bg-surface border border-line rounded-[10px] overflow-hidden transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-teal hover:shadow-[0_12px_30px_rgba(94,200,192,0.08)]"
              key={p.name}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center gap-1.5 h-9 px-3 bg-bg border-b border-line">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef5350]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f2c94c]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="flex-1 mx-3 text-center font-mono text-[10px] text-text-dim truncate bg-surface-2 border border-line rounded py-1 px-2">
                    {p.link.replace(/^https?:\/\//, "")}
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <img
                    src={screenshotUrl(p.link)}
                    alt={`${p.name} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </a>
              <div className="p-[22px]">
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
                  <a
                    className="text-gold hover:underline"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    live →
                  </a>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
