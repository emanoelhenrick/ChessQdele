import { Piece } from "../../board-render/pieces"
import { isEnemyPiece, isSameColor } from "./utils/utils"

interface SquareProps {
  id: string,
  color: string,
  havePiece: Piece
}

function calcBorder(ruleNumber: number, boardList: SquareProps[], i: number) {

  if((ruleNumber === 17 || ruleNumber === -15) && boardList[i].id.includes('h')) {
    return true
  }

  if((ruleNumber === -17 || ruleNumber === 15) && boardList[i].id.includes('a')) {
    return true
  }

  if((ruleNumber === 10 || ruleNumber === -6) && (boardList[i].id.includes('h') || boardList[i].id.includes('g'))) {
    return true
  }

  if((ruleNumber === -10 || ruleNumber === 6) && (boardList[i].id.includes('a') || boardList[i].id.includes('b'))) {
    return true
  }
}

export function KNIGHTpossibleSquares(currSquare: SquareProps, boardList: SquareProps[], squareIndex: any) {
  
  if(!currSquare.havePiece) {
    return 
  }

  const possibleSquares: SquareProps[] = []

  currSquare.havePiece.squareRules.forEach(rule => {
    let ruleNumber = Number(rule)

    let possibleSquaresForRule: SquareProps[] = []
    for (let i = squareIndex - ruleNumber; possibleSquaresForRule.length < 1 && i >= 0 && i <= 63; i -= ruleNumber){

      if(calcBorder(ruleNumber, boardList, i)) {
        return
      }

      if(isSameColor(i, boardList, currSquare)) {
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      if(isEnemyPiece(i, boardList, currSquare)) {
        possibleSquaresForRule.push(boardList[i])
        possibleSquares.push(...possibleSquaresForRule)
        return
      }

      possibleSquaresForRule.push(boardList[i])
    }
    possibleSquares.push(...possibleSquaresForRule)
    return
  })

  return possibleSquares
}