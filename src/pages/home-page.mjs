import { BattleButtons } from "../components/battle-buttons.mjs";
import { BattleButton } from "../components/battle-button.mjs";
import { PokemonBox } from "../components/pokemon-box.mjs";
import { css, html } from "../utils.mjs";

export class HomePage extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = this.CSS + this.HTML;
    }
    get HTML() {
        return html`
            <header>
                <img src="assets/img/logo/pokesync-logo-icon.svg" alt="PokéSync logo" />
                <ul>
                    <li><img src="assets/img/logo/pokesync-logo-icon.svg" alt="joker" /></li>
                    <li><img src="assets/img/logo/pokesync-logo-icon.svg" alt="joker" /></li>
                    <li><img src="assets/img/logo/pokesync-logo-icon.svg" alt="joker" /></li>
                </ul>
            </header>
            <div class="content">
                <section class="player1">
                    <p contenteditable>PlayerName</p>
                    <div class="party">
                        <pokemon-box nickname="Hubert" catch-id="1" gender="female" kind="1"></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                    </div>
                </section>
                <section class="player2">
                    <p contenteditable>PlayerName2</p>
                    <div class="party">
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                        <pokemon-box></pokemon-box>
                    </div>
                </section>
            </div>
            <!-- TODO: get overlap with battle buttons -->
            <div style="height: 5rem" class="bottom-spacer"></div>
            <battle-buttons>
                <battle-button slot="left" location="left">Options</battle-button>
                <battle-button slot="mid" location="mid">Share</battle-button>
                <battle-button slot="right" location="right">Add Pair</battle-button>
            </battle-buttons>
        `;
    }
    get CSS() {
        return css`
            home-page {
                display: flex;
                flex-direction: column;
                gap: 1em;
                height: -webkit-fill-available;
                height: stretch;
                overflow: hidden;

                header,.bottom-spacer{
                    flex-shrink: 0;
                }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: center;
                    overflow: hidden;

                    img {
                        display: block;
                        height: 3em;
                        width: 3em;
                    }

                    ul {
                        display: flex;
                        gap: 5ch;
                    }
                    li {
                        display: contents
                    }
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1rem;
                    flex: 1 1 0;
                    min-height: 0;
                    overflow-y: scroll;
                }

                section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .party {
                    display: grid;
                    gap: 1rem;
                    grid-template-columns: 1fr 1fr;
                }
            }
        `;
    }
}

customElements.define("home-page", HomePage);