//MALE-FEMALE SWITCH ACTION LISTENER
const playerSprites = document.getElementsByClassName('player-sprite');


for (let i = 0; i < playerSprites.length; i++) {
    playerSprites[i].addEventListener('click', function () {
        femalePlayerA = !femalePlayerA;
        renderHeadingA();
    });
}

//RENDER HEADING A (PLAYER A)
export function renderHeadingA() {

    //SPRITE
    const playerSpriteA = document.getElementById('player-sprite-A');

    if (!femalePlayerA) {
        playerSpriteA.src = 'https://www.pokewiki.de/images/4/4d/Overworldsprite_Warren_SW.png';
        playerSpriteA.style.imageRendering = 'crisp-edges';
    } else {
        playerSpriteA.src = 'https://www.pokewiki.de/images/1/16/Overworldsprite_Lotta_SW.png';
        playerSpriteA.style.imageRendering = 'crisp-edges';
    }

    //HEADING
    const headingA = document.getElementById('heading-player-A');

    if (namePlayerA === undefined) {
        namePlayerA = "PLAYER A";
    }

    headingA.innerHTML = namePlayerA;
}

//RENDER HEADING B (PLAYER B)
export function renderHeadingB() {
    const playerSpriteB = document.getElementById('player-sprite-B');
    if (!femalePlayerB) {
        //MALE PLAYER SPRITE
        playerSpriteB.src = 'https://www.pokewiki.de/images/4/4d/Overworldsprite_Warren_SW.png';
        playerSpriteB.style.imageRendering = 'crisp-edges';
    } else {
        //FEMALE PLAYER SPRITE
        playerSpriteB.src = 'https://www.pokewiki.de/images/1/16/Overworldsprite_Lotta_SW.png';
        playerSpriteB.style.imageRendering = 'crisp-edges';
    }
    const headingB = document.getElementById('heading-player-B');

    //NAME PLAYER B IF NO NAME IS SET
    if (namePlayerB === undefined) {
        namePlayerB = "PLAYER B";
        //NAME TAKEN FROM VARIABLE IF SET
    }
    headingB.innerHTML = namePlayerB;
}

export function renderHeadings() {
    renderHeadingA();
    renderHeadingB();
}



