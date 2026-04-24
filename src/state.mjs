"use strict";

import { Signal } from "./signal.mjs";
import { LOCAL_STORAGE_KEYS } from "./datatypes.mjs";
import { downloadObjectAsJson } from "./utils.mjs";
/** @import {State, UnsignalState} from "./datatypes.mjs" */

/**
 * 
 * @param {Partial<UnsignalState>} [init] 
 * @returns {State}
 */
function initState(init) {
    return Signal.SubSignal(/** @type {UnsignalState} */(
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
 * @returns {State}
 */
export function loadState() {
    let loaded = localStorage.getItem(LOCAL_STORAGE_KEYS.state);
    if (loaded) {
        console.log("state from Local")
        return /** @type {State} */(Signal.SubSignal(JSON.parse(loaded)));
    }
    return initState();
}

/**
 * 
 * @param {*} json 
 */
export function importState(json) {
    Signal.SubSignal(json)
}

export function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.state, JSON.stringify(Signal.SubSignalValues(state)));
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
    downloadObjectAsJson(Signal.SubSignalValues(state), `GameState_${new Date().toLocaleDateString()}`)
}

export const state = loadState();

// @ts-ignore
window.state = state;
