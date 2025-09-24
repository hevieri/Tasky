import React from 'react';
import './StatusSummary.css';

function StatusSummary({ tasks }) {
  const count = {
    done: tasks.filter(t => t.status === 'done').length,
    active: tasks.filter(t => t.status === 'active').length,
    planned: tasks.filter(t => t.status === 'planned').length,
  };

  return (
    <div className="status-summary">
      <span className="done">✅ Done: {count.done}</span>
      <span className="active">🔄 Active: {count.active}</span>
      <span className="planned">⏳ Planned: {count.planned}</span>
    </div>
  );
}

export default StatusSummary;
