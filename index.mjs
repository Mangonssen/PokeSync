"use strict"

import { HomePage } from "./src/pages/home-page.mjs";
import { InitPage } from "./src/pages/init-page.mjs";
import { LandingPage } from "./src/pages/landing-page.mjs";
import { LoadingPage } from "./src/pages/loading-page.mjs";
import { parseURL } from "./src/parse.mjs"

// const _URL = window.location;
// const _COOKIES = document.cookie;
// const _LOCAL_STORAGE = window.localStorage;
// const _SESSION_STORAGE = window.sessionStorage;

const { page } = parseURL();
console.log(page)

switch (page) {
    case "landing": {
        document.body.replaceChildren(new LandingPage())
    } break;
    case "init": {
        document.body.replaceChildren(new InitPage())
    } break;
    case "load": {
        document.body.replaceChildren(new LoadingPage())
    } break;
    case "home": {
        document.body.replaceChildren(new HomePage())
    } break;
    default: {
        /** @type {never} */
        let _ = page;
    } break;
}
