class HabilidadesForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background-color: #e0e0e0;
          border: 1px solid #888;
          width: 350px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        input, select, textarea {
          padding: 0.75rem;
          font-size: 1rem;
          width: 100%;
          border: 1px solid #666;
          background-color: #f9f9f9;
        }
        button {
          background-color: #555;
          color: white;
          border: none;
          padding: 0.75rem;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #666;
        }
        label {
          font-weight: bold;
          color: #222;
        }
        #error-message, #success-message {
          display: none;
          font-size: 0.9rem;
        }
        #error-message {
          color: #b00;
        }
        #success-message {
          color: #0b0;
        }
      </style>
      <form id="habilidad-form">
        <label for="nombre_habilidad">Nombre de Habilidad:</label>
        <input type="text" id="nombre_habilidad" name="nombre_habilidad" required>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>

        <label for="nivel">Nivel:</label>
        <select id="nivel" name="nivel" required>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>

        <button type="submit">Guardar</button>
      </form>
      <div id="error-message">Ocurrió un error al guardar la habilidad. Intenta nuevamente.</div>
      <div id="success-message">Habilidad guardada exitosamente.</div>
    `;
    this.form = this.shadowRoot.querySelector('#habilidad-form');
    this.form.addEventListener('submit', this.handleSubmit);
    this.errorMessage = this.shadowRoot.querySelector('#error-message');
    this.successMessage = this.shadowRoot.querySelector('#success-message');
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(this.form);
    const habilidad = {};
    formData.forEach((value, key) => {
      habilidad[key] = value;
    });

    try {
      const response = await fetch('http://localhost:8000/habilidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habilidad),
      });

      if (!response.ok) {
        throw new Error('Error al guardar habilidad');
      }

      const result = await response.json();
      console.log('Habilidad guardada:', result);
      this.form.reset();
      this.successMessage.style.display = 'block'; // Mostrar mensaje de éxito
      this.errorMessage.style.display = 'none'; // Ocultar mensaje de error
    } catch (error) {
      console.error('Error al guardar habilidad:', error);
      this.errorMessage.style.display = 'block'; // Mostrar mensaje de error
      this.successMessage.style.display = 'none'; // Ocultar mensaje de éxito
    }
  };
}

customElements.define('habilidades-form', HabilidadesForm);
