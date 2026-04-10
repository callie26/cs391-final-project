// File: final-project/src/App.tsx
// Author: Tiffany Yam (tiffyam@bu.edu), Callie Liu (callie26@bu.edu) 4/5/2026
// Description: The file used to define the logic of the wordle game.

import styled from "styled-components";
import { useState, useEffect } from "react";

import Grid from './components/Grid'
import Keyboard from "./components/Keyboard.tsx";
import GameResult from "./components/GameResult";
import NavBar from "./components/Nav";
import type {GuessColorsProps} from "./types/GuessColorsProps.ts";

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
    const [keyboardColors, setKeyboardColors] = useState<GuessColorsProps[]>([]);

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
    function getGuessColors(guess:string, answer:string):GuessColorsProps[]{
        const guessColors:GuessColorsProps[] = [];
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
                // https://www.w3schools.com/jsref/jsref_indexof_array.asp
                const indexOfCorrectSpot = remainingLetters.indexOf(guess[i]);
                remainingLetters[indexOfCorrectSpot] = "*"
            }
        }

        return guessColors;
    }

    // guessColors = getGuessColors(guess, answer)

    // check whether to update the keyboard key colors
    function updateKeyboardColors(guessColors:GuessColorsProps[]){
        // get current keyboard colors and update or add colors if needed
        const updatedKeyboardColors:GuessColorsProps[] = [...keyboardColors];

        // loop through each guess color
        // https://www.w3schools.com/jsref/jsref_foreach.asp
        guessColors.forEach((guessColor: GuessColorsProps)=> {

            // see if there is already existing color for the guess letter
            // https://stackoverflow.com/questions/67476440/how-to-match-key-value-in-array-of-objects
            const existingColor = updatedKeyboardColors.find(updatedKeyboardColor => updatedKeyboardColor.letter === guessColor.letter)

            // if there is already existing color then only update if guess color has higher precedence
            if (existingColor) {
                if ((guessColor.color === "green") || (existingColor.color !== "green" && guessColor.color === "yellow")) {
                    existingColor.color = guessColor.color
                }
            }
            // else it is the first time adding a color to this letter so add it to the array
            else {
                if (guessColor.color === "green" || guessColor.color === "yellow") {
                    // https://www.w3schools.com/jsref/jsref_push.asp
                    updatedKeyboardColors.push(guessColor);
                }
            }
        });
        setKeyboardColors(updatedKeyboardColors)
    }

    // const keyboardColors = updateKeyboardColors(guessColors)



    return (
        <MainDiv>
            <h1>Wordle</h1>
            <NavBar/>
            <Grid/>
            <Keyboard colors={keyboardColors}/>
            { gameOver && gameResult == "won" && <GameResult result="won" word={word} Retry={Retry}/> }
            { gameOver && gameResult == "lost" && <GameResult result="lost" word={word} Retry={Retry}/> }
        </MainDiv>
  )
}

export default App
