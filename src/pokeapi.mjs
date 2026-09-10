"use strict";

import { LOCAL_STORAGE_KEYS } from "./datatypes.mjs";
/** @import { PokedexEntry, Pokemon } from "./datatypes.mjs" */


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

    let pokemon = ps.map((/** @type {{ name: any; id: any; pokemontypes: { type: { name: any; }; }[]; }} */ p) =>
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
 * @returns {Promise<PokedexEntry[]>}
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

            _pokedexEntrys.map((/** @type {{ number: any; }} */ element) => {
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

export const pokedex = await getPokedexEntries();

/**
 * 
 * @param {string} name 
 */
export function pokedexMonFromKindName(name) {
    return pokedex.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())
}
/**
 * 
 * @param {number} number 
 */
export function pokedexMonFromKindNum(number) {
    return pokedex.find(pokemon => pokemon.number === number)
}

/**
 * 
 * @param {Pokemon} pokemon 
 * @returns {undefined|PokedexEntry}
 */
export function getPokemonKind(pokemon) {
    return pokedex[pokemon.kind]
}

/**
 * 
 * @param {*} kind 
 * @returns 
 */
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

    /**
     * Helper: prüft ob Bild existiert
     * @param {string} url 
     * @returns 
     */
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