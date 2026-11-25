import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Footer() {
  const ref = useRef();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".disp", { yPercent: 30, opacity: 0, scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 30%", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <footer ref={ref}>
      <div className="disp">Keep<br />watching.</div>
      <p style={{ marginTop: 22 }}>Reelhouse is a sample front-end project inspired by movie databases. All titles, people and posters are fictional.</p>
    </footer>
  );
}
