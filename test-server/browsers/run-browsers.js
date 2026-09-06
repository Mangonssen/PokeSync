const { firefox, chromium, webkit } = require("playwright");

const url = process.env.PAGE_URL || "http://pokesync/";

// Phone dimensions (CSS pixels)
const PHONE_WIDTH = Number(process.env.WEB_WIDTH || 390);
const PHONE_HEIGHT = Number(process.env.WEB_HEIGHT || 844);
const IS_MOBILE = (process.env.IS_MOBILE || "true").toLowerCase() === "true";

(async () => {
    console.log("Launching Firefox...");

    const firefoxBrowser = await firefox.launch({
        headless: false
    });

    console.log("Launching Chrome...");

    const chromeBrowser = await chromium.launch({
        channel: "chrome",
        headless: false
    });

    console.log("Launching WebKit...");

    const webkitBrowser = await webkit.launch({
        headless: false
    });

    const firefoxContext = await firefoxBrowser.newContext({
        viewport: {
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT
        },
        deviceScaleFactor: 1,
        isMobile: IS_MOBILE
    });

    const chromeContext = await chromeBrowser.newContext({
        viewport: {
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT
        },
        deviceScaleFactor: 1,
        isMobile: IS_MOBILE
    });

    const webkitContext = await webkitBrowser.newContext({
        viewport: {
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT
        },
        deviceScaleFactor: 1,
        isMobile: IS_MOBILE
    });

    const firefoxPage = await firefoxContext.newPage();
    const chromePage = await chromeContext.newPage();
    const webkitPage = await webkitContext.newPage();

    console.log(`Opening ${url} at ${PHONE_WIDTH}x${PHONE_HEIGHT}...`);

    await Promise.all([
        firefoxPage.goto(url, { waitUntil: "networkidle" }),
        chromePage.goto(url, { waitUntil: "networkidle" }),
        webkitPage.goto(url, { waitUntil: "networkidle" })
    ]);

    console.log("");
    console.log("======================================");
    console.log(" All three browsers are running");
    console.log(` Phone viewport: ${PHONE_WIDTH}x${PHONE_HEIGHT}`);
    console.log(` URL: ${url}`);
    console.log("======================================");
    console.log("");
    console.log("VNC:    localhost:5900");
    console.log("noVNC:  http://localhost:6080/vnc.html");

    // Keep browsers alive.
    await new Promise(() => { });
})();
