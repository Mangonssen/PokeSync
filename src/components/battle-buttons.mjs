import { css, html } from "../utils.mjs";
import { BattleButton } from "./battle-button.mjs";
/** @import { BBType } from "./battle-button.mjs" */

export class BattleButtons extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = BattleButtons.CSS + BattleButtons.HTML;
    }
    /**
     * 
     * @param {Object} param0 
     * @param {{text:string}&BBType} [param0.left]
     * @param {{text:string}&BBType} [param0.mid]
     * @param {{text:string}&BBType} [param0.right]
     */
    static create({left,mid,right}){
        const self = new BattleButtons();
        if (left) {
            const button = BattleButton.create({ dir: "left", ...left });
            button.slot = "left";
            self.appendChild(button);
        }
        if (mid) {
            const button = BattleButton.create({ dir: "mid", ...mid });
            button.slot = "mid";
            self.appendChild(button);
        }
        if (right) {
            const button = BattleButton.create({ dir: "right", ...right });
            button.slot = "right";
            self.appendChild(button);
        }
        return self;
    }
    static CSS = css`
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
    static HTML = html`
        <slot name="left"></slot>
        <slot name="mid"></slot>
        <slot name="right"></slot>
    `;
}
customElements.define("battle-buttons", BattleButtons);

