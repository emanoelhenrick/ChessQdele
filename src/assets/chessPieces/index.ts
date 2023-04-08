import w_bishop from './SVG/w_bishop.svg'
import w_king from './SVG/w_king.svg'
import w_knight from './SVG/w_knight.svg'
import w_pawn from './SVG/w_pawn.svg'
import w_queen from './SVG/w_queen.svg'
import w_tower from './SVG/w_tower.svg'

import b_bishop from './SVG/b_bishop.svg'
import b_king from './SVG/b_king.svg'
import b_knight from './SVG/b_knight.svg'
import b_pawn from './SVG/b_pawn.svg'
import b_queen from './SVG/b_queen.svg'
import b_tower from './SVG/b_tower.svg'


export function getPieceSVG(piece: string, color: string) {
  switch (color) {
    case "white":

      if(piece.includes("bishop")){
        return w_bishop
      }
      if(piece.includes("king")){
        return w_king
      }
      if(piece.includes("knight")){
        return w_knight
      }
      if(piece.includes("pawn")){
        return w_pawn
      }
      if(piece.includes("queen")){
        return w_queen
      }
      if(piece.includes("rook")){
        return w_tower
      }
      
      break;

    case "black":

      if(piece.includes("bishop")){
        return b_bishop
      }
      if(piece.includes("king")){
        return b_king
      }
      if(piece.includes("knight")){
        return b_knight
      }
      if(piece.includes("pawn")){
        return b_pawn
      }
      if(piece.includes("queen")){
        return b_queen
      }
      if(piece.includes("rook")){
        return b_tower
      }

      break;
  }
}