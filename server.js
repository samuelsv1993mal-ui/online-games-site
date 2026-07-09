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

app.use(express.static(path.join(__dirname, 'public')));

function makeRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i += 1) code += letters[Math.floor(Math.random() * letters.length)];
  return code;
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

function defaultRoom(id, game) {
  return {
    id,
    game: game === 'ttt' ? 'ttt' : 'rps',
    players: [],
    scores: { X: 0, O: 0, draws: 0 },
    rps: {
      moves: {},
      lastRound: null
    },
    ttt: createEmptyTtt(),
    createdAt: Date.now()
  };
}

function normalizeRoomId(value) {
  return String(value || '').trim().toUpperCase();
}

function cleanName(value) {
  const name = String(value || '').trim().slice(0, 18);
  return name || 'Игрок';
}

function getSymbol(room, socketId) {
  const player = room.players.find((p) => p.id === socketId);
  return player ? player.symbol : null;
}

function publicRoom(room) {
  return {
    id: room.id,
    game: room.game,
    players: room.players.map((p) => ({ id: p.id, name: p.name, symbol: p.symbol })),
    scores: room.scores,
    rps: {
      waitingFor: room.players
        .filter((p) => !room.rps.moves[p.symbol])
        .map((p) => p.symbol),
      lastRound: room.rps.lastRound
    },
    ttt: room.ttt
  };
}

function emitRoom(room) {
  io.to(room.id).emit('room:state', publicRoom(room));
}

function resetCurrentGame(room) {
  room.rps.moves = {};
  room.rps.lastRound = null;
  room.ttt = createEmptyTtt();
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

function decideRps(moveX, moveO) {
  if (moveX === moveO) return 'draw';

  const wins = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock'
  };

  return wins[moveX] === moveO ? 'X' : 'O';
}

function moveLabel(move) {
  return {
    rock: 'Камень',
    paper: 'Бумага',
    scissors: 'Ножницы'
  }[move] || move;
}

io.on('connection', (socket) => {
  socket.on('room:create', ({ name, game }, reply) => {
    let id = makeRoomCode();
    while (rooms.has(id)) id = makeRoomCode();

    const room = defaultRoom(id, game);
    room.players.push({ id: socket.id, name: cleanName(name), symbol: 'X' });
    rooms.set(id, room);

    socket.join(id);
    if (typeof reply === 'function') reply({ ok: true, roomId: id, symbol: 'X' });
    emitRoom(room);
  });

  socket.on('room:join', ({ roomId, name }, reply) => {
    const id = normalizeRoomId(roomId);
    const room = rooms.get(id);

    if (!room) {
      if (typeof reply === 'function') reply({ ok: false, error: 'Комната не найдена.' });
      return;
    }

    if (room.players.length >= 2 && !room.players.some((p) => p.id === socket.id)) {
      if (typeof reply === 'function') reply({ ok: false, error: 'В комнате уже 2 игрока.' });
      return;
    }

    if (!room.players.some((p) => p.id === socket.id)) {
      const symbol = room.players.some((p) => p.symbol === 'X') ? 'O' : 'X';
      room.players.push({ id: socket.id, name: cleanName(name), symbol });
      resetCurrentGame(room);
    }

    socket.join(id);
    if (typeof reply === 'function') reply({ ok: true, roomId: id, symbol: getSymbol(room, socket.id) });
    emitRoom(room);
  });

  socket.on('game:select', ({ roomId, game }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !getSymbol(room, socket.id)) return;
    room.game = game === 'ttt' ? 'ttt' : 'rps';
    resetCurrentGame(room);
    emitRoom(room);
  });

  socket.on('scores:reset', ({ roomId }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !getSymbol(room, socket.id)) return;
    resetAllScores(room);
    resetCurrentGame(room);
    emitRoom(room);
  });

  socket.on('game:reset', ({ roomId }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || !getSymbol(room, socket.id)) return;
    resetCurrentGame(room);
    emitRoom(room);
  });

  socket.on('rps:move', ({ roomId, move }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'rps') return;

    const symbol = getSymbol(room, socket.id);
    if (!symbol || !['rock', 'paper', 'scissors'].includes(move)) return;
    if (room.players.length < 2) return;

    room.rps.moves[symbol] = move;

    const moveX = room.rps.moves.X;
    const moveO = room.rps.moves.O;
    if (moveX && moveO) {
      const result = decideRps(moveX, moveO);
      if (result === 'draw') room.scores.draws += 1;
      else room.scores[result] += 1;

      room.rps.lastRound = {
        X: moveX,
        O: moveO,
        result,
        text: result === 'draw'
          ? `Ничья: ${moveLabel(moveX)} против ${moveLabel(moveO)}`
          : `Победил игрок ${result}: ${moveLabel(result === 'X' ? moveX : moveO)} сильнее ${moveLabel(result === 'X' ? moveO : moveX)}`
      };
      room.rps.moves = {};
    }

    emitRoom(room);
  });

  socket.on('ttt:move', ({ roomId, index }) => {
    const room = rooms.get(normalizeRoomId(roomId));
    if (!room || room.game !== 'ttt') return;

    const symbol = getSymbol(room, socket.id);
    const cell = Number(index);
    if (!symbol || !Number.isInteger(cell) || cell < 0 || cell > 8) return;
    if (room.players.length < 2) return;
    if (room.ttt.winner || room.ttt.draw) return;
    if (room.ttt.turn !== symbol) return;
    if (room.ttt.board[cell]) return;

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

    emitRoom(room);
  });

  socket.on('disconnect', () => {
    for (const [id, room] of rooms.entries()) {
      const before = room.players.length;
      room.players = room.players.filter((p) => p.id !== socket.id);

      if (before !== room.players.length) {
        if (room.players.length === 0) {
          rooms.delete(id);
        } else {
          room.players.forEach((player, index) => {
            player.symbol = index === 0 ? 'X' : 'O';
          });
          resetCurrentGame(room);
          emitRoom(room);
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Online games site is running on http://localhost:${PORT}`);
});
