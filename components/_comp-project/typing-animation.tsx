"use client"

import { TypingAnimation } from "../ui/typing-animation"
import myImage from "../../public/image-for-santander.jpg"
import Image from "next/image"

const TextTyping = () => {
  return (
    <div className=" absolute inset-0 flex items-center justify-between h-screen px-20">
      
      {/* Nome na esquerda */}
      <div className="flex-1">
        <h1 className="text-5xl font-bold text-[#6c7173]">
          <TypingAnimation duration={100} typeSpeed={300} delay={0}>
            Bruno Hideki Itikawa
          </TypingAnimation>
        </h1>
      </div>

      {/* Imagem na direita */}
      <div className="flex-1 flex justify-end">
        <Image 
          src={myImage}
          alt="Eu"
          width={350}
          height={350}
          className="rounded-2xl shadow-2xl"
        />
      </div>

    </div>
  )
}

export default TextTyping