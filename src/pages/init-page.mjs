export class InitPage extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = "Init"
    }
}

customElements.define("init-page", InitPage);