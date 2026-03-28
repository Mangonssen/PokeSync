"use strict"
import { getPokedexEntries, getSpriteURL, exportState } from "./datatypes.mjs"

async function main() {
    /** @type {HTMLUListElement} */
    const Player1List = document.getElementById("player1pokemon");
    /** @type {HTMLFormElement} */
    const Player1Add = document.getElementById("player1add");

    Player1Add.addEventListener("submit",(e)=>{e.preventDefault();console.log("clicked")})

    /** @type {HTMLUListElement} */
    const Player2List = document.getElementById("player2pokemon");
    /** @type {HTMLFormElement} */
    const Player2Add = document.getElementById("player2add");

    /** @type {HTMLButtonElement} */
    const exportButton = document.querySelector('button[aria-label="export"]');
    exportButton.addEventListener("click",exportState)

    const pokedex = await getPokedexEntries();

    let dl = pokedex
        .map((entry) => {
            let op = document.createElement("option");
            op.innerText = entry.name
            op.value = entry.number
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

}

window.addEventListener("DOMContentLoaded", main);