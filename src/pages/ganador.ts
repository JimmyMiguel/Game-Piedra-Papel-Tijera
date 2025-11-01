import { goTo } from "../router";
import { state } from "../state";
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
  }

  // Carga los valores de los atributos del elemento HTML.
  private loadAttributes() {
    const resultado = state.getState();
    const resultadoActual = state.resultado;
    //evaluamos el resultado y creamos una clase para que se ejecute cuando
    //cumpla la condicion
    if (resultadoActual === "Ganaste") {
      this.setAttribute("result", "win");
    }

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
            --star-color: rgba(220, 91, 73, 1);
            --box-bg-color: #ffffff;
            --button-bg-color: #0275d8;
            --button-border-color: #025aa5;
            --text-light-color: #ffffff;
            --text-dark-color: #000000;
            --bg-color: rgba(137, 73, 73, 0.9);
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
              background-image: url('/src/assets/win.jpg');
              padding: 0rem;
              height: 100%;
          }
            .resultado{
            margin-bottom:60px;
            z-index:100;
            font-size: 2rem;
            }

            .star-container {
                width: 65%;
                height: 100px;
                background-color: antiquewhite;
                margin-top: 34px;
            }
 

            :host([result="win"]) {
             --star-color:rgba(108, 180, 108, 1); /* Verde claro */
            --bg-color: rgba(136, 137, 73, 0.9); /* Verde oliva */
            }
  
            .score-box {
                background-color: var(--box-bg-color);
                border: 5px solid var(--text-dark-color);
                border-radius: 15px;
                padding: 1rem 1.5rem;
                width: 18%;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                color: var(--text-dark-color);
            }
  
          .score-box h2 {
            margin: 0;
            font-size: 2rem;
          }
  
          .score-box p {
            margin: 0;
            font-size: 1rem;
          }
  
          /* --- Elemento: Botón --- */
          .play-again-btn {
            background-color: var(--button-bg-color);
            color: var(--text-light-color);
            border: 4px solid var(--button-border-color);
            border-radius: 10px;
            padding: 1rem 2rem;
            font-family: 'Press Start 2P', cursive;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 0 var(--button-border-color);
          }
  
          .play-again-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 0 var(--button-border-color);
          }
  
          .play-again-btn:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 var(--button-border-color);
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
}

// Define el custom element para que el navegador lo reconozca.
customElements.define("game-over-screen", GameOverScreen);
