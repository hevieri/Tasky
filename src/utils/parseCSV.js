const csv = require('csv-parser');
const { Readable } = require('stream');

function parseCSV(content) {
  return new Promise((resolve) => {
    const results = [];
    const stream = Readable.from(content);
    stream.pipe(csv())
      .on('data', (data) => {
        results.push({
          id: data.Tarea.replace(/\s+/g, ''),
          title: data.Tarea,
          status: mapStatus(data.Estado),
          start: data['Fecha inicio'],
          end: data['Fecha fin'],
        });
      })
      .on('end', () => resolve(results));
  });
}

function mapStatus(estado) {
  if (estado.includes('Completado')) return 'done';
  if (estado.includes('En progreso')) return 'active';
  return '';
}

module.exports = parseCSV;
