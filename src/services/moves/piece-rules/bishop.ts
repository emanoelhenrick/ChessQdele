import { type Piece } from '../../board-render/pieces'
import { isEnemyPiece, isSameColor } from './utils/utils'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece
}

export function BISHOPpossibleSquares (currSquare: SquareProps, boardList: SquareProps[], squareIndex: any): SquareProps[] | false {
  if (!currSquare.havePiece) {
    return false
  }

  const possibleSquares: SquareProps[] = []

  currSquare.havePiece.squareRules.forEach(rule => {
    const ruleNumber = Number(rule)
    const possibleSquaresForRule: SquareProps[] = []
    for (let i = squareIndex - ruleNumber; i <= 63 && i >= 0; i -= ruleNumber) {
      if ((ruleNumber === 7 || ruleNumber === -9) && boardList[i].id.includes('h')) {
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if ((ruleNumber === -7 || ruleNumber === 9) && boardList[i].id.includes('a')) {
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if ((ruleNumber === -7 || ruleNumber === 9) && currSquare.id.includes('a')) {
        return
      }

      if ((ruleNumber === 7 || ruleNumber === -9) && currSquare.id.includes('h')) {
        return
      }

      if (isSameColor(i, boardList, currSquare)) {
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if (isEnemyPiece(i, boardList, currSquare)) {
        possibleSquaresForRule.push(boardList[i])
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      possibleSquaresForRule.push(boardList[i])
    }
    possibleSquares.push(...possibleSquaresForRule)
  })

  return possibleSquares
}
