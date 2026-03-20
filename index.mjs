"use strict"
import {getPokedexEntries} from "./datatypes.mjs"

async function main() {
    let pokedex = await getPokedexEntries();

}

window.addEventListener("DOMContentLoaded", main);