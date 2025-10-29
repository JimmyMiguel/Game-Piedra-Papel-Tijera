 export class btnCom extends HTMLElement {
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
`;

  }

   
}
customElements.define("btn-com", btnCom)
