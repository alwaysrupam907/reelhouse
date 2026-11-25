import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "../lib/gsap";
import Poster from "./Poster";
import { M } from "../data/movies";

// The section pins in place and the cards travel sideways as you scroll down.
export default function TopTen({ onOpen }) {
  const sec = useRef(), track = useRef();
  const top = useMemo(() => [...M].sort((a, b) => b.r - a.r).slice(0, 10), []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () => -(track.current.scrollWidth - innerWidth + 40), ease: "none",
        scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, end: () => "+=" + (track.current.scrollWidth - innerWidth), invalidateOnRefresh: true },
      });
      gsap.utils.toArray(".tcard .poster").forEach((el, i) =>
        gsap.fromTo(el, { yPercent: i % 2 ? 8 : -8 }, { yPercent: i % 2 ? -8 : 8, ease: "none", scrollTrigger: { trigger: sec.current, scrub: true } })
      );
    }, sec);
    return () => ctx.revert();
  }, []);
  return (
    <section id="top10" ref={sec}>
      <h2>Top 10 <span style={{ color: "var(--a)" }}>this week</span></h2>
      <div id="track" ref={track}>
        {top.map((m, i) => (
          <button key={m.id} className="tcard" aria-label={m.t} onClick={() => onOpen(m.id)}>
            <Poster m={m} />
            <span className="rk">{i + 1}</span>
            <div className="meta"><span>{m.t}</span><span className="star">★ {m.r}</span></div>
          </button>
        ))}
      </div>
    </section>
  );
}
