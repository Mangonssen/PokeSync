"use strict";

/**
 * @param {Object} exportObj
 * @param {string} exportName
 */
export function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + JSON.stringify(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...any} args 
 * @returns 
 */
export function css(strings, ...args) {
    return strings.reduce(
        (result, string, i) => result + string + (args[i] ?? ''),
        '<style>'
    ) + '</style>';
}

/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...any} args 
 * @returns 
 */
export function html(strings, ...args) {
    return strings.reduce(
        (result, string, i) => result + string + (args[i] ?? ''),
        ''
    );
}
