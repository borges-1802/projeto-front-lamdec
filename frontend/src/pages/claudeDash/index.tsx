import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Download, Filter, Search } from "lucide-react";
import api from "../../services/api";
import axios from "axios";
import styled from "styled-components";
import { Container, Content, FilterContainer, FilterTitle, FilterTitleText, FilterGrid, FilterField, FilterLabel, FilterInput, FilterSelect, FlexBetween, Button, ErrorContainer, ErrorContent, ErrorDot, TableContainer, TableHeader, TableHeaderContent, TableTitle, TableHint, ResponsiveTable, StyledTable, SortableHeader, SortableHeaderContent, SortableHeaderText, SortableHeaderIcons, SortableHeaderIcon, TableRow, TableCell, TableCellRight, TableCellCenter, CellCdaNumber, CellYear, CellSaldo, CellNatureza, Badge, ProgressContainer, ProgressBar, ProgressFill, ProgressText, PaginationContainer, PaginationInfo, PaginationInfoBold, PaginationButtons, PaginationButton, EmptyContainer, EmptyIcon, EmptyTitle, EmptySubtitle } from "./styles";


interface CdaItem {
  numCDA: string;
  score: number;
  valor_saldo_atualizado: number;
  qtde_anos_idade_cda: number;
  agrupamento_situacao: number;
  natureza: string;
}

interface SortConfig {
  key: keyof CdaItem | 'ano';
  direction: 'asc' | 'desc';
}

const FilterTitleIcon = styled(Filter)`
  width: 1.25rem;
  height: 1.25rem;
  color: #2563eb;
`;

const EnhancedCdaSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    ano: "",
    situacao: "",
    saldo_min: "",
    saldo_max: ""
  });
  const [results, setResults] = useState<CdaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Carrega dados iniciais
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cda/search');
        if (response.data && response.data.data) {
          setResults(response.data.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || "Erro ao carregar dados iniciais");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido ao carregar dados");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const search = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    
    try {
      const params: any = {};
      
      if (filters.ano && filters.ano.trim()) {
        params.ano = parseInt(filters.ano);
      }
      if (filters.situacao && filters.situacao.trim()) {
        params.situacao = parseInt(filters.situacao);
      }
      if (filters.saldo_min && filters.saldo_min.trim()) {
        params.saldo_min = parseFloat(filters.saldo_min);
      }
      if (filters.saldo_max && filters.saldo_max.trim()) {
        params.saldo_max = parseFloat(filters.saldo_max);
      }

      const response = await api.get("/cda/search", { params });
      
      if (response.data && response.data.data) {
        setResults(response.data.data);
      } else if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        setResults([]);
        setError("Formato de resposta inesperado");
      }
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erro na busca:", err);
        setError(err.response?.data?.detail || err.message || "Erro ao buscar dados");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido na busca");
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Função de ordenação
  const handleSort = (key: keyof CdaItem | 'ano') => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    const sortedResults = [...results].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      if (key === 'ano') {
        aValue = parseInt(a.numCDA.substring(0, 4));
        bValue = parseInt(b.numCDA.substring(0, 4));
      } else {
        aValue = a[key];
        bValue = b[key];
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setResults(sortedResults);
  };

  const SortableHeaderComponent: React.FC<{ 
    column: keyof CdaItem | 'ano', 
    children: React.ReactNode 
  }> = ({ column, children }) => {
    const isActive = sortConfig?.key === column;
    const direction = sortConfig?.direction;
    
    return (
      <SortableHeader onClick={() => handleSort(column)}>
        <SortableHeaderContent>
          <SortableHeaderText>{children}</SortableHeaderText>
          <SortableHeaderIcons>
            <SortableHeaderIcon 
              isActive={isActive} 
              direction="asc" 
              currentDirection={direction || 'asc'}
            >
              <ChevronUp size={14} />
            </SortableHeaderIcon>
            <SortableHeaderIcon 
              isActive={isActive} 
              direction="desc" 
              currentDirection={direction || 'desc'}
            >
              <ChevronDown size={14} />
            </SortableHeaderIcon>
          </SortableHeaderIcons>
        </SortableHeaderContent>
      </SortableHeader>
    );
  };

  // Funções de formatação
  const formatSituacao = (situacao: number) => {
    const situacoes: { [key: number]: string } = {
      '-1': 'Cancelada',
      '0': 'Em cobrança',
      '1': 'Quitada'
    };
    return situacoes[situacao] || situacao;
  };

  const formatCurrency = (value: number) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatScore = (score: number) => {
    return (score * 100).toFixed(1) + '%';
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Número CDA', 'Ano', 'Situação', 'Saldo', 'Natureza', 'Score'];
    const csvContent = [
      headers.join(','),
      ...results.map(item => [
        item.numCDA,
        item.numCDA.substring(0, 4),
        formatSituacao(item.agrupamento_situacao),
        item.valor_saldo_atualizado,
        item.natureza,
        item.score
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cdas_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Content>
        <FilterContainer>
          <FilterTitle>
            <FilterTitleIcon />
            <FilterTitleText>Filtros de Busca</FilterTitleText>
          </FilterTitle>
          
          <FilterGrid>
            <FilterField>
              <FilterLabel>Ano</FilterLabel>
              <FilterInput 
                placeholder="Ex: 2023" 
                value={filters.ano} 
                onChange={e => setFilters({...filters, ano: e.target.value})}
              />
            </FilterField>
            <FilterField>
              <FilterLabel>Situação</FilterLabel>
              <FilterSelect 
                value={filters.situacao} 
                onChange={e => setFilters({...filters, situacao: e.target.value})}
              >
                <option value="">Todas as situações</option>
                <option value="-1">Cancelada</option>
                <option value="0">Em cobrança</option>
                <option value="1">Quitada</option>
              </FilterSelect>
            </FilterField>
            <FilterField>
              <FilterLabel>Saldo Mínimo</FilterLabel>
              <FilterInput 
                placeholder="0.00" 
                type="number"
                step="0.01"
                value={filters.saldo_min} 
                onChange={e => setFilters({...filters, saldo_min: e.target.value})}
              />
            </FilterField>
            <FilterField>
              <FilterLabel>Saldo Máximo</FilterLabel>
              <FilterInput 
                placeholder="999999.99" 
                type="number"
                step="0.01"
                value={filters.saldo_max} 
                onChange={e => setFilters({...filters, saldo_max: e.target.value})}
              />
            </FilterField>
          </FilterGrid>

          <FlexBetween>
            <Button 
              variant="primary"
              onClick={search}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar CDAs"}
            </Button>

            {results.length > 0 && (
              <Button
                onClick={exportToCSV}
                variant="secondary"
              >
                <Download size={20} />
                Exportar CSV
              </Button>
            )}
          </FlexBetween>
        </FilterContainer>

        {error && (
          <ErrorContainer>
            <ErrorContent>
              <ErrorDot />
              <strong>Erro:</strong> {error}
            </ErrorContent>
          </ErrorContainer>
        )}

        {results.length > 0 && (
          <TableContainer>
            <TableHeader>
              <TableHeaderContent>
                <TableTitle>
                  Resultados da Busca ({results.length} registros)
                </TableTitle>
                <TableHint>
                  Clique nos cabeçalhos para ordenar
                </TableHint>
              </TableHeaderContent>
            </TableHeader>
            
            <ResponsiveTable>
              <StyledTable>
                <thead>
                  <tr>
                    <SortableHeaderComponent column="numCDA">Número CDA</SortableHeaderComponent>
                    <SortableHeaderComponent column="ano">Ano</SortableHeaderComponent>
                    <SortableHeaderComponent column="agrupamento_situacao">Situação</SortableHeaderComponent>
                    <SortableHeaderComponent column="valor_saldo_atualizado">Saldo</SortableHeaderComponent>
                    <SortableHeaderComponent column="natureza">Natureza</SortableHeaderComponent>
                    <SortableHeaderComponent column="score">Score</SortableHeaderComponent>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, idx) => (
                    <TableRow key={item.numCDA} isEven={idx % 2 === 0}>
                      <TableCell>
                        <CellCdaNumber>
                          {item.numCDA}
                        </CellCdaNumber>
                      </TableCell>
                      <TableCell>
                        <CellYear>
                          {item.numCDA.substring(0, 4)}
                        </CellYear>
                      </TableCell>
                      <TableCell>
                        <Badge status={item.agrupamento_situacao}>
                          {formatSituacao(item.agrupamento_situacao)}
                        </Badge>
                      </TableCell>
                      <TableCellRight>
                        <CellSaldo>
                          {formatCurrency(item.valor_saldo_atualizado)}
                        </CellSaldo>
                      </TableCellRight>
                      <TableCell>
                        <CellNatureza>
                          {item.natureza}
                        </CellNatureza>
                      </TableCell>
                      <TableCellCenter>
                        <ProgressContainer>
                          <ProgressBar>
                            <ProgressFill width={item.score * 100} />
                          </ProgressBar>
                          <ProgressText>{formatScore(item.score)}</ProgressText>
                        </ProgressContainer>
                      </TableCellCenter>
                    </TableRow>
                  ))}
                </tbody>
              </StyledTable>
            </ResponsiveTable>

            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationInfo>
                  Mostrando <PaginationInfoBold>{indexOfFirstItem + 1}</PaginationInfoBold> a <PaginationInfoBold>{Math.min(indexOfLastItem, results.length)}</PaginationInfoBold> de <PaginationInfoBold>{results.length}</PaginationInfoBold> resultados
                </PaginationInfo>
                <PaginationButtons>
                  <PaginationButton
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </PaginationButton>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationButton
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationButton>
                  ))}
                  <PaginationButton
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </PaginationButton>
                </PaginationButtons>
              </PaginationContainer>
            )}
          </TableContainer>
        )}

        {results.length === 0 && !loading && !error && (
          <EmptyContainer>
            <EmptyIcon>
              <Search className="w-8 h-8 text-slate-400" />
            </EmptyIcon>
            <EmptyTitle>Nenhum resultado encontrado</EmptyTitle>
            <EmptySubtitle>Clique em "Buscar CDAs" para ver todos os registros ou ajuste os filtros.</EmptySubtitle>
          </EmptyContainer>
        )}
      </Content>
    </Container>
  );
};

export default EnhancedCdaSearch;