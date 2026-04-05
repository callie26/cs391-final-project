// Author: Tiffany Yam

// Contains types of inputs to GameResult component
export type GameResultProps = {
    result: "won" | "lost";
    word: string;
    Retry: () => void;
}