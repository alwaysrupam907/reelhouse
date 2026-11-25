# Reelhouse (movie database front-end)

An IMDb-inspired front-end built with React + Vite, GSAP (ScrollTrigger) and Lenis smooth scroll.
All movies, people and posters are fictional.

## Run
```
npm install
npm run dev
```
Open the link it prints (usually http://localhost:5173). Build: `npm run build`.

## Where things are
```
index.html              page shell and fonts
src/index.css           all styling
src/data/movies.js      movies, genre colors, poster artwork
src/lib/                gsap setup, smooth scroll (Lenis), click effects (theme wipe, fly-to-watchlist)
src/components/         Preloader, Cursor, Header, Hero, Marquee, TopTen, About, Chart, Frames,
                        Stats, Footer, Modal, Drawer, Poster
src/App.jsx             state: genre, watchlist, ratings, modal, drawer
```

## Effects
- Counter preloader, masked headline reveal, smooth scrolling
- Marquee that speeds up with scroll velocity
- Pinned horizontal scroll (Top 10) with parallax posters
- Words light up as you scroll
- Genre click repaints the site from the click point
- Collect a film: it flies into the Watchlist and reveals a trivia line
- Poster trail that follows the mouse, hover preview on the chart, grain overlay, custom cursor

## Make it yours
Edit `src/data/movies.js` (titles, ratings, colors) and the text in the components.
