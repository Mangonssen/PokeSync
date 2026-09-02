import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLFile extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = [
        "name",
        "placeholder",
        "required",
        "disabled",
        "title",
    ];

    constructor() {
        super();

        this.internals_ = this.attachInternals();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get HTML() {
        const input = document.createElement("input");
        input.type = "file";
        if (this.name) {
            input.name = this.name;
        }
        if (this.placeholder) {
            input.placeholder = this.placeholder;
        }
        if (this.required) {
            input.required = this.required;
        }
        if (this.disabled) {
            input.disabled = this.disabled;
        }
        return commonHTML(
            this.title,
            html`
                <label class="file">
                    <span class="file-name">
                        ${this.file?.name || this.placeholder}
                    </span>

                    <div class="file-button">
                        ${input.outerHTML}
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

        this.internals_.setFormValue(this.input?.files?.[0] ?? null);

        if (!this.input) {
            return;
        }

        switch (name) {
            case "name": {
                this.input.name = newValue ?? "";
            } break;
            case "placeholder": {
                if (this.fileNameEl) this.fileNameEl.textContent = newValue ?? "";
                this.input.placeholder = newValue ?? "";
            } break;
            case "required": {
                this.input.required = newValue !== null;
            } break;
            case "disabled": {
                this.input.disabled = newValue !== null;
            } break;
            case "title": {
                if (this.titleEl) {
                    this.titleEl.innerText = newValue ?? "";
                }
            } break;
            default:
                break;
        }

        this.#syncValidity()
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
            if (this.name) this.input.name = this.name;
            this.input.addEventListener("change", this.#onChange);
        }

        this.#syncValidity();
        this.#updateFileName();
    }

    #updateFileName() {
        if (!this.fileNameEl) {
            return;
        }

        this.fileNameEl.textContent =
            this.file?.name || this.placeholder;
    }

    #onChange = () => {

        if (!this.file) {
            this.internals_.setFormValue(null);
            this.#syncValidity();
            return;
        }

        // Make the selected file the value submitted by the form.
        this.internals_.setFormValue(this.file);
        this.value = this.file.name;

        this.#updateFileName();
        this.#syncValidity();

        this.dispatchEvent(
            new Event("change", {
                bubbles: true,
                composed: true,
            }),
        );
    };
    #syncValidity() {
        if (!this.input) {
            return;
        }

        const { validity, validationMessage } = this.input;

        if (validity.valid) {
            this.internals_.setValidity({});
        } else {
            this.internals_.setValidity(
                validity,
                validationMessage || 'Please enter a valid file.',
                this.input
            );
        }
    }

    get name() {
        return this.getAttribute("name");
    }
    set name(value) {
        if (value) {
            this.setAttribute("name", value);
        } else {
            this.removeAttribute("name");
        }
        this.#syncValidity();
    }
    get value() {
        return this.getAttribute("value");
    }
    set value(value) {
        if (value) {
            this.setAttribute("value", value);
        } else {
            this.removeAttribute("value");
        }
        this.#syncValidity();
    }
    get placeholder() {
        return this.getAttribute("placeholder");
    }
    set placeholder(value) {
        if (value) {
            this.setAttribute("placeholder", value);
        } else {
            this.removeAttribute("placeholder");
        }
        this.#syncValidity();
    }
    get required() {
        return this.hasAttribute("required");
    }
    set required(val) {
        this.toggleAttribute("required", !!val);
        this.#syncValidity();
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    set disabled(val) {
        this.toggleAttribute("disabled", !!val);
        this.#syncValidity();
    }
    get files() {
        return this.input?.files
    }
    get file() {
        return this.input?.files?.[0]
    }
    /** @override */
    focus() {
        this.input?.focus();
    }
}

customElements.define("settings-file", SLFile);
