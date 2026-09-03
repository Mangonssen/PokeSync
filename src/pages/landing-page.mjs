import { BattleButtons } from "../components/battle-buttons.mjs";
import { css, html, showToast } from "../utils.mjs";

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
    <img src="assets/img/logo/pokesync-logo.svg" alt="PokéSync logo" />
</hgroup>
`;

const CSS = css`
landing-page{
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    height: stretch;
    video{
        width: auto;
        height: auto;
        aspect-ratio: 1;
        background-color: white;
    }
    hgroup{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
`;

export class LandingPage extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = CSS + HTML;
        this.battleButtons =  BattleButtons.create({
            left: { text: "Load Run", kind: "button", callback: () => { console.log("pressed"); } },
            mid: {
                text: "Share", kind: "button", callback: () => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'PokéSync',
                            text: 'Check this out!\n\n',
                            url: window.location.href
                        }).catch(console.error);
                    } else {
                        // Fallback
                        navigator.clipboard.writeText(window.location.href)
                            .then(() => {
                                showToast('Link copied to clipboard!');
                            })
                            .catch(() => {
                                showToast('Could not copy link.');
                            });
                    }

                }
            },
            right: { text: "New Run", kind: "a", href:"?page=init" },
        });
        this.appendChild(this.battleButtons);
    }
}

customElements.define("landing-page", LandingPage);