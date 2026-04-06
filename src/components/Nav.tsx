//Author Johnny Li//

import styled from "styled-components";

const Navbar = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: flex;
    padding: 10px;
    background-color: #373636;
`;

const NavContainer =  styled.div`
    display: flex;
    gap: 15px;
`;

const NavButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border: solid black 1px;
    border-radius: 5px;
    width: 80px;
`;

export default function Nav() { //currently passing in nothing just having a navbar
    return (
        <Navbar>
            <NavContainer>
                <NavButton>Light</NavButton>
                <NavButton>Dark</NavButton>
            </NavContainer>
        </Navbar>

    )
}

