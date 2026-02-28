
import TextTyping from "@/components/_comp-project/typing-animation";
import ParticleNetwork from "@/components/_comp-project/particle-network";
import { ScrollProgress } from "@/components/ui/scroll-progress"
import ExperienceTimeline from "@/components/_comp-project/academyc-progressor";
import FluxProjects from "@/components/_comp-project/flux-projects";
import SkillsComp from "@/components/_comp-project/skills";
import Navbar from "@/components/_comp-project/navbar";
import FooterDock from "@/components/_comp-project/footer-dock";
import ContactForm from "@/components/_comp-project/contact-form";
import PageLoader from "@/components/_comp-project/page-loader";

export default function Home() {
  return (
    <PageLoader>
    <div className="relative min-h-screen w-full">
      <ScrollProgress className="bg-white" />
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
        <ParticleNetwork />
        <div className="pointer-events-none relative z-10">
          <TextTyping />
        </div>
      </section>

      {/* Content */}
      <div className="bg-linear-to-b from-black to-zinc-800">
        {/* Sobre mim */}
        <section id="sobre" className="mx-auto w-full max-w-5xl space-y-6 px-6 py-24 sm:px-10 md:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            Sobre <span className="text-zinc-500">mim</span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              Sou movido por desafios e aprendizado constante. Estudante de <span className="text-zinc-200">Sistemas de Informação</span> na <span className="text-zinc-200">FIAP</span>, encontrei na tecnologia um ambiente onde lógica, criatividade e estratégia se encontram.
            </p>
            <p>
              Comecei minha jornada focado em backend com <span className="text-zinc-200">Java</span> e <span className="text-zinc-200">Spring Boot</span>, desenvolvendo APIs e estudando arquitetura de microsserviços. Com o tempo, percebi que meu interesse ia além da construção de sistemas: queria entender como os dados por trás deles poderiam gerar inteligência e vantagem competitiva. Hoje, estudo <span className="text-zinc-200">dados</span>, <span className="text-zinc-200">automações</span> e <span className="text-zinc-200">modelos preditivos</span>, buscando evoluir para um perfil cada vez mais analítico e estratégico.
            </p>
            <p>
              Fora da tecnologia, o esporte moldou quem eu sou. Joguei <span className="text-zinc-200">beisebol</span> por muitos anos e cheguei à <span className="text-zinc-200">seleção brasileira</span> duas vezes — uma experiência que me ensinou disciplina, consistência e mentalidade de alto desempenho. Atualmente, continuo praticando corrida e musculação, mantendo a mesma mentalidade de evolução contínua que aplico na tecnologia.
            </p>
          </div>
        </section>

        <section id="skills" className="py-10">
          <SkillsComp />
        </section>

        {/* Timeline */}
        <section id="jornada" className="py-10">
          <ExperienceTimeline />
        </section>

        {/* Projetos */}
        <section id="projetos" className="py-10">
          <FluxProjects />
        </section>

        {/* Contato */}
        <ContactForm />

        {/* Footer */}
        <FooterDock />
      </div>
    </div>
    </PageLoader>
  );
}
