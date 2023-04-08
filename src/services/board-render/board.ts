import { type Piece, piecesGenerator } from './pieces'
import { squareCalc } from './squareCalc'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece | false
}

export function boardRender (): SquareProps[] {
  const squaresList = squareCalc()
  const piecesList = piecesGenerator()
  const initialBoard: SquareProps[] = squaresList.map(square => {
    const piece = piecesList.find(piece => piece.name.includes(square.id))
    if (piece) {
      return {
        id: square.id,
        color: square.color,
        havePiece: piece
      }
    }

    return {
      id: square.id,
      color: square.color,
      havePiece: false
    }
  })

  return initialBoard
}
