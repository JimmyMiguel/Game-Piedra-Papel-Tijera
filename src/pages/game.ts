import { goTo } from "../router";
import { state } from "../state";
import "../pages/ganador"

export class gameCom extends HTMLElement {
  timeoutId: number | undefined

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.gameLogic();
    this.temporizadorCom(5)
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
            margin: 20px 0;
            }

        .circle.hidden {
            display: none;
            margin: 0;
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
            border-bottom-color: black; 
            border-left-color: transparent; 
            animation: spin 2s linear infinite;
            box-sizing: border-box;
            pointer-events: none;
            }

 
        .circle > .countdown {
            position: relative;
            z-index: 1;
            font-size: 6rem;
            }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
            }

        .btn-tijera, .btn-papel, .btn-piedra{
                border: none;
                all: unset
        }

        .hands {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction:row;
          gap: 24px;
          width: 100%;
          height: 250px;
           overflow: visible;
          flex-wrap: wrap;
        }
          .clicked{
          margin-bottom:100px;
          height: 215px;

          
          }

        .randomHand {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(180deg);
          margin-top:100px
        }

      </style>

    <div class="container">

        <div class="randomHand">
        </div>

        <div class="circle">
            <span class="countdown"></span>
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
    //agrego el componente de piedra
    const piedraButton = this.shadowRoot?.querySelector(".btn-piedra");

    if (!this.shadowRoot?.querySelector(".hands")) return


    const handsCom = this.shadowRoot?.querySelector(".hands")

    piedraButton?.addEventListener("click", () => {
      handsCom!.classList.add("clicked");
      handsCom!.innerHTML = '';
      handsCom!.innerHTML = `
    <piedra-com></piedra-com>
    `
      const aleatorio = this.randomFun()
      console.log(aleatorio);

      this.mostrarJugadaComputadora(aleatorio);
      clearTimeout(this.timeoutId)
      const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
      circle?.classList.add("hidden");
      state.setState("piedra", aleatorio)
      setTimeout(() => {
        goTo("/ganador")
      }, 2000)
    });


    const papelButton = this.shadowRoot?.querySelector(".btn-papel");
    if (!this.shadowRoot?.querySelector(".hands")) return
    const hands2Com = this.shadowRoot?.querySelector(".hands")

    papelButton?.addEventListener("click", () => {
      console.log("muy bien aplastate un papel");
      hands2Com!.classList.add("clicked");
      hands2Com!.innerHTML = '';
      hands2Com!.innerHTML = `
        <papel-com></papel-com>
        `
      const aleatorio = this.randomFun();
      this.mostrarJugadaComputadora(aleatorio);
      clearTimeout(this.timeoutId)
      const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
      circle?.classList.add("hidden");
      state.setState("papel", aleatorio)
      setTimeout(() => {
        goTo("/ganador")
      }, 2000)

    });

    const tijeraButton = this.shadowRoot?.querySelector(".btn-tijera");
    if (!this.shadowRoot.querySelector(".hands")) return
    const hands3 = this.shadowRoot.querySelector(".hands")

    tijeraButton?.addEventListener("click", () => {
      console.log("muy bien aplastate un tijera");
      hands3!.classList.add("clicked");
      hands3!.innerHTML = ''
      hands3!.innerHTML = `
        <tijera-com></tijera-com>
        `
      const aleatorio = this.randomFun();
      this.mostrarJugadaComputadora(aleatorio);
      clearTimeout(this.timeoutId)
      const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
      circle?.classList.add("hidden");
      state.setState("tijera", aleatorio)
      setTimeout(() => {
        goTo("/ganador")
      }, 2000)

    });


  }

  randomFun(): string {
    const opciones = ["piedra", "papel", "tijera"];
    function palabraAlAzar(arr: string[]): string {
      const indice = Math.floor(Math.random() * arr.length);
      return arr[indice];
    }
    const jugadaComputadora = palabraAlAzar(opciones);
    return jugadaComputadora
  }

  // Función para mostrar la jugada de la computadora
  mostrarJugadaComputadora(jugadaComputadora: string) {
    const randomHandContainer = this.shadowRoot?.querySelector(".randomHand");
    if (!randomHandContainer) return;

    // Limpiar contenido anterior
    randomHandContainer.innerHTML = '';

    // Crear HTML según la jugada usando los componentes
    let htmlContent = '';

    if (jugadaComputadora === "piedra") {
      htmlContent = `<piedra-com></piedra-com>`;
    } else if (jugadaComputadora === "papel") {
      htmlContent = `<papel-com></papel-com>`;
    } else if (jugadaComputadora === "tijera") {
      htmlContent = `<tijera-com></tijera-com>`;
    }

    // Aplicar el HTML al contenedor
    randomHandContainer.innerHTML = htmlContent;
  }


  temporizadorCom(segundos: number) {
    clearTimeout(this.timeoutId)
    const contador = this.shadowRoot?.querySelector(".countdown")
    if (segundos >= 0) {
      contador!.textContent = `${segundos}`
      this.timeoutId = setTimeout(() => {
        this.temporizadorCom(segundos - 1)
      }, 1000)
    }

    else {
      const alerta = this.shadowRoot?.querySelector(".container");
      if (alerta) {
        alerta.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
          <div style="background-color: white; padding: 40px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0 0 20px 0; color: #001997;">¡Se te acabó el tiempo!</h2>
            <button id="reiniciarJuego" style="font-size: 20px; padding: 10px 20px; background-color: #005CFF; color: white; border: none; border-radius: 5px; cursor: pointer;">JUGAR</button>
          </div>
        </div>
      `;

        const btnJugar = this.shadowRoot?.querySelector("#reiniciarJuego");
        btnJugar?.addEventListener("click", () => {
          this.render()
          this.gameLogic()
          this.temporizadorCom(5);
        });
      }
    }
  }

}

customElements.define("game-com", gameCom);
