import { assertNever, css, html } from "../utils.mjs";

/**
 * @typedef {{}&
 * {kind:"string", content?:string}
 * |{kind:"binary", text1:string, text2:string, text1Active?:boolean}
 * |{kind:"triple", text1:string, text2:string, text3:string, active?:number}
 * |{kind:"select", options:string[], active?:number}
 * |{kind:"file", path?:string}
 * |{kind:"submenu", href:string, text:string}
 * |{kind:"submenu", callback: ()=>void, text:string}
 * } SettingsLineState
 */

/**
 * @typedef {SettingsLineState & {title:string}} SettingsLineParams
 */

/**
 * @param {SettingsLineState} state
 * @returns {string}
 */
const HTML = (state) => {
    const kind = state.kind;
    let specific;

    switch (kind) {
        case "string": {
            specific = html`
                <span class="underline string">
                    <input
                        type="text"
                        value="${state.content ?? ""}"
                    />
                </span>
            `;
        } break;

        case "binary": {
            const text1Active = state.text1Active ?? true;

            specific = html`
                <div class="binary">
                    <label>
                        <input
                            type="radio"
                            name="binary"
                            ${text1Active ? "checked" : ""}
                        />
                        <span>${state.text1}</span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="binary"
                            ${text1Active ? "" : "checked"}
                        />
                        <span>${state.text2}</span>
                    </label>
                </div>
            `;
        } break;

        case "triple": {
            const active = state.active ?? 0;

            specific = html`
                <div class="triple">
                    <label>
                        <input
                            type="radio"
                            name="triple"
                            ${(active === 0) ? "checked" : ""}
                        />
                        <span>${state.text1}</span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="triple"
                            ${(active === 1) ? "checked" : ""}
                        />
                        <span>${state.text2}</span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="triple"
                            ${(active === 2) ? "checked" : ""}
                        />
                        <span>${state.text3}</span>
                    </label>
                </div>
            `;
        } break;

        case "select": {
            const active = state.active ?? 0;

            specific = html`
                <select>
                    ${state.options.map((option, index) => html`
                        <option
                            value="${index}"
                            ${(active === index) ? "selected" : ""}
                        >
                            ${option}
                        </option>
                    `)}
                </select>
            `;
        } break;

        case "file": {
            specific = html`
                <label class="file">
                    <span class="file-name">
                        ${state.path ?? "UPLOAD FILE"}
                    </span>

                    <div class="file-button">
                        <input type="file" />
                    </div>
                </label>
            `;
        } break;

        case "submenu": {
            if ("href" in state) {
                specific = html`
                    <a class="submenu" href="${state.href}">
                        <span>${state.text}</span>
                        <span class="arrow">›</span>
                    </a>
                `;
            } else {
                specific = html`
                    <button
                        type="button"
                        class="submenu"
                    >
                        <span>${state.text}</span>
                        <span class="arrow">›</span>
                    </button>
                `;
            }
        } break;

        default: {
            assertNever(kind);
        } break;
    }

    return html`
        <div class="host">
            <p class="title">
                <slot></slot>
                <span></span>
            </p>

            <div class="content">
                ${specific}
            </div>
        </div>
    `;
};


const CSS = css`
.host {
    display: flex;
    align-items: center;
    gap: 1ch;
    /* TODO: variable */
    border-radius: 0.375rem;
    /* TODO: variable */
    background-color: #293131;
    /* TODO: variables border color, width */
    border: 2px solid #63B5B5;
    padding: 0.33rem;
}

.title {
    isolation: isolate;
    height: -webkit-fill-available;
    height: stretch;
    display: flex;
    align-items: center;
    /* TODO: variable */
    color: #42DEE7;
    min-width: 13ch;
    width: fit-content;
    margin: 0;
    padding: 0.25em;
    position: relative;
    text-transform: uppercase;

    > span {
        z-index: -1;
        position: absolute;
        inset: 0;
        display: flex;
        border-radius: 0.25em;
        overflow: hidden;
        align-items: stretch;
        align-content: stretch;

        &::before {
            display: block;
            flex: 1 1 0;
            content: '';
            /* TODO: variable */
            background-color: #4A5252;
        }

        &::after {
            content: '';
            flex: 0 0 auto;
            aspect-ratio: 12 / 30;
            background: url("assets/arrow head.svg");
            background-size: cover;
            margin-left: -2px;
        }
    }
}

.content {
    flex: 1 1 0;
    position: relative;

    .underline::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.075em;
        background-color: #42DEE7;
    }

    .string {
        input {
            width: -webkit-fill-available;
            width: stretch;
            background: transparent;
            border: none;
            outline: none;
            color: inherit;
            font: inherit;
        }
    }

    .binary,
    .triple {
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
                /* TODO: variable */
                drop-shadow(0px 0.05em 0px #318494)
                /* TODO: variable */
                drop-shadow(0.05em 0px 0px #318494);
            text-transform: uppercase;
        }

        .file-button {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;

            filter:
                /* TODO: variable */
                drop-shadow(0px 0.05em 0px #318494)
                /* TODO: variable */
                drop-shadow(0.05em 0px 0px #318494);

            &::before {
                content: "";
                display: inline-block;
                width: 0.75em;
                height: 0.75em;

                /* TODO: variable */
                background-color: #42DEE7;

                mask: url("./assets/Upload.svg") center / contain no-repeat;
                -webkit-mask: url("./assets/Upload.svg") center / contain no-repeat;
            }
        }

        .file-button input[type="file"] {
            display: none;
        }
    }

    .submenu {
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
}
`;


