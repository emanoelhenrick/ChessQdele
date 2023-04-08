import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 5px;
  width: fit-content;
  margin: auto;
`