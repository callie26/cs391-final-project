import Cell from './Cell'
import styled from "styled-components";
import type {RowProps} from "../types/RowProps.ts";

const RowDiv = styled.div`
    display: flex;
    gap: 8px;
`;

export default function Row({ letters, columns, isActiveRow, rowColors }: RowProps) {
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
      />
    ))}
    </RowDiv>
  )
}

