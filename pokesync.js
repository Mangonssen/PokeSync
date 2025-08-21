//class import
import { Sync } from './Sync.js';

//function import
import { renderHeadings } from './player-heading.js';
import { searchPokeNO } from './pokemon-database.js';
import { resetSyncList } from './synclist.js';


export var testSync = new Sync();
testSync.addPair("Bulbasaur", "Charmander");
testSync.addPair("Squirtle", "Pidgey");
testSync.addPair("Oshawott", "Rattata");
testSync.addPair("Pikachu", "Eevee");


//SYNC ARRAYS


//RENDER BOTH SYNCS
function renderSync() {

    var ulA = document.getElementById('sync-list-A');
    var ulB = document.getElementById('sync-list-B');

    let pairs = testSync.getPokePairs();

    for (const key in pairs) {
        if (pairs.hasOwnProperty(key)) {

            //READ SYNC FROM ARRAY
            var pkmnSync = pairs[key];

            //GET POKEMON NAME FROM READ SYNC
            if (pkmnSync !== undefined) {
                var slotA = pkmnSync.getPokemonA();
                var slotB = pkmnSync.getPokemonB();
            } else {
                var slotA = "UNDEFINED";
                var slotB = "UNDEFINED";
            }

            //SEARCH FOR POKEMON NUMBER A & B
            let pokeNOa = searchPokeNO(slotA);
            let pokeNOb = searchPokeNO(slotB);

            console.log("Pokemon A: " + pokeNOa + " | Pokemon B: " + pokeNOb);


            //CONSTRUCT SPRITE UL W/ POKEMON NUMBER
            var srcA = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOa + '.gif';
            var srcB = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOb + '.gif';

            if (pairs[key] !== undefined) {

                console.log("Pair found: " + pairs[key].getPokemonA() + " & " + pairs[key].getPokemonB());

                
                let position = parseInt(key) + 1;


                //STOP WHEN TEAM IS FULL
                if (position == 7) {
                    console.log("Position 7 reached");
                    break;
                }

                console.log("Numeric Position:" + position);


                let stringA = "sync-item-A-" + position;
                let stringB = "sync-item-B-" + position;

                let listItemA = document.getElementById(stringA);
                let listItemB = document.getElementById(stringB);

                listItemA.style.opacity = 1;
                listItemB.style.opacity = 1;

                console.log(listItemA + " || " + listItemB);

                console.log("Children of list item A")

                //SET SPRITES FOR TARGETED LIST ITEMS
                listItemA.children.item(0).src = srcA;
                listItemB.children.item(0).src = srcB;
                var liB = document.getElementById(listItemB);
                //SET DESCRIPTION FOR TARGETED LI
                listItemA.children.item(1).innerHTML = slotA;
                listItemB.children.item(1).innerHTML = slotB;
            }
        }
    }
}

//DEBUG FUNCTION
function debugPlease() {
    debugIndex++;
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

document.getElementById('settingsButton').addEventListener('click', popUpSettings);
document.getElementById('resetButton').addEventListener('click', resetSyncList);

