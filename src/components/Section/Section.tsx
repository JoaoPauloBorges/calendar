import styled from "styled-components";

export const Section = styled.section`
  width: fit-content;
  background-color: #f9feff;
  border-radius: 10px;
  margin: 0 auto;
  width: 60%;
  text-align: center;
  @media (max-width: 1280px) and (min-width: 721px) {
    width: 80%;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
  -webkit-box-shadow: 10px 12px 15px -11px rgba(0,0,0,0.20); 
  box-shadow: 10px 12px 15px -11px rgba(0,0,0,0.20);
`;
