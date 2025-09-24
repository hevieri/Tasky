const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(fileUpload());

app.post('/upload', (req, res) => {
  const file = req.files.file;
  const content = file.data.toString();
  try {
    const json = JSON.parse(content);
    res.json(json);
  } catch (err) {
    res.status(400).json({ error: 'Archivo inválido' });
  }
});

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));
