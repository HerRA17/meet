import React, { Component, useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    
    const Colors = ['#0088FE', '#00C49F', '#ECF8F9', '#D80303', '#D4ADFC']

    useEffect(() => {
      const fetchData = async () => {
        const newData = await getData();
        setData(newData);
      }
      fetchData();
    }, [events]); //have a look at eslint-- exhaustive-deps

    const getData = async () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const newData = await Promise.all(
        genres.map(async (genre) => {
          const value = events.filter(({ summary }) => summary.split('').includes(genre)).length
          return {name: genre , value};
        })
      );
      
      return newData;
    };
    console.log(data.value)
    return (
        <ResponsiveContainer height={400}>
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              fill="D4ADFC"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
            {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
        ))}
           </Pie>
           </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenre;

     