import { useEffect, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { GEN } from "../data/movies";

export default function Hero({ ready, genre, onPick }) {
  // Hide the text first, then reveal it when the preloader lifts (masked line reveal).
  useLayoutEffect(() => {
    gsap.set(".hero .line>span", { yPercent: 115 });
    gsap.set(".hero p,.hero .chips,.hero .hint", { opacity: 0, y: 30 });
  }, []);
  useEffect(() => {
    if (!ready) return;
    gsap.to(".hero .line>span", { yPercent: 0, stagger: 0.12, duration: 1.1, ease: "expo.out" });
    gsap.to(".hero p,.hero .chips,.hero .hint", { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, delay: 0.4 });
  }, [ready]);
  return (
    <section className="hero">
      <h1>
        <span className="line"><span>Every film.</span></span>
        <span className="line"><span>Every <em className="acc" style={{ fontStyle: "normal" }}>frame.</em></span></span>
        <span className="line"><span>Rated.</span></span>
      </h1>
      <p>Browse, rate and collect the movies everyone is talking about. Pick a genre to repaint the whole site.</p>
      <div className="chips">
        {Object.keys(GEN).map((g) => (
          <button key={g} className="chip" aria-pressed={g === genre} onClick={(e) => onPick(g, e)}>{g}</button>
        ))}
      </div>
      <div className="hint">Tip: click a genre. Then keep scrolling.</div>
    </section>
  );
}
