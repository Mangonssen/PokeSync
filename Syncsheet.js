export class Syncsheet {

    constructor(playerA, playerB, pkmnSyncs, teamPlayerA, teamPlayerB, rerollUsed, sacrificeUsed, reviveUsed, active) {
        this.playerA = playerA;
        this.playerB = playerB;
        this.pkmnSyncs = pkmnSyncs;
        this.teamPlayerA = teamPlayerA;
        this.teamPlayerB = teamPlayerB;
        this.rerollUsed = rerollUsed;
        this.sacrificeUsed = sacrificeUsed;
        this.reviveUsed = reviveUsed;
        this.active = active;
    }

    constructor() {
        this.playerA = "Player A";
        this.playerB = "Player B";
        this.pkmnPlayerA = [];
        this.pkmnPlayerB = [];
        this.teamPlayerA = [];
        this.teamPlayerB = [];
        this.rerollUsed = false;
        this.sacrificeUsed = false;
        this.reviveUsed = false;
        this.active = true;
    }

    //returns all vars
    getSyncData() {
        return {
            playerA: this.playerA,
            playerB: this.playerB,
            pkmnPlayerA: this.pkmnPlayerA,
            pkmnPlayerB: this.pkmnPlayerB,
            teamPlayerA: this.teamPlayerA,
            teamPlayerB: this.teamPlayerB,
            rerollUsed: this.rerollUsed,
            sacrificeUsed: this.sacrificeUsed,
            reviveUsed: this.reviveUsed,
            active: this.active
        };
    }

    getPlayerA() {
        return this.playerA;
    }

    getPlayerB() {
        return this.playerB;
    }

    getPkmnPlayerA() {
        return this.pkmnPlayerA;
    }

    getPkmnPlayerB() {
        return this.pkmnPlayerB;
    }

    getTeamPlayerA() {
        return this.teamPlayerA;
    }

    getTeamPlayerB() {
        return this.teamPlayerB;
    }

    getRerollUsed() {
        return this.rerollUsed;
    }

    getSacrificeUsed() {
        return this.sacrificeUsed;
    }

    getReviveUsed() {
        return this.reviveUsed;
    }

    getActive() {
        return this.active;
    }

    setPlayerA(playerA) {
        this.playerA = playerA;
    }

    setPlayerB(playerB) {
        this.playerB = playerB;
    }

    setPkmnPlayerA(pkmnPlayerA) {
        this.pkmnPlayerA = pkmnPlayerA;
    }

    setPkmnPlayerB(pkmnPlayerB) {
        this.pkmnPlayerB = pkmnPlayerB;
    }

    setTeamPlayerA(teamPlayerA) {
        this.teamPlayerA = teamPlayerA;
    }

    setTeamPlayerB(teamPlayerB) {
        this.teamPlayerB = teamPlayerB;
    }

    setRerollUsed(rerollUsed) {
        this.rerollUsed = rerollUsed;
    }

    setSacrificeUsed(sacrificeUsed) {
        this.sacrificeUsed = sacrificeUsed;
    }

    setReviveUsed(reviveUsed) {
        this.reviveUsed = reviveUsed;
    }

    setActive(active) {
        this.active = active;
    }


    //non-getter/setter methods

    killSync(index) {
        pok
    }
}