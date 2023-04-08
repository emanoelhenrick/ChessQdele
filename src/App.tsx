import { type ReactElement } from 'react'
import { Board } from './components/Board'
import { BoardContextProvider } from './context/chessContext'
import { AppContainer, GlobalStyles } from './styles/global'

export function App (): ReactElement {
  return (
  <BoardContextProvider>
    <AppContainer>
      <Board />
    </AppContainer>
    <GlobalStyles />
  </BoardContextProvider>
  )
}
