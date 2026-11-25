import Poster from "./Poster";
import { byId } from "../data/movies";

export default function Drawer({ open, wl, onRemove, onClose }) {
  return (
    <aside id="drawer" className={open ? "open" : ""} aria-label="Watchlist">
      <button className="x" aria-label="Close" onClick={onClose}>×</button>
      <h2>Your watchlist</h2>
      <p style={{ color: "var(--dim)", margin: "0 0 14px" }}>What you collect, and the trivia you found.</p>
      {wl.length ? wl.map((id) => {
        const m = byId(id);
        return (
          <div className="wi" key={id}>
            <Poster m={m} />
            <div><b>{m.t}</b><q>“{m.q}”</q></div>
            <button className="add" aria-label="Remove" onClick={() => onRemove(id)}>×</button>
          </div>
        );
      }) : <p style={{ color: "var(--dim)" }}>Nothing yet. Add a film from the chart or any poster.</p>}
    </aside>
  );
}
