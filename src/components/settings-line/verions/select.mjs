import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLSelect extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = [
        "name",
        "title",
        "placeholder",
        "required",
        "disabled",
    ];

    constructor() {
        super();

        this.internals_ = this.attachInternals();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get HTML() {
        const select = document.createElement("select");

        if (this.placeholder) {
            select.add(new Option(`-- ${this.placeholder} --`, ""));
        }

        for (const option of this.querySelectorAll("option")) {
            const clone = /** @type {HTMLOptionElement} */(option.cloneNode(true));

            if (clone.value === this.value) {
                clone.setAttribute("selected", "");
            }

            select.appendChild(clone);
        }

        if (this.name) {
            select.name = this.name;
        }

        if (this.required) {
            select.required = true;
        }

        if (this.disabled) {
            select.disabled = true;
        }

        return commonHTML(this.title, select.outerHTML);
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
                text-align: center;
                /* TODO: variable */
                color: #42DEE7;
                font: inherit;
                cursor: pointer;
                text-transform: uppercase;
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
     * @param {string} oldValue 
     * @param {string} newValue 
     * @returns 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        this.internals_.setFormValue(this.value ?? "");

        if (!this.select) {
            return;
        }

        switch (name) {
            case "name": {
                this.select.name = newValue ?? "";
            } break;
            case "value": {
                this.select.value = newValue ?? "";
            } break;
            case "placeholder": {
                let placeholderOption = this.select?.querySelector("option[value='']");
                if (placeholderOption) {
                    placeholderOption.innerHTML = `-- ${newValue} --`;
                } else if (this.select) {
                    this.render()
                }
            } break;
            case "required": {
                this.select.required = newValue !== null;
            } break;
            case "disabled": {
                this.select.disabled = newValue !== null;
            } break;
            case "title": {
                if (this.titleEl) {
                    this.titleEl.innerText = newValue ?? "";
                }
            } break;
        }

        this.#syncValidity();
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;
        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
        this.select = /** @type {HTMLSelectElement} */(this.shadow.querySelector("select"));
        this.select.addEventListener("change", this.#onChange)
        this.#syncValidity();
    }

    #onChange = () => {

        if (!this.select) {
            this.internals_.setFormValue(null);
            this.#syncValidity();
            return;
        }

        this.internals_.setFormValue(this.select.value);
        this.value = this.select.value;

        this.#syncValidity();

        this.dispatchEvent(
            new Event("change", {
                bubbles: true,
                composed: true,
            }),
        );
    };
    #syncValidity() {
        if (!this.select) {
            return;
        }

        const { validity, validationMessage } = this.select;

        if (validity.valid) {
            this.internals_.setValidity({});
        } else {
            this.internals_.setValidity(
                validity,
                validationMessage || 'Please enter a valid file.',
                this.select
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
}

customElements.define("settings-select", SLSelect);
