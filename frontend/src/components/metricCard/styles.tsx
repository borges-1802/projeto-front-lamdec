import styled from 'styled-components';

export const Title = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Value = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 8px 0 0 0;
`;


export const CardTitle = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const CardValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

interface CardTrendProps {
  trend: 'up' | 'down' | 'neutral';
}

export const CardTrend = styled.span<CardTrendProps>`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: ${({ trend }) => 
    trend === 'up' ? '#2F5375' : 
    trend === 'down' ? '#ef4444' : 
    '#6b7280'};
  display: inline-flex;
  align-items: center;
  
  &::before {
    content: ${({ trend }) => 
      trend === 'up' ? '"▲"' : 
      trend === 'down' ? '"▼"' : 
      '"→"'};
    margin-right: 0.25rem;
    font-size: 0.75rem;
  }
`;