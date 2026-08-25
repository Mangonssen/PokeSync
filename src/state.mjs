"use strict";

import { Signal } from "./signal.mjs";
import { LOCAL_STORAGE_KEYS } from "./datatypes.mjs";
import { downloadObjectAsJson } from "./utils.mjs";
/** @import {GameState, Unsignaled, Signaled} from "./datatypes.mjs" */

/** @satisfies {GameState} */
export const defaultState = {
    player1: { name: "Player1", kind: "male" },
    player2: { name: "Player2", kind: "female" },
    syncsIsAlive: [],
    jokersAllowed: true,
    rerollUsed: false,
    sacrificeUsed: false,
    reviveUsed: false,
    runAlive: true,
}

export const state = initState();
// @ts-ignore
window.state = state;

/**
 * 
 * @param {Partial<GameState>} [init] 
 * @returns {Signaled<GameState>}
 */
function initState(init) {
    return Signal.SubSignal(/** @type {GameState} */(
        {
            ...structuredClone(defaultState),
            ...init
        }
    ))
}

export function stateToJson(data = state) {
    return JSON.stringify(Signal.SubSignalValues(data));
}

/**
 * TODO: validate
 * @param {string} jsonString
 * @returns {Signaled<GameState>}
 */
export function jsonToState(jsonString) {
    // @ts-ignore
    return Signal.SubSignal(JSON.parse(jsonString));
}

export function stateToBase64(data = state) {
    return btoa(stateToJson(data));
}

/**
 * @param {string} base64String
 */
export function base64ToState(base64String) {
    return jsonToState(atob(base64String));
}