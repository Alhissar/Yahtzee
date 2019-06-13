import Card from './Card.js';

export default class Dices {
  constructor() {
    // ?
    this.ordered = [];
    this.selected = [0, 0, 0, 0, 0];
    this.result = [0, 0, 0, 0, 0, 0];
    this.$dices = document.querySelectorAll('.dice');
    this.cards = [];
    for (let i = 0; i < 5; i += 1) {
      const newCard = new Card(i, i, 4);
      this.cards.push(newCard);
      // newCard.draw({ i, color: 0 });
    }
    this.$scores = document.querySelectorAll('.result');
  }

  get values() {
    return [...this.$dices].map(dom => Number(dom.textContent));
  }

  clearSelected() {
    this.selected.fill(!1);
    this.$dices.forEach(($) => {
      $.classList.remove('selected');
    });
  }

  count(x) {
    const result = this.sameDice();
    return result[x - 1];
  }

  display(player) {
    this.clearSelected();
    // affichage des cartes
    // FIXBUG
    this.cards.forEach((card, i) => {
      const infos = player.dices[i];
      card.draw(infos.number - 1, infos.color);
    });
    // affichage compteur
    document.querySelector('.counter').textContent = player.counter;
    // efface tous les scores
    const names = ['multi', 'yams'];
    names.forEach((type) => {
      const $scores = document.querySelectorAll(`.result.${type}`);
      player[type].forEach((score, i) => {
        if ((score.isSaved === 0)
      || ((score.isSaved) > 0)) return;
        const $score = $scores[i];
        const $val = $score.querySelector('.score');
        if (!score.isSaved) {
          $val.textContent = score.scoreNow;
        } else {
          $val.textContent = '';
        }
      });
    });
    document.querySelector('#sum .score').textContent = player.bonus;
    document.querySelector('#total .score').textContent = player.total;
  }

  isFull(dices) {
    const { nb } = this.yahtzee(dices);
    if (nb > 3) return false;
    const sameFiltered = this.sameDice(dices).filter(value => value !== 0);
    return sameFiltered.length === 2;
  }

  /**
 * renvoie 1 pour une petite suite, renvoie 2 pour une Grande suite,
 * sinon false
 * @returns {Number | false} false | 1 | 2
 */
  isStraight(dices) {
    const { nb } = this.yahtzee(dices);
    if (nb > 2) return false;
    // const { dices } = player;
    const ordered = this.order(dices);
    const long = new Set([
      '1,2,3,4,5',
      '2,3,4,5,6',
    ]);
    if (long.has(ordered)) return 2;
    const short = new Set([
      '1,2,3,4',
      '2,3,4,5',
      '3,4,5,6',
      '1,3,4,5,6',
      '1,2,3,4,6',
    ]);
    if (short.has(ordered)) return 1;
    return false;
  }

  order(dices) {
    // const set = new Set(dices);
    const set = new Set();
    dices.forEach(({ number }) => {
      set.add(number);
    });
    this.ordered = [...set].sort().toString();
    return this.ordered;
  }

  /**
  *Renvoie un tableau avec le nb de dés identiques
  *
  * @returns {Array} Tableau : ex. [0, 1, 2, 0, 2, 0]
  */
  sameDice(dices) {
    this.result = [0, 0, 0, 0, 0, 0];
    dices.forEach(({ number }) => {
      this.result[number - 1] += 1;
    });
    return this.result;
  }

  /**
   * renvoie infos
   * @param {Array} dices
   * @returns {Object} { nb, dice }
   */
  yahtzee(dices) {
    const result = this.sameDice(dices);
    // calcul des brelan, carre...
    const nb = result.reduce((acc, curr) => (curr > acc ? curr : acc), 0);
    if (nb < 3) return false;
    const dice = result.indexOf(nb) + 1;
    return {
      nb,
      dice,
    };
  }
}
