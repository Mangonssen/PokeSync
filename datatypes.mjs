"use strict";

import { useSignal } from "./signal.mjs";

export const LOCAL_STORAGE_KEYS = Object.freeze({
    pokeAPI: "pokeAPI",
    pokedex: "pokedex",
    sprites: "poke-sprites",
    state: "game-state",
});

/**
 * @typedef {Object} PokedexEntry
 * @property {string} name
 * @property {[string, (string|undefined)]} type - Tuple: primary type and optional secondary type
 * @property {number} number
 */

async function getPokeAPI() {
    // https://pokeapi.co/
    // https://graphql.pokeapi.co/v1beta2/console/
    const query = `query samplePokeAPIquery {
    pokemon {
        id
        name
        pokemontypes{
            type{
                name
            }
        }
    }
}`;

    let cached = localStorage.getItem(LOCAL_STORAGE_KEYS.pokeAPI);

    if (cached) { return JSON.parse(cached) }

    const res = await fetch("https://graphql.pokeapi.co/v1beta2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const json = await res.json();
    console.log(json);
    let ps = json.data.pokemon;

    let pokemon = ps.map((p) =>
    ({
        name: p.name,
        number: p.id,
        type: [
            p.pokemontypes[0]?.type.name,
            p.pokemontypes[1]?.type.name
        ],
    }))
    localStorage.setItem(LOCAL_STORAGE_KEYS.pokeAPI, JSON.stringify(pokemon));
    return pokemon
}

/**
 * @returns {PokedexEntry[]}
 */
export async function getPokedexEntries() {
    let cached = localStorage.getItem(LOCAL_STORAGE_KEYS.pokedex);
    if (cached) { return JSON.parse(cached) }
    try {
        let pokedex = await getPokeAPI();

        localStorage.setItem(LOCAL_STORAGE_KEYS.pokedex, JSON.stringify(pokedex));
        return pokedex
    }
    catch (error) {
        console.error(error);

        try {
            let _pokedexEntrys = await fetch("./pokedex.json").then((resp) => resp.json());

            _pokedexEntrys.map(element => {
                return { ...element, number: Number(element.number) };
            });
            localStorage.setItem(LOCAL_STORAGE_KEYS.pokedex, JSON.stringify(_pokedexEntrys));
            return _pokedexEntrys;
        } catch (error) {
            console.error(error)
            return [];
        }
    }
}

/**
 * @typedef {Object} Pokemon
 * @property {number} kind
 * @property {string} [nickname]
 */
/**
 * 
 * @param {Pokemon} pokemon 
 * @returns {Promise<undefined|PokedexEntry>}
 */
export async function getPokemonKind(pokemon) {
    let pokedex = await getPokedexEntries();
    return pokedex[pokemon.kind]
}

export async function getSpriteURL(kind) {
    const gen5SpriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${kind}.gif`
    const defaultSpriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${kind}.png`
    const artworkURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${kind}.png`
    //TODO: set fallbackURL
    const fallbackURL = null;

    // Cache laden
    const cache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.sprites) || "{}");

    if (cache[kind]) {
        console.log("📦 Sprite aus Cache:", kind);
        return cache[kind];
    }

    // Helper: prüft ob Bild existiert
    async function imageExists(url) {
        try {
            const res = await fetch(url, { method: "HEAD" });
            return res.ok;
        } catch {
            return false;
        }
    }

    let finalURL = null;

    if (await imageExists(gen5SpriteURL)) {
        finalURL = gen5SpriteURL;
    } else if (await imageExists(defaultSpriteURL)) {
        finalURL = defaultSpriteURL;
    } else if (await imageExists(artworkURL)) {
        finalURL = artworkURL;
    } else {
        finalURL = fallbackURL; // fallback wenn gar nichts existiert
    }

    // In Cache speichern
    cache[kind] = finalURL;
    localStorage.setItem(LOCAL_STORAGE_KEYS.sprites, JSON.stringify(cache));

    return finalURL;
}


/**
 * @typedef {"male"|"female"} Gender
 */

/**
 * @typedef {Object} Player
 * @property {Gender} kind
 * @property {string} name
 */

/**
 * @typedef {[Pokemon, Pokemon, boolean]} SyncTuple
 */

/**
 * @typedef {Object} State
 * @property {Player} player1
 * @property {Player} player2
 * @property {SyncTuple[]} syncsIsAlive
 * @property {boolean} rerollUsed
 * @property {boolean} sacrificeUsed
 * @property {boolean} reviveUsed
 * @property {boolean} runAlive
 */

/**
 * 
 * @param {Partial<State>} [init] 
 * @returns {Signal<State>}
 */
function initState(init) {
    return useSignal(/** @type {State} */(
        {
            player1: { name: "Player1", kind: "male" },
            player2: { name: "Player2", kind: "female" },
            syncsIsAlive: [],
            rerollUsed: false,
            sacrificeUsed: false,
            reviveUsed: false,
            runAlive: true,
            ...init
        }
    ))
}

/**
 * 
 * @returns {Signal<State>}
 */
export function loadState() {
    let loaded = localStorage.getItem(LOCAL_STORAGE_KEYS.state);
    if (loaded){
        console.log("state from Local")
        return useSignal(JSON.parse(loaded));
    }
    return initState();
}

export function importState(json){
    state[1](json)
}

export function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.state, JSON.stringify(state[0]()));
}

export function clearState() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.state);
}

/**
 * 
 * @param {boolean} [andSave=false] - false by default
 */
export function exportState(andSave = false) {
    if (andSave) { saveState() }
    downloadObjectAsJson(state[0](), `GameState_${new Date().toLocaleDateString()}`)
}

/// UTIL
function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + JSON.stringify(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export let state = loadState();
window.getState = state[0];
window.setState = state[1];