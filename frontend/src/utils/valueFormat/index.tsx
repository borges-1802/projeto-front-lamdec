export const formatCurrency = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0';
  }

  return new Intl.NumberFormat('pt-BR').format(Math.round(value));
};

export const safeNumber = (value: any, defaultValue: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

export const formatPercent = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0%';
  }

  return `${(value * 100).toFixed(1)}%`;
};