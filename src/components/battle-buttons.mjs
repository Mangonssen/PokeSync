import { BattleButton } from "./battle-button.mjs";

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
        shadowRoot.appendChild(new BattleButton("left"));
        shadowRoot.appendChild(new BattleButton("mid"));
        shadowRoot.appendChild(new BattleButton("right"));

    }
}
customElements.define("battle-buttons", BattleButtons);

