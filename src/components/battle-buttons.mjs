import { css } from "../utils.mjs";
import { BattleButton } from "./battle-button.mjs";

/** @import {BBType} from "./battle-button.mjs" */

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
     * @param {{text:string}&BBType} [param0.left]
     * @param {{text:string}&BBType} [param0.mid]
     * @param {{text:string}&BBType} [param0.right]
     */
    constructor({ left, mid, right }) {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = CSS;
        if (left) shadowRoot.appendChild(new BattleButton({ dir: "left", ...left }));
        if (mid) shadowRoot.appendChild(new BattleButton({ dir: "mid", ...mid }));
        if (right) shadowRoot.appendChild(new BattleButton({ dir: "right", ...right }));
    }
}
customElements.define("battle-buttons", BattleButtons);

