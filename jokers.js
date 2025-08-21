import { Sync } from './Sync.js';
import { testSync } from './pokesync.js';

const jokerButtons = document.querySelectorAll('.joker');

for (let i = 0; i < jokerButtons.length; i++) {
    jokerButtons[i].addEventListener('click', function () {

        if (this.id === 'joker-reroll') {

            if (!testSync.getRerollUsed()) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            testSync.setRerollUsed(!testSync.getRerollUsed());

        } else if (this.id === 'joker-sacrifice') {
            if (!testSync.getSacrificeUsed()) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            testSync.setSacrificeUsed(!testSync.getSacrificeUsed());
        } else if (this.id === 'joker-revive') {
            if (!testSync.getReviveUsed()) {
                this.style.opacity = '0.25';
                this.style.filter = 'grayscale(100%)';
                this.style.cursor = 'default';
            } else {
                this.style.opacity = '1';
                this.style.filter = 'none';
                this.style.cursor = 'pointer';
            }
            testSync.setReviveUsed(!testSync.getReviveUsed());
        }
    });
}