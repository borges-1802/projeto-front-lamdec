import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 70px);
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

export const FilterContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const FilterTitleText = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
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

export const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
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

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${props => props.variant === 'primary' ? `
    background: #2F5375;
    color: white;

    &:hover:not(:disabled) {
      background:#1e40af;
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: #059669;
    color: white;

    &:hover:not(:disabled) {
      background: #047857;
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

export const ErrorContainer = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ErrorContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ErrorDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #dc2626;
  border-radius: 50%;
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const TableHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

export const TableHint = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  background: rgba(255, 255, 255, 0.6);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

export const ResponsiveTable = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const SortableHeader = styled.th`
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  }
`;

export const SortableHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SortableHeaderText = styled.span`
  font-weight: 600;
  color: #475569;
  transition: color 0.2s;

  ${SortableHeader}:hover & {
    color: #1e293b;
  }
`;

export const SortableHeaderIcons = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const SortableHeaderIcon = styled.div<{ isActive: boolean; direction: 'asc' | 'desc'; currentDirection: 'asc' | 'desc' }>`
  transition: color 0.2s;
  color: ${props => props.isActive && props.direction === props.currentDirection ? '#2563eb' : '#94a3b8'};

  ${SortableHeader}:hover & {
    color: ${props => props.isActive && props.direction === props.currentDirection ? '#2563eb' : '#64748b'};
  }
`;

export const TableRow = styled.tr<{ isEven: boolean }>`
  background: ${props => props.isEven ? 'rgba(255, 255, 255, 0.6)' : 'rgba(248, 250, 252, 0.6)'};
  transition: background-color 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgba(239, 246, 255, 0.5) 0%, rgba(224, 242, 254, 0.5) 100%);
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
`;

export const TableCellRight = styled(TableCell)`
  text-align: right;
`;

export const TableCellCenter = styled(TableCell)`
  text-align: center;
`;

export const CellCdaNumber = styled.span`
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  color: #1e293b;
  font-weight: 500;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
`;

export const CellYear = styled.span`
  color: #475569;
  font-weight: 500;
`;

export const CellSaldo = styled.span`
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #eff6ff 0%, #f1f5f9 100%);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
`;

export const CellNatureza = styled.span`
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #93c5fd;
`;

export const Badge = styled.span<{ status: number }>`
  padding: 0.25rem 1rem;
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

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProgressBar = styled.div`
  flex: 1;
  background: #e2e8f0;
  border-radius: 9999px;
  height: 0.75rem;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number }>`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  height: 0.75rem;
  border-radius: 9999px;
  transition: width 0.3s;
  width: ${props => props.width}%;
`;

export const ProgressText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  min-width: 50px;
`;

export const PaginationContainer = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

export const PaginationInfoBold = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PaginationButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: ${props => props.isActive ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'white'};
  color: ${props => props.isActive ? 'white' : '#374151'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover:not(:disabled) {
    background: ${props => props.isActive ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' : '#f9fafb'};
    border-color: #9ca3af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #dbeafe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

export const EmptyTitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const EmptySubtitle = styled.p`
  color: #94a3b8;
`;