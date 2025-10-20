import { goTo } from "../router";
class GameOverScreen extends HTMLElement {
    // Propiedades que se pueden configurar a través de atributos HTML
    private resultText: string = 'PERDISTE';
    private playerScore: string = '0';
    private machineScore: string = '0';
    private buttonText: string = 'Volver a Jugar';
  
    constructor() {
      super();
       this.attachShadow({ mode: 'open' });
    }
  
    // Se ejecuta cuando el elemento se conecta al DOM principal.
    connectedCallback() {
      this.loadAttributes();
      this.render();
      this.attachEventListeners();
    }
  
    // Carga los valores de los atributos del elemento HTML.
    private loadAttributes() {
      this.resultText = this.getAttribute('result-text') || this.resultText;
      this.playerScore = this.getAttribute('player-score') || this.playerScore;
      this.machineScore = this.getAttribute('machine-score') || this.machineScore;
      this.buttonText = this.getAttribute('button-text') || this.buttonText;
    }
  
    // Renderiza el HTML y el CSS del componente.
    private render() {
      if (!this.shadowRoot) return;
  
      this.shadowRoot.innerHTML = `
        <style>
          /* --- Fuentes y Variables --- */
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Press+Start+2P&display=swap');
          
          :host {
            --star-color: #d9534f;
            --box-bg-color: #ffffff;
            --button-bg-color: #0275d8;
            --button-border-color: #025aa5;
            --text-light-color: #ffffff;
            --text-dark-color: #000000;
            --bg-color: rgba(137, 73, 73, 0.9);
            display: block;
            height: 100%;
          }
  
          /* --- Estructura Principal (Mobile-First) --- */
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem; /* Espacio entre elementos */
            padding: 1.5rem;
            background-color: var(--bg-color);
            /* Opcional: Patrón de fondo como en la imagen */
            /* background-image: url('path/to/your/hand-pattern.svg'); */
            height: 100%;
            box-sizing: border-box;
            text-align: center;
          }
  
          /* --- Elemento: Estrella --- */
          .star-container {
            position: relative;
            width: 30rem;
            height: 30rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--text-light-color);
            font-size: 3rem;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
          }
  
          .star-container::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: var(--star-color);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            border: 4px solid var(--text-dark-color);
            box-sizing: border-box;
          }

            .resultado{
            margin-bottom:60px;
            z-index:100;
            font-family: 'Press Start 2P', cursive;
            font-size: 2rem;

            
            }
  
          /* --- Elemento: Cuadro de Puntuación --- */
          .score-box {
            background-color: var(--box-bg-color);
            border: 5px solid var(--text-dark-color);
            border-radius: 15px;
            padding: 1.5rem 2.5rem;
            width: 80%;
            max-width: 350px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            color: var(--text-dark-color);
            font-family: 'Press Start 2P', cursive;
          }
  
          .score-box h2 {
            margin: 0 0 1rem 0;
            font-size: 2rem;
          }
  
          .score-box p {
            margin: 0.5rem 0;
            font-size: 1.25rem;
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
      const button = this.shadowRoot?.getElementById('playAgainButton');
      button?.addEventListener('click', () => {
        goTo("/gameCom")
        });
    }
  }
  
  // Define el custom element para que el navegador lo reconozca.
  customElements.define('game-over-screen', GameOverScreen);