"use client"

import { useState, useRef, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"

type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erro ao enviar mensagem.")
      }

      setStatus("success")
      formRef.current?.reset()
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar mensagem.")
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contato" className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 md:px-16">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
        Entre em <span className="text-zinc-500">contato</span>
      </h2>
      <p className="mt-2 text-base text-zinc-400">
        Aberto para novas oportunidades
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-10 grid gap-6 sm:grid-cols-2"
      >
        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-300">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Seu nome"
            className="rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-100 outline-none
                       placeholder:text-zinc-600 transition-colors
                       focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-100 outline-none
                       placeholder:text-zinc-600 transition-colors
                       focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Mensagem */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-zinc-300">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Escreva sua mensagem aqui..."
            className="resize-none rounded-3xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-100 outline-none
                       placeholder:text-zinc-600 transition-colors
                       focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Botão + Feedback */}
        <div className="flex items-center gap-4 sm:col-span-2">
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-full bg-zinc-100 px-8 py-3 text-sm font-semibold text-zinc-900
                       transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar mensagem"
            )}
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-emerald-400"
              >
                ✓ Mensagem enviada com sucesso!
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-400"
              >
                ✕ {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </section>
  )
}
