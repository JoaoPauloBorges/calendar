import { Content, Header } from "antd/lib/layout/layout";
import styled from "styled-components";

export const StyledHeader = styled(Header)`
  padding: 0 30px 0 30px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    padding: 0 10px 0 10px;
  }
`;

export const StyledContent = styled(Content)`
  margin: 20px 5%;
  @media (max-width: 800px) {
    margin: 20px 0;
  }
`;
