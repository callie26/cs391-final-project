import Grid from './components/Grid'
import styled from "styled-components";
import Keyboard from "./components/Keyboard.tsx";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
`;
function App() {
  return (
    <MainDiv>
      <h1>Wordle</h1>
      <Grid/>
      <Keyboard/>
    </MainDiv>
  )
}

export default App
