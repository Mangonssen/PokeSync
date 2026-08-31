import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLFile extends HTMLElement {
    static observedAttributes = [
        "name",
        "title",
        "placeholder",
        "value",
    ];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        this.name = this.getAttribute("name") ?? "";
        this.value = this.getAttribute("value") ?? "";
        this.placeholder =
            this.getAttribute("placeholder") ?? "UPLOAD FILE";

        this.file = null;
    }

    get HTML() {
        return commonHTML(
            this.title,
            html`
                <label class="file">
                    <span class="file-name">
                        ${this.value || this.placeholder}
                    </span>

                    <div class="file-button">
                        <input
                            type="file"
                            name="${this.name}"
                        />
                    </div>
                </label>
            `,
        );
    }

    get CSS() {
        return commonCSS + css`
            .file {
                display: flex;
                align-items: center;
                width: -webkit-fill-available;
                width: stretch;
                gap: 1ch;
                padding-inline: 2ch;
                cursor: pointer;

                .file-name {
                    flex: 1 1 auto;
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                    color: #42DEE7;
                    filter:
                        drop-shadow(0px 0.05em 0px #318494)
                        drop-shadow(0.05em 0px 0px #318494);
                    text-transform: uppercase;
                }

                .file-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 auto;

                    filter:
                        drop-shadow(0px 0.05em 0px #318494)
                        drop-shadow(0.05em 0px 0px #318494);

                    &::before {
                        content: "";
                        display: inline-block;
                        width: 0.75em;
                        height: 0.75em;

                        background-color: #42DEE7;

                        mask: url("./assets/Upload.svg") center / contain no-repeat;
                        -webkit-mask: url("./assets/Upload.svg") center / contain no-repeat;
                    }
                }

                .file-button input[type="file"] {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                    pointer-events: none;
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

        switch (name) {
            case "title":
                this.title = newValue ?? "";

                if (this.titleEl) {
                    this.titleEl.innerText = newValue ?? "";
                }
                break;

            case "name":
                this.name = newValue ?? "";

                if (this.input) {
                    this.input.name = this.name;
                }
                break;

            case "placeholder":
                this.placeholder = newValue ?? "UPLOAD FILE";

                this.#updateFileName();
                break;

            case "value":
                this.value = newValue ?? "";

                // IMPORTANT:
                // Never assign this.value to input.value for type="file".
                // Browsers only allow file inputs to be cleared programmatically.
                this.#updateFileName();
                break;
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        this.input = /** @type {HTMLInputElement} */ (
            this.shadow.querySelector('input[type="file"]')
        );

        this.titleEl = /** @type {HTMLSpanElement} */ (
            this.shadow.querySelector(".title")
        );

        this.fileNameEl = /** @type {HTMLSpanElement} */ (
            this.shadow.querySelector(".file-name")
        );

        if (this.input) {
            this.input.name = this.name;
            this.input.addEventListener("change", this.#onChange);
        }

        this.#updateFileName();
    }

    #updateFileName() {
        if (!this.fileNameEl) {
            return;
        }

        this.fileNameEl.textContent =
            this.value || this.placeholder;
    }

    #onChange = () => {
        const file = this.input?.files?.[0] ?? null;

        this.file = file;

        if (!file) {
            // User cancelled the file picker.
            return;
        }

        this.value = file.name;

        // Keep the component's reflected value in sync.
        this.setAttribute("value", file.name);

        // Update the visible filename immediately.
        this.#updateFileName();

        this.dispatchEvent(
            new Event("change", {
                bubbles: true,
                composed: true,
            }),
        );
    };
}

customElements.define("settings-file", SLFile);
