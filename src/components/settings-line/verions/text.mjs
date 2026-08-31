import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLText extends HTMLElement {
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
            <input
                type="text"
                placeholder="${this.placeholder}"
                value="${this.value}"
            >
        `);
    }

    get CSS() {
        return commonCSS + css`
            .content::after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 0.075em;
                background-color: #42DEE7;
            }
            input {
                width: -webkit-fill-available;
                width: stretch;
                background: transparent;
                border: none;
                outline: none;
                color: inherit;
                font: inherit;
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

            // If already rendered, keep the actual input in sync.
            if (this.input && this.input.value !== this.value) {
                this.input.value = this.value;
            }
        }

        // Title/placeholder changes require no full re-render.
        if (this.input) {
            if (name === "placeholder") {
                this.input.placeholder = this.placeholder;
            }
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        this.input = this.shadow.querySelector("input");

        this.input?.addEventListener("input", this.#onInput);
        this.input?.addEventListener("change", this.#onChange);
    }

    /**
     * @param {InputEvent} event
     */
    #onInput = (event) => {
        const input = /** @type {HTMLInputElement} */ (event.target);

        this.value = input.value;

        // Keep the public HTML attribute synchronized.
        this.setAttribute("value", this.value);

        this.dispatchEvent(new Event("input", {
            bubbles: true,
        }));
    };

    #onChange = () => {
        this.dispatchEvent(new Event("change", {
            bubbles: true,
        }));
    };
}

customElements.define("settings-text", SLText);
