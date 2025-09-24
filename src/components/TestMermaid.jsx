import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

function TestMermaid() {
  const ref = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    const code = `
      gantt
        title Roadmap de prueba
        section Diseño
        Diseñar landing :done, a1, 2025-09-01, 2025-09-03
        Maquetar página :active, a2, 2025-09-04, 2025-09-09
        Conectar API :planned, a3, 2025-09-10, 2025-09-14
    `;

    mermaid.render('test-graph', code, (svgCode) => {
      ref.current.innerHTML = svgCode;
    });
  }, []);

  return (
    <div>
      <h2>Prueba Mermaid</h2>
      <div
        ref={ref}
        style={{
          border: '1px solid #444',
          padding: '1rem',
          background: '#111',
          minHeight: '200px',
        }}
      ></div>
    </div>
  );
}

export default TestMermaid;
