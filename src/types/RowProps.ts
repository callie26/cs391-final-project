import type {GuessColorsProps} from "./GuessColorsProps.ts";

export type RowProps = {
    letters: string[];
    columns: number;
    isActiveRow: boolean;
    rowColors: GuessColorsProps[];
    mode: string;
};