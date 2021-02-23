import { computed, Ref } from "vue";
import { Grid } from "../types/grid";
import { Row } from "../types/row";

export function useGameEndDetection(turn: Ref<1 | 2>, grid: Ref<Grid>, targetLength: Ref<number>) {
  const result = computed<'' | 'X' | 'O' | 'Tie'>(getGameResult);

  function getGameResult(): '' | 'X' | 'O' | 'Tie' {
    const rows = grid.value;
    const reversedRows: Row[] = [...rows].reverse();
    const reversedDiagonalRows: Row[] = [];
    const columns: Row[] = [];
    const diagonalRows: Row[] = [];

    // Set columns
    for (let i = 0; i < rows[0].length; i++) {
      columns.push([]);
      for (let j = 0; j < rows.length; j++) {
        columns[i].push(rows[j][i]);
      }
    }

    // Set diagonalRows
    for (let i = -rows.length + 1; i < columns.length; i++) {
      const diagonalRow: Row = [];
      diagonalRows.push(diagonalRow);
      for (let j = 0; j < rows.length; j++) {
        if (j + i >= 0 && i + j < columns.length) {
          diagonalRow.push(rows[j][i + j]);
        }
      }
    }

    // Set diagonalRows and reversedDiagonalRows
    for (let i = -rows.length + 1; i < columns.length; i++) {
      const diagonalRow: Row = [];
      reversedDiagonalRows.push(diagonalRow);
      for (let j = 0; j < reversedRows.length; j++) {
        if (j + i >= 0 && i + j < columns.length) {
          diagonalRow.push(reversedRows[j][i + j]);
        }
      }
    }

    const symbolArrays = [...rows, ...columns, ...diagonalRows, ...reversedDiagonalRows];
    const isGridFull = grid.value.filter((row) => row.filter((square) => square === '').length).length === 0;
    const gameEnded = symbolArrays.some((squares) => sequentialSymbols(squares, targetLength.value)) || isGridFull;

    if (gameEnded) {
      return isGridFull ? 'Tie' : (turn.value === 1 ? 'O' : 'X');
    } else {
      return '';
    }
  }

  function sequentialSymbols(symbols: string[], count: number) {
    const result: [number, string, number] = symbols.reduce(
      ([counter, previousValue, maxSeqLength]: [number, string, number], currentSymbol: string) => {
        const newCounter = currentSymbol && currentSymbol === previousValue ? counter + 1 : 1;
        const newPreviousValue = currentSymbol;
        const newMaxSeqLength = Math.max(maxSeqLength, newCounter);
        return [newCounter, newPreviousValue, newMaxSeqLength] as [number, string, number];
      },
      [0, '', 0]
    );
    return count <= result[2];
  }

  return {
    result
  };
}