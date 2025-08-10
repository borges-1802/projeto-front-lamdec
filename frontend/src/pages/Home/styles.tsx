import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Titulo = styled.h1`
  color: #22A2F2;
  font-size: 24px;
`;

export const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ButtonLink = styled(Link)`
  background: #4caf50;
  color: white;
  padding: 10px 16px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #45a049;
  }
`;