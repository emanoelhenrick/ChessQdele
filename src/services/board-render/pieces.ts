/* eslint-disable @typescript-eslint/no-non-null-assertion */

interface SquareProps {
  id: string
  color: string
  havePiece: Piece | false
}
const pieces = [
  {
    name: 'rook',
    squareRules: [8, -1, 1, -8],
    initialSquares: ['a8', 'h8', 'a1', 'h1']
  },
  {
    name: 'knight',
    squareRules: [17, 10, 6, 15, -17, -10, -6, -15],
    initialSquares: ['b8', 'g8', 'b1', 'g1']
  },
  {
    name: 'bishop',
    squareRules: [-9, -7, 9, 7],
    initialSquares: ['c8', 'f8', 'c1', 'f1']
  },
  {
    name: 'queen',
    squareRules: [8, -1, 1, -8, 9, 7, -7, -9],
    initialSquares: ['d8', 'd1']
  },
  {
    name: 'king',
    squareRules: [1, -1, 8, -8, 9, 7, -9, -7],
    initialSquares: ['e8', 'e1']
  },
  {
    name: 'pawn',
    squareRules: [8, 7, 9],
    initialSquares: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
  }
]

export class Piece {
  public name: string
  public squareRules: string[] | number[]
  public color!: string
  public firstMove?: boolean
  public possibleMoves?: SquareProps[]

  constructor (id: string) {
    const piece = pieces.find(square => {
      return square.initialSquares.includes(id)
    })

    this.name = `${piece!.name}_${id}`
    this.squareRules = piece!.squareRules

    const squareId = id.split('')
    if (Number(squareId[1]) === 2 || Number(squareId[1]) === 1) {
      this.color = 'white'
    }

    if (Number(squareId[1]) === 8 || Number(squareId[1]) === 7) {
      this.color = 'black'
    }
  }
}

export function piecesGenerator (): Piece[] {
  const piecesList: Piece[] = []

  pieces.forEach(piece => {
    for (let index = 0; index < piece.initialSquares.length; index++) {
      piecesList.push(new Piece(piece.initialSquares[index]))
    }
  })

  return piecesList
}
