# Sistema de Contratación API

Esta API permite gestionar empleados, habilidades y la relación entre ellos en un sistema de contratación. Es una solución basada en Node.js y MySQL, diseñada para realizar operaciones CRUD y gestionar relaciones entre diferentes entidades.

## Tabla de Contenidos

1. [Características](#características)
2. [Requisitos](#requisitos)
3. [Instalación](#instalación)
4. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
5. [Uso de la API](#uso-de-la-api)
    - [Empleados](#empleados)
    - [Habilidades](#habilidades)
    - [Relaciones entre Empleados y Habilidades](#relaciones-entre-empleados-y-habilidades)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Ejemplos de Pruebas](#ejemplos-de-pruebas)
9. [Futuras Mejoras](#futuras-mejoras)
10. [Autor](#autor)
11. [Licencia](#licencia)

---

## Características

- CRUD para empleados y habilidades.
- Gestión de relaciones entre empleados y habilidades con asignación de fechas.
- Respuestas JSON claras y estructuradas.
- Configuración fácil de base de datos.
- Middleware para análisis de solicitudes HTTP y manejo de CORS.
- Código modular para fácil mantenimiento.

---

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) v14 o superior.
- [MySQL](https://www.mysql.com/) v5.7 o superior.
- Un cliente REST como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar la API.

---

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone <https://github.com/BrayanVegaG/PROYECTO-U1-API-EMPLEADOS/>
    cd <PROYECTO-U1-API-EMPLEADOS>
    ```
2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```
3. Configura la base de datos siguiendo las instrucciones de la siguiente sección.

4. Inicia el servidor:
    ```bash
    npm start
    ```
5. Abre tu navegador o cliente REST y accede a `http://localhost:8000`.

---

## Configuración de la Base de Datos

1. Inicia tu servidor MySQL y abre el cliente de base de datos.

2. Crea la base de datos y las tablas necesarias ejecutando el siguiente script SQL:
    ```sql
    CREATE DATABASE sistemacontratacion;

    USE sistemacontratacion;

    CREATE TABLE empleados (
      id_empleado INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(50) NOT NULL,
      apellido VARCHAR(50) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      direccion VARCHAR(100) NOT NULL,
      telefono VARCHAR(15) NOT NULL,
      correo VARCHAR(50) NOT NULL,
      puesto VARCHAR(50) NOT NULL
    );

    CREATE TABLE habilidades (
      id_habilidad INT AUTO_INCREMENT PRIMARY KEY,
      nombre_habilidad VARCHAR(50) NOT NULL,
      descripcion TEXT NOT NULL,
      nivel VARCHAR(20) NOT NULL
    );

    CREATE TABLE habilidades_empleados (
      id_empleado INT NOT NULL,
      id_habilidad INT NOT NULL,
      fecha_asignacion DATE NOT NULL,
      PRIMARY KEY (id_empleado, id_habilidad),
      FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado) ON DELETE CASCADE,
      FOREIGN KEY (id_habilidad) REFERENCES habilidades(id_habilidad) ON DELETE CASCADE
    );
    ```

3. Actualiza las credenciales de conexión a la base de datos en el archivo principal:
    ```javascript
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Cambia según tu configuración
      database: 'sistemacontratacion',
    });
    ```

---

## Uso de la API

### Empleados

- `GET /empleados`: Lista todos los empleados.
- `POST /empleados`: Crea un nuevo empleado.
- `PUT /empleados/:id`: Actualiza un empleado existente.
- `DELETE /empleados/:id`: Elimina un empleado por ID.

Ejemplo de cuerpo para crear un empleado:
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "fecha_nacimiento": "1990-05-10",
  "direccion": "Av. Siempre Viva 123",
  "telefono": "0987654321",
  "correo": "juan.perez@example.com",
  "puesto": "Analista"
}
```

### Habilidades

- `GET /habilidades`: Lista todas las habilidades.
- `POST /habilidades`: Crea una nueva habilidad.
- `PUT /habilidades/:id`: Actualiza una habilidad existente.
- `DELETE /habilidades/:id`: Elimina una habilidad por ID.

Ejemplo de cuerpo para crear una habilidad:
```json
{
  "nombre_habilidad": "JavaScript",
  "descripcion": "Lenguaje de programación para desarrollo web.",
  "nivel": "Intermedio"
}
```

### Relaciones entre Empleados y Habilidades

- `GET /habilidades_empleados`: Lista las relaciones entre empleados y habilidades.
- `POST /habilidades_empleados`: Asocia un empleado con una habilidad.
- `DELETE /habilidades_empleados/:id_empleado/:id_habilidad`: Elimina la relación entre un empleado y una habilidad.

Ejemplo de cuerpo para asociar un empleado con una habilidad:
```json
{
  "id_empleado": 1,
  "id_habilidad": 2,
  "fecha_asignacion": "2024-12-01"
}
```

---

## Estructura del Proyecto

```plaintext
.
├── node_modules/        # Dependencias instaladas
├── package.json         # Configuración del proyecto y dependencias
├── app.js               # Código principal de la API
└── README.md            # Documentación del proyecto
```

---

## Tecnologías Utilizadas

- Node.js: Entorno de ejecución para JavaScript.
- Express: Framework para la creación de servidores web.
- MySQL: Base de datos relacional.
- body-parser: Middleware para manejar JSON.
- cors: Middleware para manejar políticas de acceso entre dominios.

---

## Ejemplos de Pruebas

Puedes probar la API usando Postman o cualquier cliente HTTP. Asegúrate de enviar encabezados correctos para solicitudes POST y PUT:
```http
Content-Type: application/json
```

---

## Futuras Mejoras

- Autenticación y autorización para proteger los endpoints.
- Implementación de validaciones con una librería como Joi.
- Paginación en las respuestas de empleados y habilidades.
- Registro de logs para rastrear errores y actividad del servidor.
- Integración con un frontend para visualización de datos.

---

## Autor

- [Brayan Vega](https://github.com/BrayanVegaG/PROYECTO-U1-API-EMPLEADOS)

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
