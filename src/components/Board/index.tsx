import { useContext, type ReactElement } from 'react'
import { Square } from '../Square'
import { BoardContainer } from './styles'
import { BoardContext } from '../../context/chessContext'

export function Board (): ReactElement {
  const { boardList, verifySquare, possibleSquares, eatedPieces } = useContext(BoardContext)

  function isPossible (currSquare: any): boolean {
    return possibleSquares.some(square => square.id === currSquare.id)
  }

  function eatedPiecesPrint (color: string): ReactElement[] | undefined {
    if (color === 'black') {
      if (eatedPieces.black.length > 0) {
        return eatedPieces.black.map(p => {
          return <span key={p.name}>{p.name}</span>
        })
      }
    } else {
      return eatedPieces.white.map(p => {
        return <span key={p.name}>{p.name}</span>
      })
    }
  }

  return (
  <>
    {eatedPiecesPrint('black')}
    <BoardContainer>
      {boardList.map((square) =>
        <Square
          select={verifySquare}
          isPossible={isPossible}
          square={square}
          key={square.id}
        />
      )}
    </BoardContainer>
    {eatedPiecesPrint('white')}
  </>

  )
}
