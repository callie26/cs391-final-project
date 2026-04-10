// File: final-project/src/components/Keyboard.tsx
// Author: Callie Liu (callie26@bu.edu), 3/31/2026
// Description: The file used to define the Keyboard component.

import styled from "styled-components";
import KeyButton from "./KeyButton.tsx";
import type {GuessColorsProps} from "../types/GuessColorsProps.ts";

// used to style the keyboard container which holds the keyboard rows
const StyledKeyboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// variables to represent each row of the keyboard
const topKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const middleKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const bottomKeys = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'];

export default function Keyboard(props: {colors: GuessColorsProps[]}) {
    return (
        <StyledKeyboardContainer>

             {/*map through every top row key to display the top row of keys of a keyboard */}
            <div>
                {topKeys.map((letter) =>
                    // used optional chaining in case undefined is thrown
                    // https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined
                    <KeyButton
                        letter={letter}
                        color={props.colors.find((updatedKeyboardColor: GuessColorsProps) => updatedKeyboardColor.letter)?.color}
                    />
                )}
            </div>

            {/* map through every middle row key to display the middle row of keys of a keyboard */}
            <div>
                {middleKeys.map((letter) =>
                    <KeyButton
                        letter={letter}
                        color={props.colors.find((updatedKeyboardColor: GuessColorsProps) => updatedKeyboardColor.letter)?.color}
                    />
                )}
            </div>

            {/* map through every bottom row key to display the bottom row of keys of a keyboard */}
            <div>
                {bottomKeys.map((letter) =>
                    <KeyButton
                        letter={letter}
                        color={props.colors.find((updatedKeyboardColor: GuessColorsProps) => updatedKeyboardColor.letter)?.color}
                    />
                )}
            </div>

        </StyledKeyboardContainer>
    );
}