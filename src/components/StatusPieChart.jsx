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
    <div style={{ width: '100%', height: 250 }}>
      <h3>📊 Distribución de tareas</h3>
      <ResponsiveContainer>
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;
