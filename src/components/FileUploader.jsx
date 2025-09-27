import React from 'react';

function FileUploader({ onFileSelected }) {
  return (
    <div className="file-section">
      <label className="btn btn-secondary">
        Seleccionar archivo
        <input
          type="file"
          accept=".json"
          hidden
          onChange={(e) => onFileSelected(e.target.files[0])}
        />
      </label>
    </div>
  );
}

export default FileUploader;
