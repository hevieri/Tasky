// Mapeo de estados a estilos válidos en Mermaid 11
function mapStatus(status) {
  switch (status) {
    case 'done':
      return 'done';   // verde
    case 'active':
      return 'active'; // azul/naranja
    case 'planned':
      return 'crit';   // rojo (usamos crit como "pendiente")
    default:
      return '';
  }
}

// Generador de código Mermaid con secciones y configuración dinámica
export function generateMermaid(tasks, axisFormat = '%d-%m') {
  let code = 'gantt\n';
  code += '  title Roadmap generado\n';
  code += '  dateFormat YYYY-MM-DD\n';
  code += `  axisFormat ${axisFormat}\n\n`;

  // Agrupar tareas por categoría (si existe la propiedad "category")
  const grouped = {};
  tasks.forEach((task) => {
    const category = task.category || 'General';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(task);
  });

  // Renderizar cada sección
  Object.keys(grouped).forEach((category) => {
    code += `  section ${category}\n`;
    grouped[category].forEach((task, i) => {
      const status = mapStatus(task.status);
      if (task.start && task.end) {
        code += `  ${task.name} :${status}, ${task.id || 't' + i}, ${task.start}, ${task.end}\n`;
      }
    });
    code += '\n';
  });

  return code;
}
