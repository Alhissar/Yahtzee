const $counter = document.querySelector('.counter');
const $paquet = document.querySelector('.paquet');

export function clickDices({ player, dices }) {
  return function clickDice(e) {
    if (player.counter === 0) return;
    // on prend le chiffre dans l'id (par ex. 4 dans #d4)
    const nb = Number(e.currentTarget.id[1]);
    if (e.currentTarget.classList.contains('selected')) {
      e.currentTarget.classList.remove('selected');
      dices.selected[nb] = !1;
    } else {
      e.currentTarget.classList.add('selected');
      dices.selected[nb] = !0;
    }
  };
}

// eslint-disable-next-line object-curly-newline
export function clickResult({ dices, player, type, i }) {
  return function clicRes(e) {
    // on sort si tout est cliqué
    if ((player[type][i].isSaved === 0)
    || (player[type][i].isSaved) > 0) return;
    // const $paquet = document.querySelector('.paquet');
    player[type][i].isSaved = player[type][i].scoreNow;
    e.currentTarget.classList.add('saved');
    const total = document.querySelectorAll('.result').length;
    const saved = document.querySelectorAll('.result.saved').length;
    if (saved === total) {
      // fin de partie
      player.counter = 0;
      player.writeResult();
      dices.display(player.dices);
    } else {
      // nouveau tour
      player.counter = 3;
      // relancer random
      dices.parkInAll();
      $paquet.style.transform = '';
      player.dices = player.randomAll();
      player.writeResult();
      setTimeout(() => {
        dices.display(player.dices);
        document.querySelector('.counter').style.opacity = 1;
      }, 500);
    }
    //
  };
}

export function clickTurn({ player, dices }) {
  return () => {
    if (player.counter === 0) return;
    // random les non selectionnes
    const notSelected = [];
    dices.selected.forEach((selected, i) => {
      if (!selected) {
        notSelected.push(i);
        player.random(i);
      }
    });
    dices.clearSelected();
    dices.parkIn(notSelected);
    player.counter -= 1;
    player.writeResult();
    // Redistribution des cartes
    setTimeout(() => {
      dices.display(player.dices);
    }, 400);
    // si compteur=0 on cache le paquet
    if (player.counter === 0) {
      $counter.style.opacity = 0;
      setTimeout(() => {
        $paquet.style.transform = 'translate(129%, 170%) rotate(-180deg)';
      }, 1000);
    }
  };
}
