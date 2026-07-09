const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true, credentials: true } });

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'smq-dev-secret-change-me',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
});

app.use(express.json({ limit: '1mb' }));
app.use(sessionMiddleware);
app.use(express.static(PUBLIC_DIR));
io.engine.use(sessionMiddleware);

const COLORS = ['#8b5cf6', '#06b6d4', '#f97316', '#22c55e', '#e11d48', '#facc15', '#a855f7', '#14b8a6', '#fb7185', '#60a5fa'];

const QUESTIONS = [
  { q: 'Сколько клеток на стандартной шахматной доске?', a: ['32', '48', '64', '81'], c: 2 },
  { q: 'Какая планета ближе всего к Солнцу?', a: ['Венера', 'Меркурий', 'Марс', 'Юпитер'], c: 1 },
  { q: 'Что означает HTML?', a: ['HyperText Markup Language', 'High Tool Machine Logic', 'Home Text Main Link', 'Hyperlink Main Language'], c: 0 },
  { q: 'Сколько минут в трёх часах?', a: ['120', '150', '180', '210'], c: 2 },
  { q: 'Какой океан самый большой?', a: ['Атлантический', 'Индийский', 'Северный Ледовитый', 'Тихий'], c: 3 },
  { q: 'Какая фигура имеет три стороны?', a: ['Квадрат', 'Треугольник', 'Круг', 'Ромб'], c: 1 },
  { q: 'Какой цвет получится из синего и жёлтого?', a: ['Зелёный', 'Фиолетовый', 'Оранжевый', 'Красный'], c: 0 },
  { q: 'Сколько будет 9 × 8?', a: ['64', '72', '81', '96'], c: 1 },
  { q: 'Какая страна использует песо?', a: ['Мексика', 'Канада', 'Япония', 'Норвегия'], c: 0 },
  { q: 'Как называется самая маленькая единица информации?', a: ['Файл', 'Бит', 'Байт', 'Папка'], c: 1 }
];

