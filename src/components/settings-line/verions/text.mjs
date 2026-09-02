import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLText extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = [
        "name",
        "value",
        "placeholder",
        "required",
        "disabled",
        "readonly",
        "pattern",
        "title",
    ];


    constructor() {
        super();
        this.tabIndex = -1;

        this.internals_ = this.attachInternals();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get HTML() {
        const input = document.createElement("input");
        if (this.name) {
            input.name = this.name;
        }
        if (this.value) {
            input.defaultValue = this.value;
        }
        if (this.placeholder) {
            input.placeholder = this.placeholder;
        }
        if (this.required) {
            input.required = this.required;
        }
        if (this.pattern) {
            input.pattern = this.pattern;
        }
        if (this.readOnly) {
            input.readOnly = this.readOnly;
        }
        if (this.disabled) {
            input.disabled = this.disabled;
        }
        return commonHTML(this.title, input.outerHTML);
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
        if (this.name) {
            this.value = new URLSearchParams(window.location.search).get(this.name);
        }
        this.render();
    }

    /**
     * 
     * @param {string} name 
     * @param {string|null} oldValue 
     * @param {string|null} newValue 
     * @returns 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.internals_.setFormValue(this.value ?? "");

        if (!this.input) {
            return;
        }

        switch (name) {
            case "name":
                this.input.name = newValue ?? "";
                break;

            case "value":
                this.input.value = newValue ?? "";
                break;

            case "placeholder":
                this.input.placeholder = newValue ?? "";
                break;

            case "pattern":
                if (newValue === null) {
                    this.input.removeAttribute("pattern");
                } else {
                    this.input.pattern = newValue;
                }
                break;

            case "required":
                this.input.required = newValue !== null;
                break;

            case "readonly":
                this.input.readOnly = newValue !== null;
                break;

            case "disabled":
                this.input.disabled = newValue !== null;
                break;

            case "title":
                if (this.titleEl) {
                    this.titleEl.innerText = newValue ?? "";
                }
                break;
        }

        this.#syncValidity();
    }


    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        this.input = /** @type {HTMLInputElement} */(this.shadow.querySelector("input"));
        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));

        this.input.addEventListener("input", this.#onInput);
        this.input.addEventListener("change", this.#onChange);
        this.#syncValidity();
    }

    /**
     * @param {InputEvent} event
     */
    #onInput = (event) => {
        const input = /** @type {HTMLInputElement} */ (event.target);

        this.value = input.value;

        // Keep the public HTML attribute synchronized.
        this.setAttribute("value", this.value??"");
        this.internals_.setFormValue(input.value);

        this.#syncValidity();
        this.dispatchEvent(new Event("input", {
            bubbles: true,
        }));
    };

    /**
     * 
     * @param {Event} event 
     */
    #onChange = (event) => {
        const input = /** @type {HTMLInputElement} */ (event.target);
        this.internals_.setFormValue(input.value);
        this.#syncValidity();
        this.dispatchEvent(new Event("change", {
            bubbles: true,
        }));
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
                validationMessage || 'Please enter a valid value.',
                this.input
            );
        }
    }
    /** @override */
    focus() {
        this.input?.focus();
    }

    get name() {
        return this.getAttribute("name");
    }
    set name(val) {
        if (!val) {
            this.removeAttribute("name");
        } else {
            this.setAttribute("name", val);
        }

        this.#syncValidity();
    }
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        if (!val) {
            this.removeAttribute("value");
        } else {
            this.setAttribute("value", val);
        }

        this.internals_.setFormValue(val ?? "");
        this.#syncValidity();
    }
    get placeholder() {
        return this.getAttribute("placeholder");
    }
    set placeholder(val) {
        if (!val) {
            this.removeAttribute("placeholder");
        } else {
            this.setAttribute("placeholder", val);
        }

        this.#syncValidity();
    }
    get pattern() {
        return this.getAttribute("pattern");
    }
    set pattern(val) {
        if (!val) {
            this.removeAttribute("pattern");
        } else {
            this.setAttribute("pattern", val);
        }

        this.#syncValidity();
    }
    get readOnly() {
        return this.hasAttribute("readonly");
    }
    set readOnly(val) {
        this.toggleAttribute("readonly", !!val);
        this.#syncValidity();
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    set disabled(val) {
        this.toggleAttribute("disabled", !!val);
        this.#syncValidity();
    }
    get required() {
        return this.hasAttribute("required");
    }
    set required(val) {
        this.toggleAttribute("required", !!val);
        this.#syncValidity();
    }
}

customElements.define("settings-text", SLText);
