// File: final-project/src/components/KeyButton.tsx
// Author: Callie Liu (callie26@bu.edu), 3/31/2026
// Description: The file used to define the KeyButton component.

import styled from "styled-components";

// used to style each key button of the keyboard if not ENTER key or BACKSPACE
const StyledButton = styled.button`
    background-color: #5c5c5c;
    color: white;
    width: 45px;
    height: 55px;
    margin: 3px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
`;

// used to style each key button of the keyboard when ENTER key or BACKSPACE
const StyledWideButton = styled.button`
    background-color: #5c5c5c;
    color: white;
    width: 100px;
    height: 55px;
    margin: 3px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
`;

export default function KeyButton(props: {letter: string}) {
    return (
        // if the letter of the key is ENTER or BACKSPACE
        props.letter === "ENTER" || props.letter === "BACKSPACE" ?
            // display button as a wide button
            <StyledWideButton> {props.letter} </StyledWideButton>:
            // else display as regular button
            <StyledButton> {props.letter} </StyledButton>
    );
}