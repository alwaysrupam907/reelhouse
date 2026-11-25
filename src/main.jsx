import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// StrictMode is left off on purpose: it runs effects twice in development,
// which would double-create the GSAP scroll effects.
createRoot(document.getElementById("root")).render(<App />);
