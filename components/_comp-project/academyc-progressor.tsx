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
    year: "2019",
    title: "Ensino Médio",
    subtitle: "Colégio X",
    description: "Início da jornada, onde a curiosidade por tecnologia começou a ganhar forma.",
    type: "academic",
    tags: ["Educação", "Base"],
  },
  {
    year: "2021",
    title: "Primeiro Projeto Pessoal",
    subtitle: "Desenvolvimento Autônomo",
    description: "Primeiros passos com código — sites estáticos, noites longas e muita descoberta.",
    type: "personal",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    year: "2022",
    title: "Graduação em ADS",
    subtitle: "Análise e Desenvolvimento de Sistemas",
    description: "Ingresso na faculdade marcando o início formal da carreira em tecnologia.",
    type: "academic",
    tags: ["ADS", "Algoritmos", "BD"],
  },
  {
    year: "2023",
    title: "Primeiro Estágio",
    subtitle: "Empresa de Software",
    description: "Experiência real de mercado, metodologias ágeis e colaboração em equipe.",
    type: "professional",
    tags: ["React", "Node.js", "Scrum"],
  },
  {
    year: "2024",
    title: "Dev Fullstack Jr.",
    subtitle: "Posição Efetivada",
    description: "Crescimento técnico acelerado e projetos com impacto direto em produção.",
    type: "professional",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    year: "2025",
    title: "Projetos Open Source",
    subtitle: "Comunidade & GitHub",
    description: "Contribuições para a comunidade e construção de um portfólio sólido.",
    type: "personal",
    tags: ["Open Source", "Portfolio", "UI/UX"],
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
                <span className="text-lg">{cfg.icon}</span>
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