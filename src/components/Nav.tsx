//Author Johnny Li//
"use client";
import styled from "styled-components";

const Navbar = styled.div<{ $mode: string }>`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 10px;
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
`;

const NavContainer = styled.div`
    display: flex;
    gap: 15px;

    #Navtitle {
        margin: 0;
    }

    #lightdarkbutton {
        position: absolute;
        right: 20px;
        top: 50%;
        height: 35px;
        transform: translateY(-50%);
    }
`;

type NavBarProps = {
    mode: string;
    setLightDark: () => void;
};

export default function NavBar({ mode, setLightDark }: NavBarProps) {

    return (
        <Navbar $mode={mode}>
            <NavContainer>
                <h1 id="Navtitle">Wordle</h1>
                <button id="lightdarkbutton" onClick={setLightDark}>
                    Light/Dark
                </button>
            </NavContainer>
        </Navbar>
    );
}