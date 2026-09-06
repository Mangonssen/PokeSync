import { css, escapeHTML, html } from "../utils.mjs";

/** @typedef {"left"|"mid"|"right"} BBDir */
/**
 * @typedef {{
 *   text: string,
 *   dir: BBDir
 * }} BBDataBase
 */

/**
 * @typedef {(
 *   {kind: "button", callback?: Function|string} |
 *   {kind: "a", href?: string, target?: string}
 * )} BBType
 */

/**
 * @typedef {BBDataBase & BBType} BBData
 */

export class BattleButton extends HTMLElement {
    static observedAttributes = ["location", "kind", "href", "onclick", "target", "disabled"];

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    /**
     * 
     * @param {BBData} params 
     */
    static create(params) {
        const button = new BattleButton();

        button.location = params.dir;
        button.type = {
            ...params,
        };

        button.textContent = params.text;

        return button;
    }


    connectedCallback() {
        this.render();
    }

    /**
     * @param {string} name
     * @param {string|null} oldValue
     * @param {string|null} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "location":
            case "kind":
            case "href":
            case "target":
            case "onclick":
            case "disabled":
                this.render();
                break;
        }
    }

    render() {
        this.shadow.innerHTML = this.CSS + this.HTML;

        const element = this.shadow.querySelector("a, button");

        if (!element) {
            return;
        }

        if (this.disabled) {
            // Native disabled state for <button>
            if (element instanceof HTMLButtonElement) {
                element.disabled = true;
            }

            // <a> has no native disabled state, so block activation manually.
            element.addEventListener("click", this.#preventDisabledClick, true);
        }
    }

    /**
     * 
     * @param {Event} event 
     * @returns 
     */
    #preventDisabledClick = (event) => {
        if (!this.disabled) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
    };

    /** @type {BBDir} */
    get location() {
        const value = this.getAttribute("location");

        if (value === "left" || value === "mid" || value === "right") {
            return value;
        }

        this.setAttribute("location", "left")
        return "left";
    }

    set location(val) {
        if (val !== "left" && val !== "mid" && val !== "right") {
            throw new TypeError(
                `Invalid BattleButton location: ${String(val)}`
            );
        }

        this.setAttribute("location", val);
    }

    /** @type {BBType} */
    get type() {
        let kind = this.getAttribute("kind");
        const href = this.getAttribute("href");
        const target = this.getAttribute("target");
        const onclick = this.onclick;

        if (kind !== "a" && kind !== "button") {
            kind = "button";
        }

        if (kind === "a") {
            return {
                kind: "a",
                ...(href ? { href } : {}),
                ...(target ? { target } : {}),
            };
        }

        return {
            kind: "button",
            ...(onclick ? { callback: onclick } : {}),
        };
    }
    set type(value) {
        this.setAttribute("kind", value.kind);

        if (value.kind === "a") {
            if (value.href !== undefined) {
                this.setAttribute("href", value.href);
            } else {
                this.removeAttribute("href");
            }

            if (value.target !== undefined) {
                this.setAttribute("target", value.target);
            } else {
                this.removeAttribute("target");
            }

            this.onclick = null;
        } else {
            this.removeAttribute("href");
            this.removeAttribute("target");

            if (typeof value.callback === "function") {
                this.onclick = /** @type {*} */(value.callback);
            } else if (typeof value.callback === "string") {
                this.setAttribute("onclick", value.callback);
            } else {
                this.removeAttribute("onclick");
                this.onclick = null;
            }
        }
    }

    get disabled() {
        return this.hasAttribute("disabled")
    }
    set disabled(val) {
        this.toggleAttribute("disabled", !!val);
    }

    get HTML() {
        const dir = this.location;
        const type = this.type;
        const kind = type.kind;

        const tag = kind === "a" ? "a" : "button";
        const buttonType = kind === "button" ? ` type="button"` : "";

        const href =
            kind === "a"
                ? ` href="${escapeHTML(type.href ?? "")}"`
                : "";

        const target =
            kind === "a" && type.target
                ? ` target="${escapeHTML(type.target)}"`
                : "";

        const image = {
            left: "Left",
            mid: "Center",
            right: "Right"
        }[dir];

        return html`
            <${tag}${buttonType}${href}${target}>
                <span id="text">
                    <slot></slot>
                </span>
                <img
                    src="assets/img/Pokemon Action ${image}.svg"
                    alt=""
                />
            </${tag}>
        `;
    }


    get CSS() {
        const dir = this.location;

        const color = {
            left: "var(--bb-orange)",
            mid: "var(--bb-blue)",
            right: "var(--bb-green)"
        }[dir];

        const transform = {
            left: "0.65rem -0.25rem",
            mid: "0 -0.5rem",
            right: "-0.65rem -0.25rem"
        }[dir];

        const hostTransform = {
            left: "translateY(1.5rem) translateX(-0.75rem)",
            mid: "translateY(2.75rem)",
            right: "translateY(1.5rem) translateX(0.75rem)"
        }[dir];

        return css`
            :host {
                display: contents;
            }

            a,
            button {
                transform: ${hostTransform};
                appearance: none;
                border: 0;
                padding: 0;
                margin: 0;

                background: transparent;
                color: inherit;

                font: inherit;
                cursor: pointer;

                display: inline-flex;
                align-items: center;
                justify-content: center;
            }

            :host([disabled]) a,
            :host([disabled]) button {
                cursor: not-allowed;
                filter: grayscale(0.25);
                opacity: 0.5;
            }

            #text {
                position: absolute;
                inset: 0;
                pointer-events: none;

                text-transform: uppercase;
                text-align: center;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                font-family: "Jaro";
                color: transparent;
                background: ${color};

                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;

                translate: ${transform};
            }

            img {
                height: 6.5em;
            }
        `;
    }
}

customElements.define("battle-button", BattleButton);
