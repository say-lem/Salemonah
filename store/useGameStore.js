import { create } from "zustand";

export const BOARD = 5;

function knightMoves(r, c) {
  const deltas = [
    [1, 2], [2, 1], [-1, 2], [-2, 1],
    [1, -2], [2, -1], [-1, -2], [-2, -1],
  ];
  return deltas
    .map(([dr, dc]) => [r + dr, c + dc])
    .filter(([nr, nc]) => nr >= 0 && nr < BOARD && nc >= 0 && nc < BOARD);
}

function randomSquare() {
  return {
    r: Math.floor(Math.random() * BOARD),
    c: Math.floor(Math.random() * BOARD),
  };
}

function knightDistance(start, goal) {
  if (start.r === goal.r && start.c === goal.c) return 0;
  const seen = new Set([`${start.r},${start.c}`]);
  let frontier = [start];
  let dist = 0;
  while (frontier.length) {
    dist++;
    const next = [];
    for (const { r, c } of frontier) {
      for (const [nr, nc] of knightMoves(r, c)) {
        if (nr === goal.r && nc === goal.c) return dist;
        const key = `${nr},${nc}`;
        if (!seen.has(key)) {
          seen.add(key);
          next.push({ r: nr, c: nc });
        }
      }
    }
    frontier = next;
  }
  return Infinity;
}

function freshEasyBoard() {
  const knightPos = randomSquare();
  const targets = new Set(
    knightMoves(knightPos.r, knightPos.c).map(([r, c]) => `${r},${c}`)
  );
  return { knightPos, targets };
}

// Picks a start/goal pair whose shortest knight path is 2-4 moves — long
// enough to require real pathfinding, short enough to stay quick to play.
function freshMediumBoard() {
  let start = randomSquare();
  let goal = randomSquare();
  let dist = knightDistance(start, goal);
  let attempts = 0;
  while ((dist < 2 || dist > 4) && attempts < 200) {
    start = randomSquare();
    goal = randomSquare();
    dist = knightDistance(start, goal);
    attempts++;
  }
  return { start, goal, optimalMoves: dist };
}

// Board starts deterministic (r:0,c:0, no targets) so server and first client
// render match. initGame() is called client-side on mount to randomize it —
// this avoids a hydration mismatch from Math.random() running during SSR.
export const useGameStore = create((set, get) => ({
  difficulty: "easy",
  knightPos: { r: 0, c: 0 },
  targets: new Set(),
  hits: new Set(),
  goalPos: null,
  path: new Set(),
  moves: 0,
  optimalMoves: 0,
  mistakes: 0,
  startTime: null,
  timerRunning: false,
  bestTime: { easy: null, medium: null },
  lastResult: null,

  initGame: (difficulty) => {
    const mode = difficulty || get().difficulty;
    const shared = {
      difficulty: mode,
      mistakes: 0,
      startTime: null,
      timerRunning: false,
      lastResult: null,
    };

    if (mode === "medium") {
      const { start, goal, optimalMoves } = freshMediumBoard();
      set({
        ...shared,
        knightPos: start,
        goalPos: goal,
        optimalMoves,
        path: new Set(),
        moves: 0,
        targets: new Set(),
        hits: new Set(),
      });
    } else {
      const { knightPos, targets } = freshEasyBoard();
      set({
        ...shared,
        knightPos,
        targets,
        hits: new Set(),
        goalPos: null,
        path: new Set(),
        moves: 0,
      });
    }
  },

  // Returns 'knight' | 'already' | 'hit' | 'win' | 'miss' so the component
  // can trigger the shake animation without owning game state itself.
  clickSquare: (r, c) => {
    const state = get();
    const key = `${r},${c}`;
    const knightKey = `${state.knightPos.r},${state.knightPos.c}`;

    if (key === knightKey) return "knight";

    if (state.difficulty === "medium") {
      const legal = new Set(
        knightMoves(state.knightPos.r, state.knightPos.c).map(
          ([mr, mc]) => `${mr},${mc}`
        )
      );

      let timerRunning = state.timerRunning;
      let startTime = state.startTime;
      if (!timerRunning) {
        timerRunning = true;
        startTime = Date.now();
      }

      if (!legal.has(key)) {
        set({ mistakes: state.mistakes + 1, timerRunning, startTime });
        return "miss";
      }

      const path = new Set(state.path);
      path.add(key);
      const moves = state.moves + 1;
      const knightPos = { r, c };
      const isGoal = key === `${state.goalPos.r},${state.goalPos.c}`;

      if (isGoal) {
        const elapsed = parseFloat(
          ((Date.now() - startTime) / 1000).toFixed(1)
        );
        const bestTime = { ...state.bestTime };
        if (bestTime.medium === null || elapsed < bestTime.medium) {
          bestTime.medium = elapsed;
        }
        const lastResult = {
          elapsed,
          mistakes: state.mistakes,
          moves,
          optimalMoves: state.optimalMoves,
        };
        set({
          knightPos,
          path,
          moves,
          timerRunning: false,
          startTime,
          bestTime,
          lastResult,
        });
        return "win";
      }

      set({ knightPos, path, moves, timerRunning, startTime });
      return "hit";
    }

    if (state.hits.has(key)) return "already";

    let timerRunning = state.timerRunning;
    let startTime = state.startTime;
    if (!timerRunning) {
      timerRunning = true;
      startTime = Date.now();
    }

    if (state.targets.has(key)) {
      const hits = new Set(state.hits);
      hits.add(key);
      const won = hits.size === state.targets.size;

      let bestTime = state.bestTime;
      let lastResult = state.lastResult;

      if (won) {
        const elapsed = parseFloat(((Date.now() - startTime) / 1000).toFixed(1));
        bestTime = { ...state.bestTime };
        if (bestTime.easy === null || elapsed < bestTime.easy) {
          bestTime.easy = elapsed;
        }
        lastResult = { elapsed, mistakes: state.mistakes };
        timerRunning = false;
      }

      set({ hits, timerRunning, startTime, bestTime, lastResult });
      return won ? "win" : "hit";
    }

    set({ mistakes: state.mistakes + 1, timerRunning, startTime });
    return "miss";
  },
}));
