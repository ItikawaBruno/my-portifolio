
import Spline from "@splinetool/react-spline/next";
import TextTyping from "@/components/_comp-project/typing-animation";
import { ScrollProgress } from "@/components/ui/scroll-progress"
import ExperienceTimeline from "@/components/_comp-project/academyc-progressor";
import FluxProjects from "@/components/_comp-project/flux-projects";
import SkillsComp from "@/components/_comp-project/skills";
import Navbar from "@/components/_comp-project/navbar";
import FooterDock from "@/components/_comp-project/footer-dock";
import ContactForm from "@/components/_comp-project/contact-form";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <ScrollProgress className="bg-white" />
      <Navbar />

      {/* Hero / Spline Background */}
      <section id="hero">
        <Spline scene="https://prod.spline.design/ag6bbUIBZELh10i5/scene.splinecode" />
        <TextTyping />
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
              Sou desenvolvedor com foco em <span className="text-zinc-200">Java</span> e ecossistema <span className="text-zinc-200">Spring</span>, com experiência real em
              construção de APIs REST, microsserviços e mensageria com RabbitMQ. Também atuo no frontend com
              <span className="text-zinc-200"> Next.js</span> e <span className="text-zinc-200">TypeScript</span>, criando sistemas internos completos para empresas — automação de processos,
              integrações com IA e consumo de APIs externas.
            </p>
            <p>
              Na área de dados, desenvolvi um modelo de <span className="text-zinc-200">Machine Learning</span> durante a iniciação científica para
              predição de ataques web, classificando ameaças como SQL Injection e SSH brute-force com retorno de
              probabilidade por categoria. Trabalho com <span className="text-zinc-200">Python</span>, NumPy, Pandas e análise estatística.
            </p>
            <p>
              Tenho experiência com <span className="text-zinc-200">Docker</span> para containerização, <span className="text-zinc-200">AWS</span> (EC2, S3, RDS) em produção
              e práticas de arquitetura — modelagem UML, versionamento com Git e organização ágil com Trello.
              Atualmente cursando Análise e Desenvolvimento de Sistemas, sempre buscando evolução constante.
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
  );
}
