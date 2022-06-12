import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
  grid-template-rows: 2rem  repeat(5, minmax(100px, 1fr));
  & > .Day,
  .CalendarView--DaysOfWeek {
    display: block;
    padding-top: .2rem;
    border: solid 1px #d7d7d730;
    margin: 0;
  }

  & > .CalendarView--DaysOfWeek {
    padding-top: 0;
    background-color: greenyellow;
  }

  & > .Day:nth-last-child(7) {
    border-bottom-left-radius: 10px;
  }

  & > .Day:nth-last-child(1) {
    border-bottom-right-radius: 10px;
  }
`;
