import React from 'react';
import './EditableTable.css';

function EditableTable({ tasks, onUpdate }) {
  const handleChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  return (
    <div className="editable-table">
      <h3>✏️ Edición de tareas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleChange(i, 'name', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => handleChange(i, 'status', e.target.value)}
                >
                  <option value="done">Done</option>
                  <option value="active">Active</option>
                  <option value="planned">Planned</option>
                </select>
              </td>
              <td>
                <input
                  type="date"
                  value={task.start}
                  onChange={(e) => handleChange(i, 'start', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={task.end}
                  onChange={(e) => handleChange(i, 'end', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditableTable;
