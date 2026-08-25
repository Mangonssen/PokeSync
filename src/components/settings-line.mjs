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
            specific = html`TEST2`;
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
    <p><slot></slot></p>
    <div>${specific}</div>
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

p {
    height: -webkit-fill-available;
    height: stretch;
    display: flex;
    align-items: center;
    /* TODO: variable */
    color: #42DEE7;
    /* TODO: variable */
    background-color: #4A5252;
    /* TODO: variable */
    width: 10ch;
    width: min(calc(fit-content), 140px);
    margin: 0;
    /* TODO: arrow clippath */
}

div:not(.host) {
    flex: 1 1 0;
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

        this.innerHTML = "TEST";

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = CSS + HTML(params?.kind ?? "string");
    }
}

customElements.define("settings-line", SettingsLine);
