export class Pokemon {

    constructor(name, nickname, owner) {
        this.name = name;
        this.nickname = nickname;
        this.owner = owner;
        this.spriteURL = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + this.name.toLowerCase() + '.gif';
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getNickname() {
        return this.nickname;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    getSpriteURL() {
        return this.spriteURL;
    }

    setSpriteURL(spriteURL) {
        this.spriteURL = spriteURL;
    }
}