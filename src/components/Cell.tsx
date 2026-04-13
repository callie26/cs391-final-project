import styled from "styled-components";
import type {CellProps} from "../types/CellProps.ts";

const CellDiv = styled.div<{ $isActive: boolean, color:string | undefined }>`
    width: 60px;
    height: 60px;
    border: 2px solid ${(props)=> props.$isActive ? "#9a9a9a" : "gray"};
    color: #1f2937;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    background-color: ${(props)=> {
        if (props.color === "green") return "#A8DCAB"
        else if (props.color === "yellow") return "#FFEE8C"
        else if (props.color === "gray") return "#D3D3D3"
        else return "white"
    }};
`;

export default function Cell({ value, isActive, cellColor }: CellProps) {
    console.log(cellColor)
    return <CellDiv $isActive={isActive} color={cellColor}>{value}</CellDiv>
}