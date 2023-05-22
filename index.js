const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 4000;
const fs = require("fs");

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'web-server-prueba.mysql.database.azure.com',
  user: 'David',
  database: 'colegio',
  port: 3306,
  ssl: { 
    rejectUnauthorized: true,
    ca:fs.readFileSync("ssl/DigiCertGlobalRootCA.crt.pem","utf8")
  } 
};

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Establecer la conexión
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Definir una ruta para obtener los datos de la tabla
app.get('/', (req, res) => {
  // Consulta SQL para obtener los datos de la tabla
  const query = 'SELECT * FROM alumno';

  // Ejecutar la consulta
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return;
    }

    // Renderizar la plantilla EJS con los datos obtenidos
    res.render('index', { data: results });
  });

  
});

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');

// Carpeta de vistas
app.set('views', __dirname + '/views');

// Iniciar el servidor
app.listen(port, () => {  
  console.log(`Servidor web en http://localhost:${port}`);
});
