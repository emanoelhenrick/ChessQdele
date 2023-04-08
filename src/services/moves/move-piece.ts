import { type Piece } from '../board-render/pieces'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece | false
}

interface MovePiece {
  prevSquare: SquareProps
  movedSquare: SquareProps
}

export function movePiece (currSquare: SquareProps, nextSquare: SquareProps): MovePiece {
  nextSquare.havePiece = currSquare.havePiece
  const prevSquare = nextSquare

  currSquare.havePiece = false
  const movedSquare = currSquare

  if (prevSquare.havePiece) {
    if (prevSquare.havePiece.name.includes('pawn')) {
      if (!prevSquare.havePiece.firstMove) {
        prevSquare.havePiece.firstMove = true
      }
    }
  }

  return {
    prevSquare,
    movedSquare
  }
}
