class SocialProfileComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
      }

      .profile {
        background: #f4f4f9;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 300px;
        margin: 20px auto;
        text-align: center;
      }

      .profile h2 {
        margin-top: 0;
        color: #333;
        font-size: 1.5rem;
      }

      .profile-pic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 15px auto;
        background: url('./img/brayan.jpg') center/cover no-repeat;
        border: 2px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .profile p {
        margin: 5px 0;
        color: #555;
        font-size: 0.9rem;
      }

      .button-group {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      .button-group a {
        text-decoration: none;
        background-color: #555;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
      }

      .button-group a:hover {
        background-color: #444;
        transform: scale(1.05);
      }

      .button-group a:active {
        transform: scale(0.95);
      }
    </style>

      <div class="profile">
        <div class="profile-pic"></div>
        <h2>Perfil</h2>
        <p><strong>Nombre:</strong> Brayan Vega</p>
        <p><strong>Edad:</strong> 21 años</p>
        <p><strong>Fecha de nacimiento:</strong> 16 de enero de 2003</p>
        <p><strong>País:</strong> Ecuador</p>
        <p><strong>Ciudad:</strong> Quito</p>
        <p><strong>Hobbies:</strong> Jugar videojuegos, escuchar música, ver series y películas</p>
        <p><strong>Redes sociales:</strong> @Brayan.vga</p>
        <p><strong>Email:</strong> bjvega4@espe.edu.ec</p>
        <div class="button-group">
              <a href="https://www.instagram.com/brayan.vga/" target="_blank" rel="noopener">Sigueme</a>
              <a href="https://cdn.memegenerator.es/imagenes/memes/full/22/69/22696724.jpg" target="_blank" rel="noopener">MOMASO</a>
          </div>
      </div>
    `;
  }
}

window.customElements.define('profile-page', SocialProfileComponent);
