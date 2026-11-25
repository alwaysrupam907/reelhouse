import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { M } from "../data/movies";

// Runs sideways on its own and speeds up when you scroll fast.
export default function Marquee() {
  const ref = useRef();
  useEffect(() => {
    let x = 0, vel = 0;
    const st = ScrollTrigger.create({ onUpdate: (s) => { vel = s.getVelocity(); } });
    const tick = () => {
      x -= 1.2 + Math.min(Math.abs(vel) / 260, 14) * (vel < 0 ? -1 : 1);
      vel *= 0.9;
      const w = ref.current.scrollWidth / 2;
      if (x < -w) x += w;
      if (x > 0) x -= w;
      gsap.set(ref.current, { x });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); };
  }, []);
  return (
    <div className="mq">
      <div id="mq" ref={ref}>{[...M, ...M].map((m, i) => <span key={i}>{m.t}</span>)}</div>
    </div>
  );
}
