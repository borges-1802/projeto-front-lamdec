import { Link } from "react-router-dom";
import {Container, Titulo, ButtonLink} from './styles';
import React from 'react';
import logo from '../../logo.svg';

export default function Home() {
  return (
    <Container>
      <Titulo>Projeto LAMDEC</Titulo>
      <ButtonLink to="/teste">Ir ao teste da FastAPI</ButtonLink>
    </Container>
  );
}
