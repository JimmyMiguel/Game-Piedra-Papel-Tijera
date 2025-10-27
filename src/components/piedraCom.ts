export class piedraCom extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.render()

    }


    render(){
        if(!this.shadowRoot) return

        this.shadowRoot.innerHTML = `
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
                 object-fit: contain; /* Evita que la imagen se deforme */
            }
        </style>
        <div class="img-container">
            <img src="/src/assets/piedra.png" alt="Piedra" />
        </div>
        `
    }
}

customElements.define("piedra-com", piedraCom)