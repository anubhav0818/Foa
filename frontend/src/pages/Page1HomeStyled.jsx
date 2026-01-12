import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { viewSizeCalculator } from "../utils/viewSizeCalculator";


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url("./assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("./assets/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: italic;
  }

  body {
    font-family: "Inter", sans-serif;
  }
`;


const PageBlank = styled.div`
  width: 100%;
  height: calc(100vh - var(--topbar-height) - 7vh);
  background: var(--bg);
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const PageCanvas = styled.div`
  width: 100vw;
  min-height: calc(100vh - var(--topbar-height) - 5vh);

  border-radius: ${() => viewSizeCalculator(18, true)};
  background: #cfd7e8;

  border: ${() => viewSizeCalculator(1, true)} solid rgba(15, 23, 42, 0.08);
  box-shadow: inset 0 0 0 ${() => viewSizeCalculator(1, true)}
    rgba(255, 255, 255, 0.4);
`;


export default function Page1Home() {
  return (
    <>
      <GlobalStyle />

      <PageBlank>
        {/* <PageCanvas /> */}
      </PageBlank>
    </>
  );
}


