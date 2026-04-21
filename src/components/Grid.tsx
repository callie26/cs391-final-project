// Author: Samantha Pang

import Row from './Row'
import styled from "styled-components";
import type {GridProps} from "../types/GridProps.ts";

const GridDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  margin-top: 2px;
`;

// Grid component that takes in the guesses, number of rows and columns, current row, colors of the cells in the grid, and the current mode (light or dark), and displays a grid of rows with the appropriate styling based on whether it is the active row and the colors of the cells

export default function Grid({ guesses, rows, columns, currentRow, gridColors, mode }: GridProps) {
  return (
    <GridDiv>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <Row
        key={rowIndex}
        letters={guesses[rowIndex] ?? []}
        columns={columns}
        isActiveRow={rowIndex === currentRow}
        // build default value for rowColor if none is found
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#:~:text=The%20optional%20chaining%20(%20?.%20),instead%20of%20throwing%20an%20error.
        rowColors={gridColors[rowIndex] ?? []}
        mode={mode}
      />
    ))}
    </GridDiv>
  )
}
