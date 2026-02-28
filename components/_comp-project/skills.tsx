"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface Skill {
  name: string
  icon: string
  image?: string
  color: string
  summary: string
  details: string[]
}

const skills: Skill[] = [
  {
    name: "Java",
    icon: "☕",
    image: "/Java-Dark.svg",
    color: "#a1a1aa",
    summary: "Backend robusto com ecossistema Spring",
    details: [
      "Spring Boot — APIs REST escaláveis com arquitetura em camadas",
      "Spring Security — autenticação e autorização (JWT, OAuth2)",
      "Spring Data JPA — persistência, consultas derivadas, JPQL e Hibernate",
      "Microsserviços — Service Register, OpenFeign, Eureka Server",
      "RabbitMQ — mensageria assíncrona para desacoplamento entre serviços",
      "POO — SOLID, Clean Code, Design Patterns",
      "Projeto VIVO — plataforma de onboarding corporativo com API REST",
    ],
  },
  {
    name: "Next.js",
    icon: "▲",
    image: "/NextJS-Dark.svg",
    color: "#e4e4e7",
    summary: "Fullstack moderno com TypeScript e Prisma",
    details: [
      "10X Digital — dois sistemas internos para empresas em produção",
      "Server Actions — mutations diretas no servidor sem API routes",
      "Prisma ORM — modelagem e persistência em PostgreSQL",
      "Autenticação — fluxos seguros com NextAuth e middleware",
      "Zod — validação de dados end-to-end",
      "Integração de IA — automação de processos via consumo de APIs",
      "Shadcn UI & Tailwind — design system componentizado",
    ],
  },
  {
    name: "React",
    icon: "⚛️",
    image: "/React-Dark.svg",
    color: "#61dafb",
    summary: "Interfaces interativas em produção",
    details: [
      "Hooks — useState, useEffect, useContext, custom hooks",
      "Componentes — reutilizáveis, tipados com TypeScript",
      "Sign Link — interfaces e fluxos de visualização com React e Nest.js",
      "10X Digital — dashboards interativos para clínicas especializadas",
      "Figma — prototipação de interfaces e fluxos de UX/UI",
    ],
  },
  {
    name: "Python",
    icon: "🐍",
    image: "/Python-Dark.svg",
    color: "#a1a1aa",
    summary: "Data Science e Machine Learning",
    details: [
      "NumPy & Pandas — manipulação e limpeza de datasets",
      "Machine Learning — modelos de predição e classificação",
      "NLP — pré-processamento de texto e análise de sentimentos",
      "Iniciação Científica (FIAP) — modelo de predição de ataques web",
      "Classificação de ameaças — SQL Injection, SSH brute-force com % de probabilidade",
      "Análise exploratória — identificação de padrões e anomalias em tráfego",
      "POO em Python — classes, herança, polimorfismo, encapsulamento",
    ],
  },
  {
    name: "JavaScript",
    icon: "JS",
    image: "/JavaScript.svg",
    color: "#f7df1e",
    summary: "Web moderna e automação",
    details: [
      "ES6+ — arrow functions, destructuring, spread, modules",
      "Async/Await — operações assíncronas e Promises",
      "WebSocket — chat em tempo real (projeto Chat Socket)",
      "Consumo de APIs — integração com serviços externos e internos",
      "DOM — manipulação dinâmica de elementos",
      "Projetos pessoais — gerador de memes, marca-tento",
    ],
  },
  {
    name: "Node.js",
    icon: "🟢",
    image: "/NodeJS-Dark.svg",
    color: "#339933",
    summary: "Backend JavaScript escalável",
    details: [
      "Express — criação de APIs REST",
      "Nest.js — framework estruturado (experiência no Sign Link)",
      "WebSocket — comunicação em tempo real",
      "NPM — gerenciamento de pacotes e scripts",
    ],
  },
  {
    name: "HTML",
    icon: "🌐",
    image: "/HTML.svg",
    color: "#e34f26",
    summary: "Markup semântico e acessível",
    details: [
      "HTML5 — tags semânticas e boas práticas",
      "Web Standards — disciplina cursada na FIAP",
      "SEO — estruturação de conteúdo para indexação",
      "Formulários — validação nativa e inputs customizados",
    ],
  },
  {
    name: "CSS",
    icon: "🎨",
    image: "/CSS.svg",
    color: "#1572b6",
    summary: "Estilização moderna e responsiva",
    details: [
      "Tailwind CSS — utility-first para produtividade",
      "Shadcn UI & HeroUI — bibliotecas de componentes",
      "Flexbox & Grid — layouts responsivos",
      "Animações — transições e keyframes para UX fluida",
    ],
  },
  {
    name: "SQL",
    icon: "🗄️",
    image: "/PostgreSQL-Dark.svg",
    color: "#71717a",
    summary: "Banco de dados relacional em produção",
    details: [
      "PostgreSQL — banco principal nos projetos em produção",
      "Queries complexas — JOINs, subqueries, CTEs, agregações",
      "Modelagem — definição de tabelas, relacionamentos, constraints e índices",
      "10X Digital — análise e otimização de banco em produção",
      "Formação Completa SQL — Alura (modelagem e queries avançadas)",
    ],
  },
  {
    name: "Docker",
    icon: "🐳",
    image: "/Docker.svg",
    color: "#71717a",
    summary: "Containerização de aplicações",
    details: [
      "Comandos essenciais — build, run, exec, logs, compose",
      "Docker Desktop — gerenciamento visual de containers",
      "Criação de imagens — Dockerfile para projetos Java/Spring",
      "Deploy — ambientes isolados e reprodutíveis",
    ],
  },
  {
    name: "AWS",
    icon: "☁️",
    image: "/AWS-Dark.svg",
    color: "#a1a1aa",
    summary: "Cloud computing em produção",
    details: [
      "EC2 — provisionamento e gerenciamento de instâncias",
      "S3 — upload de arquivos nas plataformas internas (10X Digital)",
      "RDS — banco de dados gerenciado na nuvem",
      "Experiência real — infraestrutura em produção na empresa",
    ],
  },
  {
    name: "Git",
    icon: "🔀",
    image: "/Git.svg",
    color: "#f05032",
    summary: "Versionamento e colaboração",
    details: [
      "GitHub — PRs, code review e trabalho colaborativo",
      "Git Desktop — interface visual para gerenciamento",
      "Branches — estratégia de branching em equipe",
      "10X Digital & Sign Link — versionamento diário em produção",
    ],
  },
  {
    name: "RabbitMQ",
    icon: "🐇",
    image: "/RabbitMQ-Dark.svg",
    color: "#ff6600",
    summary: "Mensageria para microsserviços",
    details: [
      "Filas — comunicação assíncrona entre serviços",
      "Exchanges — roteamento de mensagens (direct, topic, fanout)",
      "Dead Letter — tratamento de mensagens com erro",
      "Spring AMQP — integração em microsserviços Java",
    ],
  },
]

