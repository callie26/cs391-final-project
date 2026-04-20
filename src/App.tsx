// File: final-project/src/App.tsx
// Description: The file used to define the logic of the wordle game.
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

import Grid from './components/Grid'
import Keyboard from "./components/Keyboard.tsx";
import GameResult from "./components/GameResult";
import NavBar from "./components/Nav";
import type {GuessColorsProps} from "./types/GuessColorsProps.ts";

const MainDiv = styled.div<{$mode: string}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 12px 10px 18px;
    min-height: 100vh;
    background: ${(props) => {
        if (props.$mode === "light") {
            return "white";
        } else {
            return "black";
        }
    }};
    color: ${(props) => {
        if (props.$mode === "light") {
            return "black";
        } else {
            return "white";
        }
    }};
`;


const ErrorDiv = styled.div `
    font-family: "Consolas", "sans-serif";
    color: #dc2626;
    font-size: 18px;
    font-weight: bold;
    min-height: 30px;
    text-align: center;
    padding: 4px 8px;
`;

function App() {
    const rows = 6;
    const columns = 5;

    // Tiffany
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

    const fetchRandomWord = useCallback(async (): Promise<void> => {
        const rawRandomWord= await fetch("https://random-word-api.herokuapp.com/word?length=5&diff=1");
        const randomWord = await rawRandomWord.json();
        setAnswer(randomWord[0].toUpperCase());
    }, []);

    // Samantha
    const Retry = () => {
        setAnswer("");
        setGameOver(false);
        setGameResult("");
        setDoesNotExistMessage("");
        setKeyboardColors([]);
        setGuesses(Array.from({ length: rows }, () => Array(columns).fill("")));
        setCurrentRow(0);
        setCurrentCol(0);
        setGridColors([]);
        fetchRandomWord().catch(() => console.log("Error fetching new word"));
    }

    // Callie
    // fetch a random 5-letter word from the API
    useEffect(()=>{
        async function loadWord() {
            await fetchRandomWord()
        }
        loadWord()
            .then(() => console.log("Random word successfully fetched"))
            .catch((e: Error) => console.log("There was an error fetching the random word: " + e));
    }, [fetchRandomWord]);

    console.log(word);

    // Callie
    // check a guess against the answer
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

        // console.log("rm" + remainingLetters);

        // Callie
        // check for letters not already green and not in correct spot but is in word, otherwise make it gray
        // use indexOf to check if there is an index with that letter
        // https://www.w3schools.com/jsref/jsref_indexof_array.asp
        for (let i = 0; i < guess.length; i++) {

            // check if it is already green first
            if (guessColors[i]) continue;

            const indexOfCorrectSpot = remainingLetters.indexOf(guess[i]);
            if (indexOfCorrectSpot !== -1) {
                guessColors[i] = {letter: guess[i], color: "yellow"};
                remainingLetters[indexOfCorrectSpot] = "*"
            } else {
                guessColors[i] = {letter: guess[i], color: "gray"};
            }
        }
        // console.log("rm" + remainingLetters);
        // console.log(guessColors);

        return guessColors;
    }

    // guessColors = getGuessColors(guess, answer)

    // Samantha
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

    // Tiffany
    // Check if word exists
    // async function isRealWord(word: string) {
    //     return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    //         .then(res => res.ok)
    //         .catch(() => false);
    // }

    async function isRealWord(word: string) {
        const res = await fetch (`https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`);
        const resJson = await res.json();
        return resJson.entries.length > 0;
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
                    setGridColors((previousColors) => [...previousColors, getGuessColors(guess, answer)])
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

    // Samantha
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

    // Johnny
    const [mode, setMode] = useState("light");
    function setLightDark(){
        setMode((previous) => previous === "light" ? "dark" : "light");
    }

    return (
        <MainDiv $mode={mode}>
            <NavBar mode={mode} setLightDark={setLightDark} />

            <Grid guesses={guesses} rows={rows} columns={columns} currentRow={currentRow} gridColors={gridColors}/>
            <Keyboard colors={keyboardColors} onKeyPress={handleKeyPress}/>
            {/* If word does not exist, display an error message */}
            <ErrorDiv>{ doesNotExistMessage }</ErrorDiv>

            {/* At end of game, display a win or lose message */}
            { gameOver && gameResult === "won" && <GameResult result="won" word={word} Retry={Retry}/> }
            { gameOver && gameResult === "lost" && <GameResult result="lost" word={word} Retry={Retry}/> }
        </MainDiv>
    )
}

export default App
