import { cn } from "@/lib/utils"
import { Marquee } from "../ui/marquee"

const projects = [
  {
    name: "Chat Socket",
    description:
      "Chat em tempo real com WebSocket, salas de conversa e mensagens instantâneas entre usuários.",
    img: "/img_chat-socket.png",
    link: "https://websocket-app-2t6w.onrender.com/",
    tech: ["JavaScript", "WebSocket", "Node.js"],
  },
  {
    name: "Gerador de Memes",
    description:
      "Aplicação para criar memes personalizados com upload de imagem, textos customizáveis e download do resultado.",
    img: "/generate-meme.png",
    link: "https://meme-generator-lac-five.vercel.app/",
    tech: ["JavaScript", "HTML", "CSS"],
  },
  {
    name: "Marca Tento",
    description:
      "Placar digital para partidas de truco, com controle de pontuação prático e intuitivo.",
    img: "/marca-tento.png",
    link: "https://marca-tento-six.vercel.app/",
    tech: ["JavaScript", "HTML", "CSS"],
  },
  {
    name: "Microsserviços Quiz",
    description:
      "Arquitetura de microsserviços com comunicação via OpenFeign e service discovery com Eureka Server.",
    img: "https://avatar.vercel.sh/ms-quiz",
    link: "https://github.com/ItikawaBruno/microsservicos-quiz",
    tech: ["Java", "Spring Boot", "OpenFeign", "Eureka"],
  },
  {
    name: "Future Makers — Iniciação Científica",
    description:
      "Modelo preditivo com Machine Learning, tratamento de dados e análise exploratória em Python.",
    img: "https://avatar.vercel.sh/future-makers",
    link: "https://github.com/ItikawaBruno/future-makers-python",
    tech: ["Python", "Machine Learning", "NLP"],
  },
  {
    name: "MS Produto Validação",
    description:
      "Microsserviço de produtos com validação de dados e tratamento de exceções customizadas.",
    img: "https://avatar.vercel.sh/ms-produto",
    link: "https://github.com/ItikawaBruno/ms-produto-validatio-exceptions",
    tech: ["Java", "Spring Boot"],
  },
  {
    name: "API de Filmes",
    description:
      "API REST para catálogo de filmes e séries com consulta, busca e gerenciamento de dados.",
    img: "https://avatar.vercel.sh/screenmatch",
    link: "https://github.com/ItikawaBruno/screenmatch-sem-web",
    tech: ["Java", "Spring Boot"],
  },
]

