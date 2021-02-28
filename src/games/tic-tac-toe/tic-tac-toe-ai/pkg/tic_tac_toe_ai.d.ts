/* tslint:disable */
/* eslint-disable */
/**
* @param {any} grid
* @param {any} prev_move
* @param {number} target_symbol_seq_length
* @returns {Coord}
*/
export function find_best_move(grid: any, prev_move: any, target_symbol_seq_length: number): Coord;
/**
* Checks the current state of the game.
* This function can be called from JavaScript.
*
* # Example
*
* ```js
* const grid = [
*   ['X', ' ', ' '],
*   [' ', 'X', 'O'],
*   ['O', ' ', 'X']
* ];
* const targetSymbolSeqLength = 3;
*
* console.log(check_game_state_js(grid, targetSymbolSeqLength)); // Returns P1Won
* ```
* @param {any} grid
* @param {any} prev_move
* @param {number} target_symbol_seq_length
* @returns {number}
*/
export function check_game_state_js(grid: any, prev_move: any, target_symbol_seq_length: number): number;
/**
*/
export enum GameState {
  Resume,
  P1Won,
  P2Won,
  Tie,
}
/**
*/
export class Coord {
  free(): void;
/**
* @returns {number}
*/
  x: number;
/**
* @returns {number}
*/
  y: number;
}
