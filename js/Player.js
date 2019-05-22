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

  randomAll() {
    return this.dices.map(() => random());
  }

  scoreYams(i) {
    if (!this.yams[i].isTrue) return 0;
    let score = 0;
    const scoreBase = this.yams[i].score;
    score = scoreBase + this.bonus;
    return score;
  }

  scoreMulti(i) {
    const hand = this.multi[i];
    if (!hand.isTrue) return 0;
    let score = 0;
    const scoreBase = hand.isTrue;
    score = scoreBase * (i + 1);
    return score;
  }

  writeResult() {
    const yahtzee = dices.yahtzee(this);
    let txt = `${this.name},<br>`;
    // TODO à mettre dans Dices
    this.result.innerHTML = '';
    // variable objet pour sauvegarde des résultats
    const multi = [];
    const yams = [];
    multi.length = 6;
    yams.length = 7;
    multi.fill(0);
    yams.fill(false);
    // calcul des yams
    if (yahtzee) {
      const { nb, dice } = yahtzee;
      // this.multi[dice - 1].isTrue = nb;
      if (nb >= 3) {
        txt += 'Brelan';
        yams[0] = true;
      }
      if (nb > 3) {
        txt += ', Carré';
        yams[1] = true;
      }
      if (nb > 4) {
        txt += ', YAHTZEE !!!';
        yams[6] = true;
      }
      // TODO deplacer vers Dices
      this.result.innerHTML = `${txt} de ${dice}`;
    }
    if (dices.isFull(this)) {
      // TODO deplacer vers Dices
      this.result.innerHTML += '<br>Full';
      yams[4] = true;
    }
    const suite = dices.isStraight(this);
    if (suite) {
      const name = ['Petite suite', 'Grande SUITE'];
      this.result.innerHTML += `\n${name[suite - 1]}`;
      yams[2] = true;
      yams[3] = (suite === 2);
    }

    this.yams.forEach((hand, i) => {
      // toujours true : bonus (this.yams[5])
      hand.isTrue = (i === 5) ? true : yams[i];
      hand.scoreNow = this.scoreYams(i);
    });

    const results = dices.sameDice(this);
    this.multi.forEach((hand, i) => {
      hand.isTrue = (results[i] > 0) ? results[i] : 0;
      hand.scoreNow = this.scoreMulti(i);
    });

    dices.display(this);
  }
}
