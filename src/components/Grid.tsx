import Row from './Row'
import styled from "styled-components";

const GridDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

type GridProps = {
  guesses: string[][];
  rows: number;
  columns: number;
  currentRow: number;
};

export default function Grid({ guesses, rows, columns, currentRow }: GridProps) {
  return (
    <GridDiv>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <Row
        key={rowIndex}
        letters={guesses[rowIndex] ?? []}
        columns={columns}
        isActiveRow={rowIndex === currentRow}
      />
    ))}
    </GridDiv>
  )
}
