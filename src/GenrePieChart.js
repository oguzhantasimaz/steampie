import React from 'react';
import { Pie } from 'react-chartjs-2';

const GenrePieChart = ({ data }) => {
  return (
    <div>
      <h2>Genre Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default GenrePieChart;
