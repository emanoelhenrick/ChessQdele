import { useContext, type ReactElement } from 'react'
import { Square } from '../Square'
import { BoardContainer, EatedPieces } from './styles'
import { BoardContext } from '../../context/chessContext'
import { getPieceSVG } from '../../assets/chessPieces'

export function Board (): ReactElement {
  const { boardList, verifySquare, possibleSquares, eatedPieces } = useContext(BoardContext)

  function isPossible (currSquare: any): boolean {
    return possibleSquares.some(square => square.id === currSquare.id)
  }

  function eatedPiecesPrint (color: string): ReactElement[] | undefined {
    if (color === 'black') {
      if (eatedPieces.black.length > 0) {
        return eatedPieces.black.map(p => {
          return (
            <EatedPieces
            key={p.name}
            src={getPieceSVG(p.name, p.color)}
            alt=""
            className={(p.name.includes('queen') || p.name.includes('king')) ? 'resize' : ''}
          />
          )
        })
      }
    } else {
      return eatedPieces.white.map(p => {
        return (
          <EatedPieces
            key={p.name}
            src={getPieceSVG(p.name, p.color)}
            alt=""
            className={(p.name.includes('queen') || p.name.includes('king')) ? 'resize' : ''}
          />
        )
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
