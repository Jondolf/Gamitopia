/* tslint:disable */
/* eslint-disable */
/**
* A helper function for calling `get_best_move` from JavaScript.
*
* It turns the `grid` and `prev_move` JavaScript arguments to Rust values, calls `get_best_move` with them and returns a `Coord`.
* @param {any} grid
* @param {any} prev_move
* @param {number} target_symbol_seq_length
* @returns {Coord}
*/
export function find_best_move(grid: any, prev_move: any, target_symbol_seq_length: number): Coord;
/**
* Checks the current state of the game.
*
* The `grid` should be a JavaScript array of arrays of strings and the `prev_move` shuold be an object with the number properties `x` and `y`.
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
