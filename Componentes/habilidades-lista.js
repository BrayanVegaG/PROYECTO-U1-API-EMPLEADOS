class HabilidadesLista extends HTMLElement {
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
          background-color: #f0f0f0;
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
          padding: 10px 12px;
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
          background-color: #007bff;
          color: white;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        td button:hover {
          background-color: #0056b3;
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
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
        }

        #update-form button:hover {
          background-color: #0056b3;
        }

        #update-form .cancel-btn {
          background-color: #dc3545;
          margin-left: 10px;
        }

      </style>
      
      <h2>Lista de Habilidades</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Habilidad</th>
            <th>Descripción</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="habilidades-lista">
          <!-- Aquí se llenarán las habilidades -->
        </tbody>
      </table>

      <div id="update-form">
        <h3>Actualizar Habilidad</h3>
        <form id="update-habilidad-form">
          <label for="update-nombre">Habilidad:</label>
          <input type="text" id="update-nombre" name="nombre_habilidad" required>

          <label for="update-descripcion">Descripción:</label>
          <input type="text" id="update-descripcion" name="descripcion" required>

          <label for="update-nivel">Nivel:</label>
          <input type="text" id="update-nivel" name="nivel" required>

          <button type="submit">Actualizar</button>
          <button type="button" class="cancel-btn" id="cancel-update-btn">Cancelar</button>
        </form>
      </div>
    `;
    this.habilidadesList = this.shadowRoot.querySelector('#habilidades-lista');
    this.updateForm = this.shadowRoot.querySelector('#update-form');
    this.cancelUpdateButton = this.shadowRoot.querySelector('#cancel-update-btn');
    this.updateHabilidadForm = this.shadowRoot.querySelector('#update-habilidad-form');
  }

  async connectedCallback() {
    await this.loadHabilidades();
  }

  async loadHabilidades() {
    try {
      const response = await fetch('http://localhost:8000/habilidades');
      const habilidades = await response.json();
      this.renderHabilidades(habilidades);
    } catch (error) {
      console.error('Error al cargar habilidades:', error);
    }
  }

  renderHabilidades(habilidades) {
    this.habilidadesList.innerHTML = ''; // Limpiar la tabla antes de agregar las habilidades

    habilidades.forEach((habilidad) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${habilidad.id_habilidad}</td>
        <td>${habilidad.nombre_habilidad}</td>
        <td>${habilidad.descripcion}</td>
        <td>${habilidad.nivel}</td>
        <td class="actions-btns">
          <button class="update-btn" data-id="${habilidad.id_habilidad}">Actualizar</button>
          <button class="delete-btn" data-id="${habilidad.id_habilidad}">Eliminar</button>
        </td>
      `;
      
      const actualizarButton = row.querySelector('.update-btn');
      actualizarButton.addEventListener('click', () => this.handleActualizar(habilidad));

      const deleteButton = row.querySelector('.delete-btn');
      deleteButton.addEventListener('click', () => this.handleDelete(habilidad.id_habilidad));

      this.habilidadesList.appendChild(row);
    });
  }

  async handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:8000/habilidades/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Habilidad eliminada');
        this.loadHabilidades(); // Recargar la lista después de eliminar
      }
    } catch (error) {
      console.error('Error al eliminar habilidad:', error);
    }
  }

  handleActualizar(habilidad) {
    this.shadowRoot.querySelector('#update-nombre').value = habilidad.nombre_habilidad;
    this.shadowRoot.querySelector('#update-descripcion').value = habilidad.descripcion;
    this.shadowRoot.querySelector('#update-nivel').value = habilidad.nivel;

    this.updateForm.style.display = 'block';

    this.updateHabilidadForm.onsubmit = (event) => this.handleUpdateSubmit(event, habilidad.id_habilidad);
  }

  async handleUpdateSubmit(event, id) {
    event.preventDefault();

    const updatedHabilidad = {
      nombre_habilidad: this.shadowRoot.querySelector('#update-nombre').value,
      descripcion: this.shadowRoot.querySelector('#update-descripcion').value,
      nivel: this.shadowRoot.querySelector('#update-nivel').value,
    };

    try {
      const response = await fetch(`http://localhost:8000/habilidades/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHabilidad),
      });

      if (response.ok) {
        alert('Habilidad actualizada');
        this.loadHabilidades(); // Recargar la lista después de actualizar
        this.updateForm.style.display = 'none'; // Ocultar el formulario
      }
    } catch (error) {
      console.error('Error al actualizar habilidad:', error);
    }
  }

  handleCancelUpdate() {
    this.updateForm.style.display = 'none'; // Ocultar el formulario si se cancela
  }
}

customElements.define('habilidades-lista', HabilidadesLista);
