//Author Johnny Li//
import {useState} from "react";
import styled from "styled-components";

const Navbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 10px;
`;

const NavContainer =  styled.div`
    display: flex;
    gap: 15px;
    
    #Navtitle{
        margin: 0
    }
    
    #lightdarkbutton{
        position: absolute;
        right: 20px;
        top: 50%;
        height: 35px;
        transform: translateY(-50%);
    }
`;



export default function Nav() { //currently passing in nothing just having a navbar

    const[mode, setMode] = useState("light")

    function setLightDark() {
        setMode(mode === "light" ? "dark" : "light");
    }
    return (
        <Navbar>
            <NavContainer>
                <h1 id="Navtitle">Wordle</h1>
                <button id = "lightdarkbutton" onClick={setLightDark}>Light/Dark</button>
            </NavContainer>
        </Navbar>

    )
}

