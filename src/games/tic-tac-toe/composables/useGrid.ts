import { ref } from 'vue';
import { Coord } from '../types/coord';
import { Grid } from '../types/grid';

export function useGrid() {
  const grid = ref<Grid>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const gridElement = ref<HTMLDivElement>(null!);

  function addSymbol(symbol: string, coord: Coord) {
    if (grid.value[coord.y][coord.x] === '') {
      grid.value[coord.y][coord.x] = symbol;
    }
  }

  function emptyGrid() {
    for (let i = 0; i < grid.value.length; i++) {
      for (let j = 0; j < grid.value[0].length; j++) {
        grid.value[i][j] = '';
      }
    }
  }

  return {
    grid, gridElement, addSymbol, emptyGrid
  };
}
