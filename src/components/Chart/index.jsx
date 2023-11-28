import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Line
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Commit Count',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Dates in Weeks',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
