/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type ReactNode, createContext, useState, type ReactElement } from 'react'
import { boardRender } from '../services/board-render/board'
import { type Piece } from '../services/board-render/pieces'
import { movePiece } from '../services/moves/move-piece'
import { possibleSquaresCalc } from '../services/moves/possible-squares'

interface SquareProps {
  id: string
  color: string
  havePiece: Piece | false
}

interface SquarePropsMove {
  id: string
  color: string
  havePiece: Piece
}

interface BoardProps {
  boardList: SquareProps[]
  verifySquare: (square: SquareProps) => void
  possibleSquares: SquareProps[]
}

export const BoardContext = createContext({} as BoardProps)

export function BoardContextProvider ({ children }: { children: ReactNode }): ReactElement {
  const [boardList, setBoardList] = useState(boardRender())
  const [currSquare, setCurrSquare] = useState({} as SquareProps)
  const [possibleSquares, setPossibleSquares] = useState([] as SquareProps[])

  function verifySquare (square: SquareProps): void {
    if (!square.havePiece && !currSquare.havePiece) {
      return
    }

    if (currSquare.havePiece) {
      if (square.havePiece) {
        if (square.havePiece.color === currSquare.havePiece.color) {
          setCurrSquare(square)
          const newPossibles = possibleSquaresCalc(square as SquarePropsMove, boardList as SquarePropsMove[])
          if (newPossibles) {
            setPossibleSquares(newPossibles)
          }
          return
        }
      }
      handleMovePiece(square)
    } else {
      setCurrSquare(square)
      const newPossibles = possibleSquaresCalc(square as SquarePropsMove, boardList as SquarePropsMove[])
      if (newPossibles) {
        setPossibleSquares(newPossibles)
      }
    }
  }

  function handleMovePiece (newSquare: SquareProps): void {
    const { prevSquare, movedSquare } = movePiece(currSquare, newSquare)
    const newBoard = boardList.map(square => {
      if (square.id === prevSquare.id) {
        square = prevSquare
      } else if (square.id === movedSquare.id) {
        square = movedSquare
      }
      return square
    })

    setCurrSquare({} as SquareProps)
    setPossibleSquares([] as SquareProps[])
    possiblesSquaresAllPieces(newBoard)
  }

  function possiblesSquaresAllPieces (newBoard: SquareProps[]): void {
    const board = newBoard.map(square => {
      const piece = square.havePiece
      if (piece) {
        piece.possibleMoves = possibleSquaresCalc(square, newBoard)
      }
      return square
    })

    setBoardList(board)
    console.log(boardList)
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
