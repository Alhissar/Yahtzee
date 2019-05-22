import random from './functions.js';

export default class Dices {
  constructor() {
    this.selected = [0, 0, 0, 0, 0];
    this.result = [0, 0, 0, 0, 0, 0];
    this.$dices = document.querySelectorAll('.dice');
  }

  get ordered() {
    const set = new Set(this.values);
    return [...set].sort().toString();
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

  display({ yams, multi, dices }) {
    const $cells = {
      multi: [...document.querySelectorAll('.result.multi .score')],
      yams: [...document.querySelectorAll('.result.yams .score')],
    };
    //affichage des dés
    this.$dices.forEach(($d, i) => {
      $d.textContent = dices[i];
    });
    // affichage des scores de yams
    $cells.yams.forEach(($score, i) => {
      if (yams[i].isSaved) {
        return;
      }
      $score.textContent = '';
      if (yams[i].isTrue && !yams[i].isSaved) {
        $score.textContent = yams[i].scoreNow;
      }
    });
    $cells.multi.forEach(($score, i) => {
      $score.textContent = '';
      if (multi[i].isTrue && !multi[i].isSaved) {
        $score.textContent = multi[i].scoreNow;
      }
    });
    this.$cells = $cells;
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

    const { ordered } = this;
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

  randomAll() {
    this.$dices.forEach(($) => {
      $.textContent = random();
    });
  }

  /**
  *Renvoie un tableau avec le nb de dés identiques
  *
  * @returns {Array} Tableau : ex. [0, 1, 2, 0, 2, 0]
  */
  sameDice({ dices }) {
    this.result = [0, 0, 0, 0, 0, 0];
    // const { dices } = player;
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
