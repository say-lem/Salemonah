import { create } from "zustand";

export const facts = [
  "Quicksort's worst case is O(n²), but its average case beats merge sort in practice because of better cache locality.",
  "Dijkstra's algorithm doesn't work correctly with negative edge weights — that's what the Bellman-Ford algorithm is for.",
  "A hash table's O(1) lookup is actually amortized — collisions can degrade it to O(n) in the worst case.",
  "The A* search algorithm is basically Dijkstra's algorithm with a heuristic that tells it which direction looks promising.",
  "Binary search only works on sorted data — but once it does, it turns a million items into about 20 comparisons.",
  "Merge sort was one of the first algorithms designed for external sorting, back when data didn't fit in memory at all.",
  "The traveling salesman problem is NP-hard — there's no known algorithm that solves it quickly for large inputs.",
  "Bloom filters can tell you 'definitely not present' with certainty, but 'probably present' only with high probability.",
  "Big-O notation describes growth rate, not actual speed — an O(n) algorithm can still be slower than O(n²) for small n.",
  "Dynamic programming is really just recursion with a memory — cache the answer once, never recompute it.",
  "The knight's tour problem asks if a knight can visit every square on a chessboard exactly once — it's solvable on a standard board.",
  "Consistent hashing was invented so distributed caches wouldn't have to reshuffle everything when a server joins or leaves.",
  "Huffman coding builds shorter codes for common symbols — it's part of why ZIP and JPEG compression work at all.",
  "Depth-first search uses a stack, breadth-first search uses a queue — same graph, completely different exploration order.",
  "Two-pointer techniques can turn an O(n²) array problem into O(n) just by moving from both ends inward.",
  "The birthday paradox is why hash collisions happen far sooner than intuition suggests — 23 people, 50% chance of a match.",
];

// index starts at 0 (not random) for the same SSR-safety reason as the game
// store — init() is called client-side to pick a random starting fact.
export const useFactsStore = create((set, get) => ({
  index: 0,
  initialized: false,

  init: () => {
    if (get().initialized) return;
    set({ index: Math.floor(Math.random() * facts.length), initialized: true });
  },

  next: () => set((state) => ({ index: (state.index + 1) % facts.length })),
}));
