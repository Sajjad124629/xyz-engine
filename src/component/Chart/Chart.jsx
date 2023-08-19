import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  } from 'recharts';
import PropTypes from 'prop-types';

const Chart = (props) => {
  const  {data} = props;
    return (
        <div>
          <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="kp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="x" fill="#8884d8" />
        </BarChart>
        </div>
    );
};
Chart.propTypes = {
  data: PropTypes.array,
 
}
export default Chart;