import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// Custom cursor with labels, plus a ring that expands on every click.
export default function Cursor() {
  const cur = useRef(), label = useRef();
  useEffect(() => {
    const c = cur.current, l = label.current;
    const cx = gsap.quickTo(c, "x", { duration: 0.25 }), cy = gsap.quickTo(c, "y", { duration: 0.25 });
    const move = (e) => { cx(e.clientX); cy(e.clientY); };
    const over = (e) => {
      const t = e.target.closest && e.target.closest("[data-cur],button,a,.row,.tcard");
      if (t) {
        const txt = t.dataset.cur || (t.classList.contains("row") || t.classList.contains("tcard") ? "View" : "");
        gsap.to(c, { width: txt ? 64 : 30, height: txt ? 64 : 30, marginLeft: txt ? -32 : -15, marginTop: txt ? -32 : -15, duration: 0.25 });
        l.textContent = txt;
        gsap.to(l, { opacity: txt ? 1 : 0, duration: 0.2 });
      } else {
        gsap.to(c, { width: 14, height: 14, marginLeft: -7, marginTop: -7, duration: 0.25 });
        gsap.to(l, { opacity: 0, duration: 0.1 });
      }
    };
    const click = (e) => {
      const r = document.createElement("div");
      r.className = "ring";
      r.style.left = e.clientX + "px";
      r.style.top = e.clientY + "px";
      document.body.appendChild(r);
      gsap.to(r, { scale: 7, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => r.remove() });
    };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    addEventListener("click", click);
    return () => { removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); removeEventListener("click", click); };
  }, []);
  return <div id="cur" ref={cur}><span ref={label}></span></div>;
}
