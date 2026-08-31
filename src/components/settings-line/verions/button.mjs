import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLButton extends HTMLElement {
    static observedAttributes = [
        "title",
        "onclick",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
    }

    get HTML() {
        return commonHTML(this.title, html`
            <button type="button">
                <span><slot></slot></span>
                <span class="arrow">›</span>
            </button>
        `);
    }

    get CSS() {
        return commonCSS + css`
            button {
                width: -webkit-fill-available;
                width: stretch;
                border: none;
                background-color: transparent;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-inline: 2ch;
                text-transform: uppercase;
                /* TODO: variable */
                color: #42DEE7;
                font: inherit;
                cursor: pointer;

                filter:
                    /* TODO: variable */
                    drop-shadow(0px 0.05em 0px #318494)
                    /* TODO: variable */
                    drop-shadow(0.05em 0px 0px #318494);

                .arrow {
                    font-size: 1.5em;
                    line-height: 0.5;
                }
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    /**
     * 
     * @param {string} name 
     * @param {string} oldValue 
     * @param {string} newValue 
     * @returns 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === "title") {
            this.title = newValue;
            if (this.titleEl) {
                this.titleEl.innerText = newValue;
            }
        }

        if (name === "onclick") {
            this.updateOnClick();
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
        this.updateOnClick();
    }

    updateOnClick() {
        const button = this.button;

        if (!button) {
            return;
        }

        const handler = this.onclick;

        this.onclick = null;

        button.onclick = handler;
    }
    get button() {
        return this.shadow.querySelector("button");
    }

}

customElements.define("settings-button", SLButton);
