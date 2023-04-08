import { Board } from "./components/Board";
import { BoardContextProvider } from "./context/chessContext";
import { AppContainer, GlobalStyles } from "./styles/global";

export function App() {

  return (
  <BoardContextProvider>
    <AppContainer>
      <Board />
    </AppContainer>
    <GlobalStyles />
  </BoardContextProvider>
  )
}
