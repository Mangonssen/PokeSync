export class PokePair {

    constructor(pokemonA, pokemonB) {
        this.pokemonA = pokemonA;
        this.pokemonB = pokemonB;
        this.alive = true;
    }

    kill() {
        this.alive = false;
    }

    isAlive() {
        return this.alive;
    }

    getPokemonA() {
        return this.pokemonA;
    }

    getPokemonB() {
        return this.pokemonB;
    }

    setPokemonA(pokemonA) {
        this.pokemonA = pokemonA;
    }

    setPokemonB(pokemonB) {
        this.pokemonB = pokemonB;
    }
}