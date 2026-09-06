import { css, html } from "../../../utils.mjs";
import { commonHTML, commonCSS } from "../common.mjs";

export class SLRadio extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = [
        "name",
        "value",
        "required",
        "disabled",
        "title",
    ];

    constructor() {
        super();

        this.tabIndex = -1;

        this.internals_ = this.attachInternals();
        this.shadow = this.attachShadow({ mode: "open" });

        this.name = this.getAttribute("name") ?? SLRadio.newName();
    }

    get HTML() {
        const name = this.name;
        const required = this.required;
        const disabled = this.disabled;
        const options = [...this.children].filter(el => el instanceof HTMLOptionElement);
        const inputs = /** @type {[HTMLInputElement,string][]} */(options.map((opt) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = name;
            input.value = opt.value;
            input.required = required;
            input.disabled = disabled;
            if (opt.value === this.value) {
                input.setAttribute("checked", "");
            }
            return [input, opt.textContent];
        }))

        return commonHTML(this.title, html`
                ${inputs.map(([input, label]) =>
            html`<label>
                    ${input.outerHTML}
                    <span>${label}</span>
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
                    width: 0.75ch;
                    height: 0.65em;
                    border-radius: 0;
                    /* TODO: variable */
                    background-color: #73debd;
                    /* TODO: variable */
                    border: 0.05em solid #212129;
                    cursor: pointer;
                    margin: 0;
                }

                label {
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    gap: 1ch;
                    align-items: center;
                    justify-content: center;

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
        this.value = new URLSearchParams(window.location.search).get(this.name);
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

        if (this.inputs.length === 0) {
            return
        }

        switch (name) {
            case "name": {
                const val = newValue || SLRadio.newName();
                this.name = val;
                this.inputs.forEach((el) => el.name = val);
            } break;
            case "value": {
                this.inputs.forEach((el) => el.checked = false);
                [...this.inputs].filter((el) => el.value == newValue).forEach((el) => el.checked = true);
            } break;
            case "required": {
                this.inputs.forEach((el) => el.required = newValue !== null);
            } break;
            case "disabled": {
                this.inputs.forEach((el) => el.disabled = newValue !== null);
            } break;
            case "title": {
                if (this.titleEl) {
                    this.titleEl.innerText = newValue ?? "";
                }
            } break;
            default:
                break;
        }

        this.#syncValidity();
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;
        this.titleEl = /** @type {HTMLSpanElement} */(this.shadow.querySelector(".title"));
        this.inputs.forEach((el) => el.addEventListener("change", this.#onChange))
        this.#syncValidity();
    }

    /**
     * 
     * @param {Event} event 
     */
    #onChange = (event) => {
        const input = /** @type {HTMLInputElement} */ (event.target);
        this.internals_.setFormValue(input.value);
        this.value = input.value;
        this.#syncValidity();
        this.dispatchEvent(new Event("change", {
            bubbles: true,
        }));
    };

    #syncValidity() {
        if (!this.inputs || !this.inputs[0]) {
            return;
        }

        const { validity, validationMessage } = this.inputs[0];

        if (validity.valid) {
            this.internals_.setValidity({});
        } else {
            this.internals_.setValidity(
                validity,
                validationMessage || 'Please enter a valid value.',
                this.inputs[0]
            );
        }
    }
    /** @override */
    focus() {
        this.inputs[0]?.focus();
    }

    static newName() {
        return encodeURIComponent(crypto.randomUUID());
    }

    get inputs() {
        return this.shadow.querySelectorAll("input")
    }
    get name() {
        return this.getAttribute("name") || (() => { const val = SLRadio.newName(); this.name = val; return val })();
    }
    set name(val) {
        this.setAttribute("name", val || SLRadio.newName());
        this.#syncValidity();
    }
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        if (val) {
            this.setAttribute("value", val);
        } else {
            this.removeAttribute("value");
        }
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

customElements.define("settings-radio", SLRadio);
