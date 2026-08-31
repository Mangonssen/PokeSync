import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLAnchor extends HTMLElement {
    static observedAttributes = [
        "title",
        "href",
        "target",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        this.href = this.getAttribute("href") ?? "";
        this.target = this.getAttribute("target") ?? "";
    }

    get HTML() {
        return commonHTML(this.title, html`
            <a href="${this.href}" target="${this.target}">
                <span><slot></slot></span>
                <span class="arrow">›</span>
            </a>
        `);
    }

    get CSS() {
        return commonCSS + css`
            a {
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

        if (name === "target") {
        }

        if (name === "href") {
        }


    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
    }


}

customElements.define("settings-a", SLAnchor);
