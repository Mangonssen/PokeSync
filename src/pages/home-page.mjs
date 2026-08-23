export class HomePage extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = "Home"
    }
}

customElements.define("home-page", HomePage);