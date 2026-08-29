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
            specific = html`
                <div class="binary">
                    <label>
                        <input
                            type="radio"
                            name="binary"
                            ${(state.text1Active ?? true) ? "checked" : ""}
                        />
                        <span>${state.text1}</span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="binary"
                            ${(state.text1Active ?? true) ? "" : "checked"}
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
                <div class="file">
                    <span class="file-name">
                        ${state.path ?? "No file selected"}
                    </span>

                    <label class="file-button">
                        Browse…
                        <input type="file" />
                    </label>
                </div>
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

        &::before{
            display: block;
            flex: 1 1 0;
            content:'';
            /* TODO: variable */
            background-color: #4A5252;
        }
        &::after{
            /* content: url("assets/arrow head.svg"); */
            content: '';
            flex: 0 0 auto;
            aspect-ratio: 12 / 30;
            background: url("assets/arrow head.svg");
            background-size: cover;
            margin-left: -2px;

            /* TODO: variable */
            fill: #4A5252;
        }
    }
}

.content {
    flex: 1 1 0;
    position: relative;
    .underline::after{
        content:'';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.075em;
        /* TODO: variable */
        background-color: #42DEE7;
    }
    .string{
        input{
            width: -webkit-fill-available;
            width: stretch;
            background: transparent;
            border: none;
            font: inherit;
        }
    }
    .binary,.triple{
        display: flex;
        align-items: center;
        justify-content: space-around;
        justify-content: space-evenly;

        input{
            appearance: none;
            width: 0.5ch;
            height: 0.5em;
            /* TODO: variable */
            background-color: #73debd;
            /* TODO: variable */
            border: 0.05em solid #212129;
        }
        label{
            text-transform: uppercase;
            &:has(:checked){
                /* TODO: variable */
                color: #42DEE7;
                filter:
                    /* TODO: variable */
                    drop-shadow(0px 0.05em 0px #318494)
                    /* TODO: variable */
                    drop-shadow(0.05em 0px 0px #318494)
                    ;
            }
            &:not(:has(:checked)){
                /* TODO: variable */
                color: #7b9c9c;
                filter:
                    /* TODO: variable */
                    drop-shadow(0px 0.05em 0px #426b7b)
                    /* TODO: variable */
                    drop-shadow(0.05em 0px 0px #426b7b)
                    ;
            }
        }
    }
    .file {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1em;
        .file-name {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }

        .file-button {
            flex: 0 0 auto;
            cursor: pointer;
        }

        .file-button input[type="file"] {
            display: none;
        }
    }


`;


/**
 * @typedef {SettingsLineState} SettingsLineParams
 */

export class SettingsLine extends HTMLElement {
    /**
     * @param {SettingsLineParams} [params]
     */
    constructor(params) {
        super();

        this.innerHTML = "Settings";

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = CSS + HTML(params ?? { kind: "file" });
    }
}

customElements.define("settings-line", SettingsLine);
