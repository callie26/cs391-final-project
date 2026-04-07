import styled from "styled-components";
import { useState, useEffect } from "react";

import Grid from './components/Grid'
import Keyboard from "./components/Keyboard.tsx";
import GameResult from "./components/GameResult";
import NavBar from "./components/Nav";

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

    // Callie Liu
    // states for keyboard color change
    const [currentGuess, setCurrentGuess] = useState("");
    const [answer, setAnswer] = useState("");

    // fetch a random 5-letter word from the API
    useEffect(()=>{
        async function fetchRandomWord(): Promise<void> {
            const rawRandomWord= await fetch("https://random-words-api.kushcreates.com/api?language=en&length=5&type=uppercase&words=1");
            const randomWord = await rawRandomWord.json();
            setAnswer(randomWord[0].word);
        }
        fetchRandomWord()
            .then(()=>console.log("Random word successfully fetched"))
            .catch((e: Error)=>console.log("There was an error fetching the random word: " + e));
    }, []);

    // check a guess against the answer (need to put this in when enter is hit i think)
    function getGuessColors(guess:string, answer:string){
        const guessColors = [];
        // make string into array for easy manipulation
        // https://www.geeksforgeeks.org/javascript/string-to-array-in-javascript/
        const remainingLetters = answer.split("");

        // check for letters in correct spot
        for (let i = 0; i < answer.length; i++) {
            if (guess[i] === answer[i]) {
                guessColors[i] = {letter: guess[i], color: "green"};
                remainingLetters[i] = "*"
            }

        // check for letters not in correct spot but in word
        // https://www.w3schools.com/jsref/jsref_includes_array.asp
            else if (remainingLetters.includes(guess[i])) {
                guessColors[i] = {letter: guess[i], color: "yellow"};
                const indexOfCorrectSpot = remainingLetters.indexOf(guess[i]);
                remainingLetters[indexOfCorrectSpot] = "*"
            }
        }

        return guessColors;
    }

    // still need to check whether to update the keyboard key colors






    return (
        <MainDiv>
            <h1>Wordle</h1>
            <NavBar/>
            <Grid/>
            <Keyboard/>
            { gameOver && gameResult == "won" && <GameResult result="won" word={word} Retry={Retry}/> }
            { gameOver && gameResult == "lost" && <GameResult result="lost" word={word} Retry={Retry}/> }
        </MainDiv>
  )
}

export default App
