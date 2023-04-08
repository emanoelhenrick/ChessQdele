import { type Piece } from '../../board-render/pieces'
import { isEnemyPiece, isSameColor } from './utils/utils'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece
}

export function PAWNpossibleSquares (currSquare: SquareProps, boardList: SquareProps[], squareIndex: any): SquareProps[] {
  const possibleSquares: SquareProps[] = []

  currSquare.havePiece.squareRules.forEach(rule => {
    let ruleNumber = Number(rule)

    if (currSquare.havePiece.color === 'black') {
      ruleNumber = Number(rule) * Math.sign(-1)
    }

    if (ruleNumber === 8 || ruleNumber === -8) {
      const possibleSquaresForRule: SquareProps[] = []

      const isFirstMove: number = currSquare.havePiece.firstMove === true ? 1 : 2

      for (let i = squareIndex - ruleNumber; possibleSquaresForRule.length !== isFirstMove; i -= ruleNumber) {
        if (i < 0 || i > 63) {
          return
        }

        if (isSameColor(i, boardList, currSquare)) {
          possibleSquares.push(...possibleSquaresForRule)
          return
        }

        if (isEnemyPiece(i, boardList, currSquare)) {
          possibleSquares.push(...possibleSquaresForRule)
          return
        }

        possibleSquaresForRule.push(boardList[i])
      }
      possibleSquares.push(...possibleSquaresForRule)
      return
    }

    const i = squareIndex - ruleNumber

    if (i < 0 || i > 63) {
      return
    }

    if ((ruleNumber === 7 || ruleNumber === -9) && boardList[i].id.includes('a')) {
      return
    }

    if ((ruleNumber === -7 || ruleNumber === 9) && boardList[i].id.includes('h')) {
      return
    }

    if (isSameColor(i, boardList, currSquare)) {
      return
    }

    if (isEnemyPiece(i, boardList, currSquare)) {
      possibleSquares.push(boardList[i])
    }
  })

  return possibleSquares
}
