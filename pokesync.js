"use strict"
//class import
import { PokePair} from './PokePair.js';
import { Sync } from './Sync.js';

//function import
import { renderHeadings } from './player-heading.js';


var testSync = new Sync();



//SYNC ARRAYS
var sync = testSync.get
//POKEMON RESOURCE LIST
/** @typedef {{name:string;number:string}} Pokemon */
/** @type {null | Array<Pokemon>} */
const _pokemonData = null;

/** @return {Array<Pokemon>} */
async function getPokemonData() {
    if (_pokemonData) return _pokemonData;

    try {
        _pokemonData = await fetch("./pokedex.json");
        return _pokemonData;
    } catch (error) {
        return []
    }
}

//PLAYER NAMES
var namePlayerA;
var namePlayerB;

//POPUP BOOLEANS
var isSettingsOpen = false;
var isResetOpen = false;

//SEARCH FOR NUMBER IN RESOURCE LIST
async function searchPokeNO(pkmnSync) {

    let pokemonData = await getPokemonData();

    for (let i = 0; i < pokemonData.length; i++) {

        if (pokemonData[i].name === pkmnSync) {

            if (pokemonData[i].number === "000") {
                console.log("empty slot");
            } else {
                console.log("found number " + pokemonData[i].number + " for " + pkmnSync);
                return pokemonData[i].number;
            }
        }
    }
}

//RENDER BOTH SYNCS
function renderSync() {

    var ulA = document.getElementById('sync-list-A');
    var ulB = document.getElementById('sync-list-B');

    for (const key in sync) {
        if (sync.hasOwnProperty(key)) {

            //READ SYNC FROM ARRAY
            var pkmnSync = sync[key];

            //GET POKEMON NAME FROM READ SYNC
            if (pkmnSync !== undefined) {
                var slotA = pkmnSync.getA();
                var slotB = pkmnSync.getB();
            } else {
                var slotA = "UNDEFINED";
                var slotB = "UNDEFINED";
            }

            //SEARCH FOR POKEMON NUMBER A & B
            let pokeNOa = searchPokeNO(slotA);
            let pokeNOb = searchPokeNO(slotB);


            //CONSTRUCT SPRITE UL W/ POKEMON NUMBER
            var srcA = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOa + '.gif';
            var srcB = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOb + '.gif';

            if (sync[key] !== undefined) {

                // Save position of element scoped by the loop

                const keyMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
                var numericPosition = keyMap[key] || key;

                var position = numericPosition;

                console.log("Numeric Position:" + numericPosition);

                var listItemA = "sync-item-A-" + position++;
                var listItemB = "sync-item-B-" + position++;


                //SET SPRITES FOR TARGETED LIST ITEMS
                listItemA.children.item(0).src = srcA;
                listItemB.children.item(0).src = srcB;
                var liB = document.getElementById(listItemB);
                //SET DESCRIPTION FOR TARGETED LI
                listItemA.children.item(1).innerHTML = slotA;
                listItemB.children.item(1).innerHTML = slotB;

                //BLANK CARD IF UNSET
            }
        }
    }
}

//DEBUG FUNCTION
async function debugPlease() {
    debugIndex++;
    let pokemonData = await getPokemonData();
    debug = pokemonData[debugIndex].name;
    sync['oneA'] = debug;
    console.log("Index: " + debugIndex);
    console.log("Pokemon: " + debug);
    console.log("Currently displaying: " + pokemonData[debugIndex].name);
    refreshSync();
}



//POKEMON OPTIONS
function pkmnOptions(e) {
    console.log(e.target);
    if (e.target.className === 'sprite') {
        console.log("Sprite was clicked...");
        console.log(e.target.parentElement.parentElement.firstChild.innerHTML);
    } else {
        console.log("Sprite was not clicked...");
    }
}




//SETTINGS


function popUpSettings() {

    console.log("popUpSettings was triggered...");

    document.getElementById('settings-window').style.display = 'block';

}



const settingsCloseButton = document.getElementById("settings-close-button");

settingsCloseButton.addEventListener('click', function () {
    console.log("Closing settings...");
    const settingsScreen = document.getElementById('settings-window');
    settingsScreen.style.display = 'none';
});

document.getElementById("settings-form").addEventListener('submit', function (event) {
    event.preventDefault();

    namePlayerA = document.getElementById('player-name-A').value;
    namePlayerB = document.getElementById('player-name-B').value;

    if (namePlayerA.trim() === '') {
        namePlayerA = "PlayerA";
    }
    if (namePlayerB.trim() === '') {
        namePlayerB = "PlayerB";
    }


    document.getElementById("hA").textContent = namePlayerA;
    document.getElementById("hB").textContent = namePlayerB;
});

document.getElementById("settings-form").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("settings-window").style.display = "none";
    }
});








renderSync();
console.log("Reroll: " + isRerollUsed);
console.log("Sacrifice: " + isSacrificeUsed);
console.log("Revive: " + isReviveUsed);

document.getElementById('settingsButton').addEventListener('click', popUpSettings);
document.getElementById('resetButton').addEventListener('click', resetSyncList);

