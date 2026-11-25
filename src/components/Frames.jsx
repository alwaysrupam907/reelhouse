import { useRef } from "react";
import { gsap } from "../lib/gsap";
import { M, posterHTML } from "../data/movies";

// Almirakho-style visual: move the mouse and posters trail behind it.
export default function Frames() {
  const ref = useRef();
  const st = useRef({ lx: 0, ly: 0, n: 0, z: 1 });
  const onMove = (e) => {
    const f = ref.current, r = f.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, s = st.current;
    if (Math.hypot(x - s.lx, y - s.ly) < 90) return;
    s.lx = x; s.ly = y;
    const m = M[s.n++ % M.length], d = document.createElement("div");
    d.className = "tr";
    d.innerHTML = posterHTML(m);
    d.style.left = x - 65 + "px";
    d.style.top = y - 97 + "px";
    d.style.zIndex = (s.z++ % 2) + 1;
    f.appendChild(d);
    gsap.fromTo(d, { scale: 0.5, opacity: 0, rotate: gsap.utils.random(-12, 12) }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(d, { opacity: 0, scale: 0.8, y: -30, delay: 0.7, duration: 0.6, onComplete: () => d.remove() });
  };
  return (
    <section id="frames" ref={ref} data-cur="Move" onMouseMove={onMove}>
      <h2 className="disp">Frames</h2>
      <p>Move your mouse across this section.</p>
    </section>
  );
}
