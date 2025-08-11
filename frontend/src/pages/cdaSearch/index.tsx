import { useState } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { Edit, Download } from "lucide-react";

interface CdaItem {
  numCDA: string;
  score: number;
  valor_saldo_atualizado: number;
  qtde_anos_idade_cda: number;
  agrupamento_situacao: number;
  natureza: string;
}

// Styled Components
const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorContainer = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #dc2626;
  border-radius: 50%;
`;

const ResultsContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

const ResultsHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const ResultsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  }
`;

const Badge = styled.span<{ status: number }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid;

  ${props => {
    switch (props.status) {
      case 1:
        return `
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          color: #166534;
          border-color: #86efac;
        `;
      case 0:
        return `
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
          border-color: #fbbf24;
        `;
      default:
        return `
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #991b1b;
          border-color: #f87171;
        `;
    }
  }}
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const ModalField = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.5rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #f1f5f9;
    color: #64748b;
  }
`;

const ModalSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;

    &:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    }
  ` : `
    background: white;
    color: #475569;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f8fafc;
    }
  `}
`;

export default function CdaSearch() {
  const [filters, setFilters] = useState({ 
    ano: "", 
    situacao: "", 
    saldo_min: "", 
    saldo_max: "" 
  });
  const [results, setResults] = useState<CdaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<CdaItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const search = async () => {
    setLoading(true);
    setError(null);
    
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
      
    } catch (err: any) {
      console.error("Erro na busca:", err);
      setError(err.response?.data?.detail || err.message || "Erro ao buscar dados");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item: CdaItem) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (!editingItem) return;

    setResults(prev => 
      prev.map(item => 
        item.numCDA === editingItem.numCDA ? editingItem : item
      )
    );

    setShowEditModal(false);
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

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

  return (
    <Container>
      <Content>
        <FilterContainer>
          <FilterTitle>
            Filtros de Busca
          </FilterTitle>
          
          <FilterGrid>
            <FilterField>
              <FilterLabel>Ano</FilterLabel>
              <FilterInput 
                placeholder="Ex: 2023" 
                value={filters.ano} 
                onChange={e => setFilters({...filters, ano: e.target.value})}
                title="Baseado na idade da CDA. Ex: para CDAs de 2019, digite 2019"
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

          <ButtonContainer>
            <Button 
              variant="primary"
              onClick={search}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>

            {results.length > 0 && (
              <Button variant="secondary">
                <Download size={16} />
                Exportar CSV
              </Button>
            )}
          </ButtonContainer>
        </FilterContainer>

        {error && (
          <ErrorContainer>
            <ErrorDot />
            <strong>Erro:</strong> {error}
          </ErrorContainer>
        )}

        {results.length > 0 && (
          <ResultsContainer>
            <ResultsHeader>
              <ResultsTitle>
                Resultados da Busca ({results.length} registros)
              </ResultsTitle>
            </ResultsHeader>
            
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Número CDA</TableHeader>
                    <TableHeader>Ano</TableHeader>
                    <TableHeader>Situação</TableHeader>
                    <TableHeader>Saldo</TableHeader>
                    <TableHeader>Natureza</TableHeader>
                    <TableHeader>Ações</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, idx) => (
                    <TableRow key={item.numCDA || idx}>
                      <TableCell>
                        {item.numCDA || '-'}
                      </TableCell>
                      <TableCell>
                        {item.numCDA ? item.numCDA.toString().substring(0, 4) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge status={item.agrupamento_situacao}>
                          {formatSituacao(item.agrupamento_situacao)}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        {formatCurrency(item.valor_saldo_atualizado)}
                      </TableCell>
                      <TableCell>
                        {item.natureza || '-'}
                      </TableCell>
                      <TableCell>
                        <EditButton onClick={() => openEditModal(item)}>
                          <Edit size={14} />
                          Editar
                        </EditButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </ResultsContainer>
        )}

        {results.length === 0 && !loading && !error && (
          <EmptyState>
            <p>Nenhum resultado encontrado. Clique em "Buscar" para ver todos os registros.</p>
          </EmptyState>
        )}
      </Content>

      {showEditModal && editingItem && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Editar CDA</ModalTitle>
            
            <ModalField>
              <ModalLabel>Número CDA</ModalLabel>
              <ModalInput
                type="text"
                value={editingItem.numCDA}
                onChange={e => setEditingItem({...editingItem, numCDA: e.target.value})}
                disabled
              />
            </ModalField>

            <ModalField>
              <ModalLabel>Situação</ModalLabel>
              <ModalSelect
                value={editingItem.agrupamento_situacao}
                onChange={e => setEditingItem({...editingItem, agrupamento_situacao: parseInt(e.target.value)})}
              >
                <option value={-1}>Cancelada</option>
                <option value={0}>Em cobrança</option>
                <option value={1}>Quitada</option>
              </ModalSelect>
            </ModalField>

            <ModalField>
              <ModalLabel>Saldo Atualizado</ModalLabel>
              <ModalInput
                type="number"
                step="0.01"
                value={editingItem.valor_saldo_atualizado}
                onChange={e => setEditingItem({...editingItem, valor_saldo_atualizado: parseFloat(e.target.value) || 0})}
              />
            </ModalField>

            <ModalField>
              <ModalLabel>Natureza</ModalLabel>
              <ModalInput
                type="text"
                value={editingItem.natureza}
                onChange={e => setEditingItem({...editingItem, natureza: e.target.value})}
              />
            </ModalField>

            <ModalField>
              <ModalLabel>Anos de Idade da CDA</ModalLabel>
              <ModalInput
                type="number"
                value={editingItem.qtde_anos_idade_cda}
                onChange={e => setEditingItem({...editingItem, qtde_anos_idade_cda: parseInt(e.target.value) || 0})}
              />
            </ModalField>

            <ModalActions>
              <ModalButton onClick={cancelEdit}>
                Cancelar
              </ModalButton>
              <ModalButton variant="primary" onClick={saveEdit}>
                Salvar
              </ModalButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}