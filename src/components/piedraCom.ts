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
            .img-container { /* Renombré la clase para más claridad */
                width: 60px;
                height: 115px;
            }

            /* ESTA ES LA REGLA CLAVE QUE FALTA */
            .img-container img {
                 height: 100%;
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