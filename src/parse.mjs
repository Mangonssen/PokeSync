"use strict";

import { STACKS, PAGES } from "./datatypes.mjs";
import { base64ToState, defaultState } from "./state.mjs";

/** @import {GameState, Signaled} from "./datatypes.mjs" */


/**
 * @template {object} T
 * @param {T} obj
 * @param {T[keyof T]} value
 * @returns {keyof T | undefined}
 */
const keyForValue = (obj, value) => {
    const key = Object.keys(obj).find(
        key => obj[/** @type {keyof T} */ (key)] === value
    );

    return /** @type {keyof T | undefined} */ (key);
};

/**
 * 
 * @param {typeof window.location} [location] 
 * @returns {{
 *  page: keyof typeof PAGES,
 *  stack: (keyof typeof STACKS)[],
 *  state: Signaled<GameState>|undefined
 * }}
 */
export function parseURL(location = window.location) {

    const query = location.search
        .slice(1)
        .split("&")
        .filter(Boolean)
        .map(pair => {
            const [key, value] = /** @type {[String,string?]} */(pair.split("=", 2));
            return [decodeURIComponent(key), decodeURIComponent(value ?? "")];
        })
        .reduce(
            (map, pair) => {
                map.set(pair[0], pair[1]);
                return map;
            },
            new Map()
        );

    const requestedPage = query.get("page");
    const requestedStack = query.get("stack").split(",");
    const requestedState = query.get("state");

    const page = keyForValue(PAGES, requestedPage ?? "");
    if (!page) {
        throw new Error(`400 Page unknown`);
    }

    /** @type {(keyof typeof STACKS)[]} */
    let stack = []
    for (const requestedElement of requestedStack) {
        const stackElement = keyForValue(STACKS, requestedElement);
        if (!stackElement) {
            throw new Error("400 Stack unknown");
        }
        stack.push(stackElement);
    }

    const state = requestedState ? base64ToState(requestedState) : undefined;

    return {
        page,
        stack,
        state,
    }
}
