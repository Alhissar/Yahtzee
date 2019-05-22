import Dices from './Dices.js';
import random from './functions.js';

const dices = new Dices();

export default class Player {
  constructor(name) {
    this.dices = [0, 0, 0, 0, 0];
    this.dices = this.randomAll();
    this.result = document.getElementById('resultat');
    this.counter = 0;
    this.name = name;
    // initialisation des resultats
    this.yams = [
      {
        nom: 'Brelan',
        score: 10,
      },
      {
        nom: 'Carré',
        score: 75,
      },
      {
        nom: 'suite',
        score: 15,
      },
      {
        nom: 'Suite',
        score: 30,
      },
      {
        nom: 'Full',
        score: 50,
      },
      {
        nom: 'Bonus',
        score: 0,
      },
      {
        nom: 'YAHTZEE',
        score: 100,
      },
    ];
    this.multi = [];
    for (let i = 0; i < 6; i += 1) {
      this.multi.push({ score: 0 });
    }
    const fill = (res) => {
      res.forEach((o) => {
        o.isSaved = false;
        o.savedScore = 0;
        o.isTrue = false;
      });
    };
    fill(this.yams);
    fill(this.multi);
    // yams.bonus = true -- toujours--
    this.yams[5].isTrue = true;
  }

  get bonus() {
    const [...bonus] = this.dices;
    return bonus.reduce((p, cur) => p + cur);
  }

  // get ordered() {
  //   const set = new Set(this.values);
  //   return [...set].sort().toString();
  // }

  handScore(i) {
    if (!this.yams[i].isTrue) return 0;
    let score = 0;
    const scoreBase = this.yams[i].score;
    score = scoreBase + this.bonus;
    return score;
  }

  randomAll() {
    return this.dices.map(() => random());
  }

  writeResult() {
    const yahtzee = dices.yahtzee(this);
    let txt = `${this.name},<br>`;
    // TODO à mettre dans Dices
    this.result.innerHTML = '';
    // variable objet pour sauvegarde des résultats
    const r = [];
    const ya = [];
    r.length = 6;
    ya.length = 7;
    ya.fill(false);
    if (yahtzee) {
      const { nb, dice } = yahtzee;
      if (nb >= 3) {
        txt += 'Brelan';
        ya[0] = true;
      }
      if (nb > 3) {
        txt += ', Carré';
        ya[1] = true;
      }
      if (nb > 4) {
        txt += ', YAHTZEE !!!';
        ya[6] = true;
      }
      this.result.innerHTML = `${txt} de ${dice}`;
    }
    if (dices.isFull(this)) {
      this.result.innerHTML += '<br>Full';
      ya[4] = true;
    }
    const suite = dices.isStraight(this);
    if (suite) {
      const name = ['Petite suite', 'Grande SUITE'];
      this.result.innerHTML += `\n${name[suite - 1]}`;
      ya[2] = true;
      ya[3] = (suite === 2);
    }
    this.yams.forEach((hand, i) => {
      // toujours true : bonus (this.yams[5])
      hand.isTrue = (i === 5) ? true : ya[i];
      hand.scoreNow = this.handScore(i);
    });

    dices.display(this);
  }
}
