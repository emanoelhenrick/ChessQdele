import { type Piece } from '../board-render/pieces'
import { BISHOPpossibleSquares } from './piece-rules/bishop'
import { KINGpossibleSquares } from './piece-rules/king'
import { KNIGHTpossibleSquares } from './piece-rules/knight'
import { PAWNpossibleSquares } from './piece-rules/pawn'
import { QUEENpossibleSquares } from './piece-rules/queen'
import { ROOKpossibleSquares } from './piece-rules/rook'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece
}

export function possibleSquaresCalc (currSquare: SquareProps, boardList: SquareProps[]): SquareProps[] | false {
  if (!currSquare.havePiece) {
    return false
  }

  const squareIndex = boardList.findIndex(square => currSquare.id === square.id)

  if (currSquare.havePiece.name.includes('pawn')) {
    return PAWNpossibleSquares(currSquare, boardList, squareIndex)
  }

  if (currSquare.havePiece.name.includes('rook')) {
    return ROOKpossibleSquares(currSquare, boardList, squareIndex)
  }

  if (currSquare.havePiece.name.includes('knight')) {
    return KNIGHTpossibleSquares(currSquare, boardList, squareIndex)
  }

  if (currSquare.havePiece.name.includes('bishop')) {
    return BISHOPpossibleSquares(currSquare, boardList, squareIndex)
  }

  if (currSquare.havePiece.name.includes('queen')) {
    return QUEENpossibleSquares(currSquare, boardList, squareIndex)
  }

  if (currSquare.havePiece.name.includes('king')) {
    return KINGpossibleSquares(currSquare, boardList, squareIndex)
  }

  return false
}
