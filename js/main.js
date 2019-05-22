import Dices from './Dices.js';
import Player from './Player.js';
import random from './functions.js';

const player = new Player('You');
const dices = new Dices();

// onclick sur $dices
dices.$dices.forEach(($) => {
  $.addEventListener('click', (e) => {
    if (player.counter === 3) return;
    const nb = Number(e.currentTarget.id);
    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');
      dices.selected[nb] = !1;
    } else {
      e.currentTarget.classList.add('selected');
      dices.selected[nb] = !0;
    }
  });
});

// onclick sur $relancer
document.getElementById('play').addEventListener('click', (e) => {
  if (player.counter === 3) return;
  dices.selected.forEach((dice, i) => {
    if (!dice) {
      player.dices[i] = random();
    }
  });
  dices.clearSelected();
  // player.counter += 1;
  if (player.counter === 3) {
    e.currentTarget.disabled = true;
  }
  player.writeResult();
});

player.writeResult();

window.player = player;
