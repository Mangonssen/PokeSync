import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLRadio extends HTMLElement {
    static observedAttributes = [
        "name",
        "title",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        this.name = this.getAttribute("name") ?? crypto.randomUUID();
    }

    get HTML() {
        const options = [...this.children].filter(el => el instanceof HTMLOptionElement);

        return commonHTML(this.title, html`
                ${options.map(el =>
            html`<label>
                    <input type="radio" name="${this.name}" value="${el.value}" />
                    <span>${el.innerText}</span>
                </label>`
        ).join("\n")}
        `);
    }

    get CSS() {
        return commonCSS + css`
            .content{
                display: flex;
                align-items: center;
                justify-content: space-around;
                justify-content: space-evenly;

                input {
                    appearance: none;
                    width: 0.5ch;
                    height: 0.5em;
                    /* TODO: variable */
                    background-color: #73debd;
                    /* TODO: variable */
                    border: 0.05em solid #212129;
                    cursor: pointer;
                }

                label {
                    text-transform: uppercase;
                    cursor: pointer;

                    &:has(:checked) {
                        /* TODO: variable */
                        color: #42DEE7;
                        filter:
                            /* TODO: variable */
                            drop-shadow(0px 0.05em 0px #318494)
                            /* TODO: variable */
                            drop-shadow(0.05em 0px 0px #318494);
                    }

                    &:not(:has(:checked)) {
                        /* TODO: variable */
                        color: #7b9c9c;
                        filter:
                        /* TODO: variable */
                            drop-shadow(0px 0.05em 0px #426b7b)
                        /* TODO: variable */
                            drop-shadow(0.05em 0px 0px #426b7b);
                    }
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

        if (name === "name") {
            this.name = newValue;
            if (this.select) {
                this.select.name = newValue ?? "";
            }
        }

        if (name === "title") {
            this.title = newValue;
            if (this.titleEl) {
                this.titleEl.innerText = newValue;
            }
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;
        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
        this.select = /** @type {HTMLSelectElement} */(this.shadow.querySelector("select"));
    }
}

customElements.define("settings-radio", SLRadio);
