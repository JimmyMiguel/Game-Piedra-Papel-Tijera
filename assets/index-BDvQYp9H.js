var L=Object.defineProperty;var B=(e,t,o)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var p=(e,t,o)=>B(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();class v extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
`)}}customElements.define("btn-com",v);const w="/Game-Piedra-Papel-Tijera/assets/fondo-azul-BDkdt0nR.jpg";class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
      <style>
        * {
          box-sizing: border-box;
        }

        .container {
            width: 100%;
            height: 100vh;
             font-family: "Odibee Sans", sans-serif;
            letter-spacing: 4px;
            background-image: url(${w});
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
    `;const t=this.shadowRoot.querySelector("#startBtn");t==null||t.addEventListener("click",()=>{u("/gameCom")})}}customElements.define("ready-com",R);const l={listener:[],resultado:"",partidasGanadas:{userComputer:0,userJugador:0},winGame(e,t){return e===t?"Empate":e==="piedra"&&t==="tijera"||e==="papel"&&t==="piedra"||e==="tijera"&&t==="papel"?(this.partidasGanadas.userJugador++,"Ganaste"):(this.partidasGanadas.userComputer++,"Perdiste")},getState(){return this.partidasGanadas},setState(e,t){const o=this.winGame(e,t);this.resultado=o;for(const a of this.listener)a();this.saveToLocalStorage()},saveToLocalStorage(){try{const e=JSON.stringify(this.partidasGanadas);localStorage.setItem("game-scores",e)}catch(e){console.error("Error al guardar en localStorage:",e)}},loadFromLocalStorage(){try{const e=localStorage.getItem("game-scores");if(e){const t=JSON.parse(e);t&&typeof t.userJugador=="number"&&typeof t.userComputer=="number"&&(this.partidasGanadas=t)}}catch(e){console.error("Error al cargar desde localStorage:",e)}}};l.loadFromLocalStorage();const O="/Game-Piedra-Papel-Tijera/assets/win-6UgLvupI.jpg";class Q extends HTMLElement{constructor(){super();p(this,"resultText","");p(this,"playerScore",0);p(this,"machineScore",0);p(this,"buttonText","Volver a Jugar");this.attachShadow({mode:"open"})}connectedCallback(){this.loadAttributes(),this.render(),this.attachEventListeners(),this.aplicarEstilos()}loadAttributes(){const o=l.getState(),a=l.resultado;this.resultText=a||this.resultText,this.playerScore=o.userJugador,this.machineScore=o.userComputer,this.buttonText=this.getAttribute("button-text")||this.buttonText}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
              background-image: url(${O});
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
      `)}attachEventListeners(){var a;const o=(a=this.shadowRoot)==null?void 0:a.getElementById("playAgainButton");o==null||o.addEventListener("click",()=>{u("/gameCom")})}aplicarEstilos(){var a;if(l.resultado==="Ganaste"){const r=(a=this.shadowRoot)==null?void 0:a.querySelector(".star-container");r==null||r.classList.add("win")}}}customElements.define("game-over-screen",Q);class j extends HTMLElement{constructor(){super();p(this,"timeoutId");this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.gameLogic(),this.temporizadorCom(5)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        * {
          box-sizing: border-box;
        }

        .container {
            width: 100%;
            height: 100vh;
             font-family: "Odibee Sans", sans-serif;
            letter-spacing: 4px;
            background-image: url(${w});
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
    `)}gameLogic(){var m,A,x,E,y,S,C;const o=(m=this.shadowRoot)==null?void 0:m.querySelector(".btn-piedra");if(!((A=this.shadowRoot)!=null&&A.querySelector(".hands")))return;const a=(x=this.shadowRoot)==null?void 0:x.querySelector(".hands");o==null||o.addEventListener("click",()=>{var d;a.classList.add("clicked"),a.innerHTML="",a.innerHTML=`
    <piedra-com></piedra-com>
    `;const c=this.randomFun();console.log(c),this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("piedra",c),setTimeout(()=>{u("/ganador")},2e3)});const r=(E=this.shadowRoot)==null?void 0:E.querySelector(".btn-papel");if(!((y=this.shadowRoot)!=null&&y.querySelector(".hands")))return;const i=(S=this.shadowRoot)==null?void 0:S.querySelector(".hands");r==null||r.addEventListener("click",()=>{var d;console.log("muy bien aplastate un papel"),i.classList.add("clicked"),i.innerHTML="",i.innerHTML=`
        <papel-com></papel-com>
        `;const c=this.randomFun();this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("papel",c),setTimeout(()=>{u("/ganador")},2e3)});const n=(C=this.shadowRoot)==null?void 0:C.querySelector(".btn-tijera");if(!this.shadowRoot.querySelector(".hands"))return;const h=this.shadowRoot.querySelector(".hands");n==null||n.addEventListener("click",()=>{var d;console.log("muy bien aplastate un tijera"),h.classList.add("clicked"),h.innerHTML="",h.innerHTML=`
        <tijera-com></tijera-com>
        `;const c=this.randomFun();this.mostrarJugadaComputadora(c),clearTimeout(this.timeoutId);const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".circle");s==null||s.classList.add("hidden"),l.setState("tijera",c),setTimeout(()=>{u("/ganador")},2e3)})}randomFun(){const o=["piedra","papel","tijera"];function a(i){const n=Math.floor(Math.random()*i.length);return i[n]}return a(o)}mostrarJugadaComputadora(o){var i;const a=(i=this.shadowRoot)==null?void 0:i.querySelector(".randomHand");if(!a)return;a.innerHTML="";let r="";o==="piedra"?r="<piedra-com></piedra-com>":o==="papel"?r="<papel-com></papel-com>":o==="tijera"&&(r="<tijera-com></tijera-com>"),a.innerHTML=r}temporizadorCom(o){var r,i,n;clearTimeout(this.timeoutId);const a=(r=this.shadowRoot)==null?void 0:r.querySelector(".countdown");if(o>=0)a.textContent=`${o}`,this.timeoutId=setTimeout(()=>{this.temporizadorCom(o-1)},1e3);else{const h=(i=this.shadowRoot)==null?void 0:i.querySelector(".container");if(h){h.innerHTML=`
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
          <div style="background-color: white; padding: 40px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0 0 20px 0; color: #001997;">¡Se te acabó el tiempo!</h2>
            <button id="reiniciarJuego" style="font-size: 20px; padding: 10px 20px; background-color: #005CFF; color: white; border: none; border-radius: 5px; cursor: pointer;">JUGAR</button>
          </div>
        </div>
      `;const m=(n=this.shadowRoot)==null?void 0:n.querySelector("#reiniciarJuego");m==null||m.addEventListener("click",()=>{this.render(),this.gameLogic(),this.temporizadorCom(5)})}}}}customElements.define("game-com",j);const f="/Game-Piedra-Papel-Tijera",H=[{path:new RegExp(`^${f}/?$`),action:()=>document.createElement("welcome-page")},{path:new RegExp("/readycom/"),action:()=>document.createElement("ready-com")},{path:new RegExp(`^${f}/gameCom/?$`),action:()=>document.createElement("game-com")},{path:new RegExp(`^${f}/ganador/?$`),action:()=>document.createElement("game-over-screen")}];let g=null;function b(e){if(!g){console.error("Container not initialized!");return}for(const t of H)if(t.path.test(e)){g.innerHTML="";const o=t.action();g.appendChild(o);return}console.log("No route matched, showing 404"),g.innerHTML="<h2>404 - Página no encontrada</h2>"}function u(e){history.pushState({},"",e),b(e)}function U(e){g=e,window.addEventListener("popstate",()=>{b(location.pathname)}),b(location.pathname)}const T="data:image/png;base64,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";class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            <img src="${T}" alt="Tijera" />
        </div>
        `)}}customElements.define("tijera-com",D);const M="data:image/png;base64,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";class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            <img src="${M}" alt="Papel" />
        </div>
        `)}}customElements.define("papel-com",I);const K="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAACxCAYAAAAoLfhGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAtOSURBVHgB7Z1tiFTXGccfNdgQt+xaKDFC601MXyzU1SZSTSCOH7QNEV+aUhR8WaEpGmh9qUKhJLubfiqarH6JC1JcNaV+ie6WCMWk7Gw+JCm00ZXSSoPNXQq+tDTukjVI8sGc/70zZnac2fucO+feeebe5wdnd2fmzLMz93/Pued5znPOnUHNocOUDaZ0mlIwxSs9B8ZNuVgqQ6YULeytNGVJlT2/VEZKtrj2uirsdVTYu1j6jPhsgyXbmQFfstuUm6bcYZYPKTxYtfBMOe7QHsQYtrB1p1S/nr2WYjfZHchaB9arsNfdgK1a9voatDdcZa9lQKvBh7/jqOxJwN4FR7ZwAm6gFsKj8Ey9k7OynVoEV2dmK5YCCaebWuuAui7o7jwSiketdTCTKmdJKMeptQ5kkqVADTCL3OOZMsCt3DHnAfr+okdp3ZPL6Ntfm0/jk5/QxK1PKC6w94NlnbTGFFf2frJqBa174nHqfNSjGx9N2NqbMOVPFJMZZE/Zq/ZKj8uef5kuCltQJNvWPEWHnt9mDsKcKc+fPD9Cvzn5Oo3d+B/Z8PMfPU0vbHvWmb3pPt/+oycD8Rng+MylmHAFKpiynsIxvlenTtGUExQOMQsUwVbz5X93YFfd13Ewl+38FfcgpG5v9MpYYI/JUpp6ErOJ6uIKFLaGHlOW0xfxqFp4NL2AU3i995fU0Tan7ut47fann9Hbl/5JEu3N+0p4KJj2/kIxBZpZ53n8d4Q+himB8fzKzkW04MGvRtbDdcmlvac6v0Mc1j35uFN71MBw+746xoYpwTH81xlfHixg1lu80GPV6+TWe2QBq543j/f5GqG6BXkkKOjX0fYAr94cZj2mPUlUClQOanqkiKFSIFxzPFJEURYIE1VdpIijLFAfKSLBKM4ji6H0ysWLguHlAjOCmTBO3+gV33jWb1OzgSM6MvqPwIHE31yHtBb4PiMM/2Z88hYxWV/6DV+oSGF0gQUiCZhRZLUghFFe2Prje57HAXm2+2W6ZA4OhygvvZLZqzdH1sEobryBeFsTGDCllxgJJ+ji1hODeuIA+CtvHXqR7be4psXEAV0UzjQjSuNNV3EmMUZu8B/qiVNZ5xcmWKlY0UWha7OkXgWWQDYhEsUaj8LUgO21XpxJDNqZnnqzuriMMEA1BmssgZTUwDVpyoyBCiQLj6omO1UgeWBOrVB+cB9lkI4vzyHvoQfN7zZqNuMfT9LFf/2bLEGadBF/ZEogiHL8xf1UeGwxSWL841t0+PRZ6j12ivuWAoXXovHMdHEQ58JrR8WJA9Cie57bYj7fq+y3UMk3yoxAw/0HgwMhmSXfXGiE2sqtXsCPTAiEVoMW1Ars3sRe/BDMu2dCoCXfWEitAgYuC3gnU5BL51SgRkL8jdjDSCmDtOMHSyDuNALmhpphz792g7IKSyBMgmEyLIpTzIk71/aK71+i4t9GKYuwu7ifHuynsev1c5uR+4yc5WbZ2/HSy5lsSUj97eFUREb/H9/5azDvg6j1/bNnB8+jJSCR/Ni5t8gG1/Yw/Tw08g7NDaII8+j+L80mqcBpnYieLvdNOYEp7zsUAxxU/BNXs5mu7SU97O5oazN+zSPU/bOt1v/LW7+NxqJbe9GUVbEFUr5gwISXtq9dza5vI5BGsx2wp68/iLclgQrkAPhhR06foSRQgRwRY0qBReICuQ5gSg2Ijk8mE81IVCDEyDAF0LeXl6SYtr1WIBGBcJZ3m7D6hd+/GgxB92zeQB8OnYw9V1PP3oaVT1DWYc2o4gBxRik4eNvXrqE9mzbe0xXhteGjB01I5hKdOHeeBt54s2F7Zw92W9lrRVh+UNczq6lv3y5zIbxCI++PBmKV+1wcKITPC491WjtsOLgXP7hCY1dvNGwPnwmfr9qeCwZNhCLqBEXvgBOQg40fxM5JwBmMD+FyStmlvSQ+X5lhc0CT8nOi0GG2cFQg4ahAwlGBhKMCCSeTqb+uwDT60Mi7nCFxYqhANYAwvcdeC3Idmo0KVAFyGva+ctQ4pu+SFFSgEkdOn6WeY6ea5pDWI/cCQRCsOkAiRyMgRyEJci0QurSN+3uD+F2jrE8osp5bgSDOqp0HnOTSIajbZZE0YkMu/SCX4gRR7H5eFDsOuWxB6NbiioOoOdb5oEvDDG/SC8ZyJ9DeV/pjXXPQje3evNHMja1JNS8iVwINvHHeerRWnm7HrG4zyI1A6NIQHbAB3RcWJTdz9V5uBIKvY3Pd2W1azOF9O6nZ5EIgCGOTVNL93Babxb6JkothtsX+BEHLkSIOyLxANq0H1xoJ3VolmRfoyB/4o7YkHc64ZF4g5LRxwHVH4l4LmRYIKw44IzfsXdC1dg1JJNMCIQuWw4aVK8TuVJJpgZBazGH7M8lEol2QaYH8q9cj66B7Qx64VLJ9DfogetVb4Xvyti+rJLMCccM6WEovmewKdJUnkOBtzHB7z0Ag9o0eskh7E/Y1ZSZC4lbTPIFcJFVIZbo7PSaBxdZpd1tQ5O0j/Wv/pVbDm8/rurz58yhNLJbr+/gBgSaiakL1VttJCteWqBFaM7bSHOX3RkHDYbUgMMSMaUnieHf92dDyFs5pM1hkH0cfPyBQkVPbwrAYgpXlJkKNnLVyogd+I78Az6fdetALMRPy/VK5ey9vjBg6ot51889nxG99LBkkrWDjQQZDFN4i4K4fNMR5V1IbBuUFi6SVwfIfZYGKnHcdPj0oLvu/VUDrsRhoFct/lAWCYpH+EEZzvcdOkmKPRetBb+aXH5QFgjgnOO9GK8rqDrtJAXEsWs9A5YMZFX97FN6ZMJLyjSx0wBANtqdZuuV5bnXflIcrn5hZ9WKROFbM2bDjpUOkTE+w/uhAr81b7qk8q+oxNqreQwwuj/2HJsw16YcrlpFyLzGWuPim7Kh+slogXItwU4flxOC9v18O+kjJM5LNIOb6I4hzufrJWTUqvmfKJmI4rgCe8agJAC7/7iIRtyRrNrjmPL3717biDJjy21ov1BLotikYpnURE3R3iNVhdjLt6LAksFIc1+br/79p8zafwtZT082ZNc2bgt6LmGBr/hPn3gw201vyrYW5ak1wOxDC6T9zjm5/+hlZsopqdG1lZtD04D7TBYoBdmnEijQsF8wqDnYkwaitZ7oKUQLhOjTtzcCjwMavfft2tswtzDjgOoPhc4NzZJHigCiBgEehSB7FJEuOLURZumVXozFJljiAk9XjU9hPsib2ahowXwo782aBHb2HUhMHcNOufApFGqSYcNNwpdPgDlhW4gCbvDgMAzdSjXAEB/9adBqudBq45uDY4QTvIUviJC72UBjQ8y3ek+d5pKIpS4kZ56wmbmapT6FIsVpTTvApbDWryPJkrqTR1N8eitGaWhWLJEdcq2O3mkpc5Gb7lBeB+NERhMqcpFTrrr/CUYGEowIJRwUSjiuBolO2JnPlB7EmOzm4Eoi1QiJHtJMjtIsTjgpkSdpTJiqQJe1t6U7lq0DCUYGEowIJRwUSTmqOalApP5N2c8kR6Qo0mRtnVR3VvKACCUcFsuThlDNkVSDhqEDCUYGEowIJx5VAPimVeOSIVFsQZ5tkZSraxQlHBbIk7bW3KpAlOuWtTEEFEo4KJBwVSDipOqo5Sv/1yBGptqCJfKX/OkG7OOGoQJZ0aGapbNRRVaagAglHBRJOqomLOcPJMkgVKDmcZJemO6PaYnfxkoBeg4SjAlmiM6rCaW9TR1WpQAUSjgokHBUoOZwsg9TU3+QQFUlg4V9VR9UW7eKEowIJRwWyxHso3RtYqUDCUYGEowIJx6VAOmk3FY8coAIJJ11H9bo6qrboNUg4KpAlOqMqHE39VaagAglHBRKO+kHJ4ZEDVCDhfA73z4gAGUtC0wAAAABJRU5ErkJggg==";class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            <img src="${K}" alt="Piedra" />
        </div>
        `)}}customElements.define("piedra-com",N);class Y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
          background-image: url(${w});
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
    `;const t=this.shadowRoot.querySelector("#startBtn");t==null||t.addEventListener("click",()=>{u("/readycom")})}}customElements.define("welcome-page",Y);(function(){const t=document.getElementById("app");t&&U(t)})();
