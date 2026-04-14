// File: final-project/src/App.tsx
// Author: Tiffany Yam (tiffyam@bu.edu), Callie Liu (callie26@bu.edu) 4/5/2026
// Description: The file used to define the logic of the wordle game.

import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

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

const ErrorDiv = styled.div `
    color: red;
    font-size: 20px;
    font-weight: bold;
`;

function App() {
    const rows = 6;
    const columns = 5;

    // Tiffany Yam
    // Conditionals for GameResult component
    const [gameOver, setGameOver] = useState(false);
    const [gameResult, setGameResult] = useState("");
    // Display message if word does not exist
    const [doesNotExistMessage, setDoesNotExistMessage] = useState("");

    // Callie Liu
    // states for keyboard color change
    const [answer, setAnswer] = useState("");
    const [keyboardColors, setKeyboardColors] = useState<GuessColorsProps[]>([]);
    const [gridColors, setGridColors] = useState<GuessColorsProps[][]>([]);
    const [guesses, setGuesses] = useState<string[][]>(
        Array.from({ length: rows }, () => Array(columns).fill(""))
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);

    const word = answer;

    const Retry = () => {
        setGameOver(false);
        setGameResult("");
        setKeyboardColors([]);
        setGuesses(Array.from({ length: rows }, () => Array(columns).fill("")));
        setCurrentRow(0);
        setCurrentCol(0);
    }

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

    console.log(word);

    // check a guess against the answer (need to put this in when enter is hit i think)
    function getGuessColors(guess:string, answer:string):GuessColorsProps[]{
        console.log("ANSWER:", answer);
        console.log("GUESS:", guess);

        const guessColors:GuessColorsProps[] = [];
        // make string into array for easy manipulation
        // https://www.geeksforgeeks.org/javascript/string-to-array-in-javascript/
        const remainingLetters = answer.split("");

        // check for letters in correct spot
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
                guessColors[i] = {letter: guess[i], color: "green"};
                remainingLetters[i] = "*"
            }
        }

        console.log("rm" + remainingLetters);
            // check for letters not in correct spot but in word
            // use indexOf to check if there is an index with that letter
            // https://www.w3schools.com/jsref/jsref_indexof_array.asp
        for (let i = 0; i < guess.length; i++) {
            const indexOfCorrectSpot = remainingLetters.indexOf(guess[i]);
            if (indexOfCorrectSpot !== -1) {
                guessColors[i] = {letter: guess[i], color: "yellow"};
                remainingLetters[indexOfCorrectSpot] = "*"
            }
        }
        console.log("rm" + remainingLetters);
        console.log(guessColors);

        return guessColors;
    }

    // guessColors = getGuessColors(guess, answer)

    // check whether to update the keyboard key colors
    function updateKeyboardColors(guessColors:GuessColorsProps[]){
        const colorPriority = { gray: 0, yellow: 1, green: 2 };

        setKeyboardColors((previousColors) => {
            const updatedKeyboardColors:GuessColorsProps[] = [...previousColors];

            guessColors.forEach((guessColor: GuessColorsProps)=> {
                const existingColor = updatedKeyboardColors.find(
                    (updatedKeyboardColor) => updatedKeyboardColor.letter === guessColor.letter
                );

                if (existingColor) {
                    if (colorPriority[guessColor.color] > colorPriority[existingColor.color]) {
                        existingColor.color = guessColor.color;
                    }
                } else {
                    updatedKeyboardColors.push(guessColor);
                }
            });

            return updatedKeyboardColors;
        });
    }

    // Tiffany Yam
    // Check if word exists
    function isRealWord(word: string) {
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(res => res.ok)
            .catch(() => false);
    }

    // samantha pang
    // function to handle key presses from both real keyboard and on-screen keyboard
    const handleKeyPress = useCallback((key: string) => {
        if (gameOver) return;

        // if backspace is pressed, delete the last letter in the current guess
        if (key === "BACKSPACE") {
            if (currentCol === 0) return;

            const nextGuesses = guesses.map((row) => [...row]);
            nextGuesses[currentRow][currentCol - 1] = "";
            setGuesses(nextGuesses);
            setCurrentCol((previous) => previous - 1);
            return;
        }

        // if enter is pressed, check the guess and move to the next row
        if (key === "ENTER") {
            if (currentCol < columns || !answer) return;

            const guess = guesses[currentRow].join("");

            // Check if word exists
            isRealWord(guess)
                // If word does not exist, show an error message
                // Can change this later to make the row squares red
                .then((exists) => {
                    if (!exists) {
                        setDoesNotExistMessage("Word does not exist");
                        return;
                    }

                    // If word exists
                    setDoesNotExistMessage("");

                    const guessColors = getGuessColors(guess, answer);
                    updateKeyboardColors(guessColors);

                    if (guess === answer) {
                        setGameOver(true);
                        setGameResult("won");
                        return;
                    }

                    if (currentRow === rows - 1) {
                        setGameOver(true);
                        setGameResult("lost");
                        return;
                    }

                    setGridColors((previousColors) => [...previousColors, guessColors])
                    setCurrentRow((previous) => previous + 1);
                    setCurrentCol(0);
                    return;
                })
                .catch(() => console.log("Error checking word"));
        }

        // if a letter key is pressed, add the letter to the current guess
        if (/^[A-Z]$/.test(key) && currentCol < columns) {
            const nextGuesses = guesses.map((row) => [...row]);
            nextGuesses[currentRow][currentCol] = key;
            setGuesses(nextGuesses);
            setCurrentCol((previous) => previous + 1);
        }
    }, [gameOver, currentCol, currentRow, guesses, columns, answer, rows]);

    useEffect(() => {
        function handlePhysicalKeyDown(event: KeyboardEvent) {
            const pressedKey = event.key.toUpperCase();

            if (event.key === "Backspace") {
                event.preventDefault();
                handleKeyPress("BACKSPACE");
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                handleKeyPress("ENTER");
                return;
            }

            if (/^[A-Z]$/.test(pressedKey)) {
                handleKeyPress(pressedKey);
            }
        }

        window.addEventListener("keydown", handlePhysicalKeyDown);
        return () => window.removeEventListener("keydown", handlePhysicalKeyDown);
    }, [handleKeyPress]);



    return (
        <MainDiv>
            <NavBar/>
                        <Grid guesses={guesses} rows={rows} columns={columns} currentRow={currentRow} gridColors={gridColors}/>
                        <Keyboard colors={keyboardColors} onKeyPress={handleKeyPress}/>
            {/* If word does not exist, display an error message */}
            <ErrorDiv>{ doesNotExistMessage }</ErrorDiv>
            {/* At end of game, display a win or lose message */}
            { gameOver && gameResult == "won" && <GameResult result="won" word={word} Retry={Retry}/> }
            { gameOver && gameResult == "lost" && <GameResult result="lost" word={word} Retry={Retry}/> }
        </MainDiv>
    )
}

export default App
