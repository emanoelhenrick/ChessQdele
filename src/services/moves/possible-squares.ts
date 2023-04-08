import { Piece } from "../board-render/pieces";
import { KNIGHTpossibleSquares } from "./piece-rules/knight";
import { PAWNpossibleSquares } from "./piece-rules/pawn";
import { ROOKpossibleSquares } from "./piece-rules/rook";

interface SquareProps {
  id: string,
  color: string,
  havePiece: Piece
}

export function possibleSquaresCalc(currSquare: SquareProps, boardList: SquareProps[]) {
  if(!currSquare.havePiece) {
    return
  }

  const squareIndex = boardList.findIndex(square => currSquare.id === square.id)

  if(currSquare.havePiece.name.includes("pawn")){
    return PAWNpossibleSquares(currSquare, boardList, squareIndex)
  }

  if(currSquare.havePiece.name.includes("rook")){
    return ROOKpossibleSquares(currSquare, boardList, squareIndex)
  }

  if(currSquare.havePiece.name.includes("knight")){
    return KNIGHTpossibleSquares(currSquare, boardList, squareIndex)
  }


  
}