const gameMeta = {
  rps: { emoji: '✊', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  ttt: { emoji: '⭕', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  dice: { emoji: '🎲', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  connect4: { emoji: '🔴', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  memory: { emoji: '🧠', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  twentyone: { emoji: '21', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  reaction: { emoji: '⚡', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  checkers: { emoji: '⚫', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'strategy' },
  nim: { emoji: '🪵', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  code: { emoji: '🔐', maxPlayers: 1, minPlayers: 1, supportsBot: false, category: 'solo' },
  millionaire: { emoji: '💰', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' },
  teamquiz: { emoji: '🏁', maxPlayers: 10, minPlayers: 2, supportsBot: false, category: 'team' },
  mathrace: { emoji: '🧮', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' }
};

const rooms = new Map();

function sanitizeText(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  return value.replace(/[<>]/g, '').trim().slice(0, 80) || fallback;
}

function sanitizeId(value) {
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 160);
  return cleaned || null;
}

function sanitizeUrl(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) return null;
  return trimmed.slice(0, 1300);
}

function sanitizeColor(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const v = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  return fallback;
}

function makeRoomId() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 5; i++) id += alphabet[Math.floor(Math.random() * alphabet.length)];
  return rooms.has(id) ? makeRoomId() : id;
}

function initScores(length) {
  return Array.from({ length }, () => 0);
}

function makeRoom({ game, mode, teamCount }) {
  const safeGame = gameMeta[game] ? game : 'rps';
  const meta = gameMeta[safeGame];
  const id = makeRoomId();
  const count = Math.max(2, Math.min(4, Number(teamCount) || 2));
  const room = {
    id,
    game: safeGame,
    mode: mode === 'bot' && meta.supportsBot ? 'bot' : 'online',
    players: Array.from({ length: meta.maxPlayers }, () => null),
    spectators: new Set(),
    scores: initScores(meta.maxPlayers),
    ties: 0,
    teamCount: count,
    teamScores: initScores(count),
    status: 'waiting',
    winnerMessage: null,
    review: null,
    lastRound: null,
    createdAt: Date.now(),
    state: initState(safeGame, meta.maxPlayers, count)
  };
  rooms.set(id, room);
  return room;
}

function makeQuestionList() {
  return QUESTIONS.map(q => ({ ...q })).sort(() => Math.random() - 0.5).slice(0, 7);
}

function makeProblem() {
  const a = 2 + Math.floor(Math.random() * 18);
  const b = 2 + Math.floor(Math.random() * 12);
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const answer = op === '+' ? a + b : op === '-' ? a - b : a * b;
  return { text: `${a} ${op} ${b}`, answer };
}

function initState(game, maxPlayers = 2, teamCount = 2) {
  if (game === 'ttt') return { board: Array(9).fill(null), turn: 0, winner: null, winLine: null, lastMove: null };
  if (game === 'connect4') return { board: Array.from({ length: 6 }, () => Array(7).fill(null)), turn: 0, winner: null, winLine: null, lastMove: null };
  if (game === 'dice') return { rolls: initScores(maxPlayers).map(() => null), winner: null };
  if (game === 'memory') {
    const symbols = ['🍒', '🍋', '🍇', '🍉', '⭐', '🚀', '🎧', '💎'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5).map((value, index) => ({ id: index, value, revealed: false, matched: false }));
    return { cards, open: [], turn: 0, pairScore: [0, 0], winner: null, locked: false };
  }
  if (game === 'twentyone') return { total: 0, turn: 0, winner: null, lastAdd: null };
  if (game === 'reaction') return { readyAt: Date.now() + 1800 + Math.floor(Math.random() * 3200), taps: initScores(maxPlayers).map(() => null), winner: null, falseStart: null };
  if (game === 'checkers') return { board: initCheckersBoard(), turn: 0, winner: null, lastMove: null, captured: 0 };
  if (game === 'nim') return { sticks: 21, turn: 0, lastTake: null, winner: null };
  if (game === 'code') return { secret: makeSecret(), guesses: [], maxGuesses: 10, winner: null };
  if (game === 'millionaire') return { questions: makeQuestionList(), qIndex: 0, answers: {}, points: initScores(maxPlayers), showAnswer: null, finished: false };
  if (game === 'teamquiz') return { questions: makeQuestionList(), qIndex: 0, answers: {}, teamPoints: initScores(teamCount), showAnswer: null, finished: false };
  if (game === 'mathrace') return { round: 1, maxRounds: 6, problem: makeProblem(), answers: {}, points: initScores(maxPlayers), showAnswer: null, finished: false };
  return { moves: initScores(maxPlayers).map(() => null), winner: null, result: null };
}

function initCheckersBoard() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) if ((r + c) % 2 === 1) board[r][c] = { p: 1, k: false };
  for (let r = 5; r < 8; r++) for (let c = 0; c < 8; c++) if ((r + c) % 2 === 1) board[r][c] = { p: 0, k: false };
  return board;
}

function makeSecret() {
  return Array.from({ length: 4 }, () => String(1 + Math.floor(Math.random() * 6))).join('');
}

function socketGuestId(socket) {
  if (!socket.request.session.smqGuestId) {
    socket.request.session.smqGuestId = `guest:${uuid()}`;
    socket.request.session.save(() => {});
  }
  return socket.request.session.smqGuestId;
}

function playerPublic(player) {
  if (!player) return null;
  return {
    name: player.name,
    avatarUrl: player.avatarUrl || null,
    color: player.color || '#8b5cf6',
    team: player.team || 0,
    isBot: !!player.isBot,
    connected: !!player.connected
  };
}

function activePlayers(room) {
  return room.players.map((p, i) => p ? { ...p, index: i } : null).filter(Boolean);
}

function humanCount(room) {
  return room.players.filter(p => p && !p.isBot).length;
}

function firstEmptyIndex(room) {
  return room.players.findIndex(p => !p || (!p.connected && !p.isBot));
}

function shouldStart(room) {
  const meta = gameMeta[room.game];
  return activePlayers(room).length >= meta.minPlayers;
}

function addBot(room) {
  if (room.mode !== 'bot' || !gameMeta[room.game].supportsBot || room.players[1]?.isBot) return;
  room.players[1] = {
    socketId: `bot:${room.id}`,
    userId: `bot:${room.id}`,
    name: 'SMQ Bot',
    avatarUrl: null,
    color: '#ffce4a',
    team: 1,
    connected: true,
    isBot: true
  };
}

function makeMember(socket, payload, index) {
  const firebaseUid = sanitizeId(payload?.firebaseUid);
  const fallbackId = socketGuestId(socket);
  const userId = firebaseUid ? `firebase:${firebaseUid}` : fallbackId;
  return {
    socketId: socket.id,
    userId,
    name: sanitizeText(payload?.name, `Player ${index + 1}`),
    avatarUrl: sanitizeUrl(payload?.avatarUrl),
    color: sanitizeColor(payload?.color, COLORS[index % COLORS.length]),
    team: 0,
    connected: true,
    isBot: false
  };
}

function joinRoom(socket, payload = {}) {
  const game = payload.game || 'rps';
  const mode = payload.mode || 'online';
  const teamCount = payload.teamCount || 2;
  let room = payload.roomId ? rooms.get(String(payload.roomId).toUpperCase()) : null;
  if (!room) room = makeRoom({ game, mode, teamCount });
  const wantsSpectator = !!payload.spectate;
  let role = 'spectator';

  if (!wantsSpectator) {
    const tempId = sanitizeId(payload.firebaseUid) ? `firebase:${sanitizeId(payload.firebaseUid)}` : socketGuestId(socket);
    const existingIndex = room.players.findIndex(p => p && p.userId === tempId && !p.isBot);
    const empty = firstEmptyIndex(room);
    const index = existingIndex >= 0 ? existingIndex : empty;
    if (index >= 0) {
      const member = makeMember(socket, payload, index);
      member.team = room.game === 'teamquiz' ? index % room.teamCount : index;
      room.players[index] = member;
      role = `player${index + 1}`;
    } else {
      room.spectators.add(socket.id);
    }
  } else {
    room.spectators.add(socket.id);
  }

  if (room.mode === 'bot') addBot(room);
  if (shouldStart(room) && room.status === 'waiting') room.status = 'playing';
  socket.join(room.id);
  socket.data.roomId = room.id;
  socket.data.role = role;
  socket.emit('joined_room', { roomId: room.id, role, game: room.game, mode: room.mode });
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function serializeRoom(room) {
  const meta = gameMeta[room.game];
  return {
    id: room.id,
    game: room.game,
    gameMeta: meta,
    mode: room.mode,
    status: room.status,
    players: room.players.map(playerPublic),
    maxPlayers: meta.maxPlayers,
    minPlayers: meta.minPlayers,
    spectators: room.spectators.size,
    scores: room.scores,
    ties: room.ties,
    teamCount: room.teamCount,
    teamScores: room.teamScores,
    state: safeState(room),
    review: room.review,
    winnerMessage: room.winnerMessage,
    lastRound: room.lastRound,
    playerLink: `/room/${room.id}`,
    spectatorLink: `/room/${room.id}?spectate=1`
  };
}

function safeState(room) {
  if (room.game === 'memory') return { ...room.state, cards: room.state.cards.map(c => ({ id: c.id, value: c.revealed || c.matched ? c.value : null, revealed: c.revealed, matched: c.matched })) };
  if (room.game === 'code') return { ...room.state, secret: undefined };
  return room.state;
}

function emitRoom(room) {
  io.to(room.id).emit('room_state', serializeRoom(room));
}

function currentPlayerIndex(socket, room) {
  return room.players.findIndex(p => p && p.socketId === socket.id);
}

function isPlayersTurn(room, index) {
  if (!room.players[index] || room.status !== 'playing') return false;
  if (room.players[index].isBot) return true;
  if (['ttt', 'connect4', 'memory', 'twentyone', 'checkers', 'nim'].includes(room.game)) return room.state.turn === index;
  if (['millionaire', 'teamquiz', 'mathrace'].includes(room.game)) return !room.state.answers[String(index)] && !room.state.showAnswer;
  if (room.game === 'code') return index === 0;
  return true;
}

function handleAction(socket, action) {
  const room = rooms.get(socket.data.roomId);
  if (!room || room.status !== 'playing') return;
  const index = currentPlayerIndex(socket, room);
  if (index < 0 || !isPlayersTurn(room, index)) return;
  applyAction(room, index, action || {});
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function applyAction(room, index, action) {
  switch (room.game) {
    case 'rps': return rpsAction(room, index, action);
    case 'ttt': return tttAction(room, index, action);
    case 'dice': return diceAction(room, index, action);
    case 'connect4': return connect4Action(room, index, action);
    case 'memory': return memoryAction(room, index, action);
    case 'twentyone': return twentyoneAction(room, index, action);
    case 'reaction': return reactionAction(room, index, action);
    case 'checkers': return checkersAction(room, index, action);
    case 'nim': return nimAction(room, index, action);
    case 'code': return codeAction(room, index, action);
    case 'millionaire': return quizAction(room, index, action, false);
    case 'teamquiz': return quizAction(room, index, action, true);
    case 'mathrace': return mathRaceAction(room, index, action);
  }
}

function rpsAction(room, index, action) {
  const move = action.move;
  if (!['rock', 'paper', 'scissors'].includes(move) || room.state.moves[index]) return;
  room.state.moves[index] = move;
  if (room.state.moves[0] && room.state.moves[1]) {
    const winner = rpsWinner(room.state.moves[0], room.state.moves[1]);
    finishRound(room, winner, { type: 'rps', moves: room.state.moves, lastMove: `${room.players[0]?.name}: ${room.state.moves[0]} · ${room.players[1]?.name}: ${room.state.moves[1]}` });
  }
}

function rpsWinner(a, b) {
  if (a === b) return null;
  return ((a === 'rock' && b === 'scissors') || (a === 'paper' && b === 'rock') || (a === 'scissors' && b === 'paper')) ? 0 : 1;
}

function diceAction(room, index) {
  if (room.state.rolls[index]) return;
  room.state.rolls[index] = 1 + Math.floor(Math.random() * 6);
  const players = activePlayers(room);
  if (players.every(p => room.state.rolls[p.index])) {
    const best = Math.max(...players.map(p => room.state.rolls[p.index]));
    const winners = players.filter(p => room.state.rolls[p.index] === best).map(p => p.index);
    finishRound(room, winners.length === 1 ? winners[0] : null, { type: 'dice', rolls: room.state.rolls, lastMove: `🎲 ${room.state.rolls.filter(Boolean).join(' · ')}` });
  }
}

function tttAction(room, index, action) {
  const cell = Number(action.cell);
  if (!Number.isInteger(cell) || cell < 0 || cell > 8 || room.state.board[cell] !== null || room.state.turn !== index) return;
  room.state.board[cell] = index;
  room.state.lastMove = { player: index, cell };
  const result = tttResult(room.state.board);
  if (result.done) {
    room.state.winner = result.winner;
    room.state.winLine = result.line;
    finishRound(room, result.winner, { type: 'ttt', board: room.state.board, winLine: result.line, lastMove: `${room.players[index]?.name}: клетка ${cell + 1}` });
  } else room.state.turn = index === 0 ? 1 : 0;
}

function tttResult(board) {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const line of wins) {
    const [a,b,c] = line;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) return { done: true, winner: board[a], line };
  }
  if (board.every(v => v !== null)) return { done: true, winner: null, line: null };
  return { done: false };
}

function connect4Action(room, index, action) {
  const col = Number(action.col);
  if (!Number.isInteger(col) || col < 0 || col > 6 || room.state.turn !== index) return;
  const board = room.state.board;
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      board[row][col] = index;
      room.state.lastMove = { player: index, row, col };
      const result = connect4Result(board);
      if (result.done) {
        room.state.winner = result.winner;
        room.state.winLine = result.line;
        finishRound(room, result.winner, { type: 'connect4', board, winLine: result.line, lastMove: `${room.players[index]?.name}: колонка ${col + 1}` });
      } else room.state.turn = index === 0 ? 1 : 0;
      return;
    }
  }
}

function connect4Result(board) {
  const dirs = [[1,0],[0,1],[1,1],[1,-1]];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) {
    const player = board[r][c];
    if (player === null) continue;
    for (const [dr, dc] of dirs) {
      const line = [];
      for (let k = 0; k < 4; k++) {
        const rr = r + dr * k, cc = c + dc * k;
        if (rr < 0 || rr >= 6 || cc < 0 || cc >= 7 || board[rr][cc] !== player) break;
        line.push([rr, cc]);
      }
      if (line.length === 4) return { done: true, winner: player, line };
    }
  }
  if (board.every(row => row.every(v => v !== null))) return { done: true, winner: null, line: null };
  return { done: false };
}

function memoryAction(room, index, action) {
  if (room.state.locked || room.state.turn !== index) return;
  const cardIndex = Number(action.card);
  const card = room.state.cards[cardIndex];
  if (!card || card.matched || card.revealed) return;
  card.revealed = true;
  room.state.open.push(cardIndex);
  if (room.state.open.length === 2) {
    const [aIdx, bIdx] = room.state.open;
    const a = room.state.cards[aIdx], b = room.state.cards[bIdx];
    room.state.locked = true;
    if (a.value === b.value) {
      a.matched = true; b.matched = true;
      room.state.pairScore[index] += 1;
      room.state.open = [];
      room.state.locked = false;
      if (room.state.cards.every(c => c.matched)) {
        const [s0, s1] = room.state.pairScore;
        finishRound(room, s0 === s1 ? null : s0 > s1 ? 0 : 1, { type: 'memory', pairScore: room.state.pairScore, lastMove: `${a.value} + ${b.value}` });
      }
    } else {
      setTimeout(() => {
        a.revealed = false; b.revealed = false;
        room.state.open = [];
        room.state.locked = false;
        room.state.turn = index === 0 ? 1 : 0;
        emitRoom(room);
        if (room.mode === 'bot') maybeBotMove(room);
      }, 850);
    }
  }
}

function twentyoneAction(room, index, action) {
  const add = Number(action.add);
  if (![1,2,3].includes(add) || room.state.turn !== index || room.state.total + add > 21) return;
  room.state.total += add;
  room.state.lastAdd = { player: index, add };
  if (room.state.total === 21) finishRound(room, index, { type: 'twentyone', total: room.state.total, lastMove: `${room.players[index]?.name}: +${add}` });
  else room.state.turn = index === 0 ? 1 : 0;
}

function reactionAction(room, index) {
  const now = Date.now();
  if (room.state.winner !== null || room.state.taps[index]) return;
  if (now < room.state.readyAt) {
    const other = index === 0 ? 1 : 0;
    room.state.falseStart = index;
    finishRound(room, other, { type: 'reaction', falseStart: index, lastMove: `${room.players[index]?.name}: too early` });
    return;
  }
  room.state.taps[index] = now;
  finishRound(room, index, { type: 'reaction', reactionMs: now - room.state.readyAt, lastMove: `${room.players[index]?.name}: ${now - room.state.readyAt} ms` });
}

function checkersAction(room, index, action) {
  const from = action.from || [];
  const to = action.to || [];
  const move = validateCheckersMove(room.state.board, index, from[0], from[1], to[0], to[1]);
  if (!move || room.state.turn !== index) return;
  const piece = room.state.board[from[0]][from[1]];
  room.state.board[to[0]][to[1]] = piece;
  room.state.board[from[0]][from[1]] = null;
  let captured = 0;
  if (move.capture) {
    room.state.board[move.capture[0]][move.capture[1]] = null;
    captured = 1;
    room.state.captured += 1;
  }
  if ((piece.p === 0 && to[0] === 0) || (piece.p === 1 && to[0] === 7)) piece.k = true;
  room.state.lastMove = { player: index, from, to, captured };
  const other = index === 0 ? 1 : 0;
  if (countPieces(room.state.board, other) === 0 || legalCheckersMoves(room.state.board, other).length === 0) {
    finishRound(room, index, { type: 'checkers', lastMove: `${room.players[index]?.name}: ${from.join(',')} → ${to.join(',')}${captured ? ' ×' : ''}` });
  } else room.state.turn = other;
}

function validateCheckersMove(board, player, fr, fc, tr, tc) {
  if (![fr,fc,tr,tc].every(n => Number.isInteger(n) && n >= 0 && n < 8)) return null;
  const piece = board[fr][fc];
  if (!piece || piece.p !== player || board[tr][tc] || (tr + tc) % 2 !== 1) return null;
  const dr = tr - fr, dc = tc - fc;
  const dirs = piece.k ? [1, -1] : [player === 0 ? -1 : 1];
  if (Math.abs(dc) === 1 && dirs.includes(dr)) return { capture: null };
  if (Math.abs(dc) === 2 && dirs.includes(dr / 2)) {
    const mr = fr + dr / 2, mc = fc + dc / 2;
    if (board[mr][mc] && board[mr][mc].p !== player) return { capture: [mr, mc] };
  }
  return null;
}

function legalCheckersMoves(board, player) {
  const moves = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const piece = board[r][c];
    if (!piece || piece.p !== player) continue;
    for (const dr of piece.k ? [-1, 1] : [player === 0 ? -1 : 1]) for (const dc of [-1, 1]) {
      if (validateCheckersMove(board, player, r, c, r + dr, c + dc)) moves.push({ from: [r,c], to: [r+dr,c+dc] });
      if (validateCheckersMove(board, player, r, c, r + 2*dr, c + 2*dc)) moves.push({ from: [r,c], to: [r+2*dr,c+2*dc] });
    }
  }
  return moves;
}

