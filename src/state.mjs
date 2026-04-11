"use strict";

import { useSignal } from "./signal.mjs";
import { LOCAL_STORAGE_KEYS } from "./datatypes.mjs";
import { downloadObjectAsJson } from "./utils.mjs";
/** @import {Signal} from "./signal.mjs" */
/** @import {State} from "./datatypes.mjs" */

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
    if (loaded) {
        console.log("state from Local")
        return useSignal(JSON.parse(loaded));
    }
    return initState();
}

/**
 * 
 * @param {*} json 
 */
export function importState(json) {
    setState(json)
}

export function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.state, JSON.stringify(getState()));
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
    downloadObjectAsJson(getState(), `GameState_${new Date().toLocaleDateString()}`)
}

export const [getState, setState] = loadState();
// @ts-ignore
window.getState = getState;
// @ts-ignore
window.setState = setState;