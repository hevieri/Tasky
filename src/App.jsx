import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import RoadmapMinimal from './components/RoadmapMinimal';
import RoadmapKanban from './components/RoadmapKanban';
import StatusSummary from './components/StatusSummary';
import CategoryFilter from './components/CategoryFilter';
import StatusPieChart from './components/StatusPieChart';
import EditableTable from './components/EditableTable';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleDataParsed = (parsedTasks) => {
    console.log('Tareas recibidas:', parsedTasks);
    setTasks(parsedTasks);
    setEditedTasks(parsedTasks);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((t) => t.category === selectedCategory)
    : tasks;

  const filteredEditedTasks = selectedCategory
    ? editedTasks.filter((t) => t.category === selectedCategory)
    : editedTasks;

  const validateTasks = (list) => {
    for (const task of list) {
      if (!task.name || !task.status || !task.start || !task.end) {
        return 'Todos los campos deben estar completos.';
      }
      if (new Date(task.start) > new Date(task.end)) {
        return `La fecha de inicio de "${task.name}" es posterior a la de fin.`;
      }
    }
    return '';
  };

  const applyEdits = () => {
    const error = validateTasks(editedTasks);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError('');
    setTasks(editedTasks);
  };

  return (
    <div className="app-container">
      <h1>🛠️ Tasky: Generador de Roadmaps Visuales</h1>

      <FileUploader onDataParsed={handleDataParsed} />

      {tasks.length > 0 && (
        <>
          {/* Toggle edición */}
          <label style={{ marginTop: '1rem', display: 'block' }}>
            <input
              type="checkbox"
              checked={editMode}
              onChange={(e) => setEditMode(e.target.checked)}
            />
            ✏️ Modo edición
          </label>

          {editMode ? (
            <>
              <EditableTable tasks={filteredEditedTasks} onUpdate={setEditedTasks} />
              {validationError && (
                <div style={{ color: '#e74c3c', marginBottom: '1rem' }}>
                  ⚠️ {validationError}
                </div>
              )}
              <button onClick={applyEdits}>✅ Aplicar cambios</button>
            </>
          ) : (
            <>
              <StatusSummary tasks={filteredTasks} />
              <CategoryFilter
                tasks={tasks}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />

              {/* Vistas en orden personalizado */}
              <RoadmapKanban tasks={filteredTasks} />
              <RoadmapMinimal tasks={filteredTasks} />
              <div className="pie-wrapper">
                <StatusPieChart tasks={filteredTasks} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
