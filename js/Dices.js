import random from './functions.js';

export default class Dices {
  constructor() {
    this.$dices = document.querySelectorAll('.dice');
    this.result = document.getElementById('resultat');
    this.counter = 0;
    this.selected = [0, 0, 0, 0, 0];
  }

  get ordered() {
    const set = new Set(this.values);
    return Array.from(set).sort().toString();
  }

  get values() {
    return [...this.$dices].map(dom => Number(dom.textContent));
  }

  get yahtzee() {
    const result = this.sameDice();
    // calcul des brelan, carre...
    const nb = result.reduce((acc, curr) => (curr > acc ? curr : acc), 0);
    if (nb < 3) return false;
    const dice = result.indexOf(nb) + 1;
    return {
      nb,
      dice,
    };
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

  isFull() {
    if (this.yahtzee > 3) return false;
    const sameFiltered = this.sameDice().filter(value => value !== 0);
    return sameFiltered.length === 2;
  }

  isStraight() {
    if (this.yahtzee > 2) return false;
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
  sameDice() {
    const result = [0, 0, 0, 0, 0, 0];
    const dices = this.values;
    dices.forEach((dice) => {
      result[dice - 1] += 1;
    });
    return result;
  }

  total(val = 0) {
    if (val === 0) {
      return this.values.reduce((prev, curr) => prev + curr, 0);
    }
    return val * this.count(val);
  }

  writeResult() {
    const { yahtzee } = this;
    let txt = '';
    if (yahtzee >= 3) {
      txt = 'Brelan';
    }
    if (yahtzee > 3) {
      txt += ', Carré';
    }
    if (yahtzee > 4) {
      txt = ', YAHTZEE !!!';
    }
    this.result.textContent = txt;
  }
}
