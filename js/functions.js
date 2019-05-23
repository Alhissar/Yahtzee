export function random() {
  return Math.floor((Math.random() * 6)) + 1;
}

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
    const $div = e.currentTarget;
    if ((player[type][i].isSaved === 0)
      || (player[type][i].isSaved) > 0) return;
    player[type][i].isSaved = player[type][i].scoreNow;
    $div.classList.add('saved');
    player.counter = 3;
    document.getElementById('play').disabled = false;
    // relancer random
    player.dices = player.randomAll();
    player.writeResult();
  };
}

// export function clickScore({ player, i }) {
