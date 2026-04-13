import Cell from './Cell'
import styled from "styled-components";

const RowDiv = styled.div`
    display: flex;
    gap: 8px;
`;

type RowProps = {
  letters: string[];
  columns: number;
  isActiveRow: boolean;
};

export default function Row({ letters, columns, isActiveRow }: RowProps) {
  return (
    <RowDiv>
    {Array.from({ length: columns }, (_, index) => (
      <Cell
        key={index}
        value={letters[index] ?? ""}
        isActive={isActiveRow}
      />
    ))}
    </RowDiv>
  )
}

