import React from 'react';
import { Title, Value, Subtitle } from "./styles";
import styled from "styled-components";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

const Card = styled.div<{ color?: string }>`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.color || '#2F5375'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, color }) => {
  const displayValue = value?.toString() || '0';

  return (
    <Card color={color}>
      <Title>{title}</Title>
      <Value>{displayValue}</Value>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Card>
  );
};

export default MetricCard;