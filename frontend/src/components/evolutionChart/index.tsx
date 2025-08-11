import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EvolucaoItem } from './styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface EvolutionChartProps {
  data: EvolucaoItem[];
}

export const EvolutionChart = ({ data }: EvolutionChartProps) => {
  const chartData = {
    labels: data.map(item => item.ano.toString()),
    datasets: [{
      label: 'Evolução Anual (R$)',
      data: data.map(item => item.total),
      borderColor: '#2F5375',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`,
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => typeof value === 'number' ? value.toLocaleString('pt-BR') : value
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};
          
export default EvolutionChart;