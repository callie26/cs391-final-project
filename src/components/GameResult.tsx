// Author: Tiffany Yam

import styled from "styled-components";
import type { GameResultProps } from "../types/GameResultProps.ts";

const StyledContainer = styled.div `
    
`;

const StyledButton = styled.button `
    
`;

export default function GameResult({ result, word, Retry } : GameResultProps) {
    return (
        <StyledContainer>
            {/* If result is won, display "won" screen */}
            { result === "won" && <p>You won!</p> }
            {/* If result is won, display "lost" screen and show correct word */}
            { result === "lost" && <p>You lost! The word was "{word}"!</p> }
            {/* Replay button */}
            <StyledButton onClick={Retry}>Play Again</StyledButton>
        </StyledContainer>
    );
}