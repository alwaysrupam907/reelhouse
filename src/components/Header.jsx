import { useState } from "react";
import Poster from "./Poster";
import { M } from "../data/movies";

export default function Header({ count, onWatchlist, onOpen }) {
  const [q, setQ] = useState("");
  const v = q.trim().toLowerCase();
  const list = v ? M.filter((m) => (m.t + m.d + m.c.join(" ")).toLowerCase().includes(v)).slice(0, 5) : null;
  return (
    <header>
      <a className="logo" href="#"><b>R</b>REELHOUSE</a>
      <div className="sbox">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, cast, directors" aria-label="Search" autoComplete="off" />
        <div id="res" style={{ display: list ? "block" : "none" }}>
          {list && (list.length ? list.map((m) => (
            <button key={m.id} onClick={() => { setQ(""); onOpen(m.id); }}>
              <Poster m={m} />
              <span><b>{m.t}</b><br /><small style={{ color: "var(--dim)" }}>{m.y} · {m.g}</small></span>
            </button>
          )) : <div style={{ padding: 12, color: "var(--dim)" }}>No results. Try another name.</div>)}
        </div>
      </div>
      <button className="wbtn" id="wb" data-cur="Open" onClick={onWatchlist}>Watchlist <span>{count}</span></button>
    </header>
  );
}
