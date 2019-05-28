export default class Dices {
  constructor() {
    // ?
    this.ordered = [];
    this.selected = [0, 0, 0, 0, 0];
    this.result = [0, 0, 0, 0, 0, 0];
    this.$dices = document.querySelectorAll('.dice');
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
    // affichage des dés
    this.$dices.forEach(($d, i) => {
      $d.textContent = player.dices[i];
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
    if (player.sum >= 63) {
      document.querySelector('#sum .score').textContent = 25;
    }
  }

  isFull(player) {
    const { nb } = this.yahtzee(player);
    if (nb > 3) return false;
    const sameFiltered = this.sameDice(player).filter(value => value !== 0);
    return sameFiltered.length === 2;
  }

  /**
 * renvoie 1 pour une petite suite, renvoie 2 pour une Grande suite,
 * sinon false
 * @returns {Number | false} false | 1 | 2
 */
  isStraight(player) {
    const { nb } = this.yahtzee(player);
    if (nb > 2) return false;
    const { dices } = player;
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
    const set = new Set(dices);
    this.ordered = [...set].sort().toString();
    return this.ordered;
  }

  /**
  *Renvoie un tableau avec le nb de dés identiques
  *
  * @returns {Array} Tableau : ex. [0, 1, 2, 0, 2, 0]
  */
  sameDice({ dices }) {
    this.result = [0, 0, 0, 0, 0, 0];
    dices.forEach((dice) => {
      this.result[dice - 1] += 1;
    });
    return this.result;
  }

  yahtzee(player) {
    const result = this.sameDice(player);
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
