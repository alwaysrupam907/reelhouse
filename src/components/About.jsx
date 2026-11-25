import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const TEXT = "Films are a way of collecting moments. We rank them by what people feel, not what studios spend. Click any poster to rate it, then add it to your watchlist and keep what you find.";

// Each word lights up as you scroll through the paragraph.
export default function About() {
  const ref = useRef();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about .w", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="about" ref={ref}>
      <p>{TEXT.split(" ").map((w, i) => <span className="w" key={i}>{w}</span>)}</p>
    </section>
  );
}
