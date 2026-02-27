import { cn } from "@/lib/utils"
import { Marquee } from "../ui/marquee"

const projects = [
  {
    name: "Portfolio Website",
    description:
      "Site pessoal desenvolvido com Next.js, Tailwind CSS e Spline 3D para apresentação de projetos e experiências profissionais.",
    img: "https://avatar.vercel.sh/portfolio",
    tech: ["Next.js", "Tailwind CSS", "Spline 3D"],
  },
  {
    name: "E-commerce App",
    description:
      "Aplicação completa de e-commerce com carrinho de compras, pagamento integrado e painel administrativo.",
    img: "https://avatar.vercel.sh/ecommerce",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Task Manager",
    description:
      "Gerenciador de tarefas com drag-and-drop, notificações em tempo real e colaboração em equipe.",
    img: "https://avatar.vercel.sh/taskmanager",
    tech: ["TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    name: "Dashboard Analytics",
    description:
      "Painel de análise de dados com gráficos interativos, filtros dinâmicos e exportação de relatórios.",
    img: "https://avatar.vercel.sh/dashboard",
    tech: ["Next.js", "Recharts", "REST API"],
  },
]

const ProjectCard = ({
  img,
  name,
  description,
  tech,
}: {
  img: string
  name: string
  description: string
  tech: string[]
}) => {
  return (
    <div
      className={cn(
        "group/card relative flex h-72 w-96 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300",
        "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/80"
      )}
    >
      {/* Header */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <img
            className="rounded-lg"
            width="44"
            height="44"
            alt={name}
            src={img}
          />
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 pt-4">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

const FluxProjects = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
      <h2 className="mb-8 w-full max-w-5xl px-6 text-3xl font-bold tracking-tight text-zinc-100 sm:px-10 md:px-16">
        Projetos
      </h2>
      <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </Marquee>
      <div className="from-zinc-800 pointer-events-none absolute"></div>
      <div className="from-zinc-800 pointer-events-none absolute"></div>
    </div>
  )
}

export default FluxProjects