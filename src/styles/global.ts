import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: silver;
  }
`

export const AppContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: auto;
`