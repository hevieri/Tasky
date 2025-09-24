import React, { useState } from 'react';

function FileUploader({ onDataParsed }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert('Seleccioná un archivo primero');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const contenido = event.target.result;
      console.log('Contenido leído:', contenido); // 🔍 debug

      try {
        const json = JSON.parse(contenido);
        if (!Array.isArray(json)) {
          alert('El archivo debe contener un array de tareas');
          return;
        }

        console.log('JSON parseado:', json); // 🔍 debug
        onDataParsed(json);
      } catch (error) {
        alert('Error al parsear JSON: ' + error.message);
      }
    };

    reader.onerror = (e) => {
      alert('Error al leer el archivo: ' + e.target.error.message);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Subir y visualizar</button>
    </div>
  );
}

export default FileUploader;
