# Tic-Tac-Toe AI

An AI for my [Tic-Tac-Toe](https://gamitopia.herokuapp.com/tic-tac-toe) game written in [Rust](https://www.rust-lang.org/).

The "AI" was made with the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm. It finds the best possible move by going through (most) moves and evaluating, what the best move is for the AI and what the worst move is for the player.

## Why Rust?

I made the AI originally in [TypeScript](https://www.typescriptlang.org/). It worked well on a 3x3 grid but slowed down a lot on bigger grids. Anything bigger than 5x5 and it usually crashed.

I came to the conclusion of writing it in Rust and compiling the code to [WebAssembly](https://webassembly.org/), because it's a lot faster for heavy calculations and algorithms like this. I have also been very interested in Rust for a long time and this felt like a great opportunity to make something with it.

In the end it was worth it. After converting the TypeScript code to Rust without particular refactors or optimizations, Rust was roughly **45** times faster on a 4x4 grid (results may vary). After optimizing the Rust code to have way fewer unnecessary iterations and creating less new values, it was over **590** times faster than the original TypeScript code.

## WebAssembly

To use the code on the web I had to compile it to WebAssembly.

For that I used [wasm-pack](https://github.com/rustwasm/wasm-pack), a tool for building rust-generated WebAssembly packages. The `wasm-pack build` command creates a pkg directory that has the `.wasm` and `.js` files.

To communicate between JavaScript and WebAssembly (like taking arguments from JavaScript and using them in Rust) I used [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen). It basically allows me to import JS functionality to Rust and export Rust functionality to JS.

After exposing Rust functions with `wasm-bindgen` and building it with `wasm-pack`, I can now simply import Rust code in JavaScript with `import { whatever } from '/path/to/pkg/tic_tac_toe_ai.js'`.
