// Importar dependencias necesarias
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'sistemacontratacion', // Nombre de la base de datos
});

// Verificar la conexión a la base de datos
db.connect((error) => {
  if (error) {
    console.log("Error al conectar a la base de datos", error);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenidos al Sistema de Contratación API");
});

// Obtener todos los empleados
app.get("/empleados", (req, res) => {
  const query = "SELECT * FROM empleados";
  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("Error al consultar empleados");
    } else {
      res.json(result);
    }
  });
});

// Insertar un empleado
app.post("/empleados", (req, res) => {
  const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo, puesto } = req.body;
  const query = "INSERT INTO empleados (nombre, apellido, fecha_nacimiento, direccion, telefono, correo, puesto) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [nombre, apellido, fecha_nacimiento, direccion, telefono, correo, puesto], (error, result) => {
    if (error) {
      res.status(500).send("Error al insertar empleado");
      return;
    }
    res.json(result);
  });
});

// Actualizar un empleado
app.put("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo, puesto } = req.body;
  const query = "UPDATE empleados SET nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, telefono = ?, correo = ?, puesto = ? WHERE id_empleado = ?";
  db.query(query, [nombre, apellido, fecha_nacimiento, direccion, telefono, correo, puesto, id], (error, result) => {
    if (error) {
      res.status(500).send("Error al actualizar empleado");
      return;
    }
    res.json(result);
  });
});

// Eliminar un empleado
app.delete("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM empleados WHERE id_empleado = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send("Error al eliminar empleado");
      return;
    }
    res.json(result);
  });
});

// Obtener todas las habilidades
app.get("/habilidades", (req, res) => {
  const query = "SELECT * FROM habilidades";
  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("Error al consultar habilidades");
    } else {
      res.json(result);
    }
  });
});

// Insertar una habilidad
app.post("/habilidades", (req, res) => {
  const { nombre_habilidad, descripcion, nivel } = req.body;
  const query = "INSERT INTO habilidades (nombre_habilidad, descripcion, nivel) VALUES (?, ?, ?)";
  db.query(query, [nombre_habilidad, descripcion, nivel], (error, result) => {
    if (error) {
      res.status(500).send("Error al insertar habilidad");
      return;
    }
    res.json(result);
  });
});

// Actualizar una habilidad
app.put("/habilidades/:id", (req, res) => {
  const { id } = req.params;
  const { nombre_habilidad, descripcion, nivel } = req.body;
  const query = "UPDATE habilidades SET nombre_habilidad = ?, descripcion = ?, nivel = ? WHERE id_habilidad = ?";
  db.query(query, [nombre_habilidad, descripcion, nivel, id], (error, result) => {
    if (error) {
      res.status(500).send("Error al actualizar habilidad");
      return;
    }
    res.json(result);
  });
});

// Eliminar una habilidad
app.delete("/habilidades/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM habilidades WHERE id_habilidad = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send("Error al eliminar habilidad");
      return;
    }
    res.json(result);
  });
});

// Obtener las relaciones entre empleados y habilidades
// Obtener las relaciones entre empleados y habilidades
app.get("/habilidades_empleados", (req, res) => {
  const query = `
    SELECT e.nombre, e.apellido, h.nombre_habilidad, he.fecha_asignacion
    FROM habilidades_empleados he
    JOIN empleados e ON he.id_empleado = e.id_empleado
    JOIN habilidades h ON he.id_habilidad = h.id_habilidad`;
  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("Error al consultar las relaciones");
    } else {
      res.json(result); // Devuelve el JSON con los datos procesados
    }
  });
});


// Insertar una relación entre empleado y habilidad
app.post("/habilidades_empleados", (req, res) => {
  const { id_empleado, id_habilidad, fecha_asignacion } = req.body;
  const query = "INSERT INTO habilidades_empleados (id_empleado, id_habilidad, fecha_asignacion) VALUES (?, ?, ?)";
  db.query(query, [id_empleado, id_habilidad, fecha_asignacion], (error, result) => {
    if (error) {
      res.status(500).send("Error al insertar relación");
      return;
    }
    res.json(result);
  });
});

// Eliminar una relación entre empleado y habilidad
app.delete("/habilidades_empleados/:id_empleado/:id_habilidad", (req, res) => {
  const { id_empleado, id_habilidad } = req.params;
  const query = "DELETE FROM habilidades_empleados WHERE id_empleado = ? AND id_habilidad = ?";
  db.query(query, [id_empleado, id_habilidad], (error, result) => {
    if (error) {
      res.status(500).send("Error al eliminar relación");
      return;
    }
    res.json(result);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
