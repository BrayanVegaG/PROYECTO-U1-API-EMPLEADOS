const menuItems = [
  { label: 'Inicio', component: 'inicio-component' },
  { label: 'Formulario de Empleados', component: 'empleados-form' },
  { label: 'Lista de Empleados', component: 'empleados-lista' },
  { label: 'Formulario de Habilidades', component: 'habilidades-form' },
  { label: 'Lista de Habilidades', component: 'habilidades-lista' },
  { label: 'Relaciones', component: 'relacion-component' },
  { label: 'Acerca de', component: 'profile-page' },
];

class CustomMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const navElement = document.createElement('nav');

    const styles = document.createElement('style');
    styles.textContent = `
      nav {
        display: flex;
        gap: 1rem;
        background-color: #444;
        padding: 1rem;
        justify-content: center;
      }
      button {
        background-color: #666;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      button:hover {
        background-color: #555;
      }
    `;
    shadow.appendChild(styles);
    shadow.appendChild(navElement);

    menuItems.forEach((item, index) => {
      const button = document.createElement('button');
      button.textContent = item.label;
      button.dataset.index = index;
      button.addEventListener('click', this.handleMenuClick);
      navElement.appendChild(button);
    });

    // Simular clic en el botón de "Inicio" al abrir el menú
    this.handleMenuClick({ target: { dataset: { index: 0 } } });
  }

  handleMenuClick = (event) => {
    const index = event.target.dataset.index;
    const selectedItem = menuItems[index];
    const mainElement = document.querySelector('custom-main');

    if (mainElement) {
      // Crear el componente correspondiente
      const newComponent = document.createElement(selectedItem.component);

      // Asignar la URL de la API si es necesario
      if (selectedItem.component === 'empleados-lista' || selectedItem.component === 'empleados-form') {
        newComponent.setAttribute('api-url', 'http://localhost:8000/empleados');
      } else if (selectedItem.component === 'habilidades-lista' || selectedItem.component === 'habilidades-form') {
        newComponent.setAttribute('api-url', 'http://localhost:8000/habilidades');
      } else if (selectedItem.component === 'relacion-component') {
        newComponent.setAttribute('api-url', 'http://localhost:8000/habilidades_empleados');
      }

      // Lógica específica para los componentes 'inicio-component' y 'profile-page'
      if (selectedItem.component === 'inicio' || selectedItem.component === 'acercade') {
        // Si el componente es 'inicio' o 'acercade', no necesitamos establecer la URL
        // Pero puedes agregar cualquier otra lógica o configuración específica para estos componentes.
        console.log(`Mostrando el componente ${selectedItem.component}`);
      }

      // Reemplazar el contenido actual con el nuevo componente
      mainElement.setContent(newComponent);
    }
  };
}

customElements.define('custom-menu', CustomMenu);
