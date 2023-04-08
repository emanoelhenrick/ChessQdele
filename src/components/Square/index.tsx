import { type ReactElement } from 'react'
import { getPieceSVG } from '../../assets/chessPieces'
import { PossibleSquare, SquareContainer } from './styles'

export function Square ({ square, select, isPossible }: any): ReactElement {
  const { havePiece: piece, color } = square

  return (
    <SquareContainer
      color={color}
      onClick={() => select(square)}
    >
      {piece && <img src={getPieceSVG(piece.name, piece.color)} alt="" />}
      <h3>{square.id}</h3>
      {isPossible(square) && <PossibleSquare />}
    </SquareContainer>
  )
}
