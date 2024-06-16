import { ContentContainer } from "@components/ContentContainer";
import { Header } from "@components/Header";
import { Hero } from "@components/Hero";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import type { OptimizedImageDetails } from "src/utils/getOptimizedImageSrc";

type Props = {
  headshot: OptimizedImageDetails;
};

export function HeroFancy({ headshot }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    ref.current?.style.setProperty("--scroll", latest.toString());
  });

  return (
    <div ref={ref}>
      <Header />
      <ContentContainer className="pt-36 mb-36">
        <Hero
          title="I like to build."
          description={description}
          headshot={headshot}
        />
      </ContentContainer>
      {/* <motion.div style={{ marginLeft: scrollY * 100 }}>Hey</motion.div> */}
    </div>
  );
}

const description = `TypeScript connoisseur. Animation aficionado. Frontend web, mostly React and Next.js. Cross-platform mobile with React Native. Backend with Node.js and Python. Have written an SQL query or two. Can wrangle the cloud when needed.`;
