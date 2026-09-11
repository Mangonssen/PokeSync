"use strict";

import { LOCAL_STORAGE_KEYS, INDEXED_DBS } from "./datatypes.mjs";
/** @import { PokedexEntry, Pokemon } from "./datatypes.mjs" */


/* -------------------------------------------------------------------------- */
// #region PokeAPI                                                            */
/* -------------------------------------------------------------------------- */

async function getPokeAPI() {
    // https://pokeapi.co/
    // https://graphql.pokeapi.co/v1beta2/console/
    const query = `query samplePokeAPIquery {
        pokemon {
            id
            name
            pokemontypes {
                type {
                    name
                }
            }
        }
    }`;

    const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.pokeAPI);

    if (cached) {
        return JSON.parse(cached);
    }

    const res = await fetch("https://graphql.pokeapi.co/v1beta2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    if (!res.ok) {
        throw new Error(`PokeAPI request failed: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
        throw new Error(
            `PokeAPI GraphQL error: ${JSON.stringify(json.errors)}`
        );
    }

    const ps = json.data?.pokemon;

    if (!Array.isArray(ps)) {
        throw new Error("Invalid PokeAPI response");
    }

    const pokemon = ps.map(
        (/** @type {{ name: string; id: number; pokemontypes?: { type?: { name?: string } }[] }} */ p) => ({
            name: p.name,
            number: p.id,
            type: [
                p.pokemontypes?.[0]?.type?.name,
                p.pokemontypes?.[1]?.type?.name
            ].filter(Boolean)
        })
    );

    localStorage.setItem(
        LOCAL_STORAGE_KEYS.pokeAPI,
        JSON.stringify(pokemon)
    );

    return pokemon;
}


/**
 * @returns {Promise<PokedexEntry[]>}
 */
export async function getPokedexEntries() {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.pokedex);

    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const pokedex = await getPokeAPI();

        localStorage.setItem(
            LOCAL_STORAGE_KEYS.pokedex,
            JSON.stringify(pokedex)
        );

        return pokedex;
    } catch (error) {
        console.error("Failed to load PokeAPI:", error);

        try {
            const response = await fetch("./pokedex.json");

            if (!response.ok) {
                throw new Error(
                    `Failed to load pokedex.json: ${response.status}`
                );
            }

            const entries = await response.json();

            const pokedexEntries = entries.map(
                (/** @type {{ number: string | number }} */ element) => ({
                    ...element,
                    number: Number(element.number)
                })
            );

            localStorage.setItem(
                LOCAL_STORAGE_KEYS.pokedex,
                JSON.stringify(pokedexEntries)
            );

            return pokedexEntries;
        } catch (fallbackError) {
            console.error("Failed to load local pokedex:", fallbackError);
            return [];
        }
    }
}


export const pokedex = await getPokedexEntries();


/* -------------------------------------------------------------------------- */
// #region Pokedex helpers                                                    */
/* -------------------------------------------------------------------------- */

/**
 * @param {string} name
 * @returns {PokedexEntry | undefined}
 */
export function pokedexMonFromKindName(name) {
    return pokedex.find(
        pokemon =>
            pokemon.name.toLowerCase() === name.toLowerCase()
    );
}


/**
 * @param {number} number
 * @returns {PokedexEntry | undefined}
 */
export function pokedexMonFromKindNum(number) {
    return pokedex.find(
        pokemon => pokemon.number === number
    );
}


/**
 * @param {Pokemon} pokemon
 * @returns {PokedexEntry | undefined}
 */
export function getPokemonKind(pokemon) {
    return pokedex[pokemon.kind];
}


/* -------------------------------------------------------------------------- */
// #region IndexedDB sprite cache                                             */
/* -------------------------------------------------------------------------- */

/**
 * Opens the IndexedDB database.
 *
 * @returns {Promise<IDBDatabase>}
 */
function openSpriteDB() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB is not supported"));
            return;
        }

        const request = indexedDB.open(
            INDEXED_DBS.spriteData.DBName,
            INDEXED_DBS.spriteData.version
        );

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(INDEXED_DBS.spriteData.storeName)) {
                db.createObjectStore(INDEXED_DBS.spriteData.storeName);
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(
                request.error ||
                new Error("Could not open sprite database")
            );
        };
    });
}


/**
 * Get a sprite from IndexedDB.
 *
 * @param {string|number} kind
 * @returns {Promise<string|null>}
 */
async function getCachedSprite(kind) {
    try {
        const db = await openSpriteDB();

        return await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                INDEXED_DBS.spriteData.storeName,
                "readonly"
            );

            const store = transaction.objectStore(
                INDEXED_DBS.spriteData.storeName
            );

            const request = store.get(String(kind));

            request.onsuccess = () => {
                resolve(request.result ?? null);
            };

            request.onerror = () => {
                reject(
                    request.error ||
                    new Error("Could not read sprite cache")
                );
            };

            transaction.oncomplete = () => {
                db.close();
            };
        });
    } catch (error) {
        console.warn("Could not read sprite cache:", error);
        return null;
    }
}


/**
 * Store a sprite Data URL in IndexedDB.
 *
 * @param {string|number} kind
 * @param {string} dataURL
 * @returns {Promise<void>}
 */
async function cacheSprite(kind, dataURL) {
    try {
        const db = await openSpriteDB();

        await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                INDEXED_DBS.spriteData.storeName,
                "readwrite"
            );

            const store = transaction.objectStore(
                INDEXED_DBS.spriteData.storeName
            );

            store.put(dataURL, String(kind));

            transaction.oncomplete = () => {
                resolve(undefined);
            };

            transaction.onerror = () => {
                reject(
                    transaction.error ||
                    new Error("Could not write sprite cache")
                );
            };

            transaction.onabort = () => {
                reject(
                    transaction.error ||
                    new Error("Sprite cache transaction aborted")
                );
            };
        });

        db.close();
    } catch (error) {
        // Caching should never prevent the game from displaying a sprite.
        console.warn("Could not cache sprite:", error);
    }
}


/**
 * Delete a cached sprite.
 *
 * @param {string|number} kind
 * @returns {Promise<void>}
 */
export async function deleteCachedSprite(kind) {
    try {
        const db = await openSpriteDB();

        await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                INDEXED_DBS.spriteData.storeName,
                "readwrite"
            );

            const store = transaction.objectStore(
                INDEXED_DBS.spriteData.storeName
            );

            store.delete(String(kind));

            transaction.oncomplete = () => {
                resolve(undefined);
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });

        db.close();
    } catch (error) {
        console.warn("Could not delete cached sprite:", error);
    }
}


/**
 * Clear the entire sprite cache.
 *
 * @returns {Promise<void>}
 */
export async function clearSpriteCache() {
    try {
        const db = await openSpriteDB();

        await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                INDEXED_DBS.spriteData.storeName,
                "readwrite"
            );

            const store = transaction.objectStore(
                INDEXED_DBS.spriteData.storeName
            );

            store.clear();

            transaction.oncomplete = () => {
                resolve(undefined);
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });

        db.close();
    } catch (error) {
        console.warn("Could not clear sprite cache:", error);
    }
}


/* -------------------------------------------------------------------------- */
// #region Sprite loading                                                     */
/* -------------------------------------------------------------------------- */


/**
 * Fetch an image and convert it into a Data URL.
 *
 * @param {string} url
 * @returns {Promise<string|null>}
 */
async function fetchImageAsDataURL(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            return null;
        }

        const blob = await response.blob();

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(
                    typeof reader.result === "string"
                        ? reader.result
                        : null
                );
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn("Failed to fetch image:", url, error);
        return null;
    }
}


/**
 * Get the best available Pokémon sprite.
 *
 * The returned value is a Data URL when the image was successfully
 * downloaded/cached. This means it can directly be used as:
 *
 *     img.src = await getSpriteURL(25);
 *
 * @param {number|string} kind
 * @returns {Promise<string|null>}
 */
export async function getSpriteURL(kind) {
    const key = String(kind);

    /* ---------------------------------------------------------------------- */
    /* 1. Check IndexedDB                                                     */
    /* ---------------------------------------------------------------------- */

    const cachedSprite = await getCachedSprite(key);

    if (cachedSprite) {
        console.log("📦 Sprite from IndexedDB Cache:", kind);
        return cachedSprite;
    }


    /* ---------------------------------------------------------------------- */
    /* 2. Remote sprite URLs                                                  */
    /* ---------------------------------------------------------------------- */

    const gen5SpriteURL =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${kind}.gif`;

    const defaultSpriteURL =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${kind}.png`;

    const artworkURL =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${kind}.png`;


    /* ---------------------------------------------------------------------- */
    /* 3. Download the first working image                                    */
    /* ---------------------------------------------------------------------- */

    const urls = [
        gen5SpriteURL,
        defaultSpriteURL,
        artworkURL
    ];

    for (const url of urls) {
        const dataURL = await fetchImageAsDataURL(url);

        if (dataURL) {
            console.log("💾 Sprite saved:", kind, url);

            await cacheSprite(key, dataURL);

            return dataURL;
        }
    }


    /* ---------------------------------------------------------------------- */
    /* 4. Nothing found                                                       */
    /* ---------------------------------------------------------------------- */

    console.warn("❌ No sprite found for Pokémon:", kind);

    return null;
}
