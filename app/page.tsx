
import Spline from "@splinetool/react-spline/next";
import TextTyping from "@/components/_comp-project/typing-animation";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import ExperienceTimeline from "@/components/_comp-project/academyc-progressor";

export default function Home() {
  return (
    <>
  <div className="relative h-screen w-full">
    <ScrollProgress className="bg-[#fff]"/>
    {/* <SmoothCursor></SmoothCursor> */}
    {/* Background */}
    <Spline scene="https://prod.spline.design/ag6bbUIBZELh10i5/scene.splinecode" />

      <TextTyping></TextTyping>
    </div>
    <div className="w-full p-4 flex flex-col space-y-3 bg-zinc-900 text-zinc-200 py-15 ">
      <h2 className="ml-35 text-2xl font-bold">Sobre mim</h2>
      <div className="w-[80%] mx-auto">
      <p className="text-wrap break-after-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem tempora totam aliquid, quia voluptas molestias maiores necessitatibus vel illum nisi officia qui beatae. Architecto necessitatibus maiores, quia vitae dolorem cupiditate voluptatem accusamus, doloremque eveniet, inventore esse ea rem. Totam minus facilis eligendi laudantium. Maiores esse consectetur, illo ut officia, doloribus sunt nisi provident est necessitatibus obcaecati, labore iusto eligendi numquam aliquam laborum. Distinctio modi possimus rerum, sint reiciendis dolorum, adipisci iste in molestias minus, omnis maxime velit? Sit numquam maxime nemo rerum possimus enim iste ipsam laudantium error vero, in cumque suscipit asperiores quidem aut aperiam hic dolor, ad repudiandae natus non illum voluptatem rem cum. Perspiciatis animi blanditiis ducimus repellat ipsum assumenda dolorem, vitae tempora neque ad saepe nisi ea harum aperiam consectetur porro voluptatibus, aut maiores fugiat expedita minima. Cumque fugiat, fuga vitae neque nesciunt labore aspernatur rerum ratione amet dolor omnis rem.</p>
      </div>
    </div>

    <div>
      <ExperienceTimeline></ExperienceTimeline>
    </div>

</>
  );
}
