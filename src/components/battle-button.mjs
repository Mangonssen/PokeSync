import { css, html } from "../utils.mjs";

/** @typedef {"left"|"mid"|"right"} BBDir   */

/**
 * 
 * @param {BBDir} dir 
 * @param {"a"|"button"} type 
 * @returns 
 */
const HTML = (dir, type) => html`
<${type === "a" ? "a" : "button"}${type === "a" ? "" : ` type="button"`}>
    <span id="text">
        <slot></slot>
    </span>
    <img
        src="assets/img/Pokemon Action ${dir === "left" ? "Left" :
        dir === "mid" ? "Center" :
            dir === "right" ? "Right" :
                ""
    }.svg"
        alt=""
    />
</${type === "a" ? "a" : "button"}>
`;

/**
 * 
 * @param {BBDir} dir 
 * @returns 
 */
const CSS = (dir) => css`
:host {
    display: inline-block;
    transform:
        translateY(${dir === "mid" ? "2.75rem" : "1.5rem"})
        translateX(${dir === "left" ? "-0.75rem" :
        dir === "right" ? "0.75rem" :
            "0"
    });
}

a,
button {
    appearance: none;
    border: 0;
    padding: 0;
    margin: 0;

    background: transparent;
    color: inherit;

    font: inherit;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;
}

#text {
    position: absolute;
    inset: 0;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: "Jaro";
    color: transparent;
    background: ${dir === "left" ? "var(--bb-orange)" :
        dir === "mid" ? "var(--bb-blue)" :
            dir === "right" ? "var(--bb-green)" :
                "currentColor"
    };

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    translate: ${dir === "left" ? "0.5rem -0.25rem" : dir === "right" ? "-0.5rem -0.25rem" : dir === "mid" ? "0 -0.5rem" : "0 -0.25rem"};
}

img{
    height: 6.5em;
}


button:focus-visible,
a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
}

button:active,
a:active {
    transform: scale(0.97);
}
`;

export class BattleButton extends HTMLElement {
    /**
     * @param {Object} param0
     * @param {BBDir} [param0.dir] 
     * @param {string} [param0.text] 
     * @param {"a"|"button"} [param0.type] 
     */
    constructor({ dir: location, text, type }) {
        super();
        this.innerHTML = text ?? this.innerHTML;
        let shadowRoot = this.attachShadow({ mode: "open" });
        /** @type {BBDir} */
        this.location = location ?? /** @type {BBDir} */(this.dataset.state) ?? "left";
        shadowRoot.innerHTML = HTML(this.location, type ?? /** @type {"a"|"button"} */(this.dataset.type) ?? "a");
        shadowRoot.innerHTML += CSS(this.location);
    }
}
customElements.define("battle-button", BattleButton);

