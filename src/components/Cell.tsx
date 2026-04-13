import styled from "styled-components";

const CellDiv = styled.div<{ $isActive: boolean }>`
    width: 60px;
    height: 60px;
    border: 2px solid ${(props)=> props.$isActive ? "#9a9a9a" : "gray"};
    color: #1f2937;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
`;

type CellProps = {
    value: string;
    isActive: boolean;
};

export default function Cell({ value, isActive }: CellProps) {
    return <CellDiv $isActive={isActive}>{value}</CellDiv>
}