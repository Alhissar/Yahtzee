import Dices from './Dices.js';
import random from './functions.js';

const game = new Dices();
const player = game;

// onclick sur $dices
player.$dices.forEach(($) => {
  $.addEventListener('click', (e) => {
    if (player.counter === 3) return;
    const nb = Number(e.currentTarget.id);
    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');
      player.selected[nb] = !1;
    } else {
      e.currentTarget.classList.add('selected');
      player.selected[nb] = !0;
    }
  });
});

// onclick sur boutton
document.getElementById('play').addEventListener('click', (e) => {
  if (player.counter === 3) return;
  player.selected.forEach((dice, i) => {
    if (!dice) {
      player.$dices[i].textContent = random();
    }
  });
  player.clearSelected();
  // player.counter += 1;
  if (player.counter === 3) {
    e.currentTarget.disabled = true;
  }
  player.writeResult();
});

player.randomAll();
player.writeResult();
window.player = player;
