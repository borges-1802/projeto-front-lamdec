import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import api from "../../services/api";
import ChartCard from "../../components/chartCard";
import MetricCard from "../../components/metricCard";
import { formatCurrency } from "../../utils/valueFormat";
import { Container, MetricsGrid, DashboardGrid, ErrorContainer, ErrorContent, ErrorDot, RetryButton } from "./styles";

interface CDAItem {
  natureza?: string;
  agrupamento_situacao?: number;
  ano?: number;
  valor_saldo_atualizado?: number;
  [key: string]: any;
}

interface DistribuicaoItem {
  natureza: string;
  Cancelada: number;
  "Em cobrança": number;
  Quitada: number;
}

interface EvolucaoItem {
  ano: number;
  total: number;
}

interface StatusInscricoes {
  quitadas: number;
  canceladas: number;
  em_cobranca: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Home() {
  const [distribuicao, setDistribuicao] = useState<DistribuicaoItem[]>([]);
  const [evolucao, setEvolucao] = useState<EvolucaoItem[]>([]);
  const [inscricoes, setInscricoes] = useState<StatusInscricoes>({
    quitadas: 0, canceladas: 0, em_cobranca: 0
  });
  const [montanteTotal, setMontanteTotal] = useState<number>(0);
  const [totalCDAs, setTotalCDAs] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processarDistribuicao = (registros: CDAItem[]): DistribuicaoItem[] => {
    const resultado: Record<string, {Cancelada: number, "Em cobrança": number, Quitada: number}> = {};
    
    registros.forEach(item => {
      const natureza = item.natureza || "Desconhecido";
      const situacao = item.agrupamento_situacao;
      
      if (!resultado[natureza]) {
        resultado[natureza] = {"Cancelada": 0, "Em cobrança": 0, "Quitada": 0};
      }
      
      if (situacao === -1) {
        resultado[natureza]["Cancelada"] += 1;
      } else if (situacao === 0) {
        resultado[natureza]["Em cobrança"] += 1;
      } else if (situacao === 1) {
        resultado[natureza]["Quitada"] += 1;
      }
    });
    
    return Object.entries(resultado).map(([natureza, contagens]) => ({
      natureza,
      ...contagens
    }));
  };

  const processarEvolucao = (registros: CDAItem[]): EvolucaoItem[] => {
    const acumulado: Record<number, number> = {};
    
    registros.forEach(item => {
      const ano = item.ano;
      const valor = parseFloat(String(item.valor_saldo_atualizado || 0));
      
      if (ano !== null && ano !== undefined) {
        if (!acumulado[ano]) {
          acumulado[ano] = 0;
        }
        acumulado[ano] += valor;
      }
    });
    
    return Object.entries(acumulado)
      .map(([ano, total]) => ({
        ano: parseInt(ano),
        total: Math.round(total * 100) / 100
      }))
      .sort((a, b) => a.ano - b.ano);
  };

  // Função para processar resumo de inscrições (como no backend)
  const processarInscricoes = (registros: CDAItem[]): StatusInscricoes => {
    const resumo = {quitadas: 0, canceladas: 0, em_cobranca: 0};
    
    registros.forEach(item => {
      const situacao = item.agrupamento_situacao;
      
      if (situacao === 1) {
        resumo.quitadas += 1;
      } else if (situacao === -1) {
        resumo.canceladas += 1;
      } else if (situacao === 0) {
        resumo.em_cobranca += 1;
      }
    });
    
    return resumo;
  };

  const calcularSaldoTotal = (registros: CDAItem[]): number => {
    const total = registros.reduce((acc, item) => {
      const valor = parseFloat(String(item.valor_saldo_atualizado || 0));
      return acc + valor;
    }, 0);
    
    return Math.round(total * 100) / 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log("Buscando dados brutos do cdas.json...");
        
        // Buscar apenas o arquivo bruto cdas.json
        const response = await api.get("/cda/search"); // ou endpoint que retorna dados brutos
        
        let registros: CDAItem[] = [];
        
        if (response.data && Array.isArray(response.data.data)) {
          registros = response.data.data;
        } else if (Array.isArray(response.data)) {
          registros = response.data;
        } else {
          throw new Error("Formato de dados inválido");
        }

        console.log(`Processando ${registros.length} registros...`);

        const distData = processarDistribuicao(registros);
        const evolucaoData = processarEvolucao(registros);
        const inscData = processarInscricoes(registros);
        const montanteValue = calcularSaldoTotal(registros);
        const totalCalculado = registros.length;

        console.log("Dados processados:", {
          distribuicao: distData,
          evolucao: evolucaoData,
          inscricoes: inscData,
          montante: montanteValue,
          total: totalCalculado
        });

        setDistribuicao(distData);
        setEvolucao(evolucaoData);
        setInscricoes(inscData);
        setMontanteTotal(montanteValue);
        setTotalCDAs(totalCalculado);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Verifique se a API está rodando.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Carregando dados...</h2>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorContent>
            <ErrorDot />
            <strong>Erro:</strong> {error}
          </ErrorContent>
          <RetryButton onClick={() => window.location.reload()}>
            Tentar novamente
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <MetricsGrid>
        <MetricCard title="Total de CDAs" value={totalCDAs.toLocaleString()} />
        <MetricCard title="Montante Total" value={formatCurrency(montanteTotal)} />
        <MetricCard title="Em Cobrança" value={inscricoes.em_cobranca.toLocaleString()} />
        <MetricCard title="Quitadas" value={inscricoes.quitadas.toLocaleString()} />
      </MetricsGrid>

      <DashboardGrid>
        <ChartCard title="Distribuição por Natureza">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribuicao.map(item => ({
                  natureza: item.natureza,
                  count: item.Cancelada + item["Em cobrança"] + item.Quitada
                }))}
                dataKey="count"
                nameKey="natureza"
                outerRadius={80}
                label={({ natureza, percent }) =>
                  `${natureza}: ${((percent ?? 0) * 100).toFixed(1)}%`
                }
              >
                {distribuicao.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [v.toLocaleString(), "Quantidade"]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolução Anual">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolucao}>
              <XAxis dataKey="ano" />
              <YAxis tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(v: any) => [formatCurrency(v), "Valor Total"]} />
              <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Status das Inscrições">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: "Quitadas", value: inscricoes.quitadas },
              { name: "Canceladas", value: inscricoes.canceladas },
              { name: "Em Cobrança", value: inscricoes.em_cobranca }
            ]}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip formatter={(v: any) => [v.toLocaleString(), "Quantidade"]} />
              <Bar dataKey="value">
                <Cell fill="#00C49F" />
                <Cell fill="#FF8042" />
                <Cell fill="#FFBB28" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Naturezas">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[...distribuicao]
                .map(item => ({
                  natureza: item.natureza,
                  count: item.Cancelada + item["Em cobrança"] + item.Quitada
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)}
            >
              <XAxis 
                dataKey="natureza" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip formatter={(v: any) => [v.toLocaleString(), "Quantidade"]} />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Status por Natureza">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distribuicao}>
              <XAxis 
                dataKey="natureza" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                interval={0}
                fontSize={10}
              />
              <YAxis tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip formatter={(v: any) => [v.toLocaleString(), "Quantidade"]} />
              <Bar dataKey="Quitada" stackId="status" fill="#00C49F" />
              <Bar dataKey="Cancelada" stackId="status" fill="#FF8042" />
              <Bar dataKey="Em cobrança" stackId="status" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </DashboardGrid>
    </Container>
  );
}