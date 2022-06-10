import { Button } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Row from "antd/lib/row";
import styled from "styled-components";

export const StyledHeader = styled(Header)`
  padding: 0 30px 0 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    padding-right: 10px;
    padding: 0 0 0 10px;
  }
`;

export const StyledMenu = styled(Row)`
  justify-content: space-around;
`

export const StyledContent = styled(Content)`
  margin: 20px 5%;
  @media (max-width: 800px) {
    margin: 20px 0;
  }
`;

export const StyledActions = styled(Row)`
  color: white;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1280px) and (min-width: 721px) {
    width: 40%;
  }
  @media (max-width: 720px) {
    width: 50%;
  }
`;

export const ThemeActions = styled(Row)`
  justify-content: flex-end;
  align-items: center;
  /* visibility: hidden; */
`;

export const Year = styled.span`
  font-size: 3rem;
  @media (max-width: 1280px) and (min-width: 721px) {
    font-size: 2rem;
  }
  @media (max-width: 720px) {
    font-size: 1.5rem;
  }
`;
export const Month = styled.span`
  font-size: 2rem;
  @media (max-width: 1280px) and (min-width: 721px) {
    font-size: 1.5rem;
  }
  @media (max-width: 720px) {
    font-size: 1rem;
  }
`;

export const ButtonRight = styled(Button)`
  @media (max-width: 360px) {
    width: 10px;
    /* height: 20px; */
  }

`
export const ButtonLeft = styled(Button)`
  @media (max-width: 360px) {
    width: 10px;
    /* height: 20px; */
  }`

export const StyledLogo = styled.div`
  padding: 0 8px;
`;