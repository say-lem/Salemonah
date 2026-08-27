import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Play from "@/components/Play";
import Facts from "@/components/Facts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-[880px] mx-auto px-7">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Play />
        <Facts />
      </main>
      <Footer />
    </>
  );
}