function countPieces(board, player) {
  let count = 0;
  for (const row of board) for (const piece of row) if (piece && piece.p === player) count++;
  return count;
}

function nimAction(room, index, action) {
  const take = Number(action.take);
  if (![1,2,3].includes(take) || room.state.turn !== index || take > room.state.sticks) return;
  room.state.sticks -= take;
  room.state.lastTake = { player: index, take };
  if (room.state.sticks <= 0) finishRound(room, index, { type: 'nim', lastMove: `${room.players[index]?.name}: -${take}` });
  else room.state.turn = index === 0 ? 1 : 0;
}

function codeAction(room, index, action) {
  const guess = String(action.guess || '').replace(/[^1-6]/g, '').slice(0, 4);
  if (guess.length !== 4 || index !== 0) return;
  const result = scoreCode(room.state.secret, guess);
  room.state.guesses.push({ guess, ...result });
  if (result.bulls === 4) finishRound(room, index, { type: 'code', lastMove: `Код ${guess}`, guesses: room.state.guesses.length });
  else if (room.state.guesses.length >= room.state.maxGuesses) finishRound(room, null, { type: 'code', lastMove: `Секрет был ${room.state.secret}`, secret: room.state.secret });
}

function scoreCode(secret, guess) {
  let bulls = 0;
  const s = {}, g = {};
  for (let i = 0; i < 4; i++) {
    if (secret[i] === guess[i]) bulls++;
    else { s[secret[i]] = (s[secret[i]] || 0) + 1; g[guess[i]] = (g[guess[i]] || 0) + 1; }
  }
  let cows = 0;
  for (const k of Object.keys(g)) cows += Math.min(g[k], s[k] || 0);
  return { bulls, cows };
}

