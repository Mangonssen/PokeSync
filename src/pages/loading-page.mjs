export class LoadingPage extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = "Loading"
    }
}

customElements.define("loading-page", LoadingPage);