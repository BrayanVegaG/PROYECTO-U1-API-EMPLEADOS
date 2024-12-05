class CustomHeader extends HTMLElement {
  constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
          <style>
              header {
                  background-color: #333;
                  color: white;
                  padding: 1rem;
                  text-align: center;
                  font-size: 1.5rem;
              }
          </style>
          <header>
              <h1>Sistema de Contratación</h1>
          </header>
      `;
  }
}
customElements.define('custom-header', CustomHeader);
