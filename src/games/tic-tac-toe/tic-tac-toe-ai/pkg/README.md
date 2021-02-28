# Tic-Tac-Toe AI

An AI for my Tic-Tac-Toe game written in Rust.

The "AI" was made with the minimax algorithm. It finds the best possible move by going through (most) moves and evaluating, what the best move is for the AI and what the worst move is for the player.

## Why Rust?

I made the AI originally in TypeScript. It worked well on a 3x3 grid but slowed down a lot on bigger grids. Anything bigger than 5x5 and it usually crashed.

I came to the conclusion of writing it in Rust and compiling the code to WebAssembly, because it's a lot faster for heavy calculations and algorithms like this. I have also been very interested in Rust for a long time and this felt like a great opportunity to make something with it.

## Compiling

To compile the code, I used `wasm-pack`. The `wasm-pack build` command creates a pkg directory that has the `.wasm` and `.js` files. Then in the actual game I can simply import the exposed code with `import { whatever } from '/path/to/pkg/tic_tac_toe_ai.js'`.
