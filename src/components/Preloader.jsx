import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader({ onReveal }) {
  const [gone, setGone] = useState(false);
  const root = useRef(), num = useRef(), bar = useRef();
  useEffect(() => {
    let raf, t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / 1500, 1), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      num.current.textContent = Math.round(e * 100);
      bar.current.style.width = e * 100 + "%";
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        onReveal();
        gsap.to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: () => setGone(true) });
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (gone) return null;
  return (
    <div id="pre" ref={root}>
      <div className="disp" style={{ fontSize: "1rem" }}>Reelhouse</div>
      <div>
        <div className="n disp" ref={num}>0</div>
        <div className="bar"><i ref={bar}></i></div>
      </div>
    </div>
  );
}
