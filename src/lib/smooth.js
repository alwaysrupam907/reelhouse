import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis = null;

// Smooth scrolling (the "Surya Aditya" style feel).
export function initSmooth() {
  if (lenis || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({ lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
export const getLenis = () => lenis;
