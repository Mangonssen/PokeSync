import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLSelect extends HTMLElement {
    static observedAttributes = [
        "title",
        "placeholder",
        "value",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        this.value = this.getAttribute("value") ?? "";
        this.placeholder = this.getAttribute("placeholder") ?? "";
    }

    get HTML() {
        return commonHTML(this.title, html`
            <select>
                ${ this.innerHTML }
            </select>
        `);
    }

    get CSS() {
        return commonCSS + css`
            select {
                appearance: auto;
                appearance: base-select;
                width: -webkit-fill-available;
                width: stretch;
                background: transparent;
                border: none;
                outline: none;
                /* TODO: variable */
                color: #42DEE7;
                font: inherit;
                cursor: pointer;
                text-transform: uppercase;
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
            this.title = newValue ?? "";
        }

        if (name === "placeholder") {
            this.placeholder = newValue ?? "";
        }

        if (name === "value") {
            this.value = newValue ?? "";
        }

    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;
    }
}

customElements.define("settings-select", SLSelect);
