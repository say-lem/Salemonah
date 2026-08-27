import Image from "next/image";
import Reveal from "./Reveal";
import { TAGS } from "@/data/tags";
import { SECTION, EYEBROW, SECTION_TITLE, BTN } from "@/lib/styles";

const ROWS = [
  {
    key: "stack",
    value: `${TAGS.join(", ")}, plus whatever a project actually calls for.`,
  },
  {
    key: "currently",
    value:
      "Freelancing and open to work, upskilling and working across a couple of projects, building product, and helping other developers get better at building theirs by voulunterring as a mentor at Genesys Learnable Program.",
  },
  {
    key: "teaching",
    value:
      "Facilitates a software develpment course and reviews student submissions, which means reading a lot of code that almost works.",
  },
  {
    key: "off-screen",
    value: "Plays chess on chess.com, when I am not bulding I'm usually exploring new architectural patterns, experimenting with emerging technologies, or refining the engineering practices that help teams ship software with confidence .",
  },
];

export default function About() {
  return (
    <section id="about" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>about</div>
        <h2 className={SECTION_TITLE}>
          A little about the person behind the commits
        </h2>
        <div className="flex gap-10 items-start max-sm:flex-col">
          <div className="flex-[0_0_220px] flex flex-col gap-3.5 max-sm:flex-none max-sm:w-full max-sm:max-w-[260px] max-sm:mx-auto">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-line bg-surface-2">
              <Image
                src="/DSC_0611.JPG"
                alt="Salem Onah"
                fill
                sizes="(max-width: 640px) 60vw, 220px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <a
              className={`${BTN} w-full text-center`}
              href="/Onah%20Chinedum%20Salem.pdf"
              download="Salem Onah - Resume.pdf"
            >
              Download Resume
            </a>
          </div>
          <dl className="flex-1 min-w-0 grid grid-cols-[140px_1fr] gap-x-5 gap-y-3 text-[0.98rem] max-sm:grid-cols-[110px_1fr] max-sm:w-full">
            {ROWS.map((row, i) => (
              <div className="contents" key={row.key}>
                <dt
                  className={`font-mono text-[12.5px] text-text-dim ${
                    i > 0 ? "border-t border-line pt-3.5 mt-3.5" : "pt-0.5"
                  }`}
                >
                  {row.key}
                </dt>
                <dd
                  className={`text-text ${
                    i > 0 ? "border-t border-line pt-3.5 mt-3.5" : ""
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
