import React from 'react';
import './RoadmapMinimal.css';

function RoadmapMinimal({ tasks }) {
  if (!tasks || tasks.length === 0) return null;

  // Calcular rango de fechas
  const allDates = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

  const getBarStyle = (task) => {
    const start = (new Date(task.start) - minDate) / (1000 * 60 * 60 * 24);
    const end = (new Date(task.end) - minDate) / (1000 * 60 * 60 * 24);
    const left = (start / totalDays) * 100;
    const width = ((end - start) / totalDays) * 100;

    let color = '#95a5a6';
    if (task.status === 'done') color = '#2ecc71';
    if (task.status === 'active') color = '#3498db';
    if (task.status === 'planned') color = '#e67e22';

    return {
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: color,
    };
  };

  return (
    <div className="roadmap-minimal">
      <h3>📋 Roadmap Minimal</h3>

      {/* Leyenda */}
      <div className="legend">
        <span><span className="legend-box done"></span> Done</span>
        <span><span className="legend-box active"></span> Active</span>
        <span><span className="legend-box planned"></span> Planned</span>
      </div>

      {/* Tabla de tareas */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>{task.name}</td>
              <td className={`status ${task.status}`}>{task.status}</td>
              <td>{task.start}</td>
              <td>{task.end}</td>
              <td>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={getBarStyle(task)}
                    title={`${task.name} (${task.status})\n${task.start} → ${task.end}`}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoadmapMinimal;
