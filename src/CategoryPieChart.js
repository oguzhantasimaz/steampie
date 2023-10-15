import React from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryPieChart = ({ data }) => {
  return (
    <div>
      <h2>Category Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
