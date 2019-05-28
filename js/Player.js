import Dices from './Dices.js';

const dices = new Dices();

export default class Player {
  constructor(name) {
    this.dices = [0, 0, 0, 0, 0];
    this.dices = this.randomAll();
    // this.result = document.getElementById('resultat');
    this.counter = 3;
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
        o.isSaved = null;
        o.isTrue = !1;
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

  get sum() {
    let sum = 0;
    this.multi.forEach((hand) => {
      sum += hand.isSaved;
    });
    return sum;
  }

  get total() {
    const multi = this.multi.reduce((pre, cur) => {
      const prevScore = pre.isSaved || 0;
      const currScore = cur.isSaved || 0;
      return prevScore + currScore;
    }, 0);
    return this.sum + this.bonus + multi;
  }

  random(i = -1) {
    const rand = Math.floor((Math.random() * 6)) + 1;
    if (i >= 0) this.dices[i] = rand;
    return rand;
  }

  randomAll() {
    return this.dices.map(() => this.random());
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
    // variable objet pour sauvegarde des résultats
    const multi = [];
    const yams = [];
    multi.length = 6;
    yams.length = 7;
    multi.fill(0);
    yams.fill(false);
    // calcul des yams
    if (yahtzee) {
      const { nb } = yahtzee;
      if (nb >= 3) {
        // txt += 'Brelan';
        yams[0] = true;
      }
      if (nb > 3) {
        // txt += ', Carré';
        yams[1] = true;
      }
      if (nb > 4) {
        // txt += ', YAHTZEE !!!';
        yams[6] = true;
      }
    }
    if (dices.isFull(this)) {
      // this.result.innerHTML += '<br>Full';
      yams[4] = true;
    }
    const suite = dices.isStraight(this);
    if (suite) {
      // const name = ['Petite suite', 'Grande SUITE'];
      // this.result.innerHTML += `\n${name[suite - 1]}`;
      yams[2] = true;
      yams[3] = (suite === 2);
    }
    // sauvegarde des yams
    this.yams.forEach((hand, i) => {
      // toujours true : bonus (this.yams[5])
      hand.isTrue = (i === 5) ? true : yams[i];
      hand.scoreNow = this.scoreYams(i);
    });
    // sauvegarde des multis
    const results = dices.sameDice(this);
    this.multi.forEach((hand, i) => {
      hand.isTrue = (results[i] > 0) ? results[i] : 0;
      hand.scoreNow = this.scoreMulti(i);
    });

    dices.display(this);
  }
}
