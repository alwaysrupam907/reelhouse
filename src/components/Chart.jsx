import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Poster from "./Poster";
import { M, byId } from "../data/movies";

export default function Chart({ genre, wl, onOpen, onAdd }) {
  const sec = useRef(), pv = useRef(), q = useRef(), shown = useRef(0);
  const [pvId, setPvId] = useState(0);
  const list = useMemo(() => M.filter((m) => genre === "All" || m.g === genre).sort((a, b) => b.r - a.r), [genre]);

  // Rows slide in each time the genre filter changes.
  useEffect(() => {
    const rows = sec.current.querySelectorAll(".row");
    gsap.from(rows, { y: 40, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" });
    ScrollTrigger.refresh();
  }, [list]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("h2", { y: 60, opacity: 0, scrollTrigger: { trigger: sec.current, start: "top 90%", end: "top 60%", scrub: true } });
    }, sec);
    q.current = { x: gsap.quickTo(pv.current, "x", { duration: 0.4 }), y: gsap.quickTo(pv.current, "y", { duration: 0.4 }) };
    return () => ctx.revert();
  }, []);

  const hide = () => { shown.current = 0; setPvId(0); gsap.to(pv.current, { opacity: 0, scale: 0.7, duration: 0.2, overwrite: "auto" }); };
  useEffect(() => { addEventListener("scroll", hide, { passive: true }); return () => removeEventListener("scroll", hide); }, []);

  // The poster that follows the cursor only shows while a row is hovered.
  const move = (e) => {
    const r = e.target.closest(".row");
    if (!r) { hide(); return; }
    const id = +r.dataset.id;
    if (id !== shown.current) {
      shown.current = id;
      setPvId(id);
      gsap.to(pv.current, { opacity: 1, scale: 1, rotate: -4, duration: 0.35, overwrite: "auto" });
    }
    q.current.x(e.clientX + 30);
    q.current.y(e.clientY - 120);
  };

  return (
    <section className="sec" ref={sec}>
      <h2>Top rated <span style={{ color: "var(--a)" }}>{genre === "All" ? "all" : genre.toLowerCase()}</span></h2>
      <div onMouseMove={move} onMouseLeave={hide}>
        {list.map((m, i) => (
          <div className="row" key={m.id} data-id={m.id} onClick={() => onOpen(m.id)}>
            <span className="rk">{i + 1}</span>
            <span><Poster m={m} /></span>
            <div><h3>{m.t}</h3><small>{m.y} · {m.m} min · {m.g}</small></div>
            <span className="sc"><span className="star">★</span>{m.r}</span>
            <button className={"add" + (wl.includes(m.id) ? " on" : "")} aria-label={`Add ${m.t} to watchlist`} onClick={(e) => { e.stopPropagation(); onAdd(m.id, e.currentTarget); }}>
              {wl.includes(m.id) ? "✓" : "+"}
            </button>
          </div>
        ))}
      </div>
      <div id="pv" ref={pv}>{pvId ? <Poster m={byId(pvId)} /> : null}</div>
    </section>
  );
}
