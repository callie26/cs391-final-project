import styled from "styled-components";
import { useState } from "react";

import Grid from './components/Grid'
import Keyboard from "./components/Keyboard.tsx";
import GameResult from "./components/GameResult";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
`;
function App() {
    const word = "";

    // Tiffany Yam
    // Conditionals for GameResult component
    const [gameOver, setGameOver] = useState(false);
    const [gameResult, setGameResult] = useState("");

    const Retry = () => {
        setGameOver(false);
        setGameResult("");
    }

    return (
        <MainDiv>
            <h1>Wordle</h1>
            <Grid/>
            <Keyboard/>
            { gameOver && gameResult == "won" && <GameResult result="won" word={word} Retry={Retry}/> }
            { gameOver && gameResult == "lost" && <GameResult result="lost" word={word} Retry={Retry}/> }
        </MainDiv>
  )
}

export default App
