import styled from "styled-components";
import type {CellProps} from "../types/CellProps.ts";

const CellDiv = styled.div<{ $isActive: boolean, color:string | undefined }>`
    width: 60px;
    height: 60px;
    border: 2px solid ${(props)=> props.$isActive ? "#94a3b8" : "#64748b"};
    color: #1f2937;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
    background-color: ${(props)=> {
        if (props.color === "green") return "#86efac"
        else if (props.color === "yellow") return "#fde047"
        else if (props.color === "gray") return "#cbd5e1"
        else return "#f8fafc"
    }};

    @media (max-width: 520px) {
        width: 52px;
        height: 52px;
        font-size: 26px;
    }
`;

export default function Cell({ value, isActive, cellColor }: CellProps) {
    return <CellDiv $isActive={isActive} color={cellColor}>{value}</CellDiv>
}