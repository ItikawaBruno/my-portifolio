import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Image from "next/image";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Spline scene="https://prod.spline.design/ag6bbUIBZELh10i5/scene.splinecode" />
      </div>
      <AnimatedThemeToggler/>
    </div>
  );
}
