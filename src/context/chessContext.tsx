import { ReactNode, createContext, useState } from "react";
import { boardRender } from "../services/board-render/board";
import { Piece } from "../services/board-render/pieces";
import { movePiece } from "../services/moves/move-piece";
import { possibleSquaresCalc } from "../services/moves/possible-squares";

interface SquareProps {
  id: string,
  color: string,
  havePiece: Piece | false
}

interface SquarePropsMove {
  id: string,
  color: string,
  havePiece: Piece
}

interface BoardProps {
  boardList: SquareProps[]
  verifySquare: (square: SquareProps) => void
  possibleSquares: SquareProps[]
}

export const BoardContext = createContext({} as BoardProps)

export function BoardContextProvider({ children }: { children: ReactNode}) {

  const [boardList, setBoardList] = useState(boardRender())
  const [currSquare, setCurrSquare] = useState({} as SquareProps)
  const [possibleSquares, setPossibleSquares] = useState([] as SquareProps[])

  function verifySquare(square: SquareProps) {
    if (!square.havePiece && !currSquare.havePiece) {
      return
    }

    if(currSquare.havePiece) {
      if(square.havePiece) {
        if(square.havePiece.color === currSquare.havePiece.color) {
          setCurrSquare(square)
          return setPossibleSquares(possibleSquaresCalc(square as SquarePropsMove, boardList as SquarePropsMove[])!)
        }
      }
      handleMovePiece(square)

    } else {
      setCurrSquare(square)
      return setPossibleSquares(possibleSquaresCalc(square as SquarePropsMove, boardList as SquarePropsMove[])!)
    }
  }
  
  function handleMovePiece(newSquare: SquareProps) {
    const {prevSquare, movedSquare} = movePiece(currSquare, newSquare)
    const newBoard = boardList.map(square => {
      if(square.id === prevSquare.id) {
        return square = prevSquare
      } else if (square.id === movedSquare.id) {
        return square = movedSquare
      }
      return square
    })

    setBoardList(newBoard)
    setCurrSquare({} as SquareProps)
    setPossibleSquares([] as SquareProps[])
  }

  return (
    <BoardContext.Provider
    value={{
      boardList,
      possibleSquares,
      verifySquare
    }}
    >
      { children }
    </BoardContext.Provider>
  )
}