"use strict"

import { getPokedexEntries, getSpriteURL } from "./src/pokeapi.mjs";
import { Effect } from "./src/signal.mjs";
import { clearState, exportState, state, importState, saveState } from "./src/state.mjs";
/** @import {} from "./src/datatypes.mjs" */

/** @type {HTMLUListElement} */
const Player1List = /***/(document.getElementById("player1pokemon"));
/** @type {HTMLHeadingElement} */
const Player1Name = /***/(document.getElementById("player1name"));
Player1Name.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        console.log("nameChange")
        state.player1.value.name = Player1Name.innerText;
    }
})

/** @type {HTMLUListElement} */
const Player2List = /***/(document.getElementById("player2pokemon"));
/** @type {HTMLHeadingElement} */
const Player2Name = /***/(document.getElementById("player2name"));
Player2Name.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        console.log("nameChange")
        // TODO: check if this triggers effects
        state.player2.value.name = Player2Name.innerText;
    }
})


/** @type {HTMLButtonElement} */
const RerollButton = /***/(document.getElementById("joker-reroll"));
RerollButton.addEventListener("click", () => {
    state.rerollUsed.value = true;
});
/** @type {HTMLButtonElement} */
const SacrificeButton = /***/(document.getElementById("joker-sacrifice"));
SacrificeButton.addEventListener("click", () => {
    state.sacrificeUsed.value = true;
});
/** @type {HTMLButtonElement} */
const ReviveButton = /***/(document.getElementById("joker-revive"));
const ReviveGIF = /***/(ReviveButton.querySelector("img"));
ReviveButton.addEventListener("click", () => {

    if (ReviveGIF) {
        ReviveGIF.src = "assets/img/icons/jokers/gif/joker-revive.gif";
    }
    setTimeout(() => {
        state.reviveUsed.value = true;
        if (ReviveGIF) { ReviveGIF.src = "assets/img/icons/jokers/joker-revive-x10.png"; }
    }, 650);
});
// Render State
new Effect(() => {
    Player1Name.innerText = state.player1.value.name;
    Player2Name.innerText = state.player2.value.name;
    RerollButton.disabled = state.rerollUsed.value;
    SacrificeButton.disabled = state.sacrificeUsed.value;
    ReviveButton.disabled = state.reviveUsed.value;
});

/** @type {HTMLButtonElement} */
const saveButton = /***/(document.querySelector('button[aria-label="save"]'));
saveButton.addEventListener("click", saveState);

/** @type {HTMLButtonElement} */
const exportButton = /***/(document.querySelector('button[aria-label="export"]'));
exportButton.addEventListener("click", () => exportState());

/** @type {HTMLButtonElement} */
const openButton = /***/(document.querySelector('button[aria-label="open"]'));
openButton.addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        let files = Array.from(input.files ?? []);
        // console.log(files);
        files.shift()?.text().then(JSON.parse).then(importState)
    };
    input.click();
})

/** @type {HTMLButtonElement} */
const resetButton = /***/(document.querySelector('button[aria-label="reset"]'));
resetButton.addEventListener("click", () => {
    if (confirm("Do you really want to reset GameState")) {
        clearState();
        window.location.reload();
    }
});

const pokedex = await getPokedexEntries();

let dl = pokedex
    .map((entry) => {
        let op = document.createElement("option");
        op.innerText = entry.name
        op.value = String(entry.number)
        //TODO: encode more vals into option
        return op;
    })
    .reduce(
        (dl, entry) => {
            dl.appendChild(entry)
            return dl
        },
        // der startwert/Akkumulator
        (() => {
            let dl = document.createElement("datalist");
            dl.id = "pokedex-list"
            document.body.appendChild(dl);
            return dl
        })()
    )
let image = document.createElement("img");
image.src = await getSpriteURL(132);
// image.src = await getSpriteURL(501);
document.body.querySelector("footer")?.appendChild(image)

