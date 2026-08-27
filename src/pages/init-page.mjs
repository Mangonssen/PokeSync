import { BattleButtons } from "../components/battle-buttons.mjs";
import { SettingsLine } from "../components/settings-line.mjs";
import { GAMES } from "../datatypes.mjs";
import { css, html } from "../utils.mjs";

/** @import {Player} from "../datatypes.mjs" */

/**
 * 
 * @param {InitPageState["step"]} step 
 * @returns 
 */
const HTML = (step) => html`
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
<div>
    <hgroup>
        <h1 class="sr-only">PokéSync</h1>
        <img src="assets/img/logo/pokesync-logo.svg" alt="PokéSync logo" />
        <p>Run Settings${step === "metadata" ? " - Meta Data" : step === "player" ? " - Players" : ""}</p>
    </hgroup>
</div>
`;
const CSS = css`
init-page {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: -webkit-fill-available;
    height: stretch;
    video{
        width: auto;
        height: auto;
        aspect-ratio: 1;
        background-color: white;
    }
}
`;

/**
 * @typedef {{
 * step: "metadata" | "player";
 * allowJokers: boolean;
 * game?: (keyof GAMES);
 * runName?: string;
 * player1?: Player;
 * player2?: Player;
 * }} InitPageState
 */

/** @satisfies {InitPageState} */
export const defaultInitPageState = {
    step: "metadata",
    allowJokers: true,
};

/**
 * @typedef {{
 * state?: InitPageState
 * }} InitPageParams
 */

export class InitPage extends HTMLElement {
    /**
     * @param {InitPageParams} [params] 
     */
    constructor(params) {
        super();
        const state = params?.state ?? structuredClone(defaultInitPageState);
        this.innerHTML = CSS + HTML(state.step);
        this.appendChild(new SettingsLine());
        this.appendChild(new SettingsLine());
        this.appendChild(new SettingsLine());
        this.appendChild(new BattleButtons({
            left: { text: "< Back", type: "a", href: "#" },
            right: { text: "Next >", type: "a", href: "#" },
        }))
    }
}

customElements.define("init-page", InitPage);