//! A Tic-Tac-Toe AI for my own [Tic-Tac-Toe](https://gamitopia.herokuapp.com/tic-tac-toe) game.

#![allow(clippy::too_many_arguments)]

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

const PLAYER_SYMBOL: char = 'X';
const AI_SYMBOL: char = 'O';

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Coord {
    pub x: i32,
    pub y: i32,
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum GameState {
    Resume,
    P1Won,
    P2Won,
    Tie,
}

/// A helper function for calling `get_best_move` from JavaScript.
///
/// It turns the `grid` and `prev_move` JavaScript arguments to Rust values, calls `get_best_move` with them and returns a `Coord`.
#[wasm_bindgen]
pub fn find_best_move(grid: &JsValue, prev_move: &JsValue, target_symbol_seq_length: u32) -> Coord {
    let grid: Vec<Vec<String>> = grid.into_serde().unwrap();
    let prev_move: Coord = prev_move.into_serde().unwrap();
    get_best_move(grid, prev_move, target_symbol_seq_length)
}

/// Finds the best move by calling `minimax` on all empty squares.
fn get_best_move(
    mut grid: Vec<Vec<String>>,
    prev_move: Coord,
    target_symbol_seq_length: u32,
) -> Coord {
    let mut best_score = f64::NEG_INFINITY;
    let mut best_move = Coord { x: 0, y: 0 };
    for y in 0..grid.len() {
        for x in 0..grid[0].len() {
            if grid[y][x].contains(' ') {
                grid[y][x] = String::from(AI_SYMBOL);
                let score = minimax(
                    grid.clone(),
                    &prev_move,
                    target_symbol_seq_length,
                    0,
                    5,
                    f64::NEG_INFINITY,
                    f64::INFINITY,
                    false,
                );
                grid[y][x] = String::from(' ');
                if score > best_score {
                    best_score = score;
                    best_move = Coord {
                        x: x as i32,
                        y: y as i32,
                    };
                }
            }
        }
    }
    best_move
}

/// Evaluates the score of a given scenario by calling itself recursively and *minimizing* the loss for a worst case scenario and *maximizing* the minimum gain.
///
/// This is based on the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm.
fn minimax(
    mut grid: Vec<Vec<String>>,
    prev_move: &Coord,
    target_symbol_seq_length: u32,
    depth: u32,
    max_depth: u32,
    mut alpha: f64,
    mut beta: f64,
    is_maximizing: bool,
) -> f64 {
    let result = check_game_state(&grid, &prev_move, target_symbol_seq_length);
    if result != GameState::Resume || depth >= max_depth {
        match result {
            GameState::P1Won => -10.0,
            GameState::P2Won => 10.0,
            GameState::Tie => 0.0,
            _ => 0.0,
        }
    } else if is_maximizing {
        let mut best_score = f64::NEG_INFINITY;
        'outer_1: for y in 0..grid.len() {
            for x in 0..grid[0].len() {
                if grid[y][x].contains(' ') {
                    grid[y][x] = String::from(AI_SYMBOL);
                    let score = minimax(
                        grid.clone(),
                        &Coord {
                            x: x as i32,
                            y: y as i32,
                        },
                        target_symbol_seq_length,
                        depth + 1,
                        max_depth,
                        alpha,
                        beta,
                        false,
                    );
                    grid[y][x] = String::from(' ');
                    best_score = score.max(best_score);
                    alpha = score.max(alpha);
                    if beta <= alpha {
                        break 'outer_1;
                    }
                }
            }
        }
        best_score
    } else {
        let mut best_score = f64::INFINITY;
        'outer_2: for y in 0..grid.len() {
            for x in 0..grid[0].len() {
                if grid[y][x].contains(' ') {
                    grid[y][x] = String::from(PLAYER_SYMBOL);
                    let score = minimax(
                        grid.clone(),
                        &Coord {
                            x: x as i32,
                            y: y as i32,
                        },
                        target_symbol_seq_length,
                        depth + 1,
                        max_depth,
                        alpha,
                        beta,
                        true,
                    );
                    grid[y][x] = String::from(' ');
                    best_score = score.min(best_score);
                    beta = score.min(beta);
                    if beta <= alpha {
                        break 'outer_2;
                    }
                }
            }
        }
        best_score
    }
}

