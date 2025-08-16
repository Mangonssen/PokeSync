const jokerButtons = document.querySelectorAll('.joker');

for (let i = 0; i < jokerButtons.length; i++) {
    jokerButtons[i].addEventListener('click', function () {

        if (this.id === 'joker-reroll') {

            if (!isRerollUsed) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            isRerollUsed = !isRerollUsed;

        } else if (this.id === 'joker-sacrifice') {
            if (!isSacrificeUsed) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            isSacrificeUsed = !isSacrificeUsed;
        } else if (this.id === 'joker-revive') {
            if (!isReviveUsed) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            isReviveUsed = !isReviveUsed;
        }
    });
}