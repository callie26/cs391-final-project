// Author: Samantha Pang

"use client"
import styled from "styled-components";
import type {CellProps} from "../types/CellProps.ts";

// used to style the cell in the grid, which displays a letter and has a background color based on whether the letter is correct, present, or absent in the target word
const CellDiv = styled.div<{ $isActive: boolean, color:string|undefined, $mode:string}>`
    width: 60px;
    height: 60px;
    
    //Johnny
    //border color and color will change depending on the current mode 
    border: 2px solid ${(props) => {
        if (props.$mode === "dark") {
            return "white";
        } else {
            return props.$isActive ? "#94a3b8" : "#64748b";
        }
    }};

    color: ${(props) => {
        if (props.$mode === "dark") {
            return "white";
        } else {
            return "#1f2937";
        }
    }};
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
        else {
            if (props.$mode === "dark") {
                return "#222222";
            } else {
                return "#f8fafc";
            }
        }
    }};

    @media (max-width: 520px) {
        width: 52px;
        height: 52px;
        font-size: 26px;
    }
`;

// Cell component that takes in the letter to display, whether it is the active cell, the color of the cell, and the current mode (light or dark), and displays a cell with the appropriate styling based on whether it is the active cell and its color
export default function Cell({ value, isActive, cellColor, mode }: CellProps) {
    return <CellDiv $isActive={isActive} color={cellColor} $mode={mode}>{value}</CellDiv>
}