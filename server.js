const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});

// Servir archivos estáticos desde el directorio "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo HTML', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Envía el objeto JSON al cliente
    res.send(data);
  });
});
app.get('/productos', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('archivo.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Convierte el contenido del archivo a objeto JSON
    const jsonData = JSON.parse(data);

    // Envía el objeto JSON al cliente
    res.json(jsonData);
  });
});

app.get('/rssMarca', async (req, res) => {
  try {
    // Realiza la petición HTTP para obtener el XML.
    const response = await axios.get('https://estaticos.marca.com/rss/portada.xml');
    const xml = response.data;

    //Convierte XML a JSON
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        throw err;
      }
      //Envía el JSON al cliente
      res.json(result);
    });
  } catch (error) {
    res.status(500).send('Error al obtener el feed RSS');
  }
});

app.get('/atom', async (req, res) => {
  try {
    const response = await axios.get('https://www.mujerhoy.com/rss/atom/?section=belleza');
    const xml = response.data;

    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error al parsear XML:', err);
        res.status(500).send('Error al parsear el feed RSS');
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error('Error al obtener el feed ATOM:', error.message);
    res.status(500).send('Error al obtener el feed ATOM');
  }

});