/// Checks the current state of the game.
///
/// Returns a `GameState` enum, which can be `Resume`, `P1Won`, `P2Won` or `Tie`.
fn check_game_state(
    grid: &[Vec<String>],
    prev_move: &Coord,
    target_symbol_seq_length: u32,
) -> GameState {
    let is_grid_full = !grid
        .iter()
        .any(|row| row.iter().any(|symbol| symbol == " "));
    let game_won = row_has_sequence(grid, prev_move, target_symbol_seq_length)
        || col_has_sequence(grid, prev_move, target_symbol_seq_length)
        || diagonal_row_has_sequence(grid, prev_move, target_symbol_seq_length)
        || reversed_diagonal_row_has_sequence(grid, prev_move, target_symbol_seq_length);
    if game_won {
        if grid[prev_move.y as usize][prev_move.x as usize] == PLAYER_SYMBOL.to_string() {
            return GameState::P1Won;
        } else if grid[prev_move.y as usize][prev_move.x as usize] == AI_SYMBOL.to_string() {
            return GameState::P2Won;
        }
    } else if is_grid_full {
        return GameState::Tie;
    }
    GameState::Resume
}

/// Checks if the previous move has a winning symbol row.
///
/// It only checks the nearby squares on the left and right sides of the previous move to reduce iteration.
fn row_has_sequence(
    grid: &[Vec<String>],
    prev_move: &Coord,
    target_symbol_seq_length: u32,
) -> bool {
    let symbol = &grid[prev_move.y as usize][prev_move.x as usize];
    if symbol == " " {
        return false;
    }
    let mut counter: u32 = 0;
    for x in (prev_move.x - (target_symbol_seq_length as i32) + 1)
        ..(prev_move.x + (target_symbol_seq_length as i32))
    {
        if x >= (grid[0].len() as i32) {
            break;
        } else if x >= 0 {
            if &grid[prev_move.y as usize][x as usize] == symbol {
                counter += 1;
                if counter >= target_symbol_seq_length {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
    false
}

/// Checks if the previous move has a winning symbol row.
///
/// It only checks the nearby squares on the top and bottom sides of the previous move to reduce iteration.
fn col_has_sequence(
    grid: &[Vec<String>],
    prev_move: &Coord,
    target_symbol_seq_length: u32,
) -> bool {
    let symbol = &grid[prev_move.y as usize][prev_move.x as usize];
    if symbol == " " {
        return false;
    }
    let mut counter: u32 = 0;
    for y in (prev_move.y - (target_symbol_seq_length as i32) - 1)
        ..(prev_move.y + (target_symbol_seq_length as i32))
    {
        if y >= (grid.len() as i32) {
            break;
        } else if y >= 0 {
            if &grid[y as usize][prev_move.x as usize] == symbol {
                counter += 1;
                if counter >= target_symbol_seq_length {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
    false
}

/// Checks if the previous move has a winning symbol row.
///
/// It only checks the nearby squares on the top left and bottom right sides of the previous move to reduce iteration.
fn diagonal_row_has_sequence(
    grid: &[Vec<String>],
    prev_move: &Coord,
    target_symbol_seq_length: u32,
) -> bool {
    let symbol = &grid[prev_move.y as usize][prev_move.x as usize];
    if symbol == " " {
        return false;
    }
    let mut counter: u32 = 0;
    for x in (prev_move.x - (target_symbol_seq_length as i32) + 1)
        ..(prev_move.x + (target_symbol_seq_length as i32))
    {
        let y = x - prev_move.x + prev_move.y;
        if x >= (grid[0].len() as i32) || y >= (grid.len() as i32) {
            break;
        } else if x >= 0 && y >= 0 {
            if &grid[y as usize][x as usize] == symbol {
                counter += 1;
                if counter >= target_symbol_seq_length {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
    false
}

/// Checks if the previous move has a winning symbol row.
///
/// It only checks the nearby squares on the bottom left and top right sides of the previous move to reduce iteration.
fn reversed_diagonal_row_has_sequence(
    grid: &[Vec<String>],
    prev_move: &Coord,
    target_symbol_seq_length: u32,
) -> bool {
    let symbol = &grid[prev_move.y as usize][prev_move.x as usize];
    if symbol == " " {
        return false;
    }
    let mut counter: u32 = 0;
    for x in (prev_move.x - (target_symbol_seq_length as i32) + 1)
        ..(prev_move.x + (target_symbol_seq_length as i32))
    {
        let y = -x - prev_move.x + prev_move.y;
        println!("{}, {}", x, y);
        if x >= (grid[0].len() as i32) || y < 0 {
            break;
        } else if x >= 0 && y >= 0 {
            if &grid[y as usize][x as usize] == symbol {
                counter += 1;
                if counter >= target_symbol_seq_length {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
    false
}

/// Checks the current state of the game.
///
/// The `grid` should be a JavaScript array of arrays of strings and the `prev_move` shuold be an object with the number properties `x` and `y`.
#[wasm_bindgen]
pub fn check_game_state_js(
    grid: &JsValue,
    prev_move: &JsValue,
    target_symbol_seq_length: u32,
) -> GameState {
    let string_grid: Vec<Vec<String>> = grid.into_serde().unwrap();
    let prev_move: Coord = prev_move.into_serde().unwrap();
    check_game_state(&string_grid, &prev_move, target_symbol_seq_length)
}

#[test]
fn get_row_works() {
    let grid = vec![
        vec![String::from(' '), String::from('X'), String::from(' ')],
        vec![String::from('X'), String::from('X'), String::from('X')],
        vec![String::from(' '), String::from('O'), String::from(' ')],
    ];
    assert_eq!(row_has_sequence(&grid, &Coord { x: 0, y: 0 }, 3), false);
    assert_eq!(row_has_sequence(&grid, &Coord { x: 2, y: 1 }, 3), true);
    assert_eq!(row_has_sequence(&grid, &Coord { x: 1, y: 2 }, 3), false);
}

#[test]
fn col_has_sequence_works() {
    let grid = vec![
        vec![String::from('O'), String::from(' '), String::from(' ')],
        vec![String::from('O'), String::from(' '), String::from('X')],
        vec![String::from('O'), String::from(' '), String::from(' ')],
    ];
    assert_eq!(col_has_sequence(&grid, &Coord { x: 0, y: 0 }, 3), true);
    assert_eq!(col_has_sequence(&grid, &Coord { x: 1, y: 1 }, 3), false);
    assert_eq!(col_has_sequence(&grid, &Coord { x: 2, y: 2 }, 3), false);
}

#[test]
fn diagonal_row_has_sequence_works() {
    let grid = vec![
        vec![String::from('X'), String::from(' '), String::from(' ')],
        vec![String::from('O'), String::from('X'), String::from(' ')],
        vec![String::from(' '), String::from(' '), String::from('X')],
    ];
    assert_eq!(
        diagonal_row_has_sequence(&grid, &Coord { x: 0, y: 0 }, 3),
        true
    );
    assert_eq!(
        diagonal_row_has_sequence(&grid, &Coord { x: 1, y: 0 }, 3),
        false
    );
    assert_eq!(
        diagonal_row_has_sequence(&grid, &Coord { x: 0, y: 1 }, 3),
        false
    );
}

#[test]
fn reversed_diagonal_row_has_sequence_works() {
    let grid = vec![
        vec![String::from(' '), String::from(' '), String::from('O')],
        vec![String::from('X'), String::from('O'), String::from(' ')],
        vec![String::from('O'), String::from(' '), String::from(' ')],
    ];
    assert_eq!(
        reversed_diagonal_row_has_sequence(&grid, &Coord { x: 0, y: 1 }, 3),
        false
    );
    assert_eq!(
        reversed_diagonal_row_has_sequence(&grid, &Coord { x: 1, y: 0 }, 3),
        false
    );
    assert_eq!(
        reversed_diagonal_row_has_sequence(&grid, &Coord { x: 0, y: 2 }, 3),
        true
    );
}
