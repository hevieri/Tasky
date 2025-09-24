import React from 'react';
import './RoadmapKanban.css';

function RoadmapKanban({ tasks }) {
  if (!tasks || tasks.length === 0) return null;

  // Agrupar tareas por estado
  const grouped = {
    done: [],
    active: [],
    planned: [],
  };

  tasks.forEach((task) => {
    if (grouped[task.status]) {
      grouped[task.status].push(task);
    } else {
      grouped.planned.push(task); // fallback
    }
  });

  return (
    <div className="kanban-container">
      <h3>🗂️ Roadmap Kanban</h3>
      <div className="kanban-board">
        {Object.keys(grouped).map((status) => (
          <div key={status} className={`kanban-column ${status}`}>
            <h4 className="kanban-title">{status.toUpperCase()}</h4>
            {grouped[status].map((task, i) => (
              <div key={i} className="kanban-card">
                <strong>{task.name}</strong>
                <div className="dates">
                  {task.start} → {task.end}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapKanban;
