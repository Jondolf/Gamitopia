import { Coord } from "../types/coord";
import { Grid } from "../types/grid";
import { checkGameState } from "./checkGameState";

const scores = {
  X: -10,
  O: 10,
  Tie: 0
};

export function findBestMove(grid: Grid, targetSymbolRowLength: number) {
  let bestScore = -Infinity;
  let move: Coord;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == ' ') {
        grid[y][x] = 'O';
        const score = minimax(grid, 0, 3, -Infinity, Infinity, false);
        grid[y][x] = ' ';
        if (score > bestScore) {
          bestScore = score;
          move = { x, y };
        }
      }
    }
  }

  function minimax(grid: Grid, depth: number, maxDepth: number, alpha: number, beta: number, isMaximizing: boolean) {

    const result = checkGameState(grid, targetSymbolRowLength);
    if (result !== ' ' || (result !== ' ' && depth >= maxDepth)) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      outer: for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          if (grid[y][x] === ' ') {
            grid[y][x] = 'O';
            const score = minimax(grid, depth + 1, maxDepth, alpha, beta, false);
            bestScore = Math.max(score, bestScore);
            grid[y][x] = ' ';
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
              break outer;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      outer: for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          if (grid[y][x] === ' ') {
            grid[y][x] = 'X';
            const score = minimax(grid, depth + 1, maxDepth, alpha, beta, true);
            bestScore = Math.min(score, bestScore);
            grid[y][x] = ' ';
            beta = Math.min(beta, score);
            if (beta <= alpha) {
              break outer;
            }
          }
        }
      }
      return bestScore;
    }
  }
  return move!;
};
