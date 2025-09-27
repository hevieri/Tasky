# 🛠️ Tasky – Generador de Roadmaps Visuales

**Tasky** es una aplicación web minimalista y modular que permite **subir un archivo JSON con tareas**, visualizarlas en distintos formatos (Kanban, Roadmap, Gráfico de torta, Resumen), editarlas y exportarlas nuevamente.  
Ideal para **gestión de proyectos, planificación y seguimiento visual**.

---

## ✨ Características

- 📂 **Importar tareas** desde un archivo `.json`.
- 📝 **Edición en tabla** con validación de campos y fechas.
- 📊 **Visualizaciones múltiples**:
  - Resumen de estados
  - Kanban
  - Roadmap minimalista
  - Gráfico circular de distribución de tareas
- 💾 **Exportación**:
  - Exportar las tareas editadas a `.json`
  - Exportar las visualizaciones a **PNG** o **PDF**
- 🎨 **Interfaz oscura** moderna y centrada en la claridad visual.
- 🔄 Flujo simple de dos pasos:
  1. Subir archivo
  2. Visualizar / editar / exportar


## 🚀 Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/tasky.git
   cd tasky
Instalar dependencias:

bash
npm install
Ejecutar en modo desarrollo:

bash
npm start
Abrir en el navegador:

Código
http://localhost:3000


🖼️ Exportación de resultados
JSON → descarga las tareas editadas.

PNG → captura de los gráficos y roadmaps.

PDF → exporta la misma vista en formato PDF.

🛠️ Tecnologías utilizadas
React

Recharts

html2canvas

jsPDF

📌 Roadmap futuro
[ ] Filtros avanzados por categoría y fechas

[ ] Exportación selectiva de vistas

[ ] Integración con APIs externas de gestión de proyectos
