"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface Props {
  particleCount?: number
  connectionDistance?: number
  mouseRadius?: number
  particleSpeed?: number
  interactive?: boolean
}

export default function ParticleNetwork({
  particleCount = 80,
  connectionDistance = 150,
  mouseRadius = 200,
  particleSpeed = 0.3,
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: -9999, y: -9999 })
  const animationId = useRef<number>(0)
  const dpr = useRef(1)

  const PARTICLE_COUNT = particleCount
  const CONNECTION_DISTANCE = connectionDistance
  const MOUSE_RADIUS = mouseRadius
  const PARTICLE_SPEED = particleSpeed

  const createParticles = useCallback((w: number, h: number) => {
    const arr: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
    return arr
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    dpr.current = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const w = rect.width
      const h = rect.height
      canvas.width = w * dpr.current
      canvas.height = h * dpr.current
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0)

      if (particles.current.length === 0) {
        particles.current = createParticles(w, h)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    const draw = () => {
      const w = canvas.width / dpr.current
      const h = canvas.height / dpr.current

      ctx.clearRect(0, 0, w, h)

      const pts = particles.current
      const mx = mouse.current.x
      const my = mouse.current.y

      // Update positions
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))

        // Mouse repulsion (subtle)
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Dampen velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > PARTICLE_SPEED * 2) {
          p.vx *= 0.98
          p.vy *= 0.98
        }
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.strokeStyle = `rgba(161, 161, 170, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }

        // Mouse connections (brighter)
        const dxm = pts[i].x - mx
        const dym = pts[i].y - my
        const distM = Math.sqrt(dxm * dxm + dym * dym)
        if (distM < MOUSE_RADIUS) {
          const alpha = (1 - distM / MOUSE_RADIUS) * 0.4
          ctx.strokeStyle = `rgba(212, 212, 216, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // Draw particles
      for (const p of pts) {
        // Glow near mouse
        const dxm = p.x - mx
        const dym = p.y - my
        const distM = Math.sqrt(dxm * dxm + dym * dym)
        const glow = distM < MOUSE_RADIUS ? (1 - distM / MOUSE_RADIUS) * 0.6 : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 212, 216, ${p.opacity + glow})`
        ctx.fill()
      }

      animationId.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove)
      canvas.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      cancelAnimationFrame(animationId.current)
      window.removeEventListener("resize", resize)
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [createParticles, interactive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    />
  )
}
