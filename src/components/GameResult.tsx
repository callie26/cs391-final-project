// Author: Tiffany Yam

import styled from "styled-components";
import type { GameResultProps } from "../types/GameResultProps.ts";

const StyledContainer = styled.div `
    font-size: 25px;
    font-family: "Consolas", "sans-serif";
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const StyledButton = styled.button `
    font-family: "Consolas", "sans-serif";
    margin: 10px auto;
    padding: 5px 10px;
    font-size: 20px;
    background-color: lightgray;
    border: 2px solid gray;
    border-radius: 5px;

    &:hover {
        background-color: #7a7878;
    }
`;

const WinMessage = styled.p `
    color: green;
`;

const LoseMessage = styled.p `
    color: red;
`;

export default function GameResult({ result, word, Retry } : GameResultProps) {
    return (
        <StyledContainer>
            {/* If result is won, display "won" message */}
            { result === "won" && <WinMessage>You won!</WinMessage> }
            {/* If result is won, display "lost" message and show correct word */}
            { result === "lost" && <LoseMessage>You lost! The word was "{word}"!</LoseMessage> }
            {/* Replay button */}
            <StyledButton onClick={Retry}>Play Again</StyledButton>
        </StyledContainer>
    );
}