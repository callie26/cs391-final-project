import Cell from './Cell'
import styled from "styled-components";

const RowDiv = styled.div`
    display: flex;
    gap: 8px;
`;

export default function Row() {
  return (
    <RowDiv>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
    </RowDiv>
  )
}

