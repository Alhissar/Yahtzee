export function clickDices({ player, dices }) {
  return function clickDice(e) {
    if (player.counter === 0) return;
    const nb = Number(e.currentTarget.id);
    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');
      dices.selected[nb] = !1;
    } else {
      e.currentTarget.classList.add('selected');
      dices.selected[nb] = !0;
    }
  };
}

export function clickResult({ player, type, i }) {
  return function clicRes(e) {
    // on sort si tout est cliqué
    const $div = e.currentTarget;
    if ((player[type][i].isSaved === 0)
    || (player[type][i].isSaved) > 0) return;
    player[type][i].isSaved = player[type][i].scoreNow;
    $div.classList.add('saved');
    const total = document.querySelectorAll('.result').length;
    const saved = document.querySelectorAll('.result.saved').length;
    if (saved === total) {
      // fin de partie
      player.counter = 0;
      document.getElementById('play').disabled = true;
      player.writeResult();
    } else {
      // nouveau tour
      player.counter = 3;
      document.getElementById('play').disabled = false;
      // relancer random
      player.dices = player.randomAll();
      player.writeResult();
    }
    // ajouter la gestion du total
  };
}

export function clickTurn(player, dices) {
  return (e) => {
    if (player.counter === 0) return;
    // relance des dés
    dices.selected.forEach((dice, i) => {
      if (!dice) {
        player.random(i);
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
  };
}
