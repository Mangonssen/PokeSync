import { css, html } from "../utils.mjs";

/** @typedef {"left"|"mid"|"right"} BBDir   */
/**
 * @typedef {{
 *   text: string,
 *   dir: BBDir
 * }} BBDataBase
 */

/**
 * @typedef {(
 *   {type: "button", callback: Function} |
 *   {type: "a", href: string}
 * )} BBType
 */

/**
 * @typedef {BBDataBase & BBType} BBData
 */


/**
 * @param {BBDir} dir
 * @param {"a"|"button"} type
 * @returns {string}
 */
const HTML = (dir, type) => {
    const tag = type === "a" ? "a" : "button";
    const buttonType = type === "button" ? ` type="button"` : "";

    const image = {
        left: "Left",
        mid: "Center",
        right: "Right"
    }[dir];

    return html`
        <${tag}${buttonType}>
            <span id="text">
                <slot></slot>
            </span>
            <img
                src="assets/img/Pokemon Action ${image}.svg"
                alt=""
            />
        </${tag}>
    `;
};

/**
 * 
 * @param {BBDir} dir 
 * @returns 
 */
const CSS = (dir) => {
    const color = {
        left: "var(--bb-orange)",
        mid: "var(--bb-blue)",
        right: "var(--bb-green)"
    }[dir];

    const transform = {
        left: "0.65rem -0.25rem",
        mid: "0 -0.5rem",
        right: "-0.65rem -0.25rem"
    }[dir];

    const hostTransform = {
        left: "translateY(1.5rem) translateX(-0.75rem)",
        mid: "translateY(2.75rem)",
        right: "translateY(1.5rem) translateX(0.75rem)"
    }[dir];

    return css`
        :host {
            display: inline-block;
            transform: ${hostTransform};
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
            pointer-events: none;

            text-transform: uppercase;
            text-align: center;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            font-family: "Jaro";
            color: transparent;
            background: ${color};

            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            translate: ${transform};
        }

        img {
            height: 6.5em;
        }
    `;
};

export class BattleButton extends HTMLElement {
    /**
     * @param {BBData} params
     */
    constructor(params) {
        super();
        this.params = params;
        this.innerHTML = params?.text ?? this.innerHTML;
        let shadowRoot = this.attachShadow({ mode: "open" });
        /** @type {BBDir} */
        this.location = params?.dir ?? /** @type {BBDir} */(this.dataset.state) ?? "left";
        shadowRoot.innerHTML =
            CSS(this.location)
            + HTML(this.location, params?.type ?? /** @type {"a"|"button"} */(this.dataset.type) ?? "a");

        if (params?.type === "a") {
            const link = shadowRoot.querySelector("a");

            if (link) {
                link.href = params.href;
            } else {
                console.error("link not found")
            }

        } else {
            const button = shadowRoot.querySelector("button");

            if (button) {
                button.addEventListener("click", () => { params.callback() });
            } else {
                console.error("button not found")
            }
        }
    }
}
customElements.define("battle-button", BattleButton);

