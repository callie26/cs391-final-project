// File: final-project/src/components/KeyButton.tsx
// Author: Callie Liu (callie26@bu.edu), 3/31/2026
// Description: The file used to define the KeyButton component.

import styled from "styled-components";

// used to style each key button of the keyboard if not ENTER key or BACKSPACE
// https://stackoverflow.com/questions/68683137/how-to-style-multiple-variations-of-a-button-with-styled-components
const StyledButton = styled.button<{color:string | undefined}>`
    background-color: ${(props)=> {
        if (props.color === "green") return "#16a34a"
        else if (props.color === "yellow") return "#eab308"
        else if (props.color === "gray") return "#64748b"
        else return "#cbd5e1"
    }};
    color: ${(props)=> props.color ? "#f8fafc" : "#0f172a"};
    width: 46px;
    height: 54px;
    margin: 3px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(15, 23, 42, 0.18);

    &:hover {
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(1px);
    }

    @media (max-width: 520px) {
        width: 34px;
        height: 46px;
        margin: 2px;
        font-size: 12px;
    }
`;

// used to style each key button of the keyboard when ENTER key or BACKSPACE
const StyledWideButton = styled.button<{color:string | undefined}>`
    background-color: ${(props)=> {
        if (props.color === "green") return "#16a34a"
        else if (props.color === "yellow") return "#eab308"
        else if (props.color === "gray") return "#64748b"
        else return "#cbd5e1"
    }};
    color: ${(props)=> props.color ? "white" : "black"};
    width: 102px;
    height: 54px;
    margin: 3px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(15, 23, 42, 0.18);
    
    &:hover {
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(1px);
    }

    @media (max-width: 520px) {
        width: 66px;
        height: 46px;
        margin: 2px;
        font-size: 10px;
    }
`;

// KeyButton component that takes in the letter of the key, the color of the key, and a function to handle when the key is clicked, and displays a button for the key with the appropriate styling based on whether it is an ENTER or BACKSPACE key and its color
export default function KeyButton(props: {letter: string, color: string | undefined, onClick: (key: string) => void}) {
    return (
        // if the letter of the key is ENTER or BACKSPACE
        props.letter === "ENTER" || props.letter === "BACKSPACE" ?
            // display button as a wide button
            <StyledWideButton type="button" color={props.color} onClick={() => props.onClick(props.letter)}> {props.letter} </StyledWideButton>:
            // else display as regular button
            <StyledButton type="button" color={props.color} onClick={() => props.onClick(props.letter)}> {props.letter} </StyledButton>
    );
}