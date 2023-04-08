import { getPieceSVG } from "../../assets/chessPieces";
import { Piece } from "../../services/board-render/pieces";
import { PossibleSquare, SquareContainer } from "./styles";

interface SquareProps {
  id: string,
  color: string,
  piece: Piece | false
}

export function Square({ square, select, isPossible }: any) {
  const { havePiece: piece, color} = square

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