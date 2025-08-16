//RESET SYNCLIST POPUP
export function resetSyncList() {

    const resetScreen = document.createElement('div');
    resetScreen.className = 'resetScreen';

    const resetWrapper = document.createElement('div');
    resetWrapper.className = 'resetWrapper';

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'buttonWrapper';

    resetWrapper.innerHTML = `
    <h1> Reset SyncList? </h1>
    `

    buttonWrapper.innerHTML = `
    <button id="confirmReset"> Yes </button>
    <button id="cancelReset"> No </button>
    `
    resetWrapper.appendChild(buttonWrapper);
    resetScreen.appendChild(resetWrapper);
    document.body.appendChild(resetScreen);

    document.getElementById('confirmReset').addEventListener('click', function () {

        console.log("Resetting SyncList...");

        sync = {
            one: undefined,
            two: undefined,
            three: undefined,
            four: undefined,
            five: undefined,
            six: undefined
        };
        refreshSync();
        resetContainer.style.display = 'none';
    });

    document.getElementById('reset').addEventListener('click', function () {
        resetContainer.style.display = 'none';
    });
}

//REFRESH BOTH SYNCS
export function refreshSync() {
    console.log("REFRESHING...");
    var ulA = document.getElementById('syncListA');
    var ulB = document.getElementById('syncListB');
    ulA.innerHTML = '';
    ulB.innerHTML = '';
    renderSync();

}

//ADD SYNC

export function addSync(pkmnA, pkmnB) {

    let pokemonA = searchPokeNO(pkmnA);
    let pokemonB = searchPokeNO(pkmnB);

    if (sync.oneA === "UNDEFINED") {
        sync.oneA = pkmnA;
        sync.oneB = pkmnB;
    } else if (sync.twoA === "UNDEFINED") {
        sync.twoA = pkmnA;
        sync.twoB = pkmnB;
    } else if (sync.threeA === "UNDEFINED") {
        sync.threeA = pkmnA;
        sync.threeB = pkmnB;
    } else if (sync.fourA === "UNDEFINED") {
        sync.fourA = pkmnA;
        sync.fourB = pkmnB;
    } else if (sync.fiveA === "UNDEFINED") {
        sync.fiveA = pkmnA;
        sync.fiveB = pkmnB;
    } else if (sync.sixA === "UNDEFINED") {
        sync.sixA = pkmnA;
        sync.sixB = pkmnB;
    } else {
        console.log("SyncList is full...");
        box.push({ pkmnA, pkmnB });
    }
}