function quizAction(room, index, action, teamMode) {
  const answer = Number(action.answer);
  const q = room.state.questions[room.state.qIndex];
  if (!q || !Number.isInteger(answer) || answer < 0 || answer >= q.a.length || room.state.answers[String(index)] || room.state.showAnswer) return;
  room.state.answers[String(index)] = answer;
  const players = activePlayers(room).filter(p => !p.isBot);
  const done = players.every(p => room.state.answers[String(p.index)] !== undefined);
  if (!done) return;
  const correct = q.c;
  if (teamMode) {
    for (const p of players) if (room.state.answers[String(p.index)] === correct) room.state.teamPoints[p.team] = (room.state.teamPoints[p.team] || 0) + 1;
  } else {
    for (const p of players) if (room.state.answers[String(p.index)] === correct) room.state.points[p.index] = (room.state.points[p.index] || 0) + 1;
  }
  room.state.showAnswer = { correct, revealAt: Date.now() + 1900 };
  if (room.state.qIndex >= room.state.questions.length - 1) {
    setTimeout(() => finishQuiz(room, teamMode), 2000);
  } else {
    setTimeout(() => {
      if (!rooms.has(room.id) || room.status !== 'playing') return;
      room.state.qIndex += 1;
      room.state.answers = {};
      room.state.showAnswer = null;
      emitRoom(room);
    }, 2100);
  }
}

