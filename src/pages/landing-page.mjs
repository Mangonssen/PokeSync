export class LandingPage extends HTMLElement {
    constructor() {
        super()
        this.innerHTML="Landing"
    }
}

customElements.define("landing-page", LandingPage);