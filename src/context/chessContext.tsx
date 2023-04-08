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
  const [possibleSquares, setPossibleSquares] = useState<SquareProps[]>([])
  const [isKingInCheck, setIsKingInCheck] = useState<SquareProps[]>([])

  if (isKingInCheck.length > 0) {
    console.log('CHECK!!')
  }

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
    const movedHistory = movePiece(currSquare, newSquare, possibleSquares)
    if (!movedHistory) {
      return
    }

    const { prevSquare, movedSquare } = movedHistory

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
        piece.possibleMoves = possibleSquaresCalc(square as SquarePropsMove, newBoard as SquarePropsMove[]) as SquarePropsMove[]
      }
      return square
    })

    const check: SquareProps[] = verifyCheck(board)
    if (check) {
      setIsKingInCheck(check)
    } else {
      setIsKingInCheck([])
    }

    setBoardList(board)
  }

  function verifyCheck (board: SquareProps[] | any): SquareProps[] {
    const isCheck: SquareProps[] = []
    board.forEach((sq: { havePiece: { possibleMoves: any[] } }) => {
      if (!sq.havePiece) {
        return
      }

      sq.havePiece.possibleMoves.forEach(square => {
        if (!square.havePiece) {
          return
        }

        if (square.havePiece.name.includes('king')) {
          isCheck.push(square)
        }
      })
    })

    return isCheck
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
