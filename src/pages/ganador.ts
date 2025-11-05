import { goTo } from "../router";
import { state } from "../state";
import winImage from "../assets/win.jpg";
import "../pages/game";
class GameOverScreen extends HTMLElement {
  // Propiedades que se pueden configurar a través de atributos HTML
  private resultText: string = "";
  private playerScore: number = 0;
  private machineScore: number = 0;
  private buttonText: string = "Volver a Jugar";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Se ejecuta cuando el elemento se conecta al DOM principal.
  connectedCallback() {
    this.loadAttributes();
    this.render();
    this.attachEventListeners();
    this.aplicarEstilos();
  }

  // Carga los valores de los atributos del elemento HTML.
  private loadAttributes() {
    const resultado = state.getState();
    const resultadoActual = state.resultado;

    this.resultText = resultadoActual || this.resultText;
    (this.playerScore = resultado.userJugador),
      (this.machineScore = resultado.userComputer),
      (this.buttonText = this.getAttribute("button-text") || this.buttonText);
  }

  // Renderiza el HTML y el CSS del componente.
  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            height: 100%;
          }

          .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              gap: 2rem;
              background-repeat: round;
              background-image: url(${winImage});
              padding: 0rem;
              height: 100%;
          }
            .resultado{
             z-index:100;
             font-family: 'Press Start 2P', cursive;
             font-size: 3rem;
            color: #ffffff;
            }

            .star-container {
                width: 65%;
                height: 100px;
                background-color:rgba(220, 91, 73, 1);
                margin-top: 60px;
                display: flex;
              flex-direction: column;
              align-items: center;
              justify-content:center
              font-family: 'Press Start 2P', cursive;
               font-size: 3rem;
            }
            .star-container.win{
                background-color:rgb(73, 125, 220);

            }

            .score-box {
                background-color:  rgba(255, 255, 255, 0.9);
                border: 5px solid  #000000;
                border-radius: 15px;
                padding: 1rem 1.5rem;
                width: 18%;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                color:  #000000;
                margin-bottom: 75px;
            }
  
          .score-box h2 {
            margin: 0;
            font-size: 2rem;
            font-family: 'Press Start 2P', cursive;

          }
  
          .score-box p {
            margin: 0;
            font-size: 1rem;
            font-family: 'Press Start 2P', cursive;

          }
  
          /* --- Elemento: Botón --- */
          .play-again-btn {
            background-color: #0275d8;
            color: #ffffff;
            border: 4px solid #025aa5;
            border-radius: 10px;
            padding: 1rem 2rem;
            font-family: 'Press Start 2P', cursive;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 0 #025aa5;
          }
  
          .play-again-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 0  #025aa5;
          }
  
          .play-again-btn:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0  #025aa5;
          }
        </style>
  
        <div class="container">
          <div class="star-container">
            <span class="resultado" >${this.resultText}</span>
          </div>
  
          <div class="score-box">
            <h2>Score</h2>
            <p>Vos: ${this.playerScore}</p>
            <p>Máquina: ${this.machineScore}</p>
          </div>
  
          <button class="play-again-btn" id="playAgainButton">
            ${this.buttonText}
          </button>
        </div>
      `;
  }

  // Añade un listener al botón para emitir un evento personalizado.
  private attachEventListeners() {
    const button = this.shadowRoot?.getElementById("playAgainButton");
    button?.addEventListener("click", () => {
      goTo("/gameCom");
    });
  }

  private aplicarEstilos() {
    const resultadoActual = state.resultado;
    if (resultadoActual === "Ganaste") {
      const divWin = this.shadowRoot?.querySelector(".star-container");
      divWin?.classList.add("win");
    }
  }
}

// Define el custom element para que el navegador lo reconozca.
customElements.define("game-over-screen", GameOverScreen);
