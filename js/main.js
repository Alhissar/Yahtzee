import Dices from './Dices.js';
import Player from './Player.js';
import { clickDices, clickResult, clickTurn, resultToggle } from './functions.js';


const player = new Player('You');
const dices = new Dices();

// onclick sur $dices
dices.$dices.forEach(($) => {
  $.addEventListener('click', clickDices({ player, dices }));
});

// onclick sur scores
['multi', 'yams'].forEach((type) => {
  document.querySelectorAll(`.result.${type}`)
    .forEach(($, i) => {
      $.addEventListener('click', clickResult({
        dices, player, type, i,
      }));
    });
});

// onclick sur $relancer
document.getElementById('play')
  .addEventListener('click', clickTurn({ player, dices }));

// onclick sur Show/Hide
document.getElementById('showScores')
  .addEventListener('click', resultToggle);


player.writeResult();
dices.display(player.dices);
