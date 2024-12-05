class CustomMain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);
  }

  setContent(component) {
    this.container.innerHTML = ''; // Limpia el contenido anterior
    this.container.appendChild(component);
  }
}

customElements.define('custom-main', CustomMain);
