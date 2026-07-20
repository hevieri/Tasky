import React, { useState, useRef } from 'react';
import FileUploader from './components/FileUploader';
import RoadmapMinimal from './components/RoadmapMinimal';
import RoadmapKanban from './components/RoadmapKanban';
import StatusSummary from './components/StatusSummary';
import StatusPieChart from './components/StatusPieChart';
import EditableTable from './components/EditableTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [step, setStep] = useState(1);

  const exportRef = useRef(null);

  const handleUpload = () => {
    if (!file) {
      alert('Selecciona un archivo primero');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) {
          alert('El archivo debe contener un array de tareas');
          return;
        }
        console.log('Tareas recibidas:', json);
        setTasks(json);
        setEditedTasks(json);
        setStep(2);
      } catch (error) {
        alert('Error al parsear JSON: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'tareas_editadas.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleExportPNG = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, { backgroundColor: '#0c0e14' });
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'tasky_graficos.png';
    link.click();
  };

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, { backgroundColor: '#0c0e14' });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('tasky_graficos.pdf');
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
    setTasks([...editedTasks]);
    setEditMode(false);
  };

  const resetApp = () => {
    setFile(null);
    setTasks([]);
    setEditedTasks([]);
    setSelectedCategory('');
    setEditMode(false);
    setValidationError('');
    setStep(1);
  };

  const features = [
    {
      icon: '📂',
      title: 'Importa tus tareas',
      text: 'Sube un archivo JSON con tu lista de tareas y Tasky lo lee al instante.',
    },
    {
      icon: '📊',
      title: 'Visualizalas',
      text: 'Kanban, roadmap cronologico y grafico de torta por estado, todo en uno.',
    },
    {
      icon: '✏️',
      title: 'Edita y valida',
      text: 'Modifica nombres, fechas y estados con validacion de campos y plazos.',
    },
    {
      icon: '💾',
      title: 'Exporta',
      text: 'Descarga tus tareas en JSON o las vistas en PNG y PDF para compartir.',
    },
  ];

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-logo" onClick={resetApp} title="Reiniciar">
          🛠️
        </div>
        <h1 className="app-title" onClick={resetApp} title="Reiniciar">
          Tasky
        </h1>
      </div>
      <p className="subtitle">Generador de Roadmaps Visuales</p>

      {step === 1 && (
        <div className="hero">
          <div className="hero-card">
            <h2>Que es Tasky?</h2>
            <p className="lead">
              Tasky es una herramienta web que convierte un simple archivo JSON
              de tareas en un panel visual completo. Pensado para la gestion de
              proyectos y la planificacion, te permite ver el estado de tu trabajo
              en distintos formatos, corregirlo y exportarlo para compartirlo.
            </p>

            <div className="features">
              {features.map((f) => (
                <div className="feature" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="upload-zone">
            <FileUploader onFileSelected={setFile} />
            <p className="file-info">
              {file ? file.name : 'Ningun archivo seleccionado'}
            </p>
            <button className="primary-btn" onClick={handleUpload}>
              Subir y visualizar
            </button>
          </div>
        </div>
      )}

      {step === 2 && tasks.length > 0 && (
        <>
          <div className="toolbar">
            <label className="edit-toggle">
              <input
                type="checkbox"
                checked={editMode}
                onChange={(e) => setEditMode(e.target.checked)}
              />
              Modo edicion
            </label>
          </div>

          {editMode ? (
            <>
              <EditableTable
                tasks={filteredEditedTasks}
                onUpdate={setEditedTasks}
              />
              {validationError && (
                <div className="error-msg">⚠️ {validationError}</div>
              )}
              <button className="primary-btn" onClick={applyEdits}>
                Aplicar cambios
              </button>
            </>
          ) : (
            <>
              <div ref={exportRef}>
                <StatusSummary tasks={filteredTasks} />
                <RoadmapKanban tasks={filteredTasks} />
                <RoadmapMinimal tasks={filteredTasks} />
                <div className="pie-wrapper">
                  <StatusPieChart tasks={filteredTasks} />
                </div>
              </div>

              <div className="export-bar">
                <button className="primary-btn" onClick={handleExportJSON}>
                  Exportar JSON
                </button>
                <button className="primary-btn" onClick={handleExportPNG}>
                  Exportar PNG
                </button>
                <button className="primary-btn" onClick={handleExportPDF}>
                  Exportar PDF
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
