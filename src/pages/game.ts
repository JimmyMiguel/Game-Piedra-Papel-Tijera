 export class gameCom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.gameLogic();
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
            padding: 80px 0px 0px 0px;
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
          width: 100%;
          height: 200px;
          margin-top:100px;
          text-align: center;
          font-size: 42px;
          font-weight: bold;
          color: rgba(6, 0, 78, 1);
        }

        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
             user-select: none;
            position: relative;
            overflow: visible;
            }

        .circle::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 20px solid transparent;
            border-top-color: black;
            border-right-color: black;
            border-bottom-color: black; /* Tres bordes visibles (3/4) */
            border-left-color: transparent; /* El cuarto invisible */
            animation: spin 2s linear infinite;
            box-sizing: border-box;
            pointer-events: none;
            }

            /* Para que el contenido NO rote ni se vea afectado */
        .circle > .countdown {
            position: relative;
            z-index: 1;
            font-size: 6rem;
            }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
            }


        #startBtn {
            font-size: 30px;
            padding: 12px 24px;
            background-color: #005CFF;
            font-family: "Odibee Sans", sans-serif;
            letter-spacing: 4px;
            color: white;
            border: 4px solid #001997;
            border-radius: 8px;
            cursor: pointer;
        }
        .btn-tijera, .btn-papel, .btn-piedra{
                border: none;
                all: unset

        }

        .hands {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 40px;
          width:100%;
          height: 115px;
          overflow: hidden;
         }

      </style>

    <div class="container">


        <div class="randomHand">
        tiempo estimad
        </div>


        <div class="circle">
            <span class="countdown">5</span>
        </div>

        <div class="hands">
          <piedra-com class="btn-piedra" ></piedra-com>
          <papel-com class="btn-papel" ></papel-com>
          <tijera-com class="btn-tijera" ></tijera-com>
        </div>
    </div>
    `;
  }

  gameLogic() {
    const piedraButton = this.shadowRoot?.querySelector(".btn-piedra");
    piedraButton?.addEventListener("click", () => {
      console.log("muy bien aplastate un piedra");
      this.randomFun()
    });

    const papelButton = this.shadowRoot?.querySelector(".btn-papel");
    papelButton?.addEventListener("click", () => {
      console.log("muy bien aplastate un  papel");
    });

    const tijeraButton = this.shadowRoot?.querySelector(".btn-tijera");
    tijeraButton?.addEventListener("click", () => {
      console.log("muy bien aplastate un tijera");
    });
  }

  randomFun() {
    const opciones = ["piedra", "papel", "tijera"];
    function palabraAlAzar(arr: string[]): string {
      const indice = Math.floor(Math.random() * arr.length);
      return arr[indice];
    }
    const jugadaComputadora = palabraAlAzar(opciones);

    if (jugadaComputadora === "piedra") {
        const place = this.shadowRoot?.querySelector(".randomHand");

        const piedraCom = document.createElement("piedra-com");
        place?.innerHTML=
        place?.appendChild(piedraCom);
    }



    
  }
}

customElements.define("game-com", gameCom);