const firstRow = skills.slice(0, Math.ceil(skills.length / 2))
const secondRow = skills.slice(Math.ceil(skills.length / 2))

const SkillIcon = ({ skill, size = 32 }: { skill: Skill; size?: number }) => {
  if (skill.image) {
    return (
      <Image
        src={skill.image}
        alt={skill.name}
        width={size}
        height={size}
        className="object-contain"
      />
    )
  }
  return <span className={size >= 32 ? "text-3xl" : "text-xl"}>{skill.icon}</span>
}

const SkillCard = ({
  skill,
  onClick,
}: {
  skill: Skill
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-full w-56 shrink-0 cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-xl border px-5 py-6 text-center transition-all duration-200",
        "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:bg-zinc-800/70",
        "outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
      )}
    >
      <SkillIcon skill={skill} size={36} />
      <span className="text-sm font-semibold text-zinc-200">{skill.name}</span>
      <span className="text-[11px] leading-snug text-zinc-500">
        {skill.summary}
      </span>
      <span className="absolute bottom-2 right-3 text-[10px] text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
        ver mais →
      </span>
    </button>
  )
}

const SkillsComp = () => {
  const [selected, setSelected] = useState<Skill | null>(null)

  return (
    <>
      <div className="w-full py-16">
        {/* Header */}
        <div className="mx-auto mb-12 w-full max-w-5xl px-6 sm:px-10 md:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            Skills &{" "}
            <span className="text-zinc-500">Tecnologias</span>
          </h2>
        </div>

        {/* Marquee rows */}
        <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:25s] [--gap:1rem]">
            {firstRow.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                onClick={() => setSelected(skill)}
              />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:25s] [--gap:1rem]">
            {secondRow.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                onClick={() => setSelected(skill)}
              />
            ))}
          </Marquee>

          {/* Fade edges */}
          <div className="from-zinc-800 pointer-events-none absolute" />
          <div className="from-zinc-800 pointer-events-none absolute" />
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-200 sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader className="gap-0">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xl">
                    <SkillIcon skill={selected} size={28} />
                  </span>
                  <div className="min-w-0">
                    <DialogTitle className="text-lg font-bold text-zinc-100">
                      {selected.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500">
                      {selected.summary}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="my-1 h-px bg-zinc-800/80" />

              <p className="text-xs font-medium uppercase tracking-widest text-zinc-600">
                O que eu domino
              </p>

              <ul className="space-y-3">
                {selected.details.map((detail, i) => {
                  const [title, ...rest] = detail.split(" — ")
                  const desc = rest.join(" — ")
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="mt-1.75 size-1.5 shrink-0 rounded-full"
                        style={{ background: selected.color }}
                      />
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {desc ? (
                          <>
                            <span className="font-semibold text-zinc-200">{title}</span>
                            <span className="text-zinc-600"> — </span>
                            {desc}
                          </>
                        ) : (
                          detail
                        )}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SkillsComp