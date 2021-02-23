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

  return {
    grid, gridElement, addSymbol
  };
}
