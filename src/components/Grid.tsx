import Row from './Row'
import styled from "styled-components";

const GridDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default function Grid() {
  return (
    <GridDiv>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
    </GridDiv>
  )
}
