import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { initSmooth, getLenis } from "./lib/smooth";
import { setTheme, flyToWatchlist } from "./lib/fx";
import { GEN, byId } from "./data/movies";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import TopTen from "./components/TopTen";
import About from "./components/About";
import Chart from "./components/Chart";
import Frames from "./components/Frames";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Drawer from "./components/Drawer";

export default function App() {
  const [ready, setReady] = useState(false);
  const [genre, setGenre] = useState("All");
  const [wl, setWl] = useState([]);
  const [rated, setRated] = useState({});
  const [openId, setOpenId] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState({ text: "", show: false });
  const timer = useRef();

  useEffect(() => { initSmooth(); }, []);
  useEffect(() => { if (ready) ScrollTrigger.refresh(); }, [ready]);
  useEffect(() => { const l = getLenis(); if (l) (openId ? l.stop() : l.start()); }, [openId]);
  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") { setOpenId(null); setDrawer(false); } };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);

  const flash = (text) => {
    setToast({ text, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600);
  };

  // Brik-style: picking a genre repaints the site from the click point.
  const pickGenre = (g, e) => {
    setTheme(GEN[g], e.clientX, e.clientY);
    setTimeout(() => setGenre(g), 500);
  };

  // Artlab-style: collecting a film flies it into the watchlist and reveals a trivia line.
  const add = (id, from) => {
    if (wl.includes(id)) { flash("Already in your watchlist"); return; }
    const m = byId(id);
    setWl((w) => [...w, id]);
    flyToWatchlist(m, from, () => {
      gsap.fromTo("#wb", { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
      flash("“" + m.q + "”");
    });
  };

  const open = openId ? byId(openId) : null;
  return (
    <>
      <div className="grain"></div>
      <Cursor />
      <Preloader onReveal={() => setReady(true)} />
      <Header count={wl.length} onWatchlist={() => setDrawer(true)} onOpen={setOpenId} />
      <Hero ready={ready} genre={genre} onPick={pickGenre} />
      <Marquee />
      <TopTen onOpen={setOpenId} />
      <About />
      <Chart genre={genre} wl={wl} onOpen={setOpenId} onAdd={add} />
      <Frames />
      <Stats />
      <Footer />
      {open && (
        <Modal m={open} rating={rated[open.id]} onRate={(n) => setRated((r) => ({ ...r, [open.id]: n }))}
          inWL={wl.includes(open.id)} onAdd={add} onClose={() => setOpenId(null)} />
      )}
      <Drawer open={drawer} wl={wl} onClose={() => setDrawer(false)} onRemove={(id) => setWl((w) => w.filter((x) => x !== id))} />
      <div id="toast" className={toast.show ? "show" : ""} role="status">{toast.text}</div>
    </>
  );
}
