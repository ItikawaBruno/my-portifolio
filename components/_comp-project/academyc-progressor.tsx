"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  type: "academic" | "professional" | "personal"
  tags?: string[]
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Bacharelado em Sistemas de Informação",
    subtitle: "FIAP — 2024 a 2027",
    description: "Início da graduação com disciplinas em Java de Alta Performance, Banco de Dados SQL, Engenharia de Software, Arquitetura de Computadores, Cyber Security e Web Standards.",
    type: "academic",
    tags: ["Java", "SQL", "Eng. Software", "FIAP"],
  },
  {
    year: "2025",
    title: "Iniciação Científica — ML",
    subtitle: "FIAP — Predição de Ataques Web",
    description: "Desenvolvimento de modelo preditivo de Machine Learning para identificação de ataques web, analisando padrões de requisições e comportamento de tráfego com Python.",
    type: "academic",
    tags: ["Python", "Machine Learning", "Data Science"],
  },
  {
    year: "2025",
    title: "Voluntário Backend — Sign Link",
    subtitle: "Sign Link — Mar/2025 a Jun/2025",
    description: "Desenvolvimento e integração de soluções com TypeScript, React e Nest.js. Reuniões em espanhol e inglês com equipes internacionais. Modelagem de dados, Figma, ClickUp e metodologias ágeis com Scrum.",
    type: "professional",
    tags: ["TypeScript", "Nest.js", "React", "Scrum"],
  },
  {
    year: "2025",
    title: "Projeto VIVO — Onboarding",
    subtitle: "FIAP — Mar/2025 a Nov/2025",
    description: "Plataforma web de onboarding corporativo para a VIVO. API REST em Java (Spring Boot), front-end em Next.js, PostgreSQL, modelagem com Astah/tldraw e gerenciamento com Trello/GitHub.",
    type: "personal",
    tags: ["Java", "Spring Boot", "Next.js", "PostgreSQL"],
  },
  {
    year: "2025",
    title: "Estagiário Full Stack — 10X Digital",
    subtitle: "10X Digital — Jul/2025 até o momento",
    description: "Desenvolvimento de sistemas internos e soluções para empresas. Construção de plataforma de gestão para clínicas com Next.js, TypeScript, Prisma e PostgreSQL. Modelagem de dados, relatórios técnicos, integração de IA via APIs e versionamento com Git.",
    type: "professional",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS"],
  },
]

const typeConfig = {
  academic:     { label: "Acadêmico",   icon: "🎓" },
  professional: { label: "Profissional", icon: "💼" },
  personal:     { label: "Pessoal",     icon: "🚀" },
}

export default function ExperienceTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]))
            }, index * 100)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-5xl px-6 sm:px-10 md:px-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-100">
          Progresso &{" "}
          <span className="text-zinc-500">Experiências</span>
        </h2>
      </div>

      {/* Cards — zigzag */}
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 sm:px-10 md:px-16">
        {timelineData.map((item, i) => {
          const cfg = typeConfig[item.type]
          const isVisible = visibleItems.has(i)
          const isLeft = i % 2 === 0

          return (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el }}
              data-index={i}
              className={cn(
                "flex items-start gap-6 transition-all duration-700 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                isLeft ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Card */}
              <div className="w-3/4 rounded-2xl border border-white/6 bg-white/2 p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-zinc-200">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-zinc-600">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/7 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    {cfg.label}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/6 bg-white/3 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Year + icon */}
              <div className={cn(
                "flex w-1/4 shrink-0 flex-col gap-1 pt-5",
                isLeft ? "items-start" : "items-end"
              )}>
                <span className="text-3xl font-bold tabular-nums tracking-tight text-zinc-300">
                  {item.year}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">{cfg.label}</span>
              </div>
            </div>
          )
        })}

        {/* End */}
        <div
          className={cn(
            "flex justify-center transition-all duration-700 delay-200",
            visibleItems.has(timelineData.length - 1) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-xs font-medium text-zinc-600">
              E a história continua...
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}