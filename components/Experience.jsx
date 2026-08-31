import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE } from "@/lib/styles";

const ITEMS = [
  {
    date: "Dec 2024 - Jan 2026",
    company: "Genesys Tech Hub",
    role: "Fullstak Developer",
    desc: "Led a team in the development of a product management application for small scale Businesses leveraging NextJs, Typescript, Redux for the front end then Expressjs postgressQl and redis for the backend, \nIntegrated robust error handling, validation, and logging mechanisms to improve system reliability, ensuring system consistency, fault tolerance, and implementing offline-first collaboration",
  },
  {
    date: "Febuary 2025 - Dec 2025",
    company: "Luminevents",
    role: "Contract Frontend Developer",
    desc: "Developed the full ticketing platform frontend, including the Event creation sections, ticket purchase section, and payment buttons, which directly contributed to platform growth.",
  },
  {
    date: "April 2024 - march 2025",
    company: "SafeGeeg",
    role: "Frontend Developer",
    desc: "Developed the full gig economy platform, including the chat section, Task bidding section, and payment buttons, which drove customer adoption and directly contributed to platform growth.",
  },
  {
    date: "May 2024 - January 2025",
    company: "Hordanso LLC",
    role: "Contract Frontend developer",
    desc: "Developed and maintained responsive web applications leveraging NextJs, Typescript, Redux and Docker, enabling optimized service delivery, \nCollaborated with developers, testers, and QA engineers to build a suite of applications ensuring stability and scalability.",
  },
  {
    date: "Sept 2019 — Jan 2020",
    company: "Tenece Professional services",
    role: "front-end Intern",
    desc: "Started my Journey in software development,\nDeveloped static pages and basic ui's under supervision in the frontend team",
  },
  {
    date: "2017 — 2022",
    company: " University of Nigeria",
    role: "Bachelor of Science in Computer Science",
    desc: "",
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
              <div className="text-text-dim text-[0.92rem] whitespace-pre-line">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
