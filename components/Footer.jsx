import { EYEBROW } from "@/lib/styles";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="pt-[70px] pb-10 border-t border-line text-center"
    >
      <div className="max-w-[880px] mx-auto px-7">
        <div className={`${EYEBROW} justify-center`}>get in touch</div>
        <h2 className="font-display font-semibold text-[clamp(1.6rem,4vw,2.2rem)] mb-[10px]">
          Let&apos;s build something
        </h2>
        <p className="text-text-dim mb-[22px]">
          Open to interesting problems, collaborations, and the occasional
          chess challenge.
        </p>
        <div className="flex gap-5 justify-center flex-wrap mb-10">
          <a
            className="font-mono text-[13px] text-text border border-line py-[9px] px-4 rounded-md transition-colors duration-200 hover:border-gold hover:text-gold"
            href="nedusalemonah@gmail.com"
          >
            email
          </a>
          <a
            className="font-mono text-[13px] text-text border border-line py-[9px] px-4 rounded-md transition-colors duration-200 hover:border-gold hover:text-gold"
            href="https://github.com/say-lem"
          >
            github
          </a>
          <a
            className="font-mono text-[13px] text-text border border-line py-[9px] px-4 rounded-md transition-colors duration-200 hover:border-gold hover:text-gold"
            href="#"
          >
            linkedin
          </a>
          <a
            className="font-mono text-[13px] text-text border border-line py-[9px] px-4 rounded-md transition-colors duration-200 hover:border-gold hover:text-gold"
            href="#"
          >
            chess.com
          </a>
        </div>
      </div>
    </footer>
  );
}
