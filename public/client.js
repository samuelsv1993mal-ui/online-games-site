const socket = io();

const welcomeView = document.querySelector('#welcomeView');
const gameView = document.querySelector('#gameView');
const nameInput = document.querySelector('#nameInput');
const gameInput = document.querySelector('#gameInput');
const roomInput = document.querySelector('#roomInput');
const createRoomBtn = document.querySelector('#createRoomBtn');
const joinRoomBtn = document.querySelector('#joinRoomBtn');
const errorText = document.querySelector('#errorText');

const roomCode = document.querySelector('#roomCode');
const copyRoomBtn = document.querySelector('#copyRoomBtn');
const gameSelect = document.querySelector('#gameSelect');
const resetGameBtn = document.querySelector('#resetGameBtn');
const resetScoresBtn = document.querySelector('#resetScoresBtn');
const playerXName = document.querySelector('#playerXName');
const playerOName = document.querySelector('#playerOName');
const playerXCard = document.querySelector('#playerXCard');
const playerOCard = document.querySelector('#playerOCard');
const scoreText = document.querySelector('#scoreText');
const drawText = document.querySelector('#drawText');
const noticeText = document.querySelector('#noticeText');
const rpsPanel = document.querySelector('#rpsPanel');
const tttPanel = document.querySelector('#tttPanel');
const rpsResult = document.querySelector('#rpsResult');
const tttBoard = document.querySelector('#tttBoard');

let currentRoomId = null;
let mySymbol = null;
let latestRoom = null;

const rpsLabels = {
  rock: 'Камень',
  scissors: 'Ножницы',
  paper: 'Бумага'
};

function showError(message) {
  errorText.textContent = message || '';
}

function myName() {
  return nameInput.value.trim() || 'Игрок';
}

function enterGameView(roomId, symbol) {
  currentRoomId = roomId;
  mySymbol = symbol;
  roomCode.textContent = roomId;
  welcomeView.classList.add('hidden');
  gameView.classList.remove('hidden');
}

function setButtonsDisabled(disabled) {
  createRoomBtn.disabled = disabled;
  joinRoomBtn.disabled = disabled;
}

function createRoom() {
  showError('');
  setButtonsDisabled(true);
  socket.emit('room:create', { name: myName(), game: gameInput.value }, (response) => {
    setButtonsDisabled(false);
    if (!response?.ok) {
      showError(response?.error || 'Не удалось создать комнату.');
      return;
    }
    enterGameView(response.roomId, response.symbol);
  });
}

function joinRoom() {
  const value = roomInput.value.trim().toUpperCase();
  if (!value) {
    showError('Введи код комнаты.');
    return;
  }

  showError('');
  setButtonsDisabled(true);
  socket.emit('room:join', { roomId: value, name: myName() }, (response) => {
    setButtonsDisabled(false);
    if (!response?.ok) {
      showError(response?.error || 'Не удалось войти в комнату.');
      return;
    }
    enterGameView(response.roomId, response.symbol);
  });
}

function playerBySymbol(room, symbol) {
  return room.players.find((player) => player.symbol === symbol);
}

function updateNotice(room) {
  if (room.players.length < 2) {
    noticeText.textContent = 'Отправь код комнаты другу. Игра начнётся, когда второй игрок подключится.';
    return;
  }

  if (room.game === 'rps') {
    const waitingForMe = room.rps.waitingFor.includes(mySymbol);
    noticeText.textContent = waitingForMe
      ? `Ты играешь за ${mySymbol}. Выбери камень, ножницы или бумагу.`
      : 'Ход принят. Ждём выбор второго игрока.';
    return;
  }

  if (room.ttt.winner) {
    noticeText.textContent = room.ttt.winner === mySymbol
      ? 'Ты победил в этой партии!'
      : `Победил игрок ${room.ttt.winner}. Нажмите «Новая партия», чтобы сыграть ещё.`;
    return;
  }

  if (room.ttt.draw) {
    noticeText.textContent = 'Ничья. Нажмите «Новая партия», чтобы сыграть ещё.';
    return;
  }

  noticeText.textContent = room.ttt.turn === mySymbol
    ? `Твой ход. Ты играешь за ${mySymbol}.`
    : `Сейчас ход игрока ${room.ttt.turn}.`;
}

