import { gsap } from "./gsap";
import { posterHTML } from "../data/movies";

// Brik-style click: a circle of the new color spreads from the click point and repaints the accent.
export function setTheme(color, x, y) {
  const w = document.createElement("div");
  w.className = "wipe";
  w.style.left = x + "px";
  w.style.top = y + "px";
  w.style.background = color;
  document.body.appendChild(w);
  gsap.to(w, {
    scale: Math.hypot(innerWidth, innerHeight), duration: 0.9, ease: "power3.inOut",
    onComplete() {
      document.documentElement.style.setProperty("--a", color);
      gsap.to(w, { opacity: 0, duration: 0.5, onComplete: () => w.remove() });
    },
  });
}

// Artlab-style collecting: the poster flies from where you clicked into the Watchlist button.
export function flyToWatchlist(m, from, done) {
  const target = document.getElementById("wb");
  if (!from || !target) { done && done(); return; }
  const r = from.getBoundingClientRect(), to = target.getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "fly";
  f.innerHTML = posterHTML(m);
  f.style.left = r.left + "px";
  f.style.top = r.top + "px";
  document.body.appendChild(f);
  gsap.to(f, {
    x: to.left - r.left, y: to.top - r.top, scale: 0.25, opacity: 0.5, duration: 0.8, ease: "power2.in",
    onComplete() { f.remove(); done && done(); },
  });
}
