import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({events}) => {
    const [ data, setData] = useState([]);
    useEffect(() => {setData(() => getData()); }, [events]);
    
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) => summary.split('').include(genre)).length
            return {name:genre , value};
        })
        return data;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={ ({ name, percent }) => `${(percent * 100).toFixed(0)}%` }
            >
           </Pie>
          </PieChart>
        </ResponsiveContainer>
    );
}
     export default EventGenre;