export class gameCom extends HTMLElement {
  timeoutId: number | undefined

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
   }

  connectedCallback() {
    this.render();
    this.temporizadorCom(5)
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
        .piedra-container, .papel-container, .tijera-container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                margin: 10px 0;
              }

        .piedra-image, .papel-image, .tijera-image {
                width: 150px;
                height: 150px;
                display: block;
                margin: 0 auto;
                object-fit: contain;
                border-radius: 8px;
                transition: transform 0.3s ease;
                transform:rotate(180deg);
              }
                        .hand-game{
                width: 150px;
                height: 150px;
                display: block;
                margin: 0 auto;
                object-fit: contain;
                border-radius: 8px;
                transition: transform 0.3s ease;
                transform: scale(1.1);

               }

                .hand-game.agrandado {
                transform: scale(1.5);
                transition: transform 0.2s ease;
              }

        .piedra-image:hover, .papel-image:hover, .tijera-image:hover {
                transform: scale(1.1);
              }

        .hands {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 40px;
          width: 100%;
          height: 250px;        /* ✅ Aumentar el height */
          overflow: visible;    /* ✅ Cambiar de hidden a visible */
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
    const piedraButton = this.shadowRoot?.querySelector(".btn-piedra");
    if (!this.shadowRoot?.querySelector(".hands") ) return
    const handsCom = this.shadowRoot?.querySelector(".hands") 
    piedraButton?.addEventListener("click", () => {
    handsCom!.innerHTML= '';      
    handsCom!.innerHTML= `
    <piedra-com class="hand-game agrandado" ></piedra-com>
    ` 
       const aleatorio = this.randomFun()
      this.mostrarJugadaComputadora(aleatorio);
       clearTimeout(this.timeoutId)
       const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
       circle?.style.setProperty("display", "none");

    });


      const papelButton = this.shadowRoot?.querySelector(".btn-papel");
    if (!this.shadowRoot?.querySelector(".hands") ) return
    const hands2Com = this.shadowRoot?.querySelector(".hands") 

      papelButton?.addEventListener("click", () => {
        console.log("muy bien aplastate un papel");
        hands2Com!.innerHTML= '';      
        hands2Com!.innerHTML= `
        <papel-com class="hand-game agrandado" ></papel-com>
        ` 
        const aleatorio = this.randomFun();
        this.mostrarJugadaComputadora(aleatorio);
        clearTimeout(this.timeoutId)
        const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
        circle?.style.setProperty("display", "none");

      });

      const tijeraButton = this.shadowRoot?.querySelector(".btn-tijera");
      if(!this.shadowRoot.querySelector(".hands")) return
      const hands3 = this.shadowRoot.querySelector(".hands")

      tijeraButton?.addEventListener("click", () => {
        console.log("muy bien aplastate un tijera");
        hands3!.innerHTML=''
        hands3!.innerHTML = `
        <tijera-com class="hand-game agrandado" ></tijera-com>
        `
        const aleatorio = this.randomFun();
        this.mostrarJugadaComputadora(aleatorio);
        clearTimeout(this.timeoutId)
        const circle = this.shadowRoot?.querySelector(".circle") as HTMLElement
        circle?.style.setProperty("display", "none");

      });


  }

  randomFun():string {
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

  // Crear HTML según la jugada
  let htmlContent = '';
  
  if (jugadaComputadora === "piedra") {
    htmlContent = `
      <div class="piedra-container">
        <img src="/src/assets/piedra.png" alt="Piedra" class="piedra-image">
      </div>
    `;
  } else if (jugadaComputadora === "papel") {
    htmlContent = `
      <div class="papel-container">
        <img src="/src/assets/papel.png" alt="Papel" class="papel-image">
      </div>
    `;
  } else if (jugadaComputadora === "tijera") {
    htmlContent = `
      <div class="tijera-container">
        <img src="/src/assets/tijera.png" alt="Tijera" class="tijera-image">
      </div>
    `;
  }

  // Aplicar el HTML al contenedor
  randomHandContainer.innerHTML = htmlContent;
}

 
temporizadorCom (segundos:number) {
  clearTimeout(this.timeoutId)
 const contador = this.shadowRoot?.querySelector(".countdown")
 if (segundos >= 0 ) {
   contador!.textContent = `${segundos}`
    this.timeoutId = setTimeout(() => {
     this.temporizadorCom(segundos-1)
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
