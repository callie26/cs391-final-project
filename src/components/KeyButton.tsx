// File: final-project/src/components/KeyButton.tsx
// Author: Callie Liu (callie26@bu.edu), 3/31/2026
// Description: The file used to define the KeyButton component.

import styled from "styled-components";

// used to style each key button of the keyboard if not ENTER key or BACKSPACE
// https://stackoverflow.com/questions/68683137/how-to-style-multiple-variations-of-a-button-with-styled-components
const StyledButton = styled.button<{color:string | undefined}>`
    background-color: ${(props)=> {
        if (props.color === "green") return "#A8DCAB"
        else if (props.color === "yellow") return "#FFEE8C"
        else if (props.color === "gray") return "#5C5C5C"
        else return "#b1afaf"
    }};
    color: white;
    width: 45px;
    height: 55px;
    margin: 3px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #7a7878;
    }
`;

// used to style each key button of the keyboard when ENTER key or BACKSPACE
const StyledWideButton = styled.button<{color:string | undefined}>`
    background-color: ${(props)=> {
        if (props.color === "green") return "#A8DCAB"
        else if (props.color === "yellow") return "#FFEE8C"
        else if (props.color === "gray") return "#5C5C5C"
        else return "#b1afaf"
    }};
    color: white;
    width: 100px;
    height: 55px;
    margin: 3px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    
    &:hover {
        background-color: #7a7878;
    }
`;

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