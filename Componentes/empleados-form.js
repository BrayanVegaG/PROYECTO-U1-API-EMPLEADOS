class EmpleadosForm extends HTMLElement {
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
        padding: 2rem;
        background-color: #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 2rem auto;
      }
      input, select {
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #999;
        border-radius: 4px;
        background-color: #f9f9f9;
      }
      button {
        background-color: #333;
        color: white;
        border: none;
        padding: 0.75rem;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      button:hover {
        background-color: #555;
      }
      label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #333;
      }
      #message {
        margin-top: 1rem;
        color: green;
        font-weight: bold;
        display: none;
      }
    </style>
    <form id="empleado-form">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required>
  
      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" name="apellido" required>
  
      <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
      <input type="date" id="fecha_nacimiento" name="fecha_nacimiento">
  
      <label for="direccion">Dirección:</label>
      <input type="text" id="direccion" name="direccion">
  
      <label for="telefono">Teléfono:</label>
      <input type="text" id="telefono" name="telefono">
  
      <label for="correo">Correo:</label>
      <input type="email" id="correo" name="correo">
  
      <label for="puesto">Puesto:</label>
      <input type="text" id="puesto" name="puesto" required>
  
      <button type="submit">Guardar</button>
    </form>
    <div id="message">Registro guardado exitosamente!</div>
    `;
  
    this.form = this.shadowRoot.querySelector('#empleado-form');
    this.message = this.shadowRoot.querySelector('#message');
    this.form.addEventListener('submit', this.handleSubmit);
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const empleado = {};
    formData.forEach((value, key) => {
      empleado[key] = value;
    });
  
    try {
      const response = await fetch('http://localhost:8000/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      });
      const result = await response.json();
      console.log('Empleado guardado:', result);
      this.form.reset();
      this.message.style.display = 'block';
      setTimeout(() => {
        this.message.style.display = 'none';
      }, 3000);
    } catch (error) {
      console.error('Error al guardar empleado:', error);
    }
  };
}
  
customElements.define('empleados-form', EmpleadosForm);