function finishQuiz(room, teamMode) {
  if (!rooms.has(room.id) || room.status !== 'playing') return;
  if (teamMode) {
    const max = Math.max(...room.state.teamPoints);
    const winners = room.state.teamPoints.map((s, i) => s === max ? i : null).filter(v => v !== null);
    const team = winners.length === 1 ? winners[0] : null;
    const winnerIndex = team === null ? null : room.players.findIndex(p => p && p.team === team);
    finishRound(room, winnerIndex, { type: 'teamquiz', winnerTeam: team, winnerLabel: team === null ? null : `Команда ${team + 1}`, lastMove: `Финальный счёт команд: ${room.state.teamPoints.join(' · ')}` });
  } else {
    const players = activePlayers(room).filter(p => !p.isBot);
    const max = Math.max(...players.map(p => room.state.points[p.index] || 0));
    const winners = players.filter(p => (room.state.points[p.index] || 0) === max).map(p => p.index);
    finishRound(room, winners.length === 1 ? winners[0] : null, { type: 'millionaire', lastMove: `Финальный счёт: ${room.state.points.filter((_, i) => room.players[i]).join(' · ')}` });
  }
}

function mathRaceAction(room, index, action) {
  const answer = Number(action.answer);
  if (!Number.isFinite(answer) || room.state.answers[String(index)] || room.state.showAnswer) return;
  const correct = answer === room.state.problem.answer;
  room.state.answers[String(index)] = { answer, correct };
  if (correct) room.state.points[index] = (room.state.points[index] || 0) + 1;
  const players = activePlayers(room).filter(p => !p.isBot);
  if (!players.every(p => room.state.answers[String(p.index)] !== undefined)) return;
  room.state.showAnswer = { correct: room.state.problem.answer, revealAt: Date.now() + 1600 };
  if (room.state.round >= room.state.maxRounds) {
    setTimeout(() => {
      const max = Math.max(...players.map(p => room.state.points[p.index] || 0));
      const winners = players.filter(p => (room.state.points[p.index] || 0) === max).map(p => p.index);
      finishRound(room, winners.length === 1 ? winners[0] : null, { type: 'mathrace', lastMove: `Финальный счёт: ${room.state.points.filter((_, i) => room.players[i]).join(' · ')}` });
    }, 1700);
  } else {
    setTimeout(() => {
      if (!rooms.has(room.id) || room.status !== 'playing') return;
      room.state.round += 1;
      room.state.problem = makeProblem();
      room.state.answers = {};
      room.state.showAnswer = null;
      emitRoom(room);
    }, 1800);
  }
}

