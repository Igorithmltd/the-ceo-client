import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // Import and register the point element
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // Register the point element
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Sales: ${tooltipItem.raw}`
        }
      },
      title: {
        display: true,
        text: 'Monthly Sales Data'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sales'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;