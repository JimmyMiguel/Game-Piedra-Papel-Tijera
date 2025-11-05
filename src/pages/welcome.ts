import "../router";
import { goTo } from "../router";
import "../components/botonCom";
import "../components/tijeraCom";
import "../components/papelCom";
import "../components/piedraCom";
import fondoAzul from "../assets/fondo-azul.jpg";

export class welcomePage extends HTMLElement {
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
          margin:0;
          padding:0;
        }

        .container {
          width: 100%;
          height: 100vh;
          font-family: "Odibee Sans", sans-serif;
          letter-spacing: 2px;
          background-image: url(${fondoAzul});
          background-repeat: round;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .title {
          width: 100%;
          height: 200px;
          margin-top:100px;
          text-align: center;
          font-size: 42px;
          font-weight: bold;
          color: rgba(6, 0, 78, 1);
        }

        .title .verde {
          color: white;
        }

        .hands {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          width: 100%;
          min-height: 250px;
          max-height: 300px;
          overflow: visible;
          flex-wrap: wrap;
        }
      </style>

      <div class="container">
        <div class="title">
          Piedra<br>
          Papel <span class="verde">o</span><br>
          Tijera
        </div>
        <btn-com id="startBtn"> EMPEZAR </btn-com>
        <div class="hands">
          <piedra-com></piedra-com>
          <papel-com></papel-com>
          <tijera-com></tijera-com>
         </div>
      </div>
    `;

    const startButton = this.shadowRoot.querySelector("#startBtn");
    startButton?.addEventListener("click", () => {
      goTo("/readycom");
    });
  }
}

customElements.define("welcome-page", welcomePage);
