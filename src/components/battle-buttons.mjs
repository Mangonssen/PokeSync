import { css } from "../utils.mjs";
import { BattleButton } from "./battle-button.mjs";

const CSS = css`
:host(*){
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    display: flex;
    justify-content: space-between;
}
`;

export class BattleButtons extends HTMLElement {

    /**
     * 
     * @param {Object} param0 
     * @param {*} param0.left
     * @param {*} param0.mid
     * @param {*} param0.right
     */
    constructor({ left, mid, right }) {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = CSS;
        shadowRoot.appendChild(new BattleButton({ dir: "left", text: left }));
        shadowRoot.appendChild(new BattleButton({ dir: "mid", text: mid }));
        shadowRoot.appendChild(new BattleButton({ dir: "right", text: right }));
    }
}
customElements.define("battle-buttons", BattleButtons);

