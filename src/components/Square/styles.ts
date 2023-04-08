import styled from 'styled-components'

export const SquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${props => props.color === 'white' ? 'silver' : 'gray'};
  position: relative;

  h3 {
    position: absolute;
    top: 5px;
    left: 5px
  }

  img {
    width: 50px;
    cursor: pointer;
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
