import { css, html } from "../../utils.mjs";

/**
 * 
 * @param {string} title 
 * @param {string} specific 
 * @returns 
 */
export const commonHTML = (title, specific) => html`
    <div class="host">
        <div class="label">
            <span class="title">${title}</span>
            <span class="arrow"></span>
        </div>

        <div class="content">
            ${specific}
        </div>
    </div>
`;

export const commonCSS = css`
.host {
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1ch;
    /* TODO: variable */
    border-radius: 0.375rem;
    /* TODO: variable */
    background-color: #293131;
    /* TODO: variables border color, width */
    border: 2px solid #63B5B5;
    padding: 0.33em;
}

.label {
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
    padding: 0 0.25em;
    position: relative;
    text-transform: uppercase;

    .arrow {
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
    overflow:hidden;
}
`;