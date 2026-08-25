import { BattleButtons } from "../components/battle-buttons.mjs";
import { html } from "../utils.mjs";

const HTML = html`
<video controls width="250">
    <source
        src="https://developer.mozilla.org/shared-assets/videos/flower.webm"
        type="video/webm"
    />
    <source
        src="/shared-assets/videos/flower.mp4"
        type="video/mp4"
    />

    Download the
    <a href="https://developer.mozilla.org/shared-assets/videos/flower.webm">WEBM</a>
    or
    <a href="https://developer.mozilla.org/shared-assets/videos/flower.mp4">MP4</a>
    video.
</video>

<hgroup>
    <p>Welcome to</p>
    <h1 class="sr-only">PokéSync</h1>
    <img src="default.svg" alt="PokéSync logo" />
</hgroup>
`;

export class LandingPage extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = HTML;
        const battleButtons = new BattleButtons({
            left: { text: "Load Run", type: "button", callback: () => { console.log("pressed") } },
            mid: { text: "Google", type: "a", href: "https://google.com" },
            right: { text: "New Run", type: "button", callback: () => { console.log("pressed") } },
        });
        this.appendChild(battleButtons)
    }
}

customElements.define("landing-page", LandingPage);