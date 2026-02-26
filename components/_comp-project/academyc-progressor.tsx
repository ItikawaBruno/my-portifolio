"use client"

import { useEffect, useRef, useState } from "react"

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
  academic:     { label: "Acadêmico",   color: "#e4e4e7" },
  professional: { label: "Profissional", color: "#a1a1aa" },
  personal:     { label: "Pessoal",     color: "#71717a" },
}

export default function ExperienceTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [lineProgress, setLineProgress] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]))
            }, index * 120)
          }
        })
      },
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }
    )
    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowH = window.innerHeight
      const scrolled = Math.max(0, windowH - rect.top)
      const progress = Math.min(1, scrolled / (sectionHeight + windowH * 0.3))
      setLineProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#18181b",
        padding: "100px 0 120px",
        position: "relative",
        fontFamily: "'DM Sans', 'Sora', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, transparent, #3f3f46)" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#3f3f46", textTransform: "uppercase", fontWeight: 500 }}>
            Jornada
          </span>
        </div>

        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#fafafa", margin: 0, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Progresso &{" "}
          <span style={{ color: "#52525b" }}>Experiências</span>
        </h2>

        {/* Legend */}
        <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#52525b" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
              {cfg.label}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline container */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Line track */}
        <div style={{
          position: "absolute",
          left: "calc(40px + 28px)",
          top: 0, bottom: 0,
          width: 1,
          background: "rgba(255,255,255,0.05)",
        }} />

        {/* Animated fill */}
        <div style={{
          position: "absolute",
          left: "calc(40px + 28px)",
          top: 0,
          width: 1,
          height: `${lineProgress * 100}%`,
          background: "linear-gradient(180deg, #a1a1aa 0%, #3f3f46 100%)",
          transition: "height 0.05s linear",
        }} />

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {timelineData.map((item, i) => {
            const cfg = typeConfig[item.type]
            const isVisible = visibleItems.has(i)

            return (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el }}
                data-index={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 32,
                  paddingBottom: i < timelineData.length - 1 ? 52 : 0,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Node column */}
                <div style={{ flexShrink: 0, width: 58, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, gap: 6 }}>
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#18181b",
                    border: `1.5px solid ${cfg.color}`,
                    position: "relative",
                    zIndex: 2,
                  }}>
                    {isVisible && (
                      <div style={{
                        position: "absolute",
                        inset: -5,
                        borderRadius: "50%",
                        border: `1px solid ${cfg.color}`,
                        opacity: 0,
                        animation: "pulse-ring 3s ease-out infinite",
                        animationDelay: `${i * 0.4}s`,
                      }} />
                    )}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#3f3f46", letterSpacing: "0.06em" }}>
                    {item.year}
                  </span>
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "20px 24px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#e4e4e7", letterSpacing: "-0.01em" }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: "2px 0 0", fontSize: 13, color: "#52525b" }}>
                        {item.subtitle}
                      </p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "#52525b",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "3px 10px", borderRadius: 99, whiteSpace: "nowrap",
                    }}>
                      {cfg.label}
                    </span>
                  </div>

                  <p style={{ margin: "10px 0 14px", fontSize: 14, color: "#71717a", lineHeight: 1.7 }}>
                    {item.description}
                  </p>

                  {item.tags && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 11, color: "#52525b",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 6, padding: "2px 9px", fontWeight: 500,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* End node */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          paddingLeft: 12, marginTop: 8,
          opacity: visibleItems.has(timelineData.length - 1) ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span style={{ fontSize: 13, color: "#3f3f46", fontWeight: 500 }}>
            E a história continua...
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </section>
  )
}