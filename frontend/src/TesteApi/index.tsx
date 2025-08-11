import { useEffect, useState } from "react";
import api from "../services/api";

export default function TesteApi() {
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const testar = async () => {
      try {
        const resRoot = await api.get("/");
        console.log("Resposta / :", resRoot.data);

        const resResumo = await api.get("/resumo/distribuicao_cdas");
        console.log("Resposta /resumo/distribuicao_cdas :", resResumo.data);

        const resSearch = await api.get("/cda/search");
        console.log("Resposta /cda/search :", resSearch.data);

        setDados({
          root: resRoot.data,
          resumo: resResumo.data,
          search: resSearch.data
        });

      } catch (err: any) {
        console.error("Erro ao testar API:", err);
        setErro(err.message);
      }
    };

    testar();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teste de Conexão com API</h1>
      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
      <pre style={{ background: "#f5f5f5", padding: "10px" }}>
        {dados ? JSON.stringify(dados, null, 2) : "Carregando..."}
      </pre>
    </div>
  );
}
