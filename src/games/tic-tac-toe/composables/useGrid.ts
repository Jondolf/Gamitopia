import { ref } from 'vue';
import { Coord } from '../types/coord';
import { GameSymbol } from '../types/gameSymbol';
import { Grid } from '../types/grid';

export function useGrid() {
  const grid = ref<Grid>([
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ]);
  const gridElement = ref<HTMLDivElement>(null!);

  function setGridSize(width: number, height: number) {
    grid.value = [];
    for (let y = 0; y < height; y++) {
      grid.value.push([]);
      for (let x = 0; x < width; x++) {
        grid.value[y].push(' ');
      }
    }
    emptyGrid();
  }

  function addSymbol(symbol: GameSymbol, coord: Coord) {
    if (grid.value[coord.y][coord.x] === ' ') {
      grid.value[coord.y][coord.x] = symbol;
    }
  }

  function emptyGrid() {
    for (let i = 0; i < grid.value.length; i++) {
      for (let j = 0; j < grid.value[0].length; j++) {
        grid.value[i][j] = ' ';
      }
    }
  }

  return {
    grid, gridElement, setGridSize, addSymbol, emptyGrid
  };
}
