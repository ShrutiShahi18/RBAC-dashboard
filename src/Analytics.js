import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'New Users',
        data: [30, 50, 40, 60, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows chart to resize
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'black',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: 'black',
        },
      },
    },
    animation: {
      duration: 1000, 
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div
      className="glassmorphic w-full md:w-1/2 lg:w-1/4 min-h-full p-4 rounded-lg shadow-lg"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <h2 className="text-lg font-semibold text-center mb-4">User Analytics</h2>
      <div className="relative" style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
