"use client"

import { TypingAnimation } from "../ui/typing-animation"
import RotatingText from "../RotatingText"

const TextTyping = () => {
  return (
    <div className="flex items-center justify-between px-20">
      <h1 className="absolute top-80 left-50 text-5xl font-bold text-zinc-200">
        <TypingAnimation duration={100} typeSpeed={100} delay={0}>
          Bruno Hideki Itikawa
        </TypingAnimation>
      </h1>
      <div className="absolute top-100 left-50 flex">
        <h3></h3>
      <RotatingText
        texts={['Desenvolvedor Backend Java', 'Desenvolvedor FullStack', 'Machine Learning Enthusiast', 'Cientista de Dados']}
        mainClassName="px-2 sm:px-2 md:px-3 bg-zinc-300 text-zinc-700 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={3000}
      />
      </div>
    </div>
  )
}

export default TextTyping