function finishRound(room, winnerIndex, details = {}) {
  if (room.status !== 'playing') return;
  const reviewId = uuid();
  const revealAt = Date.now() + 1900;
  room.status = 'review';
  room.review = { id: reviewId, winnerIndex: winnerIndex ?? null, details, lastMove: details.lastMove || null, revealAt };
  emitRoom(room);
  setTimeout(() => finalizeRound(room.id, reviewId), Math.max(500, revealAt - Date.now()));
}

function finalizeRound(roomId, reviewId) {
  const room = rooms.get(roomId);
  if (!room || !room.review || room.review.id !== reviewId) return;
  const { winnerIndex, details } = room.review;
  if (winnerIndex === null || winnerIndex === undefined) {
    room.ties += 1;
    room.winnerMessage = { type: 'draw', text: 'DRAW!', winnerIndex: null };
  } else {
    room.scores[winnerIndex] = (room.scores[winnerIndex] || 0) + 1;
    const label = details?.winnerLabel || room.players[winnerIndex]?.name || `Player ${winnerIndex + 1}`;
    room.winnerMessage = { type: 'win', text: `${label} WINS!`, winnerIndex };
  }
  room.lastRound = { winnerIndex: winnerIndex ?? null, details, at: Date.now() };
  room.review = null;
  room.status = 'roundOver';
  emitRoom(room);
}

