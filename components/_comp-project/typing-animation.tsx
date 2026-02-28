"use client"

import { TypingAnimation } from "../ui/typing-animation"
import RotatingText from "../RotatingText"

const TextTyping = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-5xl font-bold text-zinc-200">
        <TypingAnimation duration={100} typeSpeed={100} deleteSpeed={50} delay={0} pauseDelay={2000} loop>
          Bruno Hideki Itikawa
        </TypingAnimation>
      </h1>
      <div className="flex">
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