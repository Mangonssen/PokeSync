"use strict";

/**
 * Keys used for storing data in `localStorage`.
 */
export const LOCAL_STORAGE_KEYS = Object.freeze({
    pokeAPI: "pokeAPI",
    pokedex: "pokedex",
    sprites: "poke-sprites",
    state: "game-state",
});

/**
 * A single entry in the Pokedex.
 *
 * @typedef {Object} PokedexEntry
 * @property {string} name - The Pokémon's name.
 * @property {[string, (string|undefined)]} type - Tuple of primary and optional secondary type.
 * @property {number} number - National Pokédex number.
 */

/**
 * Represents a Pokémon in the game state.
 *
 * @typedef {Object} Pokemon
 * @property {number} kind - Internal numeric ID for the Pokémon species.
 * @property {string} [nickname] - Optional nickname given by the player.
 */

/**
 * Gender of a Pokémon or player.
 *
 * @typedef {"male"|"female"} Gender
 */

/**
 * Information about a player in the game.
 *
 * @typedef {Object} Player
 * @property {Gender} kind - The player's gender.
 * @property {string} name - The player's chosen name.
 */

/**
 * Tuple used for synchronisation logic.
 *   - First `Pokemon`: the attacking Pokémon.
 *   - Second `Pokemon`: the defending Pokémon.
 *   - Boolean: whether the sync is currently Alive.
 *
 * @typedef {[Pokemon, Pokemon, boolean]} SyncTuple
 * 
 */

/**
 * The complete game state stored in memory and persisted to localStorage.
 *
 * @typedef {Object} State
 * @property {Player} player1 - First player.
 * @property {Player} player2 - Second player.
 * @property {SyncTuple[]} syncsIsAlive - Array of active sync tuples.
 * @property {boolean} rerollUsed - Flag indicating if a reroll has been used.
 * @property {boolean} sacrificeUsed - Flag indicating if a sacrifice has been used.
 * @property {boolean} reviveUsed - Flag indicating if a revive has been used.
 * @property {boolean} runAlive - Flag indicating whether the game is currently running.
 */