function newRound(room) {
  const meta = gameMeta[room.game];
  room.state = initState(room.game, meta.maxPlayers, room.teamCount);
  room.winnerMessage = null;
  room.review = null;
  room.lastRound = null;
  room.status = shouldStart(room) ? 'playing' : 'waiting';
  if (room.mode === 'bot') addBot(room);
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function maybeBotMove(room) {
  if (room.mode !== 'bot' || room.status !== 'playing') return;
  const botIndex = 1;
  if (!room.players[botIndex]?.isBot || !isPlayersTurn(room, botIndex)) return;
  setTimeout(() => {
    if (!rooms.has(room.id) || room.status !== 'playing' || !isPlayersTurn(room, botIndex)) return;
    const action = chooseBotAction(room);
    if (!action) return;
    applyAction(room, botIndex, action);
    emitRoom(room);
    if (room.status === 'playing' && ['memory'].includes(room.game)) maybeBotMove(room);
  }, 600 + Math.floor(Math.random() * 700));
}

function chooseBotAction(room) {
  const s = room.state;
  if (room.game === 'rps') return { move: ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)] };
  if (room.game === 'dice') return { type: 'roll' };
  if (room.game === 'ttt') return { cell: chooseTttCell(s.board) };
  if (room.game === 'connect4') return { col: chooseConnect4Col(s.board) };
  if (room.game === 'memory') {
    const available = s.cards.map((c, i) => (!c.matched && !c.revealed ? i : null)).filter(v => v !== null);
    return available.length ? { card: available[Math.floor(Math.random() * available.length)] } : null;
  }
  if (room.game === 'twentyone') {
    const rest = 21 - s.total;
    if (rest <= 3) return { add: rest };
    let add = (1 - s.total) % 4; if (add <= 0) add += 4;
    if (add < 1 || add > 3) add = 1 + Math.floor(Math.random() * 3);
    return { add };
  }
  if (room.game === 'reaction') {
    const delay = Math.max(0, s.readyAt - Date.now() + 190 + Math.floor(Math.random() * 500));
    setTimeout(() => { if (room.status === 'playing') { applyAction(room, 1, { type: 'tap' }); emitRoom(room); } }, delay);
    return null;
  }
  if (room.game === 'checkers') {
    const moves = legalCheckersMoves(s.board, 1);
    return moves.length ? moves[Math.floor(Math.random() * moves.length)] : null;
  }
  if (room.game === 'nim') {
    const take = s.sticks <= 3 ? s.sticks : ((s.sticks - 1) % 4) || (1 + Math.floor(Math.random() * 3));
    return { take: Math.max(1, Math.min(3, take)) };
  }
  return null;
}

