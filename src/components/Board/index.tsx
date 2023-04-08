import { useContext, useEffect } from "react";
import { Square } from "../Square";
import { BoardContainer } from "./styles";
import { BoardContext } from "../../context/chessContext";

export function Board() {
  const { boardList, verifySquare, possibleSquares } = useContext(BoardContext)

  function isPossible(currSquare: any) {
    return possibleSquares.some(square => square.id === currSquare.id)
  }

  return (
    <BoardContainer>
      {boardList.map((square) =>
        <Square
          select={verifySquare}
          isPossible={isPossible}
          square={square}
          key={square.id}
        />
      )}
    </BoardContainer>
  )
}