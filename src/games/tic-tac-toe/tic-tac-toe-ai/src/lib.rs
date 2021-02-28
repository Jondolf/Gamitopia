use wasm_bindgen::prelude::*;

const PLAYER_SYMBOL: char = 'X';
const AI_SYMBOL: char = 'O';

#[wasm_bindgen]
pub struct Coord {
    pub x: u32,
    pub y: u32,
}

pub struct SymbolSequence {
    pub symbol: String,
    pub length: u32,
}

struct SequenceCounter {
    counter: u32,
    prev_symbol: String,
    max_seq_length: u32,
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum GameState {
    Resume,
    P1Won,
    P2Won,
    Tie,
}

#[wasm_bindgen]
pub fn find_best_move(grid: &JsValue, target_symbol_seq_length: u32) -> Coord {
    let string_grid: Vec<Vec<String>> = grid.into_serde().unwrap();
    get_best_move(string_grid, target_symbol_seq_length)
}

/// Gets the best move by calling `minimax` on all empty squares
fn get_best_move(mut grid: Vec<Vec<String>>, target_symbol_seq_length: u32) -> Coord {
    let mut best_score = f64::NEG_INFINITY;
    let mut best_move = Coord { x: 0, y: 0 };
    for y in 0..grid.len() {
        for x in 0..grid[0].len() {
            if grid[y][x].contains(' ') {
                grid[y][x] = String::from(AI_SYMBOL);
                let score = minimax(
                    grid.clone(),
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
                        x: x as u32,
                        y: y as u32,
                    };
                }
            }
        }
    }
    best_move
}

fn minimax(
    mut grid: Vec<Vec<String>>,
    target_symbol_seq_length: u32,
    depth: u32,
    max_depth: u32,
    mut alpha: f64,
    mut beta: f64,
    is_maximizing: bool,
) -> f64 {
    let result = check_game_state(&grid, target_symbol_seq_length);
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

/*
Siirto

*/

/// Checks the current state of the game.
///
/// # Example
///
/// ```rust
/// enum GameState {
///     Resume,
///     P1Won,
///     P2Won,
///     Tie,
/// }
///
/// let grid = vec![
///     vec![String::from('X'), 'String::from(' '), String::from(' ')],
///     vec![String::from(' '), 'String::from('X'), String::from('O')],
///     vec![String::from('O'), 'String::from(' '), String::from('X')],
/// ];
/// let target_symbol_seq_length = 3;
///
/// assert_eq!(check_game_state(grid, target_symbol_seq_length), GameState::P1Won);
/// ```
fn check_game_state(grid: &[Vec<String>], target_symbol_seq_length: u32) -> GameState {
    let grid_width = grid[0].len();
    let grid_height = grid.len();
    let rows: Vec<Vec<String>> = generate_grid_from_vec(grid);
    let mut columns: Vec<Vec<String>> = vec![];
    let mut diagonal_rows: Vec<Vec<String>> = vec![];
    let reversed_rows: Vec<Vec<String>> = rows.clone().into_iter().rev().collect();
    let mut reversed_diagonal_rows: Vec<Vec<String>> = vec![];
    // Columns
    for x in 0..grid_width {
        columns.push([].to_vec());
        for row in &rows {
            columns[x].push(row[x].to_string());
        }
    }
    // Diagonal rows
    for y in (-(grid_height as isize) + 1)..(grid_width as isize) {
        let mut diagonal_row = vec![];
        for x in 0..grid_height {
            if (x as isize) + y >= 0 && y + (x as isize) < (grid_width as isize) {
                diagonal_row.push(rows[x as usize][(y as usize) + (x as usize)].to_string());
            }
        }
        diagonal_rows.push(diagonal_row);
    }
    // Reversed diagonal rows
    for y in (-(grid_height as isize) + 1)..(grid_width as isize) {
        let mut reversed_diagonal_row = vec![];
        for x in 0..grid_height {
            if (x as isize) + y >= 0 && y + (x as isize) < (grid_width as isize) {
                reversed_diagonal_row
                    .push(reversed_rows[x as usize][(y as usize) + (x as usize)].to_string());
            }
        }
        reversed_diagonal_rows.push(reversed_diagonal_row);
    }
    let is_grid_full = !rows
        .iter()
        .any(|row| row.iter().any(|symbol| symbol == " "));
    let symbol_arrays = vec![rows, columns, diagonal_rows, reversed_diagonal_rows].concat();
    let symbol_sequences: Vec<SymbolSequence> = symbol_arrays
        .into_iter()
        .map(find_max_symbol_sequence)
        .collect();
    let longest_seq = symbol_sequences.into_iter().fold(
        SymbolSequence {
            symbol: String::from(' '),
            length: 0,
        },
        |prev: SymbolSequence, curr: SymbolSequence| -> SymbolSequence {
            if curr.length > prev.length && !curr.symbol.contains(' ') {
                return curr;
            }
            prev
        },
    );
    let game_won = longest_seq.length >= target_symbol_seq_length;
    if game_won {
        if longest_seq.symbol == PLAYER_SYMBOL.to_string() {
            return GameState::P1Won;
        } else if longest_seq.symbol == AI_SYMBOL.to_string() {
            return GameState::P2Won;
        }
    } else if is_grid_full {
        return GameState::Tie;
    }
    GameState::Resume
}

/// Checks the current state of the game.
/// This function can be called from JavaScript.
///
/// # Example
///
/// ```js
/// const grid = [
///   ['X', ' ', ' '],
///   [' ', 'X', 'O'],
///   ['O', ' ', 'X']
/// ];
/// const targetSymbolSeqLength = 3;
///
/// console.log(check_game_state_js(grid, targetSymbolSeqLength)); // Returns P1Won
/// ```
#[wasm_bindgen]
pub fn check_game_state_js(grid: &JsValue, target_symbol_seq_length: u32) -> GameState {
    let string_grid: Vec<Vec<String>> = grid.into_serde().unwrap();
    check_game_state(&string_grid, target_symbol_seq_length)
}

fn find_max_symbol_sequence(symbols: Vec<String>) -> SymbolSequence {
    let result = symbols.into_iter().fold(
        SequenceCounter {
            counter: 0,
            prev_symbol: String::from(' '),
            max_seq_length: 0,
        },
        |counter: SequenceCounter, curr_symbol: String| -> SequenceCounter {
            let new_counter = if curr_symbol != " " && curr_symbol == counter.prev_symbol {
                counter.counter + 1
            } else {
                1
            };
            let new_prev_symbol = if curr_symbol == " " {
                counter.prev_symbol
            } else {
                curr_symbol
            };
            let new_max_seq_length = std::cmp::max(counter.max_seq_length, new_counter);
            SequenceCounter {
                counter: new_counter,
                prev_symbol: new_prev_symbol,
                max_seq_length: new_max_seq_length,
            }
        },
    );
    SymbolSequence {
        symbol: result.prev_symbol,
        length: result.max_seq_length,
    }
}

fn generate_grid_from_vec(grid: &[Vec<String>]) -> Vec<Vec<String>> {
    let mut grid_mock = [].to_vec();
    for y in 0..grid.len() {
        grid_mock.push([].to_vec());
        for x in 0..grid[0].len() {
            grid_mock[y].push(grid[y][x].to_string());
        }
    }
    grid_mock
}
