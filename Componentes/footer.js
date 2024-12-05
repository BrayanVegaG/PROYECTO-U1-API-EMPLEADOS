class CustomFooter extends HTMLElement {
    constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            shadow.innerHTML = `
                    <style>
                            footer {
                                    background-color: #222;
                                    color: white;
                                    text-align: center;
                                    padding: 1rem;
                                    font-size: 0.9rem;
                                    position: relative;
                                    margin-top: auto;
                            }
                    </style>
                    <footer>
                            <p>&copy; 2024 Sistema de Contratación. Todos los derechos reservados.</p>
                    </footer>
            `;
    }
}
customElements.define('custom-footer', CustomFooter);
