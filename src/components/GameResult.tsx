// Author: Tiffany Yam

import styled from "styled-components";
import type { GameResultProps } from "../types/GameResultProps.ts";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(2, 6, 23, 0.55);
    backdrop-filter: blur(3px);
    display:flex ; 
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
    background: green;
    border-radius: 8px;
    cursor: pointer;
`;

const Heading = styled.h2`
    margin: 0;
    font-size: 32px;
`;

const Message = styled.p<{ $loss?: boolean }>`
    margin: 0;
    font-size: 18px;
    color: ${(props) => props.$loss ? "#fecaca" : "#bbf7d0"};
`;



export default function GameResult({ result, word, Retry } : GameResultProps) {
    return (
        <Overlay>
            <StyledContainer>
                {/* If result is won, display "won" message */}
                { result === "won" && <Heading>You Won</Heading> }
                {/* If result is lost, display "lost" message and show correct word */}
                { result === "lost" && <Heading>Round Over</Heading> }

                { result === "won" && <Message>Want to play again?</Message> }
                { result === "lost" && <Message $loss>The word was {word}</Message> }

                {/* Replay button */}
                <StyledButton onClick={Retry}>Play Again</StyledButton>
            </StyledContainer>
        </Overlay>
    );
}