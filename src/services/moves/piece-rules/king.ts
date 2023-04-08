import { type Piece } from '../../board-render/pieces'
import { isBorder, isEnemyPiece, isSameColor } from './utils/utils'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece
}

export function KINGpossibleSquares (currSquare: SquareProps, boardList: SquareProps[], squareIndex: any): SquareProps[] | false {
  if (!currSquare.havePiece) {
    return false
  }

  const possibleSquares: SquareProps[] = []

  currSquare.havePiece.squareRules.forEach(rule => {
    const ruleNumber = Number(rule)
    const possibleSquaresForRule: SquareProps[] = []
    const i = squareIndex - ruleNumber

    const block =
        ((ruleNumber === 1 || ruleNumber === 9) && currSquare.id.includes('a')) ||
        ((ruleNumber === -1 || ruleNumber === -9) && currSquare.id.includes('h')) ||
        ((ruleNumber === -7) && currSquare.id.includes('a')) ||
        ((ruleNumber === 7) && currSquare.id.includes('h'))

    if (block) {
      return
    }

    if (isSameColor(i, boardList, currSquare)) {
      possibleSquares.push(...possibleSquaresForRule)
      return
    }

    if (isEnemyPiece(i, boardList, currSquare)) {
      if ((ruleNumber === -1 && currSquare.id.includes('h')) ||
            (ruleNumber === 1 && currSquare.id.includes('a'))) {
        return
      }

      possibleSquaresForRule.push(boardList[i])
      possibleSquares.push(...possibleSquaresForRule)
      return
    }

    const excess =
        ((ruleNumber === -7) && (boardList[i].id.includes('h') ||
        boardList[i].id.includes('a'))) ||
        ((ruleNumber === 7) && (boardList[i].id.includes('a') ||
        boardList[i].id.includes('h'))) ||
        ((ruleNumber === 9) && boardList[i].id.includes('a')) ||
        ((ruleNumber === -9) && boardList[i].id.includes('h'))

    if (excess) {
      possibleSquaresForRule.push(boardList[i])
      possibleSquares.push(...possibleSquaresForRule)
      return
    }

    if (ruleNumber === 1 || ruleNumber === -1) {
      if (isBorder(i, boardList)) {
        possibleSquaresForRule.push(boardList[i])
        possibleSquares.push(...possibleSquaresForRule)
      }
    }

    possibleSquaresForRule.push(boardList[i])
    possibleSquares.push(...possibleSquaresForRule)
  })

  return possibleSquares
}
