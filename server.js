const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;
const rooms = new Map();
const GAMES = new Set(['rps', 'ttt', 'dice', 'c4']);
const BOT_ID = '__SMQ_BOT__';
const BOT_DELAY_MS = 650;

app.use(express.static(path.join(__dirname, 'public')));

function makeRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i += 1) code += letters[Math.floor(Math.random() * letters.length)];
  return code;
}

function normalizeGame(game) {
  return GAMES.has(game) ? game : 'rps';
}

function normalizeMode(mode) {
  return mode === 'computer' ? 'computer' : 'online';
}

function normalizeRoomId(value) {
  return String(value || '').trim().toUpperCase();
}

function cleanName(value) {
  const name = String(value || '').trim().slice(0, 22);
  return name || 'Player';
}

function createEmptyTtt() {
  return {
    board: Array(9).fill(null),
    turn: 'X',
    winner: null,
    winningLine: [],
    draw: false
  };
}

function createEmptyDice() {
  return {
    rolls: {},
    lastRound: null,
    round: 1
  };
}

function createEmptyC4() {
  return {
    board: Array(42).fill(null),
    turn: 'X',
    winner: null,
    winningLine: [],
    draw: false
  };
}

function defaultRoom(id, game, mode) {
  return {
    id,
    game: normalizeGame(game),
    mode: normalizeMode(mode),
    players: [],
    spectators: [],
    scores: { X: 0, O: 0, draws: 0 },
    rps: { moves: {}, lastRound: null },
    ttt: createEmptyTtt(),
    dice: createEmptyDice(),
    c4: createEmptyC4(),
    createdAt: Date.now(),
    botTimer: null
  };
}

function botPlayer() {
  return { id: BOT_ID, name: 'SMQ Bot', symbol: 'O', bot: true };
}

function getPlayer(room, socketId) {
  return room.players.find((p) => p.id === socketId);
}

function getSymbol(room, socketId) {
  const player = getPlayer(room, socketId);
  return player ? player.symbol : null;
}

function isHumanPlayer(room, socketId) {
  return room.players.some((p) => p.id === socketId && !p.bot);
}

function isSpectator(room, socketId) {
  return room.spectators.some((p) => p.id === socketId);
}

function playerBySymbol(room, symbol) {
  return room.players.find((p) => p.symbol === symbol);
}

function hasBot(room) {
  return room.players.some((p) => p.bot);
}

function publicRoom(room) {
  return {
    id: room.id,
    game: room.game,
    mode: room.mode,
    players: room.players.map((p) => ({ id: p.id, name: p.name, symbol: p.symbol, bot: Boolean(p.bot) })),
    spectators: room.spectators.map((p) => ({ id: p.id, name: p.name })),
    spectatorCount: room.spectators.length,
    scores: room.scores,
    rps: {
      waitingFor: room.players.filter((p) => !room.rps.moves[p.symbol]).map((p) => p.symbol),
      lastRound: room.rps.lastRound
    },
    ttt: room.ttt,
    dice: {
      waitingFor: room.players.filter((p) => !room.dice.rolls[p.symbol]).map((p) => p.symbol),
      lastRound: room.dice.lastRound,
      round: room.dice.round
    },
    c4: room.c4
  };
}

function emitRoom(room) {
  io.to(room.id).emit('room:state', publicRoom(room));
}

function resetCurrentGame(room) {
  room.rps = { moves: {}, lastRound: null };
  room.ttt = createEmptyTtt();
  room.dice = createEmptyDice();
  room.c4 = createEmptyC4();
  clearBotTimer(room);
}

function resetAllScores(room) {
  room.scores = { X: 0, O: 0, draws: 0 };
}

function evaluateTtt(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line, draw: false };
    }
  }

  if (board.every(Boolean)) return { winner: null, winningLine: [], draw: true };
  return { winner: null, winningLine: [], draw: false };
}