export class SettingsLine extends HTMLElement {
    /**
     * @param {SettingsLineParams} [params]
     */
    constructor(params) {
        super();

        /** @type {SettingsLineParams} */
        this.state = params ?? {
            title: "Setting",
            kind: "select",
            options: ["test", "test2", "test3", "test4"],
        };

        this.innerHTML = this.state.title || this.title || "Setting";

        /** @type {ShadowRoot} */
        this.shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    render() {
        this.shadow.innerHTML =
            CSS + HTML(this.state);

        this.setupEvents();
    }

    setupEvents() {
        /** @type {HTMLDivElement|null} */
        const content = this.shadow.querySelector(".content");
        const state = this.state;
        const kind = state.kind;

        if (!content) return;

        switch (kind) {
            case "string": {
                const input = content.querySelector("input");

                input?.addEventListener("input", () => {
                    state.content = input.value;

                    this.emitChange(input.value);
                });
            } break;

            case "binary": {
                /** @type {NodeListOf<HTMLInputElement>} */
                const inputs = content.querySelectorAll(
                    'input[type="radio"]'
                );

                inputs.forEach((input) => {
                    input.addEventListener("change", () => {
                        const active = Number(input.value);

                        state.text1Active = active === 0;

                        this.emitChange(active);
                    });
                });
            } break;

            case "triple": {
                /** @type {NodeListOf<HTMLInputElement>} */
                const inputs = content.querySelectorAll(
                    'input[type="radio"]'
                );

                inputs.forEach((input) => {
                    input.addEventListener("change", () => {
                        const active = Number(input.value);

                        state.active = active;

                        this.emitChange(active);
                    });
                });
            } break;

            case "select": {
                const select = content.querySelector("select");

                select?.addEventListener("change", () => {
                    const active = Number(select.value);

                    state.active = active;

                    this.emitChange({
                        index: active,
                        value: state.options[active],
                    });
                });
            } break;

            case "file": {
                /** @type {HTMLInputElement|null} */
                const input = content.querySelector(
                    'input[type="file"]'
                );
                /** @type {HTMLElement|null} */
                const fileName = content.querySelector(".file-name");

                input?.addEventListener("change", () => {
                    const file = input.files?.[0];

                    if (!file) return;
                    if (!fileName) return;

                    fileName.textContent = file.name;

                    state.path = file.name;

                    this.emitChange(file);
                });
            } break;

            case "submenu": {
                if ("callback" in state) {
                    const button = content.querySelector("button");

                    button?.addEventListener("click", () => {
                        state.callback();
                        this.emitChange();
                    });
                }
            } break;

            default: {
                assertNever(kind);
            }
        }
    }

    /**
     * Dispatch a public change event.
     *
     * @param {*} value
     */
    emitChange(value = this.value) {
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value,
                    state: this.state,
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Current value of the control.
     */
    get value() {
        const state = this.state;
        const kind = state.kind;
        switch (kind) {
            case "string":
                return state.content ?? "";

            case "binary":
                return state.text1Active ?? true
                    ? 0
                    : 1;

            case "triple":
                return state.active ?? 0;

            case "select": {
                const index = state.active ?? 0;

                return {
                    index,
                    value: state.options[index],
                };
            }

            case "file":
                return state.path ?? null;

            case "submenu":
                return undefined;

            default:
                return assertNever(kind);
        }
    }

    /**
     * Replace the component state and re-render.
     *
     * @param {SettingsLineParams} state
     */
    setState(state) {
        this.state = state;
        this.render();
    }

    /**
     * Current component state.
     */
    getState() {
        return this.state;
    }
}

customElements.define("settings-line", SettingsLine);
