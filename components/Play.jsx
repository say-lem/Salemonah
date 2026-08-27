"use client";

import { useEffect } from "react";
import { useGameStore, BOARD } from "@/store/useGameStore";
import Reveal from "./Reveal";
import { SECTION, EYEBROW, SECTION_TITLE, BTN } from "@/lib/styles";

const SQ_BASE =
  "bg-surface-2 border border-line rounded-md flex items-center justify-center cursor-pointer text-[20px] transition-colors duration-150 motion-reduce:transition-none";

export default function Play() {
  const {
    difficulty,
    knightPos,
    targets,
    hits,
    goalPos,
    path,
    moves,
    optimalMoves,
    mistakes,
    bestTime,
    lastResult,
    initGame,
    clickSquare,
  } = useGameStore();

  // Randomize the board client-side only, after mount — keeps the very
  // first render identical between server and client.
  useEffect(() => {
    initGame();
  }, [initGame]);

  const isMedium = difficulty === "medium";
  const movesLeft = Math.max(targets.size - hits.size, 0);

  const MISS_CLASSES = ["animate-shake", "motion-reduce:animate-none", "!border-[#e0645a]"];

  function handleClick(r, c, event) {
    const result = clickSquare(r, c);
    if (result === "miss") {
      const el = event.currentTarget;
      el.classList.remove(...MISS_CLASSES);
      void el.offsetWidth; // restart the animation
      el.classList.add(...MISS_CLASSES);
      setTimeout(() => el.classList.remove(...MISS_CLASSES), 300);
    }
  }

  const squares = [];
  for (let r = 0; r < BOARD; r++) {
    for (let c = 0; c < BOARD; c++) {
      const key = `${r},${c}`;
      const isKnight = r === knightPos.r && c === knightPos.c;

      if (isMedium) {
        const isGoal = goalPos && r === goalPos.r && c === goalPos.c;
        const isPath = path.has(key);
        const stateClasses = isGoal
          ? "bg-gold/[16%] border-gold text-gold"
          : isPath
          ? "bg-teal/10 border-teal text-teal"
          : "hover:border-teal";
        squares.push(
          <div
            key={key}
            className={`${SQ_BASE} ${stateClasses}`}
            onClick={(e) => !isKnight && handleClick(r, c, e)}
          >
            {isKnight ? (
              <span className="inline-block animate-pop motion-reduce:animate-none">
                ♞
              </span>
            ) : isGoal ? (
              "★"
            ) : isPath ? (
              "•"
            ) : (
              ""
            )}
          </div>
        );
        continue;
      }

      const isHit = hits.has(key);
      squares.push(
        <div
          key={key}
          className={`${SQ_BASE} ${
            isHit ? "bg-teal/[18%] border-teal" : "hover:border-teal"
          }`}
          onClick={(e) => !isKnight && handleClick(r, c, e)}
        >
          {isKnight ? (
            <span className="inline-block animate-pop motion-reduce:animate-none">
              ♞
            </span>
          ) : isHit ? (
            "✓"
          ) : (
            ""
          )}
        </div>
      );
    }
  }

  return (
    <section id="play" className={SECTION}>
      <Reveal>
        <div className={EYEBROW}>take a break</div>
        <h2 className={SECTION_TITLE}>Knight&apos;s Reach</h2>
        <div className="flex gap-2.5 mt-3.5 mb-5">
          <button
            className={`font-mono text-[12.5px] bg-surface border border-line py-[7px] px-4 rounded-full cursor-pointer transition-colors duration-200 ${
              !isMedium
                ? "text-gold border-gold bg-gold/10"
                : "text-text-dim hover:text-text"
            }`}
            onClick={() => initGame("easy")}
          >
            easy
          </button>
          <button
            className={`font-mono text-[12.5px] bg-surface border border-line py-[7px] px-4 rounded-full cursor-pointer transition-colors duration-200 ${
              isMedium
                ? "text-gold border-gold bg-gold/10"
                : "text-text-dim hover:text-text"
            }`}
            onClick={() => initGame("medium")}
          >
            medium
          </button>
        </div>
        <div className="bg-surface border border-line rounded-xl p-[26px] flex flex-wrap gap-7 items-center justify-center">
          <div className="grid grid-cols-[repeat(5,48px)] grid-rows-[repeat(5,48px)] gap-1 max-[480px]:grid-cols-[repeat(5,42px)] max-[480px]:grid-rows-[repeat(5,42px)]">
            {squares}
          </div>
          <div className="font-mono text-[13px] max-w-[260px]">
            {isMedium ? (
              <>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  moves <b className="text-text">{moves}</b>
                </div>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  optimal <b className="text-text">{optimalMoves}</b>
                </div>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  mistakes <b className="text-text">{mistakes}</b>
                </div>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  best time{" "}
                  <b className="text-text">
                    {bestTime.medium !== null ? `${bestTime.medium}s` : "—"}
                  </b>
                </div>
                <p className="text-text-dim text-[0.85rem] mt-2.5 mb-4 font-body">
                  Guide the knight (♞) to the star using only legal knight
                  moves. Find the shortest path and do it fast — the fewer
                  moves, the closer to optimal.
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  moves left <b className="text-text">{movesLeft}</b>
                </div>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  mistakes <b className="text-text">{mistakes}</b>
                </div>
                <div className="flex justify-between mb-1.5 text-text-dim">
                  best time{" "}
                  <b className="text-text">
                    {bestTime.easy !== null ? `${bestTime.easy}s` : "—"}
                  </b>
                </div>
                <p className="text-text-dim text-[0.85rem] mt-2.5 mb-4 font-body">
                  The knight is on the board. Click every square it could
                  legally move to in one move — no repeats, no wrong squares.
                  Beat your own time.
                </p>
              </>
            )}
            <button className={BTN} onClick={() => initGame(difficulty)}>
              reset board
            </button>
            <div className="text-teal font-mono text-[12.5px] mt-2.5 min-h-[16px]">
              {lastResult
                ? isMedium
                  ? `Reached the goal in ${lastResult.elapsed}s using ${lastResult.moves} move${
                      lastResult.moves === 1 ? "" : "s"
                    } (optimal was ${lastResult.optimalMoves}) with ${
                      lastResult.mistakes
                    } mistake${lastResult.mistakes === 1 ? "" : "s"}.`
                  : `Found every square in ${lastResult.elapsed}s with ${lastResult.mistakes} mistake${
                      lastResult.mistakes === 1 ? "" : "s"
                    }. Nicely played.`
                : ""}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