function evaluateC4(board) {
  const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const startIndex = row * 7 + col;
      const symbol = board[startIndex];
      if (!symbol) continue;

      for (const [dc, dr] of directions) {
        const line = [startIndex];
        for (let step = 1; step < 4; step += 1) {
          const nextCol = col + dc * step;
          const nextRow = row + dr * step;
          if (nextCol < 0 || nextCol >= 7 || nextRow < 0 || nextRow >= 6) break;
          const nextIndex = nextRow * 7 + nextCol;
          if (board[nextIndex] !== symbol) break;
          line.push(nextIndex);
        }
        if (line.length === 4) return { winner: symbol, winningLine: line, draw: false };
      }
    }
  }

  if (board.every(Boolean)) return { winner: null, winningLine: [], draw: true };
  return { winner: null, winningLine: [], draw: false };
}

function decideRps(moveX, moveO) {
  if (moveX === moveO) return 'draw';
  const wins = { rock: 'scissors', scissors: 'paper', paper: 'rock' };
  return wins[moveX] === moveO ? 'X' : 'O';
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScoresAfterSymbolResult(room, result) {
  if (result === 'draw') room.scores.draws += 1;
  else if (result === 'X' || result === 'O') room.scores[result] += 1;
}

function finalizeRpsIfReady(room) {
  const moveX = room.rps.moves.X;
  const moveO = room.rps.moves.O;
  if (!moveX || !moveO) return;

  const result = decideRps(moveX, moveO);
  updateScoresAfterSymbolResult(room, result);
  room.rps.lastRound = { X: moveX, O: moveO, result, at: Date.now() };
  room.rps.moves = {};
}

function finalizeDiceIfReady(room) {
  const rollX = room.dice.rolls.X;
  const rollO = room.dice.rolls.O;
  if (!rollX || !rollO) return;

  let result = 'draw';
  if (rollX > rollO) result = 'X';
  if (rollO > rollX) result = 'O';

  updateScoresAfterSymbolResult(room, result);
  room.dice.lastRound = { X: rollX, O: rollO, result, round: room.dice.round, at: Date.now() };
  room.dice.rolls = {};
  room.dice.round += 1;
}

function applyTttMove(room, symbol, cell) {
  if (room.game !== 'ttt') return false;
  if (room.ttt.winner || room.ttt.draw) return false;
  if (room.ttt.turn !== symbol) return false;
  if (room.ttt.board[cell]) return false;

  room.ttt.board[cell] = symbol;
  const result = evaluateTtt(room.ttt.board);

  if (result.winner) {
    room.ttt.winner = result.winner;
    room.ttt.winningLine = result.winningLine;
    room.scores[result.winner] += 1;
  } else if (result.draw) {
    room.ttt.draw = true;
    room.scores.draws += 1;
  } else {
    room.ttt.turn = symbol === 'X' ? 'O' : 'X';
  }
  return true;
}

function applyC4Move(room, symbol, col) {
  if (room.game !== 'c4') return false;
  if (room.c4.winner || room.c4.draw) return false;
  if (room.c4.turn !== symbol) return false;

  let targetIndex = -1;
  for (let row = 5; row >= 0; row -= 1) {
    const index = row * 7 + col;
    if (!room.c4.board[index]) {
      targetIndex = index;
      break;
    }
  }
  if (targetIndex === -1) return false;

  room.c4.board[targetIndex] = symbol;
  const result = evaluateC4(room.c4.board);

  if (result.winner) {
    room.c4.winner = result.winner;
    room.c4.winningLine = result.winningLine;
    room.scores[result.winner] += 1;
  } else if (result.draw) {
    room.c4.draw = true;
    room.scores.draws += 1;
  } else {
    room.c4.turn = symbol === 'X' ? 'O' : 'X';
  }
  return true;
}

function clearBotTimer(room) {
  if (room.botTimer) clearTimeout(room.botTimer);
  room.botTimer = null;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function chooseTttMove(board, botSymbol = 'O', humanSymbol = 'X') {
  const empty = board.map((value, index) => (value ? null : index)).filter((value) => value !== null);
  const tryWin = (symbol) => {
    for (const cell of empty) {
      const clone = [...board];
      clone[cell] = symbol;
      if (evaluateTtt(clone).winner === symbol) return cell;
    }
    return null;
  };

  const winningCell = tryWin(botSymbol);
  if (winningCell !== null) return winningCell;
  const blockingCell = tryWin(humanSymbol);
  if (blockingCell !== null) return blockingCell;
  if (empty.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter((cell) => empty.includes(cell));
  if (corners.length) return randomItem(corners);
  return randomItem(empty);
}

function validC4Columns(board) {
  return Array.from({ length: 7 }, (_, column) => column).filter((column) => !board[column]);
}

function chooseC4Move(room, botSymbol = 'O', humanSymbol = 'X') {
  const valid = validC4Columns(room.c4.board);
  const tryColumn = (symbol) => {
    for (const column of valid) {
      const clone = { ...room, c4: { ...room.c4, board: [...room.c4.board], turn: symbol, winner: null, draw: false, winningLine: [] } };
      applyC4Move(clone, symbol, column);
      if (clone.c4.winner === symbol) return column;
    }
    return null;
  };

  const winningColumn = tryColumn(botSymbol);
  if (winningColumn !== null) return winningColumn;
  const blockingColumn = tryColumn(humanSymbol);
  if (blockingColumn !== null) return blockingColumn;
  if (valid.includes(3)) return 3;
  return randomItem(valid);
}

function scheduleBotMove(room) {
  if (!room || room.mode !== 'computer' || !hasBot(room)) return;
  clearBotTimer(room);

  room.botTimer = setTimeout(() => {
    const currentRoom = rooms.get(room.id);
    if (!currentRoom || currentRoom.mode !== 'computer' || !hasBot(currentRoom)) return;

    if (currentRoom.game === 'rps') {
      if (!currentRoom.rps.moves.O && currentRoom.rps.moves.X) {
        currentRoom.rps.moves.O = randomItem(['rock', 'paper', 'scissors']);
        finalizeRpsIfReady(currentRoom);
        emitRoom(currentRoom);
      }
      return;
    }

    if (currentRoom.game === 'dice') {
      if (!currentRoom.dice.rolls.O && currentRoom.dice.rolls.X) {
        currentRoom.dice.rolls.O = rollDie();
        finalizeDiceIfReady(currentRoom);
        emitRoom(currentRoom);
      }
      return;
    }

    if (currentRoom.game === 'ttt') {
      if (currentRoom.ttt.turn === 'O' && !currentRoom.ttt.winner && !currentRoom.ttt.draw) {
        const cell = chooseTttMove(currentRoom.ttt.board, 'O', 'X');
        if (Number.isInteger(cell)) applyTttMove(currentRoom, 'O', cell);
        emitRoom(currentRoom);
      }
      return;
    }

    if (currentRoom.game === 'c4') {
      if (currentRoom.c4.turn === 'O' && !currentRoom.c4.winner && !currentRoom.c4.draw) {
        const column = chooseC4Move(currentRoom, 'O', 'X');
        if (Number.isInteger(column)) applyC4Move(currentRoom, 'O', column);
        emitRoom(currentRoom);
      }
    }
  }, BOT_DELAY_MS);
}

function addSpectator(room, socket, name) {
  if (!isSpectator(room, socket.id) && !getPlayer(room, socket.id)) {
    room.spectators.push({ id: socket.id, name: cleanName(name) });
  }
  socket.join(room.id);
}

io.on('connection', (socket) => {
  socket.on('room:create', ({ name, game, mode }, reply) => {
    let id = makeRoomCode();
    while (rooms.has(id)) id = makeRoomCode();

    const room = defaultRoom(id, game, mode);
    room.players.push({ id: socket.id, name: cleanName(name), symbol: 'X', bot: false });
    if (room.mode === 'computer') room.players.push(botPlayer());
    rooms.set(id, room);

    socket.join(id);
    if (typeof reply === 'function') reply({ ok: true, roomId: id, symbol: 'X', role: 'player' });
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('room:join', ({ roomId, name }, reply) => {
    const id = normalizeRoomId(roomId);
    const room = rooms.get(id);

    if (!room) {
      if (typeof reply === 'function') reply({ ok: false, errorCode: 'ROOM_NOT_FOUND' });
      return;
    }

    if (room.mode === 'computer') {
      if (typeof reply === 'function') reply({ ok: false, errorCode: 'COMPUTER_ROOM_PLAYERS_LOCKED' });
      return;
    }

    if (room.players.length >= 2 && !getPlayer(room, socket.id)) {
      if (typeof reply === 'function') reply({ ok: false, errorCode: 'ROOM_FULL' });
      return;
    }

    if (!getPlayer(room, socket.id)) {
      const symbol = room.players.some((p) => p.symbol === 'X') ? 'O' : 'X';
      room.players.push({ id: socket.id, name: cleanName(name), symbol, bot: false });
      room.spectators = room.spectators.filter((p) => p.id !== socket.id);
      resetCurrentGame(room);
    }

    socket.join(id);
    if (typeof reply === 'function') reply({ ok: true, roomId: id, symbol: getSymbol(room, socket.id), role: 'player' });
    emitRoom(room);
  });

  socket.on('room:watch', ({ roomId, name }, reply) => {
    const id = normalizeRoomId(roomId);
    const room = rooms.get(id);

    if (!room) {
      if (typeof reply === 'function') reply({ ok: false, errorCode: 'ROOM_NOT_FOUND' });
      return;
    }

    addSpectator(room, socket, name);
    if (typeof reply === 'function') reply({ ok: true, roomId: id, role: 'spectator' });
    emitRoom(room);
  });

  socket.on('game:select', ({ roomId, game }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !isHumanPlayer(room, socket.id)) return;
    room.game = normalizeGame(game);
    resetCurrentGame(room);
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('scores:reset', ({ roomId }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !isHumanPlayer(room, socket.id)) return;
    resetAllScores(room);
    resetCurrentGame(room);
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('game:reset', ({ roomId }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !isHumanPlayer(room, socket.id)) return;
    resetCurrentGame(room);
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('rps:move', ({ roomId, move }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'rps') return;

    const symbol = getSymbol(room, socket.id);
    if (!symbol || !['rock', 'paper', 'scissors'].includes(move)) return;
    if (room.players.length < 2) return;

    room.rps.moves[symbol] = move;
    finalizeRpsIfReady(room);
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('ttt:move', ({ roomId, index }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'ttt') return;

    const symbol = getSymbol(room, socket.id);
    const cell = Number(index);
    if (!symbol || !Number.isInteger(cell) || cell < 0 || cell > 8) return;
    if (room.players.length < 2) return;

    if (applyTttMove(room, symbol, cell)) {
      emitRoom(room);
      scheduleBotMove(room);
    }
  });

  socket.on('dice:roll', ({ roomId }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'dice') return;

    const symbol = getSymbol(room, socket.id);
    if (!symbol || room.players.length < 2) return;
    if (room.dice.rolls[symbol]) return;

    room.dice.rolls[symbol] = rollDie();
    finalizeDiceIfReady(room);
    emitRoom(room);
    scheduleBotMove(room);
  });

  socket.on('c4:move', ({ roomId, column }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'c4') return;

    const symbol = getSymbol(room, socket.id);
    const col = Number(column);
    if (!symbol || !Number.isInteger(col) || col < 0 || col > 6) return;
    if (room.players.length < 2) return;

    if (applyC4Move(room, symbol, col)) {
      emitRoom(room);
      scheduleBotMove(room);
    }
  });

  socket.on('disconnect', () => {
    for (const [id, room] of rooms.entries()) {
      const wasPlayer = room.players.some((p) => p.id === socket.id);
      const wasSpectator = room.spectators.some((p) => p.id === socket.id);

      room.spectators = room.spectators.filter((p) => p.id !== socket.id);
      room.players = room.players.filter((p) => p.id !== socket.id);

      const humanPlayers = room.players.filter((p) => !p.bot);
      if (humanPlayers.length === 0) {
        clearBotTimer(room);
        rooms.delete(id);
        continue;
      }

      if (wasPlayer) {
        if (room.mode === 'online') {
          room.players.forEach((player, index) => {
            player.symbol = index === 0 ? 'X' : 'O';
          });
        }
        resetCurrentGame(room);
      }

      if (wasPlayer || wasSpectator) emitRoom(room);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Online games site is running on http://localhost:${PORT}`);
});