function chooseTttCell(board) {
  const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
  for (const player of [1, 0]) for (const cell of empty) {
    const copy = [...board]; copy[cell] = player;
    const res = tttResult(copy);
    if (res.done && res.winner === player) return cell;
  }
  if (empty.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter(c => empty.includes(c));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

function chooseConnect4Col(board) {
  const valid = [];
  for (let c = 0; c < 7; c++) if (board[0][c] === null) valid.push(c);
  for (const player of [1, 0]) for (const col of valid) {
    const copy = board.map(row => [...row]);
    for (let r = 5; r >= 0; r--) if (copy[r][col] === null) { copy[r][col] = player; break; }
    const res = connect4Result(copy);
    if (res.done && res.winner === player) return col;
  }
  const centerOrder = [3, 2, 4, 1, 5, 0, 6].filter(c => valid.includes(c));
  return centerOrder[0] ?? valid[0];
}

io.on('connection', (socket) => {
  socket.on('join_room', (payload) => joinRoom(socket, payload));
  socket.on('game_action', (payload) => handleAction(socket, payload));
  socket.on('new_round', () => {
    const room = rooms.get(socket.data.roomId);
    if (!room) return;
    const index = currentPlayerIndex(socket, room);
    if (index < 0) return;
    newRound(room);
  });
  socket.on('disconnect', () => {
    const room = rooms.get(socket.data.roomId);
    if (!room) return;
    for (const player of room.players) if (player && player.socketId === socket.id) player.connected = false;
    room.spectators.delete(socket.id);
    emitRoom(room);
    setTimeout(() => cleanupRoom(room.id), 1000 * 60 * 10);
  });
});

function cleanupRoom(roomId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const hasConnected = room.players.some(p => p && !p.isBot && p.connected) || room.spectators.size > 0;
  if (!hasConnected) rooms.delete(roomId);
}

app.get('/room/:roomId', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));

server.listen(PORT, () => {
  console.log(`SMQ Games server running on port ${PORT}`);
});
