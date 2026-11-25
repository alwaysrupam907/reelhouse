import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Poster from "./Poster";

export default function Modal({ m, rating, onRate, inWL, onAdd, onClose }) {
  const box = useRef();
  useEffect(() => { gsap.fromTo(box.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }); }, []);
  return (
    <div id="modal" style={{ display: "grid" }} role="dialog" aria-modal="true" aria-label={m.t} onClick={(e) => { if (e.target.id === "modal") onClose(); }}>
      <div className="mbox" ref={box}>
        <button className="x" aria-label="Close" onClick={onClose}>×</button>
        <Poster m={m} />
        <div>
          <small style={{ color: "var(--a)", fontWeight: 700 }}>{m.g.toUpperCase()}</small>
          <h2>{m.t}</h2>
          <div className="score">
            <div className="ringsc" style={{ "--p": m.r * 10 }}><i>{m.r}</i></div>
            <div><b>{m.r}/10</b><br /><small style={{ color: "var(--dim)" }}>{m.y} · {m.m} min</small></div>
          </div>
          <p className="ov">{m.o}</p>
          <dl><dt>Director</dt><dd>{m.d}</dd><dt>Cast</dt><dd>{m.c.join(", ")}</dd></dl>
          <p style={{ margin: "16px 0 6px", fontWeight: 700 }}>Rate this <span style={{ color: "var(--a)" }}>{rating ? "You rated " + rating + "/10" : ""}</span></p>
          <div className="stars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <button key={n} className={rating >= n ? "on" : ""} aria-label={`${n} stars`} onClick={() => onRate(n)}>★</button>
            ))}
          </div>
          <button className="pri" onClick={(e) => onAdd(m.id, e.currentTarget)}>{inWL ? "✓ In watchlist" : "+ Add to watchlist"}</button>
        </div>
      </div>
    </div>
  );
}
