import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5rem repeat(5, 100px);
  grid-auto-rows: 100px;
  & > .Day,
  .DaysOfWeek {
    display: block;
    padding-top: 1rem;
    border: solid 1px #d7d7d730;
  }

  & > .DaysOfWeek {
    padding-top: 0;
    background-color: greenyellow;
  }

  & > .Day:nth-child(1) {
    border-top-left-radius: 10px;
  }

  & > .Day:nth-child(7) {
    border-top-right-radius: 10px;
  }

  & > .Day:nth-last-child(7) {
    border-bottom-left-radius: 10px;
  }

  & > .Day:nth-last-child(1) {
    border-bottom-right-radius: 10px;
  }
`;
