import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const GenrePieChart = ({ data }) => {
  return (
    <div className="charts-container">
      <Pie data={data}
      height="700px"
      width="700px"
      //make legends bigger and make chart responsive
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 15
              }
            }
          }
        }
      }}
      />
    </div>
  );
};

export default GenrePieChart;
