class RelacionComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        th {
          background-color: #444;
          color: white;
        }
      </style>
      <h2>Relaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Habilidad</th>
            <th>Fecha de Asignación</th>
          </tr>
        </thead>
        <tbody id="relaciones-list">
          <!-- Aquí se llenarán las relaciones -->
        </tbody>
      </table>
      <div id="error-message" style="color: red; display: none;"></div>
    `;
    this.relacionesList = this.shadowRoot.querySelector('#relaciones-list');
    this.errorMessage = this.shadowRoot.querySelector('#error-message');
  }

  async connectedCallback() {
    await this.loadRelaciones();
  }

  async loadRelaciones() {
    try {
      const response = await fetch('http://localhost:8000/habilidades_empleados');
      
      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error(`Error en la carga de datos: ${response.statusText}`);
      }

      const relaciones = await response.json();
      if (Array.isArray(relaciones) && relaciones.length > 0) {
        this.renderRelaciones(relaciones);
      } else {
        this.showError('No se encontraron relaciones.');
      }
    } catch (error) {
      console.error('Error al cargar las relaciones:', error);
      this.showError('Ocurrió un error al cargar las relaciones. Intenta nuevamente.');
    }
  }

  renderRelaciones(relaciones) {
    this.relacionesList.innerHTML = '';
    relaciones.forEach((relacion) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${relacion.nombre || 'N/A'}</td>
        <td>${relacion.apellido || 'N/A'}</td>
        <td>${relacion.nombre_habilidad || 'N/A'}</td>
        <td>${relacion.fecha_asignacion ? new Date(relacion.fecha_asignacion).toLocaleDateString() : 'N/A'}</td>
      `;
      this.relacionesList.appendChild(row);
    });
  }
  
  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
  }
}

customElements.define('relacion-component', RelacionComponent);
