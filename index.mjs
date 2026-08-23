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

switch (page) {
    case "landing":
        document.body.replaceChildren(new LandingPage())
    case "init":
        document.body.replaceChildren(new InitPage())
    case "load":
        document.body.replaceChildren(new LoadingPage())
    case "home":
        document.body.replaceChildren(new HomePage())
    default:
        break;
}
