"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Skills", href: "#skills" },
  { label: "Jornada", href: "#jornada" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
]

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (currentScrollY < 80) {
      setVisible(true)
    } else if (currentScrollY < lastScrollY.current) {
      setVisible(true)
    } else {
      setVisible(false)
    }

    setScrolled(currentScrollY > 20)
    lastScrollY.current = currentScrollY
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 flex w-full items-center justify-center transition-all duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2.5 transition-all duration-300",
          scrolled
            ? "border-white/10 bg-zinc-950/60 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className={cn(
              "rounded-full px-5 py-2 text-base font-medium transition-all duration-200",
              "text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
