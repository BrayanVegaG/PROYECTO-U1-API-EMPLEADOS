class EmpleadosLista extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
  }

  render() {
      this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          color: #333;
          padding: 20px;
        }

        h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        th, td {
          border: 1px solid #ccc;
          padding: 12px 15px;
          text-align: left;
        }

        th {
          background-color: #555;
          color: white;
          text-transform: uppercase;
        }

        td {
          background-color: #f9f9f9;
        }

        td button {
          background-color: #555;
          color: white;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        td button:hover {
          background-color: #333;
        }

        .actions-btns {
          display: flex;
          gap: 8px;
        }

        .actions-btns button {
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        #update-form {
          display: none;
          background-color: white;
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 300px;
          margin: 20px auto;
        }

        #update-form input,
        #update-form select {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        #update-form button {
          background-color: #555;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
        }

        #update-form button:hover {
          background-color: #333;
        }
        
        #update-form .cancel-btn {
          background-color: #e74c3c;
          margin-left: 10px;
        }

      </style>
      
      <h2>Lista de Empleados</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Puesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="empleados-lista">
          <!-- Aquí se llenarán los empleados -->
        </tbody>
      </table>

      <div id="update-form">
        <h3>Actualizar Empleado</h3>
        <form id="update-employee-form">
          <label for="update-nombre">Nombre:</label>
          <input type="text" id="update-nombre" name="nombre" required>

          <label for="update-apellido">Apellido:</label>
          <input type="text" id="update-apellido" name="apellido" required>

          <label for="update-puesto">Puesto:</label>
          <input type="text" id="update-puesto" name="puesto" required>

          <button type="submit">Actualizar</button>
          <button type="button" class="cancel-btn" id="cancel-update-btn">Cancelar</button>
        </form>
      </div>
    `;
      this.empleadosList = this.shadowRoot.querySelector('#empleados-lista');
      this.updateForm = this.shadowRoot.querySelector('#update-form');
      this.cancelUpdateButton = this.shadowRoot.querySelector('#cancel-update-btn');
      this.updateEmployeeForm = this.shadowRoot.querySelector('#update-employee-form');
  }

  async connectedCallback() {
      await this.loadEmpleados();
  }

  async loadEmpleados() {
      try {
          const response = await fetch('http://localhost:8000/empleados');
          const empleados = await response.json();
          this.renderEmpleados(empleados);
      } catch (error) {
          console.error('Error al cargar empleados:', error);
      }
  }

  renderEmpleados(empleados) {
      this.empleadosList.innerHTML = ''; // Limpiar la tabla antes de agregar los empleados

      empleados.forEach((empleado) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${empleado.id_empleado}</td>
          <td>${empleado.nombre}</td>
          <td>${empleado.apellido}</td>
          <td>${empleado.puesto}</td>
          <td class="actions-btns">
              <button class="update-btn" data-id="${empleado.id_empleado}">Actualizar</button>
              <button class="delete-btn" data-id="${empleado.id_empleado}">Eliminar</button>
          </td>
          `;
          
          const actualizarButton = row.querySelector('.update-btn');
          actualizarButton.addEventListener('click', () => this.handleActualizar(empleado));

          const deleteButton = row.querySelector('.delete-btn');
          deleteButton.addEventListener('click', () => this.handleDelete(empleado.id_empleado));

          this.empleadosList.appendChild(row);
      });
  }

  async handleDelete(id) {
      try {
          const response = await fetch(`http://localhost:8000/empleados/${id}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              alert('Empleado eliminado');
              this.loadEmpleados(); // Recargar la lista después de eliminar
          }
      } catch (error) {
          console.error('Error al eliminar empleado:', error);
      }
  }

  handleActualizar(empleado) {
      this.shadowRoot.querySelector('#update-nombre').value = empleado.nombre;
      this.shadowRoot.querySelector('#update-apellido').value = empleado.apellido;
      this.shadowRoot.querySelector('#update-puesto').value = empleado.puesto;

      this.updateForm.style.display = 'block';

      this.updateEmployeeForm.onsubmit = (event) => this.handleUpdateSubmit(event, empleado.id_empleado);
  }

  async handleUpdateSubmit(event, id) {
      event.preventDefault();

      const updatedEmpleado = {
          nombre: this.shadowRoot.querySelector('#update-nombre').value,
          apellido: this.shadowRoot.querySelector('#update-apellido').value,
          puesto: this.shadowRoot.querySelector('#update-puesto').value,
      };

      try {
          const response = await fetch(`http://localhost:8000/empleados/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedEmpleado),
          });

          if (response.ok) {
              alert('Empleado actualizado');
              this.loadEmpleados(); // Recargar la lista después de actualizar
              this.updateForm.style.display = 'none'; // Ocultar el formulario
          }
      } catch (error) {
          console.error('Error al actualizar empleado:', error);
      }
  }

  handleCancelUpdate() {
      this.updateForm.style.display = 'none'; // Ocultar el formulario si se cancela
  }
}

customElements.define('empleados-lista', EmpleadosLista);
