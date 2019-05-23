import Dices from './Dices.js';
import Player from './Player.js';
import { random, clickDices, clickResult } from './functions.js';


const player = new Player('You');
const dices = new Dices();

// onclick sur $dices
dices.$dices.forEach(($) => {
  $.addEventListener('click', clickDices({ player, dices }));
});

// onclick sur scores
//
// multis
let type = 'multi';
document.querySelectorAll('.result.multi')
  .forEach(($, i) => {
    $.addEventListener('click', clickResult({ player, type, i }));
  });
// yams
type = 'yams';
document.querySelectorAll('.result.yams')
  .forEach(($, i) => {
    $.addEventListener('click', clickResult({ player, type, i }));
  });

// onclick sur $relancer
document.getElementById('play')
  .addEventListener('click', (e) => {
    if (player.counter === 0) return;
    // relance des dés
    dices.selected.forEach((dice, i) => {
      if (!dice) {
        player.dices[i] = random();
      }
    });
    // remove class selected
    dices.clearSelected();
    // compteur
    player.counter -= 1;
    player.writeResult();
    if (player.counter === 0) {
      e.currentTarget.disabled = true;
    }
  });

player.writeResult();
window.player = player;
