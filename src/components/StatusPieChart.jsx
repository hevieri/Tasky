import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatusPieChart({ tasks }) {
  const count = {
    done: tasks.filter(t => t.status === 'done').length,
    active: tasks.filter(t => t.status === 'active').length,
    planned: tasks.filter(t => t.status === 'planned').length,
  };

  const data = [
    { name: 'Done', value: count.done },
    { name: 'Active', value: count.active },
    { name: 'Planned', value: count.planned },
  ];

  const COLORS = ['#2ecc71', '#3498db', '#e67e22'];

  return (
    <div className="pie-wrapper">
      <h3 className="pie-title">📊 Distribución de tareas</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;
