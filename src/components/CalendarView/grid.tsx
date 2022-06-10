import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5rem  repeat(5, 100px);
  grid-auto-rows: 100px;
  & > div {
    display: block;
    padding-top: 1rem;
    border: solid 1px #d7d7d730;
  }

  & > div:nth-child(-n+7) {
    padding-top: 0;
    background-color: greenyellow;
  }

  & > div:nth-child(1) {
    border-top-left-radius: 10px;
  }

  & > div:nth-child(7) {
    border-top-right-radius: 10px;
  }
  
  & > div:nth-last-child(7) {
    border-bottom-left-radius: 10px;
  }

  & > div:nth-last-child(1) {
    border-bottom-right-radius: 10px;
  }
`;
