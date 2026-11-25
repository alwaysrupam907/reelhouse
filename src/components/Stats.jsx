import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const STATS = [[12400, "titles in this sample"], [4200000, "ratings cast"], [98, "countries"], [10, "stars, max"]];
const fmt = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function Num({ n }) {
  const r = useRef();
  useEffect(() => {
    const o = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: r.current, start: "top 90%", once: true,
      onEnter: () => gsap.to(o, { v: n, duration: 1.8, ease: "power2.out", onUpdate: () => { r.current.textContent = fmt.format(Math.round(o.v)); } }),
    });
    return () => st.kill();
  }, [n]);
  return <b ref={r}>0</b>;
}

export default function Stats() {
  return (
    <section className="sec">
      <div className="stats">
        {STATS.map(([n, label]) => <div className="stat" key={label}><Num n={n} /><span>{label}</span></div>)}
      </div>
    </section>
  );
}
