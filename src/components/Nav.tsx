//Author Johnny Li//
"use client";
import styled from "styled-components";


// used to style the navbar of the game, which contains the title and the toggle button for light/dark mode
const Navbar = styled.div<{ $mode: string }>`
    width: 100%;
    max-width: 720px;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 10px 12px;
    border-radius: 12px;
    background-color: ${(props) => {
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
    border: 1px solid ${(props) => props.$mode === "light" ? "white" : "black"};
`;


// used to style the container of the title and toggle button of the navbar
const NavContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    #Navtitle {
        margin: 0;
        letter-spacing: 1.5px;
        font-size: 34px;
        font-family: "Avenir Next", "Trebuchet MS", sans-serif;
        font-weight: 800;
    }

    @media (max-width: 520px) {
        #Navtitle {
            font-size: 28px;
        }
    }
`;

// used to style the toggle button for light/dark mode in the navbar
const ToggleButton = styled.button<{ $mode: string }>`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    height: 36px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.$mode === "light" ? "#94a3b8" : "#475569"};
    background-color: ${(props) => props.$mode === "light" ? "white" : "black"};
    color: ${(props) => props.$mode === "light" ? "black" : "white"};
    cursor: pointer;
    font-weight: 700;

    &:hover {
        filter: brightness(1.08);
    }

    @media (max-width: 520px) {
        right: 10px;
        height: 32px;
        padding: 0 9px;
        font-size: 11px;
    }
`;

// used to display the navbar of the game, which contains the title and the toggle button for light/dark mode
type NavBarProps = {
    mode: string;
    setLightDark: () => void;
};


// NavBar component that takes in the current mode (light or dark) and a function to toggle between light and dark mode, and displays the title of the game and the toggle button in the navbar
export default function NavBar({ mode, setLightDark }: NavBarProps) {

    return (
        <Navbar $mode={mode}>
            <NavContainer>
                <h1 id="Navtitle">Wordle</h1>
                <ToggleButton $mode={mode} onClick={setLightDark}>
                    Light/Dark
                </ToggleButton>
            </NavContainer>
        </Navbar>
    );
}