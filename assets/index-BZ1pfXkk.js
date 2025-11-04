var E=Object.defineProperty;var T=(e,t,o)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var h=(e,t,o)=>T(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      width: 190px;
      height: 60px;
      font-size: 30px;
      padding: 12px 24px;
      background-color: #005CFF;
      font-family: "Odibee Sans", sans-serif;
      letter-spacing: 4px;
      color: white;
      border-radius: 8px;
      border: 4px solid #001997;
      cursor: pointer;
      display: inline-block; /* asegurar tamaño */
    }

    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center; /* Centrado vertical */
      justify-content: center; /* Centrado horizontal */
      text-align: center; /* Para textos multilínea */
    }
  </style>
  <div>
    <slot></slot>
  </div>
`)}}customElements.define("btn-com",R);class j extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
        Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 5 segundos.
        </div>

        <btn-com id="startBtn">¡A JUGAR!</btn-com>

      <div class="hands">
          <piedra-com></piedra-com>
          <papel-com></papel-com>
          <tijera-com></tijera-com>
        </div>
      </div>
    `;const t=this.shadowRoot.querySelector("#startBtn");t==null||t.addEventListener("click",()=>{u("/gameCom")})}}customElements.define("ready-com",j);const l={listener:[],resultado:"",partidasGanadas:{userComputer:0,userJugador:0},winGame(e,t){return e===t?"Empate":e==="piedra"&&t==="tijera"||e==="papel"&&t==="piedra"||e==="tijera"&&t==="papel"?(this.partidasGanadas.userJugador++,"Ganaste"):(this.partidasGanadas.userComputer++,"Perdiste")},getState(){return this.partidasGanadas},setState(e,t){const o=this.winGame(e,t);this.resultado=o;for(const a of this.listener)a();this.saveToLocalStorage()},saveToLocalStorage(){try{const e=JSON.stringify(this.partidasGanadas);localStorage.setItem("game-scores",e)}catch(e){console.error("Error al guardar en localStorage:",e)}},loadFromLocalStorage(){try{const e=localStorage.getItem("game-scores");if(e){const t=JSON.parse(e);t&&typeof t.userJugador=="number"&&typeof t.userComputer=="number"&&(this.partidasGanadas=t)}}catch(e){console.error("Error al cargar desde localStorage:",e)}}};l.loadFromLocalStorage();class C extends HTMLElement{constructor(){super();h(this,"resultText","");h(this,"playerScore",0);h(this,"machineScore",0);h(this,"buttonText","Volver a Jugar");this.attachShadow({mode:"open"})}connectedCallback(){this.loadAttributes(),this.render(),this.attachEventListeners(),this.aplicarEstilos()}loadAttributes(){const o=l.getState(),a=l.resultado;this.resultText=a||this.resultText,this.playerScore=o.userJugador,this.machineScore=o.userComputer,this.buttonText=this.getAttribute("button-text")||this.buttonText}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
              background-image: url('/src/assets/win.jpg');
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
      `)}attachEventListeners(){var a;const o=(a=this.shadowRoot)==null?void 0:a.getElementById("playAgainButton");o==null||o.addEventListener("click",()=>{u("/gameCom")})}aplicarEstilos(){var a;if(l.resultado==="Ganaste"){const r=(a=this.shadowRoot)==null?void 0:a.querySelector(".star-container");r==null||r.classList.add("win")}}}customElements.define("game-over-screen",C);class k extends HTMLElement{constructor(){super();h(this,"timeoutId");this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.gameLogic(),this.temporizadorCom(5)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}gameLogic(){var m,x,y,w,v,S,L;const o=(m=this.shadowRoot)==null?void 0:m.querySelector(".btn-piedra");if(!((x=this.shadowRoot)!=null&&x.querySelector(".hands")))return;const a=(y=this.shadowRoot)==null?void 0:y.querySelector(".hands");o==null||o.addEventListener("click",()=>{var d;a.classList.add("clicked"),a.innerHTML="",a.innerHTML=`
    <piedra-com></piedra-com>
    `;const c=this.randomFun();console.log(c),this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("piedra",c),setTimeout(()=>{u("/ganador")},2e3)});const r=(w=this.shadowRoot)==null?void 0:w.querySelector(".btn-papel");if(!((v=this.shadowRoot)!=null&&v.querySelector(".hands")))return;const i=(S=this.shadowRoot)==null?void 0:S.querySelector(".hands");r==null||r.addEventListener("click",()=>{var d;console.log("muy bien aplastate un papel"),i.classList.add("clicked"),i.innerHTML="",i.innerHTML=`
        <papel-com></papel-com>
        `;const c=this.randomFun();this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("papel",c),setTimeout(()=>{u("/ganador")},2e3)});const n=(L=this.shadowRoot)==null?void 0:L.querySelector(".btn-tijera");if(!this.shadowRoot.querySelector(".hands"))return;const p=this.shadowRoot.querySelector(".hands");n==null||n.addEventListener("click",()=>{var d;console.log("muy bien aplastate un tijera"),p.classList.add("clicked"),p.innerHTML="",p.innerHTML=`
        <tijera-com></tijera-com>
        `;const c=this.randomFun();this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("tijera",c),setTimeout(()=>{u("/ganador")},2e3)})}randomFun(){const o=["piedra","papel","tijera"];function a(i){const n=Math.floor(Math.random()*i.length);return i[n]}return a(o)}mostrarJugadaComputadora(o){var i;const a=(i=this.shadowRoot)==null?void 0:i.querySelector(".randomHand");if(!a)return;a.innerHTML="";let r="";o==="piedra"?r="<piedra-com></piedra-com>":o==="papel"?r="<papel-com></papel-com>":o==="tijera"&&(r="<tijera-com></tijera-com>"),a.innerHTML=r}temporizadorCom(o){var r,i,n;clearTimeout(this.timeoutId);const a=(r=this.shadowRoot)==null?void 0:r.querySelector(".countdown");if(o>=0)a.textContent=`${o}`,this.timeoutId=setTimeout(()=>{this.temporizadorCom(o-1)},1e3);else{const p=(i=this.shadowRoot)==null?void 0:i.querySelector(".container");if(p){p.innerHTML=`
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
          <div style="background-color: white; padding: 40px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0 0 20px 0; color: #001997;">¡Se te acabó el tiempo!</h2>
            <button id="reiniciarJuego" style="font-size: 20px; padding: 10px 20px; background-color: #005CFF; color: white; border: none; border-radius: 5px; cursor: pointer;">JUGAR</button>
          </div>
        </div>
      `;const m=(n=this.shadowRoot)==null?void 0:n.querySelector("#reiniciarJuego");m==null||m.addEventListener("click",()=>{this.render(),this.gameLogic(),this.temporizadorCom(5)})}}}}customElements.define("game-com",k);const f="/Game-Piedra-Papel-Tijera",z=[{path:new RegExp(`^${f}/?$`),action:()=>document.createElement("welcome-page")},{path:new RegExp(`^${f}/readycom/?$`),action:()=>document.createElement("ready-com")},{path:new RegExp(`^${f}/gameCom/?$`),action:()=>document.createElement("game-com")},{path:new RegExp(`^${f}/ganador/?$`),action:()=>document.createElement("game-over-screen")}];let g=null;function b(e){if(!g){console.error("Container not initialized!");return}for(const t of z)if(t.path.test(e)){g.innerHTML="";const o=t.action();g.appendChild(o);return}console.log("No route matched, showing 404"),g.innerHTML="<h2>404 - Página no encontrada</h2>"}function u(e){history.pushState({},"",e),b(e)}function H(e){g=e,window.addEventListener("popstate",()=>{b(location.pathname)}),b(location.pathname)}class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
         <style>
                 :host {
          box-sizing: border-box;
          margin:0;
          padding:0;
        }
        .img-container {
            width: 100px;
            height: 250px;
            bottom: -2;
            display: flex;
            flex-direction: column;
            justify-content: end;
        }

             .img-container img {
                 object-fit: contain; 
            }
        </style>
        <div class="img-container">
            <img src="/src/assets/tijera.png" alt="Piedra" />
        </div>
        `)}}customElements.define("tijera-com",M);class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
         <style>
                 :host {
          box-sizing: border-box;
          margin:0;
          padding:0;
        }
        .img-container {
            width: 100px;
            height: 250px;
            bottom: -2;
            display: flex;
            flex-direction: column;
            justify-content: end;
        }

            .img-container img {
                 object-fit: contain;
                 width: 115px;

            }
        </style>
        <div class="img-container">
            <img src="/src/assets/papel.png" alt="Piedra" />
        </div>
        `)}}customElements.define("papel-com",P);class A extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
         <style>
                 :host {
          box-sizing: border-box;
          margin:0;
          padding:0;
        }
        .img-container {
            width: 100px;
            height: 250px;
            bottom: -2;
            display: flex;
            flex-direction: column;
            justify-content: end;
        }

            /* ESTA ES LA REGLA CLAVE QUE FALTA */
            .img-container img {
                 object-fit: contain; 
            }
        </style>
        <div class="img-container">
            <img src="/src/assets/piedra.png" alt="Piedra" />
        </div>
        `)}}customElements.define("piedra-com",A);class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
    `;const t=this.shadowRoot.querySelector("#startBtn");t==null||t.addEventListener("click",()=>{u("/readycom")})}}customElements.define("welcome-page",q);(function(){const t=document.getElementById("app");t&&H(t)})();
