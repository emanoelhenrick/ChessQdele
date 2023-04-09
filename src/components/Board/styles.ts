import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 0px;
  width: fit-content;
  margin: 0.5rem auto;
`

export const EatedPieces = styled.img`
  width: 1.2rem;
  margin-right: 0.4rem;

  &.resize {
    width: 2rem;
  }
`
