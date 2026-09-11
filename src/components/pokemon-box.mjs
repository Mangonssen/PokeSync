import { getSpriteURL, pokedexMonFromKindName, pokedexMonFromKindNum } from "../pokeapi.mjs";
import { capitalize, css, html } from "../utils.mjs";

export class PokemonBox extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = [
        "formname",
        "nickname",
        "gender",
        "kind",
        "catch-id",
    ];
    constructor() {
        super();

        this.internals_ = this.attachInternals();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    async HTML() {
        const kind = this.kind?.trim() ?? "";
        let num = Number.parseInt(kind, 10);
        let kindName;

        if (!Number.isNaN(num) && String(num) === kind) {
            kindName = pokedexMonFromKindNum(num)?.name ?? "";
        } else {
            kindName = pokedexMonFromKindName(kind)?.name ?? "";
            num = pokedexMonFromKindName(kind)?.number ?? 0
        }

        return html`<div class="host">
            <img class="sprite" src="${(await getSpriteURL(num))??""}">
            <div class="text-content">
                <div class="row 1"><p class="nickname">${this.nickname}</p><img class="gender" /></div>
                <div class="row 2"><p class="kind">${capitalize(kindName)}</p><p class="catch-id">${this.catchID}</p></div>
            </div>
        </div>`;
    }
    get CSS() {
        return css`
            *{
                margin: 0;
                padding: 0;
            }
            .host {
                height: -webkit-fill-available;
                height: stretch;
                background-color: var(--pokebox-dark);
                display: flex;
                gap: 1ch;
                padding: 1.5ch 2ch;
            }

            .sprite {
                flex: 0 0 auto;
                width: auto;
                height: auto;
                max-height: 3em;
                aspect-ratio: 1;
                object-fit: contain;
                image-rendering: pixelated;
            }

            .text-content {
                display: flex;
                flex-direction: column;
                flex: 1 0 auto;
            }

            .row {
                display: flex;
                justify-content: space-between;
                &[class~="2"] {
                    /* TODO: variable */
                    color: gray;
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

        switch (name) {
            default: {
                this.render();
            } break;
        }

    }

    async render() {
        if (this.isValid()) {
            this.classList.remove("inactive")
        } else {
            this.classList.add("inactive")
        }
        const HTML = await this.HTML()
        this.shadow.innerHTML = this.CSS + HTML;
    }

    isValid(){
        return (!!this.kind && !!this.nickname)
    }

    /**
     * 
     * @returns {import("../datatypes.mjs").Pokemon}
     */
    copyAsPokemon() {
        return {
            kind: Number(this.kind ?? ""),
            nickname: this.nickname ?? undefined,
        };
    }
    get nickname() {
        return this.getAttribute("nickname");
    }
    set nickname(val) {
        if (val) {
            this.setAttribute("nickname", val);
        } else {
            this.removeAttribute("nickname");
        }
    }
    get gender() {
        return this.getAttribute("gender");
    }
    set gender(val) {
        if (val) {
            this.setAttribute("gender", val);
        } else {
            this.removeAttribute("gender");
        }
    }
    get kind() {
        return this.getAttribute("kind");
    }
    set kind(val) {
        if (val) {
            this.setAttribute("kind", val);
        } else {
            this.removeAttribute("kind");
        }
    }
    get catchID() {
        return this.getAttribute("catch-id");
    }
    set catchID(val) {
        if (val) {
            this.setAttribute("catch-id", val);
        } else {
            this.removeAttribute("catch-id");
        }
    }

    get formname() {
        return this.getAttribute("formname");
    }
    set formname(val) {
        if (val) {
            this.setAttribute("formname", val);
        } else {
            this.removeAttribute("formname");
        }
    }
}

customElements.define("pokemon-box", PokemonBox);