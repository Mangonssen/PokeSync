import { assertNever, css, html } from "../utils.mjs";

/**
 * @typedef {{}&
 * {kind:"string"}
 * |{kind:"binary"}
 * |{kind:"triple"}
 * |{kind:"select"}
 * |{kind:"file"}
 * |{kind:"submenu"}
 * } SettingsLineState
 */

/**
 * @param {SettingsLineState["kind"]} kind
 * @returns {string}
 */
const HTML = (kind) => {
    let specific;

    switch (kind) {
        case "string": {
            specific = html`<span class="underline">TEST2</span>`;
        } break;
        case "binary": {
            specific = html``;
        } break;
        case "triple": {
            specific = html``;
        } break;
        case "select": {
            specific = html``;
        } break;
        case "file": {
            specific = html``;
        } break;
        case "submenu": {
            specific = html``;
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
    <div class="content">${specific}</div>
</div>`;
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
        shadowRoot.innerHTML = CSS + HTML(params?.kind ?? "string");
    }
}

customElements.define("settings-line", SettingsLine);
