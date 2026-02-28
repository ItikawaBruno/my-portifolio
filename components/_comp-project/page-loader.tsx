"use client"

import { useState, useEffect, useRef } from "react"
import { useMotionValue, useSpring, motion, AnimatePresence } from "motion/react"

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 80,
  })

  useEffect(() => {
    // Start counting immediately
    motionValue.set(100)
  }, [motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}`
      }
      if (Math.round(latest) >= 100 && !done) {
        // Small delay after reaching 100 before revealing
        setTimeout(() => setDone(true), 400)
      }
    })
    return () => unsubscribe()
  }, [springValue, done])

  // After exit animation, fully remove loader from DOM
  const handleExitComplete = () => setHidden(true)

  return (
    <>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!done && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-9999 flex flex-col items-end justify-end gap-4 bg-black p-10"
          >
            <span
              ref={ref}
              className="text-8xl font-bold tabular-nums tracking-tighter text-white"
            >
              0
            </span>
            <div className="h-px w-48 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={hidden ? "animate-fade-in" : "invisible"}
      >
        {children}
      </div>
    </>
  )
}
