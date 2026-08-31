import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLSelect extends HTMLElement {
    static observedAttributes = [
        "name",
        "title",
        "placeholder",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        this.name = this.getAttribute("name") ?? crypto.randomUUID();
        this.placeholder = this.getAttribute("placeholder");
    }

    get HTML() {
        return commonHTML(this.title, html`
            <select name="${this.name}">
                ${this.placeholder ? `<option value="">-- ${this.placeholder} --</option>` : ""}
                ${this.innerHTML}
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

        if (name === "name") {
            this.name = newValue ?? "";
            if (this.select) {
                this.select.name = newValue ?? "";
            }
        }

        if (name === "title") {
            this.title = newValue ?? "";
            if (this.titleEl) {
                this.titleEl.innerText = newValue;
            }
        }

        if (name === "placeholder") {
            this.placeholder = newValue ?? "";
            let placeholderOption = this.select?.querySelector("option[value='']");
            if (placeholderOption) {
                placeholderOption.innerHTML = `-- ${newValue} --`;
            } else if (this.select) {
                this.render()
            }
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;
        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
        this.select = /** @type {HTMLSelectElement} */(this.shadow.querySelector("select"));
    }
}

customElements.define("settings-select", SLSelect);
