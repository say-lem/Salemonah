# Salem — Portfolio

Next.js (App Router) port of the portfolio, with Zustand handling the two
pieces of real interactive state: the Knight's Reach game and the algorithm
facts ticker.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `app/page.js` — assembles the page from the components below.
- `app/globals.css` — the whole design system (colors, type, layout).
- `components/Hero.jsx` — the typed terminal intro.
- `components/Projects.jsx`, `components/Experience.jsx` — **dummy content,
  edit the arrays at the top of each file** with your real projects and roles.
- `components/Play.jsx` — Knight's Reach, reads/writes `store/useGameStore.js`.
- `components/Facts.jsx` — the "did you know" ticker, reads/writes
  `store/useFactsStore.js`. Add or edit facts in that file's `facts` array.
- `components/Footer.jsx` — swap in your real email/GitHub/LinkedIn links.

## Why the stores look the way they do

Both stores start in a fixed, non-random state (`knightPos: {r:0,c:0}`,
`index: 0`) and only randomize inside a `useEffect` after the component
mounts. Next.js renders once on the server and once on the client for
hydration — if `Math.random()` ran during that first render, the server and
client outputs wouldn't match and React would throw a hydration error. Both
components call an `init()`/`initGame()` action on mount to do the
randomizing safely, client-side only.
