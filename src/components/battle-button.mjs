import { css, html } from "../utils.mjs";

/** @typedef {"left"|"mid"|"right"} BBDir   */

const HTML = html`
<slot></slot>
`;

/**
 * 
 * @param {BBDir} dir 
 * @returns 
 */
const CSS = (dir) => css`
:host(*){
    color: ${
        dir == "left" ? "orange" :
        dir == "mid" ? "blue" :
        dir == "right" ? "green" :
        "currentColor"
    };
}
`;

export class BattleButton extends HTMLElement {
    /**
     * @param {Object} param0
     * @param {BBDir} [param0.dir] 
     * @param {string} [param0.text] 
     */
    constructor({ dir: location, text }) {
        super();
        this.innerHTML = text ?? this.innerHTML;
        let shadowRoot = this.attachShadow({ mode: "open" });
        /** @type {BBDir} */
        this.location = location ?? /** @type {BBDir} */(this.dataset.state) ?? "left";
        shadowRoot.innerHTML = HTML;
        shadowRoot.innerHTML += CSS(this.location);
    }
}
customElements.define("battle-button", BattleButton);