const courses = [
  {
    name: "Java Spring Framework & Spring AI",
    description:
      "Formação em Spring Boot, Spring Security, Spring Data JPA, APIs REST, arquitetura em camadas e integração com Gen AI.",
    tech: ["Java", "Spring Boot", "Spring AI"],
    platform: "Udemy",
    status: "Em andamento",
  },
  {
    name: "Java: Persistência com Spring Data JPA",
    description:
      "Consultas derivadas, JPQL, mapeamento de entidades, relacionamentos e persistência de dados com JPA/Hibernate.",
    tech: ["Java", "Spring Data JPA", "Hibernate"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Java: Listas e Coleções",
    description:
      "Manipulação de estruturas de dados em Java — List, Set, Map, ordenação e boas práticas de coleções.",
    tech: ["Java", "Collections"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Python para Data Science e ML (NLP)",
    description:
      "Machine Learning aplicado a NLP, pré-processamento de texto, modelos de classificação e análise de sentimentos.",
    tech: ["Python", "ML", "NLP"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Python: Orientação a Objetos",
    description:
      "Aplicação de POO em Python — classes, herança, polimorfismo, encapsulamento e boas práticas.",
    tech: ["Python", "POO"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Pandas I/O: trabalhando com diferentes formatos de arquivos",
    description:
      "Leitura e escrita de dados em CSV, Excel, JSON, Parquet e outros formatos com Pandas.",
    tech: ["Python", "Pandas"],
    platform: "Alura",
    status: "Em andamento",
  },
  {
    name: "Formação Completa SQL",
    description:
      "Modelagem relacional, JOINs, subqueries, agregações, CTEs e queries avançadas em PostgreSQL/MySQL.",
    tech: ["SQL", "PostgreSQL", "MySQL"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "React: Desenvolvendo com JavaScript",
    description:
      "Criação de interfaces com componentes React, hooks, estado, props e consumo de APIs.",
    tech: ["React", "JavaScript"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Power BI: Dashboards e ETL",
    description:
      "Criação de dashboards interativos, transformação de dados com Power Query e modelagem de relatórios.",
    tech: ["Power BI", "ETL", "Dados"],
    platform: "Alura",
    status: "Concluído",
  },
  {
    name: "Formação Python — FIAP",
    description:
      "Fundamentos de Python, estruturas de dados, funções, exceções e primeiros passos em programação.",
    tech: ["Python"],
    platform: "FIAP",
    status: "Concluído",
  },
  {
    name: "Excel para Análise de Dados",
    description:
      "Fórmulas avançadas, tabelas dinâmicas, gráficos e organização de dados para análise.",
    tech: ["Excel", "Dados"],
    platform: "Alura",
    status: "Concluído",
  },
]

const isLocalImage = (src: string) => src.startsWith("/")

const ProjectCard = ({
  img,
  name,
  description,
  tech,
  link,
}: {
  img: string
  name: string
  description: string
  tech: string[]
  link?: string
}) => {
  const Wrapper = link ? "a" : "div"
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {}
  const hasImage = isLocalImage(img)

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group/card relative flex h-80 w-96 shrink-0 flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/80",
        link && "cursor-pointer"
      )}
    >
      {/* Image banner / Placeholder */}
      {hasImage ? (
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-zinc-800">
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
            alt={name}
            src={img}
          />
          {link && (
            <span className="absolute right-3 top-3 rounded-full bg-zinc-900/80 px-2.5 py-1 text-[10px] font-medium text-zinc-300 opacity-0 backdrop-blur-sm transition-opacity group-hover/card:opacity-100">
              abrir ↗
            </span>
          )}
        </div>
      ) : (
        <div className="relative flex h-40 w-full shrink-0 items-center justify-center bg-zinc-800/50">
          <img
            src="/Github-Dark.svg"
            alt="GitHub"
            className="size-14 opacity-40"
          />
          {link && (
            <span className="absolute right-3 top-3 rounded-full bg-zinc-900/80 px-2.5 py-1 text-[10px] font-medium text-zinc-300 opacity-0 backdrop-blur-sm transition-opacity group-hover/card:opacity-100">
              abrir ↗
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="mb-1.5 text-lg font-semibold text-white">{name}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 pt-3">
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
    </Wrapper>
  )
}

const CourseCard = ({
  name,
  description,
  tech,
  platform,
  status,
}: {
  name: string
  description: string
  tech: string[]
  platform: string
  status: string
}) => {
  return (
    <div
      className={cn(
        "group/card relative flex h-64 w-96 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300",
        "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-800/70"
      )}
    >
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {platform}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              status === "Concluído"
                ? "bg-emerald-900/40 text-emerald-400"
                : "bg-amber-900/40 text-amber-400"
            )}
          >
            {status}
          </span>
        </div>
        <h3 className="mb-2 text-base font-semibold text-white">{name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 pt-3">
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
        Projetos & <span className="text-zinc-500">Cursos</span>
      </h2>

      {/* Projetos */}
      <div className="mb-3 w-full max-w-5xl px-6 sm:px-10 md:px-16">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Projetos</h3>
      </div>
      <Marquee pauseOnHover className="mb-8 [--duration:30s] [--gap:1.5rem]">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </Marquee>

      {/* Cursos */}
      <div className="mb-3 w-full max-w-5xl px-6 sm:px-10 md:px-16">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Cursos</h3>
      </div>
      <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
        {courses.map((course) => (
          <CourseCard key={course.name} {...course} />
        ))}
      </Marquee>

      <div className="from-zinc-800 pointer-events-none absolute"></div>
      <div className="from-zinc-800 pointer-events-none absolute"></div>
    </div>
  )
}

export default FluxProjects