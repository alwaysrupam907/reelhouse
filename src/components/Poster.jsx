import { ART } from "../data/movies";

export default function Poster({ m }) {
  return (
    <div className="poster" style={{ background: `linear-gradient(160deg,${m.a},${m.b})` }}>
      <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART[m.k] }} />
      <b>{m.t}</b>
      <i>{m.y}</i>
    </div>
  );
}
