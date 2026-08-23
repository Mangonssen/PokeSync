/** @typedef {"left"|"mid"|"right"} BBState   */

export class BattleButton extends HTMLElement { 
    /**
     * 
     * @param {BBState} [state] 
     */
    constructor(state){
        super();
        this.attachShadow({mode:"open"});
        this.state = state??this.dataset.state??"left";
    }
}
customElements.define("battle-button", BattleButton);

