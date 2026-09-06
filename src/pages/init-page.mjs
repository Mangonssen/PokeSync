import { BattleButtons } from "../components/battle-buttons.mjs";
import { BattleButton } from "../components/battle-button.mjs";
import { SLRadio, SLSelect, SLText } from "../components/settings-line/index.mjs";
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
    static observedAttributes = [
        "step",
        "allow-jokers",
        "game-version",
        "run-name",
        "player-1-name",
        "player-1-gender",
        "player-2-name",
        "player-2-gender",
    ]
    constructor() {
        super();
        // this.appendChild(BattleButtons.create({
        //     left: { text: "< Back", kind: "a", href: "#" },
        //     right: { text: "Next >", kind: "a", href: "#" },
        // }))
    }

    connectedCallback() {
        this.render();
    }

    /**
     * 
     * @param {string} name 
     * @param {string|null} oldValue 
     * @param {string|null} newValue 
     * @returns 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "step": {
                this.render()
            } break;

            default:
                break;
        }
        this.#updateNext();
    }

    render() {
        this.innerHTML = this.CSS + this.HTML;
        this.settingsElements = {
            game: /** @type {SLSelect | null} */(this.querySelector("[name='game']")),
            run: /** @type {SLText | null} */(this.querySelector("[name='name']")),
            jokers: /** @type {SLRadio | null} */(this.querySelector("[name='jokers']")),
            player1Name: /** @type {SLText | null} */(this.querySelector("[name='player1name']")),
            player1Gender: /** @type {SLRadio | null} */(this.querySelector("[name='player1gender']")),
            player2Name: /** @type {SLText | null} */(this.querySelector("[name='player2name']")),
            player2Gender: /** @type {SLRadio | null} */(this.querySelector("[name='player2gender']")),
        };
        this.settingsElements.game?.addEventListener("change", () => {
            this.gameVersion = this.settingsElements?.game?.value ?? null
        });
        this.settingsElements.run?.addEventListener("input", () => {
            this.runName = this.settingsElements?.run?.value ?? null
        });
        this.settingsElements.jokers?.addEventListener("change", () => {
            this.jokers = this.settingsElements?.jokers?.value ?? null
        });
        this.settingsElements.player1Name?.addEventListener("input", () => {
            this.player1Name = this.settingsElements?.player1Name?.value ?? null
        });
        this.settingsElements.player1Gender?.addEventListener("change", () => {
            this.player1Gender = this.settingsElements?.player1Gender?.value ?? null
        });
        this.settingsElements.player2Name?.addEventListener("input", () => {
            this.player2Name = this.settingsElements?.player2Name?.value ?? null
        });
        this.settingsElements.player2Gender?.addEventListener("change", () => {
            this.player2Gender = this.settingsElements?.player2Gender?.value ?? null
        });
        this.back = /** @type {BattleButton} */(this.querySelector("battle-button[slot='left']"));
        this.back.onclick = () => { this.#onBack() }
        this.next = /** @type {BattleButton} */(this.querySelector("battle-button[slot='right']"));
        this.next.onclick = () => { this.#onNext() }
        this.#updateNext()
    }

    #onBack() {
        if (this.step === "player-data") {
            this.step = "metadata";
        } else {
            window.navigation.navigate("?page=");
        }
    }
    #onNext() {
        if (this.step === "metadata") {
            this.step = "player-data";
        } else {
            window.navigation.navigate("?page=dashboard");
        }
    }

    canGoNext() {
        const step = this.step;

        if (step === "metadata" && (this.jokers && this.runName && this.gameVersion)) {
            return true;
        } else if (step === "player-data"
            && (this.jokers && this.runName && this.gameVersion)
            && (this.player1Name && this.player1Gender && this.player2Name && this.player2Gender)
        ) {
            return true;
        }

        if (step !== "metadata" && step !== "player-data") {
            console.error("InitPage.step was bad")
        }
        return false;
    }
    #updateNext(){
        const bButton = this.next
        if (!bButton) {
            return
        }

        const can = this.canGoNext();
        if (can) {
            bButton.disabled = false;
        } else {
            bButton.disabled = true;
        }
    }

    get HTML() {

        const step = this.step;
        const subtitle = {
            metadata: "Run Settings - Meta Data",
            "player-data": "Run Settings - Player Data",
        }[step];
        const next = {
            metadata: "Next &gt",
            "player-data": "Begin &gt",
        }[step];
        const settings = {
            metadata: html`
                <settings-select title="Game" placeholder="Select Option" name="game" required>
                    <option value="v1">Version 1</option>
                    <option value="v2">Version 2</option>
                    <option value="v3">Version 3</option>
                </settings-select>
                <settings-text title="Run Name" name="name" required></settings-text>
                <settings-radio title="Use Jokers" name="jokers" required>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </settings-radio>`,
            "player-data": html`
                <settings-text title="Player 1" name="player1name" required></settings-text>
                <settings-radio title="Player 1" name="player1gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </settings-radio>
                <settings-text title="Player 2" name="player2name" required></settings-text>
                <settings-radio title="Player 2" name="player2gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </settings-radio>
            `,
        }[step];

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
                    <p>${subtitle}</p>
                </hgroup>
                <div class="settings">
                    ${settings}
                </div>
                <!-- TODO: get overlap with battle buttons -->
                <div style="height: 5rem" class="bottom-spacer"></div>
            </div>
            <battle-buttons>
                <battle-button slot="left" location="left" >&lt Back</battle-button>
                <battle-button slot="right" location="right" >${next}</battle-button>
            </battle-buttons>
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
                hgroup p{
                    font-size: 1.2rem;
                    text-transform: uppercase;
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

    get step() {
        return this.getAttribute("step") ?? "metadata"
    }
    set step(val) {
        if (val === "player-data" && this.jokers && this.gameVersion && this.runName) {
            this.setAttribute("step", val);
        }
        else if (val === "metadata") {
            this.setAttribute("step", val);
        }
        this.#updateNext();
    }
    get jokers() {
        return this.getAttribute("allow-jokers");
    }
    set jokers(val) {
        if (val) {
            this.setAttribute("allow-jokers", val);
        } else {
            this.removeAttribute("allow-jokers");
        }
        this.#updateNext();
    }
    get gameVersion() {
        return this.getAttribute("game-version")
    }
    set gameVersion(val) {
        if (val) {
            this.setAttribute("game-version", val);
        } else {
            this.removeAttribute("game-version");
        }
        this.#updateNext();
    }
    get runName() {
        return this.getAttribute("run-name")
    }
    set runName(val) {
        if (val) {
            this.setAttribute("run-name", val);
        } else {
            this.removeAttribute("run-name");
        }
        this.#updateNext();
    }
    get player1Name() {
        return this.getAttribute("player-1-name")
    }
    set player1Name(val) {
        if (val) {
            this.setAttribute("player-1-name", val);
        } else {
            this.removeAttribute("player-1-name");
        }
        this.#updateNext();
    }
    get player1Gender() {
        return this.getAttribute("player-1-gender")
    }
    set player1Gender(val) {
        if (val) {
            this.setAttribute("player-1-gender", val);
        } else {
            this.removeAttribute("player-1-gender");
        }
        this.#updateNext();
    }
    get player2Name() {
        return this.getAttribute("player-2-name")
    }
    set player2Name(val) {
        if (val) {
            this.setAttribute("player-2-name", val);
        } else {
            this.removeAttribute("player-2-name");
        }
        this.#updateNext();
    }
    get player2Gender() {
        return this.getAttribute("player-2-gender")
    }
    set player2Gender(val) {
        if (val) {
            this.setAttribute("player-2-gender", val);
        } else {
            this.removeAttribute("player-2-gender");
        }
        this.#updateNext();
    }
}

customElements.define("init-page", InitPage);