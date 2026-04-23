// Author: Tiffany Yam

import styled from "styled-components";
import type { GameResultProps } from "../types/GameResultProps.ts";


// Samantha
const Overlay = styled.div `
    position: fixed;
    inset: 0;
    // https://www.w3schools.com/cssref/pr_pos_z-index.php
    z-index: 100;
    background: rgba(2, 6, 23, 0.55);
    // https://www.w3schools.com/cssref/css3_pr_backdrop-filter.php
    backdrop-filter: blur(3px);
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const StyledContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    padding: 26px;
    border-radius: 14px;
    background: gray;
    color: #e2e8f0;
`;

const StyledButton = styled.button `
    margin: 10px auto 0;
    padding: 10px 16px;
    font-size: 18px;
    background: #4bd34b;
    border-radius: 8px;
    cursor: pointer;
`;

const StyledH2 = styled.h2 `
    margin: 0;
    font-size: 32px;
`;

const Message = styled.p<{ result: string }> `
    margin: 0;
    font-size: 18px;
    color: ${(props) => props.result === "won" ? "#bbf7d0" : "#fecaca"};
`;


export default function GameResult({ result, word, Retry } : GameResultProps) {
    return (
        <Overlay>
            <StyledContainer>
                {/* If result is won, display "won" message */}
                { result === "won" && <StyledH2>You Won</StyledH2> }
                { result === "won" && <Message result={"won"}>Want to play again?</Message> }

                {/* If result is lost, display "lost" message and show correct word */}
                { result === "lost" && <StyledH2>Round Over</StyledH2> }
                { result === "lost" && <Message result={"lost"}>The word was {word}</Message> }

                {/* Replay button */}
                <StyledButton onClick={Retry}>Play Again</StyledButton>
            </StyledContainer>
        </Overlay>
    );
}