function renderPlayers(room) {
  const playerX = playerBySymbol(room, 'X');
  const playerO = playerBySymbol(room, 'O');
  playerXName.textContent = playerX ? playerX.name : 'Ожидаем...';
  playerOName.textContent = playerO ? playerO.name : 'Ожидаем...';

  playerXCard.classList.toggle('active-player', room.game === 'ttt' && room.ttt.turn === 'X' && !room.ttt.winner && !room.ttt.draw);
  playerOCard.classList.toggle('active-player', room.game === 'ttt' && room.ttt.turn === 'O' && !room.ttt.winner && !room.ttt.draw);
}

function renderScores(room) {
  scoreText.textContent = `${room.scores.X} : ${room.scores.O}`;
  drawText.textContent = `Ничьи: ${room.scores.draws}`;
}

function renderGameSwitcher(room) {
  gameSelect.value = room.game;
  rpsPanel.classList.toggle('hidden', room.game !== 'rps');
  tttPanel.classList.toggle('hidden', room.game !== 'ttt');
}

function renderRps(room) {
  const buttons = document.querySelectorAll('.move-btn');
  const hasTwoPlayers = room.players.length === 2;
  const waitingForMe = room.rps.waitingFor.includes(mySymbol);

  buttons.forEach((button) => {
    button.disabled = !hasTwoPlayers || !waitingForMe;
  });

  if (room.rps.lastRound) {
    const round = room.rps.lastRound;
    const myMove = rpsLabels[round[mySymbol]] || round[mySymbol];
    const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';
    const opponentMove = rpsLabels[round[opponentSymbol]] || round[opponentSymbol];

    let prefix = 'Ничья.';
    if (round.result === mySymbol) prefix = 'Ты выиграл раунд.';
    if (round.result !== 'draw' && round.result !== mySymbol) prefix = 'Ты проиграл раунд.';

    rpsResult.textContent = `${prefix} Твой выбор: ${myMove}. Выбор соперника: ${opponentMove}.`;
  } else if (!hasTwoPlayers) {
    rpsResult.textContent = 'Ждём второго игрока.';
  } else if (!waitingForMe) {
    rpsResult.textContent = 'Твой ход уже принят. Ждём соперника.';
  } else {
    rpsResult.textContent = 'Сделай ход. Результат откроется, когда оба игрока выберут вариант.';
  }
}

function renderTtt(room) {
  tttBoard.innerHTML = '';
  const hasTwoPlayers = room.players.length === 2;
  const canMove = hasTwoPlayers && room.ttt.turn === mySymbol && !room.ttt.winner && !room.ttt.draw;

  room.ttt.board.forEach((value, index) => {
    const cell = document.createElement('button');
    cell.className = 'cell';
    cell.textContent = value || '';
    cell.disabled = !canMove || Boolean(value);
    cell.classList.toggle('win', room.ttt.winningLine.includes(index));
    cell.addEventListener('click', () => {
      socket.emit('ttt:move', { roomId: currentRoomId, index });
    });
    tttBoard.appendChild(cell);
  });
}

function renderRoom(room) {
  latestRoom = room;
  renderPlayers(room);
  renderScores(room);
  renderGameSwitcher(room);
  renderRps(room);
  renderTtt(room);
  updateNotice(room);
}

createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);

roomInput.addEventListener('input', () => {
  roomInput.value = roomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
});

roomInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') joinRoom();
});

nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') createRoom();
});

copyRoomBtn.addEventListener('click', async () => {
  if (!currentRoomId) return;
  try {
    await navigator.clipboard.writeText(currentRoomId);
    copyRoomBtn.textContent = 'Скопировано';
    setTimeout(() => { copyRoomBtn.textContent = 'Копировать'; }, 1200);
  } catch {
    copyRoomBtn.textContent = currentRoomId;
  }
});

gameSelect.addEventListener('change', () => {
  socket.emit('game:select', { roomId: currentRoomId, game: gameSelect.value });
});

resetGameBtn.addEventListener('click', () => {
  socket.emit('game:reset', { roomId: currentRoomId });
});

resetScoresBtn.addEventListener('click', () => {
  socket.emit('scores:reset', { roomId: currentRoomId });
});

document.querySelectorAll('.move-btn').forEach((button) => {
  button.addEventListener('click', () => {
    socket.emit('rps:move', { roomId: currentRoomId, move: button.dataset.move });
  });
});

socket.on('room:state', (room) => {
  if (!currentRoomId || room.id !== currentRoomId) return;
  renderRoom(room);
});

socket.on('connect', () => {
  if (latestRoom) {
    noticeText.textContent = 'Соединение восстановлено. Если комната сбросилась, создай новую.';
  }
});

socket.on('disconnect', () => {
  if (currentRoomId) {
    noticeText.textContent = 'Связь с сервером потеряна. Проверь запуск сервера.';
  }
});
