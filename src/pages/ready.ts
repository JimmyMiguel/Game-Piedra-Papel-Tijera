import { goTo } from "../router";
import "../components/botonCom"

export class readyCom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        .container {
            width: 100%;
            height: 100vh;
             font-family: "Odibee Sans", sans-serif;
            letter-spacing: 4px;
            background-image: url('/src/assets/fondo-azul.jpg');
            background-repeat: round;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .title {
             height: 200px;
            margin-top:100px;
            width: 300px;
            text-align: center;
            font-size: 30PX;
            font-weight: bold;
            color: rgb(0 0 0);
        }

        .hands {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 40px;
          width: 100%;
          height: 250px;
          overflow: visible;
        }

        piedra-com, papel-com, tijera-com {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          margin: 10px 0;
        }

        piedra-com img, papel-com img, tijera-com img {
          width: 150px;
          height: 150px;
          display: block;
          margin: 0 auto;
          object-fit: contain;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        piedra-com:hover img, papel-com:hover img, tijera-com:hover img {
          transform: scale(1.1);
        }
 
      </style>

      <div class="container">
        <div class="title">
        Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </div>

        <btn-com id="startBtn">¡A JUGAR!</btn-com>

      <div class="hands">
          <piedra-com></piedra-com>
          <papel-com></papel-com>
          <tijera-com></tijera-com>
        </div>
      </div>
    `;

    const startButton = this.shadowRoot.querySelector("#startBtn");
    startButton?.addEventListener("click", () => {
      goTo("/gameCom")

    });
  }
}

customElements.define("ready-com", readyCom);
