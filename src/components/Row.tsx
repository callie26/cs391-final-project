// Author: Samantha Pang

import Cell from './Cell'
import styled from "styled-components";
import type {RowProps} from "../types/RowProps.ts";

// used to style the row of cells in the grid
const RowDiv = styled.div`
    display: flex;
  justify-content: center;
    gap: 8px;

  @media (max-width: 520px) {
    gap: 6px;
  }
`;

// Row component that takes in the letters to display in the row, the number of columns, whether it is the active row, the colors of the cells in the row, and the current mode (light or dark), and displays a row of cells with the appropriate styling based on whether it is the active row and the colors of the cells

export default function Row({ letters, columns, isActiveRow, rowColors, mode }: RowProps) {
  return (
    <RowDiv>
    {Array.from({ length: columns }, (_, index) => (
      <Cell
        key={index}
        value={letters[index] ?? ""}
        isActive={isActiveRow}
        // used optional chaining in case undefined is thrown for undefined color
        // https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined
        cellColor={rowColors[index]?.color}
        mode={mode}
      />
    ))}
    </RowDiv>
  )
}

