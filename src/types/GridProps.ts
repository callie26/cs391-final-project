import type {GuessColorsProps} from "./GuessColorsProps.ts";

export type GridProps = {
    guesses: string[][];
    rows: number;
    columns: number;
    currentRow: number;
    gridColors: GuessColorsProps[][];
    mode: string;
};