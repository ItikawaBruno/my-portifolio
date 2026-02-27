"use client"

import { useState } from "react"
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
  color: string
  summary: string
  details: string[]
}

const skills: Skill[] = [
  {
    name: "Java",
    icon: "☕",
    color: "#a1a1aa",
    summary: "Backend robusto com ecossistema Spring",
    details: [
      "Spring Boot — construção de APIs REST escaláveis",
      "Spring Security — autenticação e autorização (JWT, OAuth2)",
      "POO — aplicação sólida de princípios de orientação a objetos",
      "Boas práticas — SOLID, Clean Code, Design Patterns",
      "Microsserviços — arquitetura distribuída com comunicação assíncrona",
      "RabbitMQ — mensageria para desacoplamento entre serviços",
    ],
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "#e4e4e7",
    summary: "Fullstack moderno com React e Server Actions",
    details: [
      "Boas práticas — estrutura de projeto, componentização, reutilização",
      "Server Actions — mutations diretas no servidor sem API routes",
      "Criação de componentes — design system próprio com validação",
      "Autenticação — fluxos seguros com NextAuth / middleware",
      "Geração com IA — integração de modelos de IA na plataforma",
    ],
  },
  {
    name: "Python",
    icon: "🐍",
    color: "#a1a1aa",
    summary: "Data Science e Machine Learning",
    details: [
      "NumPy & Pandas — manipulação e limpeza de datasets",
      "Análise de dados — exploração estatística e visualização",
      "Modelos de predição — criação e treinamento de modelos de ML",
      "Iniciação Científica — modelo de predição de ataques web",
      "Classificação de ameaças — retorno de % de probabilidade para SQL Injection, SSH brute-force, tráfego normal",
    ],
  },
  {
    name: "SQL",
    icon: "🗄️",
    color: "#71717a",
    summary: "Banco de dados relacional em produção",
    details: [
      "Queries complexas — JOINs, subqueries, CTEs, agregações",
      "Criação e manutenção de tabelas — DDL, constraints, índices",
      "Aplicação real — manutenção de banco em produção no estágio (10X)",
      "Otimização — análise de planos de execução e performance",
    ],
  },
  {
    name: "TypeScript",
    icon: "TS",
    color: "#a1a1aa",
    summary: "Sistemas internos e automação com IA",
    details: [
      "Sistemas internos — dois sistemas para a empresa automatizando processos",
      "Consumo de APIs — integração com serviços externos e internos",
      "Integração de IA — automação de fluxos dentro da plataforma",
      "WebSocket — implementação de chat em tempo real",
      "Projetos fullstack — Next.js com tipagem end-to-end",
    ],
  },
  {
    name: "Docker",
    icon: "🐳",
    color: "#71717a",
    summary: "Containerização de aplicações",
    details: [
      "Comandos essenciais — build, run, exec, logs, compose",
      "Docker Desktop — gerenciamento visual de containers",
      "Criação de imagens — Dockerfile para projetos Java/Spring",
      "Containerização — deploy isolado e reprodutível",
    ],
  },
  {
    name: "AWS",
    icon: "☁️",
    color: "#a1a1aa",
    summary: "Cloud computing em produção",
    details: [
      "EC2 — provisionamento e gerenciamento de instâncias",
      "S3 — armazenamento de documentos e imagens nas plataformas internas",
      "RDS — banco de dados gerenciado na nuvem",
      "Implementação real — S3 integrado para upload de arquivos na empresa",
    ],
  },
  {
    name: "Arquitetura",
    icon: "📐",
    color: "#71717a",
    summary: "Modelagem, planejamento e versionamento",
    details: [
      "Astah — diagramação de classes e fluxos",
      "Modelagem UML — casos de uso, sequência, atividade",
      "Trello — gestão de tarefas e organização de sprints",
      "GitHub — versionamento, PRs, branches, CI/CD",
    ],
  },
]

const firstRow = skills.slice(0, Math.ceil(skills.length / 2))
const secondRow = skills.slice(Math.ceil(skills.length / 2))

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
      <span className="text-3xl leading-none">{skill.icon}</span>
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
                    {selected.icon}
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