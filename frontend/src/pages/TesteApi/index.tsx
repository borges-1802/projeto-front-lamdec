import { useEffect, useState } from "react";
import api from "../../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background: #fafafa;
  font-family: Arial, sans-serif;
`;

export default function TesteApi() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    api.get("/")
      .then(res => setMensagem(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <h1>Testando a FastAPI</h1>
      <p>Mensagem recebida: {mensagem}</p>
    </Container>
  );
}
