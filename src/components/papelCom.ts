import papelImage from "../assets/papel.png";

export class papelCom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

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

            .img-container img {
                 object-fit: contain;
                 width: 115px;

            }
        </style>
        <div class="img-container">
            <img src="${papelImage}" alt="Papel" />
        </div>
        `;
  }
}

customElements.define("papel-com", papelCom);
