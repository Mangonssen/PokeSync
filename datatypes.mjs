/** @type {null | Array<PokedexEntry>} */
let pokedexEntrys = null;

/**
 * @typedef {Object} PokedexEntry
 * @property {string} name
 * @property {[string, (string|undefined)]} type - Tuple: primary type and optional secondary type
 * @property {number} number
 * @property {string} iconLink
 */

export async function getPokedexEntries() {
    if (pokedexEntrys) {
        return pokedexEntrys;
    }
    try {
        let _pokedexEntrys = await fetch("./pokedex.json").then((resp) => resp.json);
        if (!pokedexEntrys) {
            pokedexEntrys = []
        }
        _pokedexEntrys.forEach(element => {
            pokedexEntrys[Number(element.number)] = { ...element, number: Number(element.number) };
        });
        return pokedexEntrys;
    } catch (error) {
        return pokedexEntrys ?? [];
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
 * @returns {State}
 */
function initState(init) {
    return {
        player1: "Player1",
        player2: "Player2",
        syncsIsAlive: [],
        rerollUsed: false,
        sacrificeUsed:false,
        reviveUsed:false,
        runAlive:true,
        ...init
    }
}

export const state = initState()
