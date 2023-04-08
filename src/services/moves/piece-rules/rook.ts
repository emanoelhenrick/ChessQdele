import { type Piece } from '../../board-render/pieces'
import { isBorder, isEnemyPiece, isSameColor } from './utils/utils'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece
}

export function ROOKpossibleSquares (currSquare: SquareProps, boardList: SquareProps[], squareIndex: any): SquareProps[] | false {
  if (!currSquare.havePiece) {
    return false
  }

  const possibleSquares: SquareProps[] = []

  currSquare.havePiece.squareRules.forEach(rule => {
    const ruleNumber = Number(rule)
    const possibleSquaresForRule: SquareProps[] = []
    for (let i = squareIndex - ruleNumber; i <= 63 && i >= 0; i -= ruleNumber) {
      if (isSameColor(i, boardList, currSquare)) {
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if (isEnemyPiece(i, boardList, currSquare)) {
        if (ruleNumber === -1 && currSquare.id.includes('h')) {
          return
        }

        if (ruleNumber === 1 && currSquare.id.includes('a')) {
          return
        }

        possibleSquaresForRule.push(boardList[i])
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if (ruleNumber === 1 || ruleNumber === -1) {
        if (ruleNumber === 1 && currSquare.id.includes('h')) {
          return
        }

        if (isBorder(i, boardList)) {
          possibleSquaresForRule.push(boardList[i])
          possibleSquares.push(...possibleSquaresForRule)
          break
        }
      }

      possibleSquaresForRule.push(boardList[i])
    }
    possibleSquares.push(...possibleSquaresForRule)
  })

  return possibleSquares
}
