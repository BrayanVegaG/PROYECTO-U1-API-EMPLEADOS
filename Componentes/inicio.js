class InicioComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const container = document.createElement('div');
      container.innerHTML = `
        <h2>Bienvenido al Sistema de Contratación</h2>
        <p>Este sistema te permitirá administrar las habilidades y relaciones de los empleados de tu empresa.</p>
        <p>Utiliza el menú de navegación para acceder a las diferentes secciones.</p>

        <img src="https://i.pinimg.com/736x/a5/40/b0/a540b0498bad80c0269f21900050c899.jpg" alt="Bienvenido" width="300">
      `;
      this.shadowRoot.appendChild(container);
    }
  }
  
  customElements.define('inicio-component', InicioComponent);
  