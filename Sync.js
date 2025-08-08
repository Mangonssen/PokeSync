export class Sync {

    constructor(A, B) {
        this.A = A;
        this.B = B;
        this.alive = true;
    }

    kill() {
        this.alive = false;
    }

    isAlive() {
        return this.alive;
    }

    getA() {
        return this.A;
    }

    getB() {
        return this.B;
    }

    setA(pokemonA) {
        this.A = pokemonA;
    }

    setB(pokemonB) {
        this.B = pokemonB;
    }
}