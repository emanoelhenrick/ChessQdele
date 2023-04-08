import { Piece } from "../../../board-render/pieces"

interface SquareProps {
  id: string,
  color: string,
  havePiece: Piece
}

export function isSameColor(index: number, boardList: SquareProps[], currSquare: SquareProps) {
  return boardList[index].havePiece.color === currSquare.havePiece.color
}

export function isEnemyPiece(index: number, boardList: SquareProps[], currSquare: SquareProps) {
  if(!boardList[index].havePiece){
    return
  }

  return boardList[index].havePiece.color === "white" &&
    currSquare.havePiece.color === "black" ||
    boardList[index].havePiece.color === "black" &&
    currSquare.havePiece.color === "white"
}

export function isBorder(index:number, boardList:SquareProps[]){
  return boardList[index].id.includes('h') || boardList[index].id.includes('a')
}