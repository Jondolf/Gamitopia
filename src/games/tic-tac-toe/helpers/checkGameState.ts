import { GameSymbol } from "../types/gameSymbol";
import { Grid } from "../types/grid";
import { Row } from "../types/row";

export function checkGameState(grid: Grid, targetSymbolRowLength: number): GameSymbol | 'Tie' {
  const rows = grid;
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

  // Set reversedDiagonalRows
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
  const isGridFull = grid.filter((row) => row.filter((square) => square === ' ').length).length === 0;
  const symbolSequences: { symbol: string, length: number; }[] = symbolArrays.map(arr => findMaxSymbolSequence(arr));
  const longestSeq = symbolSequences.reduce((prev, curr) => {
    return curr.length > prev.length && curr.symbol !== '' ? curr : prev;
  });
  const gameWon = longestSeq.length >= targetSymbolRowLength;

  if (gameWon) {
    return longestSeq.symbol as 'X' | 'O';
  } else if (isGridFull) {
    return 'Tie';
  } else {
    return ' ';
  }

  function findMaxSymbolSequence(symbols: Row) {
    const result: [number, GameSymbol, number] = symbols.reduce(
      ([counter, previousValue, maxSeqLength]: [number, GameSymbol, number], currentSymbol: string) => {
        const newCounter = currentSymbol !== ' ' && currentSymbol === previousValue ? counter + 1 : 1;
        const newPreviousValue = currentSymbol === ' ' ? previousValue : currentSymbol;
        const newMaxSeqLength = Math.max(maxSeqLength, newCounter);
        return [newCounter, newPreviousValue, newMaxSeqLength] as [number, GameSymbol, number];
      },
      [0, ' ', 0]
    );
    return {
      symbol: result[1],
      length: result[2]
    };
  }
}
