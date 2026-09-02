import { BattleButtons } from "../components/battle-buttons.mjs";
import { } from "../components/settings-line/index.mjs";
import { GAMES } from "../datatypes.mjs";
import { css, html } from "../utils.mjs";

/** @import {Player} from "../datatypes.mjs" */

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
        this.state = params?.state ?? structuredClone(defaultInitPageState);
        this.innerHTML = this.CSS + this.HTML;
        this.appendChild(BattleButtons.create({
            left: { text: "< Back", kind: "a", href: "#" },
            right: { text: "Next >", kind: "a", href: "#" },
        }))
    }

    get HTML() {
        return html`
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
            <div class="content">
                <hgroup>
                    <h1 class="sr-only">PokéSync</h1>
                    <img src="assets/img/logo/pokesync-logo.svg" alt="PokéSync logo" />
                    <p>Run Settings${this.state.step === "metadata" ? " - Meta Data" : this.state.step === "player" ? " - Players" : ""}</p>
                </hgroup>
                <div class="settings">
                    <settings-select title="Game" placeholder="Select Option" name="game" required>
                        <option value="v1">Version 1</option>
                        <option value="v2">Version 2</option>
                        <option value="v3">Version 3</option>
                    </settings-select>
                    <settings-text title="Run Name" name="name" required></settings-text>
                    <settings-radio title="Use Jokers" name="jokers" required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </settings-radio>
                </div>
                <!-- TODO: get overlap with battle buttons -->
                <div style="height: 5rem" class="bottom-spacer"></div>
            </div>
        `;
    }

    get CSS() {
        return css`
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
                .content{
                    height:-webkit-fill-available;
                    height:stretch;
                    display: grid;
                    grid-template-rows: auto 1fr auto;
                }
                hgroup img{
                    height: 2rem;
                }
                .settings{
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    justify-content: center;
                }
            }
        `;
    }
}

customElements.define("init-page", InitPage);