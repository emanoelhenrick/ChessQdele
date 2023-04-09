import styled from 'styled-components'

export const SquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: ${props => props.color === 'white' ? 'silver' : 'gray'};
  position: relative;

  h3 {
    position: absolute;
    top: 5px;
    left: 5px
  }

  img {
    width: 32px;
    cursor: pointer;
  }

  .resize {
    width: 42px;
  }
`

export const PossibleSquare = styled.div`
  width: 40%;
  height: 40%;
  position: absolute;
  display: block;
  background-color: green;
  border-radius: 100%;
`
