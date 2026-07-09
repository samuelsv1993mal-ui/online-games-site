const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');
const WHOAMI_QUESTIONS = require('./data/whoami-questions.json');

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
const BOT_DIFFICULTIES = ['beginner', 'normal', 'expert', 'champion'];
const BOT_NAMES = {
  beginner: 'SMQ Bot · Beginner',
  normal: 'SMQ Bot · Normal',
  expert: 'SMQ Bot · Expert',
  champion: 'SMQ Bot · World Champion'
};
function normalizeDifficulty(value) {
  return ['random', ...BOT_DIFFICULTIES].includes(value) ? value : 'random';
}
function resolveDifficulty(value) {
  const normalized = normalizeDifficulty(value);
  if (normalized === 'random') return BOT_DIFFICULTIES[Math.floor(Math.random() * BOT_DIFFICULTIES.length)];
  return normalized;
}

const GENERAL_QUESTIONS = require('./data/general-questions.json');
const BIBLE_QUESTIONS = require('./data/bible-questions.json');

const WORD_BANKS = {
  ru:['ЛЮБОВ','ДОБРО','МИРНО','СВЕТА','ПСАЛМ','КНИГА','ЗАВЕТ','МОЛИТ','РАДОС','БЛАГО'],
  es:['GRANO','SALMO','REINO','AMIGO','ORARA','JUSTO','VERBO','ANGEL','CIELO','SANTO'],
  en:['GRACE','TRUTH','PEACE','LIGHT','PSALM','FAITH','GLORY','MERCY','CROWN','ANGEL']
};

const gameMeta = {
  rps: { emoji: '✊', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  ttt: { emoji: '⭕', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  dice: { emoji: '🎲', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  connect4: { emoji: '🔴', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  memory: { emoji: '🧠', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  twentyone: { emoji: '21', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  reaction: { emoji: '⚡', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'duel' },
  checkers: { emoji: '⚫', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'strategy' },
  chess: { emoji: '♞', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'strategy' },
  nim: { emoji: '🪵', maxPlayers: 2, minPlayers: 2, supportsBot: true, category: 'logic' },
  code: { emoji: '🔐', maxPlayers: 1, minPlayers: 1, supportsBot: false, category: 'solo' },
  wordguess: { emoji: '🔤', maxPlayers: 1, minPlayers: 1, supportsBot: false, category: 'solo' },
  millionaire: { emoji: '💰', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' },
  teamquiz: { emoji: '🏁', maxPlayers: 10, minPlayers: 2, supportsBot: false, category: 'team' },
  mathrace: { emoji: '🧮', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' },
  biblequiz: { emoji: '📖', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'bible' },
  whoami: { emoji: '🎭', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' },
  guesstime: { emoji: '⏱️', maxPlayers: 10, minPlayers: 1, supportsBot: false, category: 'party' }
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

function makeRoom({ game, mode, teamCount, difficulty }) {
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
    difficulty: resolveDifficulty(difficulty),
    requestedDifficulty: normalizeDifficulty(difficulty),
    teamScores: initScores(count),
    status: 'waiting',
    winnerMessage: null,
    review: null,
    lastRound: null,
    hostIndex: null,
    createdAt: Date.now(),
    state: initState(safeGame, meta.maxPlayers, count)
  };
  rooms.set(id, room);
  return room;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function questionAnswerCount(q) {
  if (Array.isArray(q?.a)) return q.a.length;
  if (q?.a && Array.isArray(q.a.ru)) return q.a.ru.length;
  if (q?.a && Array.isArray(q.a.en)) return q.a.en.length;
  if (q?.a && Array.isArray(q.a.es)) return q.a.es.length;
  return 0;
}

function shuffleQuestionAnswers(q) {
  const count = questionAnswerCount(q);
  if (!count) return { ...q };
  const order = shuffle(Array.from({ length: count }, (_, i) => i));
  const copy = { ...q };
  const oldCorrect = Number(q.c) || 0;
  copy.c = order.indexOf(oldCorrect);
  if (Array.isArray(q.a)) copy.a = order.map(i => q.a[i]);
  else {
    copy.a = {};
    for (const lang of ['ru','es','en']) {
      const arr = Array.isArray(q.a?.[lang]) ? q.a[lang] : (q.a?.ru || q.a?.es || q.a?.en || []);
      copy.a[lang] = order.map(i => arr[i]);
    }
  }
  return copy;
}

function makeQuestionList(type = 'general') {
  const isBibleMode = type === 'bible' || type === 'millionaire';
  const bank = isBibleMode ? BIBLE_QUESTIONS : GENERAL_QUESTIONS;
  const plan = type === 'millionaire'
    ? { easy: 5, medium: 5, hard: 5, total: 15 }
    : type === 'bible'
      ? { easy: 5, medium: 5, hard: 4, total: 14 }
      : { easy: 3, medium: 3, hard: 1, total: 7 };
  const picked = [
    ...shuffle(bank.filter(q => q.difficulty === 'easy')).slice(0, plan.easy),
    ...shuffle(bank.filter(q => q.difficulty === 'medium')).slice(0, plan.medium),
    ...shuffle(bank.filter(q => q.difficulty === 'hard')).slice(0, plan.hard)
  ];
  const fallback = shuffle(bank.filter(q => !picked.includes(q))).slice(0, Math.max(0, plan.total - picked.length));
  return shuffle([...picked, ...fallback]).slice(0, plan.total).map(shuffleQuestionAnswers);
}

function makeProblem() {
  const a = 2 + Math.floor(Math.random() * 18);
  const b = 2 + Math.floor(Math.random() * 12);
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const answer = op === '+' ? a + b : op === '-' ? a - b : a * b;
  return { text: `${a} ${op} ${b}`, answer };
}

function newGuessTimeTarget(mode = 'minute') {
  if (mode === 'random') return 1000 + Math.floor(Math.random() * (300000 - 1000 + 1));
  return 60000;
}

function formatMs(ms) {
  const safe = Math.max(0, Math.round(Number(ms) || 0));
  const minutes = Math.floor(safe / 60000);
  const seconds = Math.floor((safe % 60000) / 1000);
  const milli = safe % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milli).padStart(3, '0')}`;
}

function chooseWord(lang = 'ru') {
  const list = WORD_BANKS[lang] || WORD_BANKS.ru;
  return String(list[Math.floor(Math.random() * list.length)] || 'ДОБРО').toUpperCase().slice(0, 5);
}
function initChessBoard() {
  const back = ['r','n','b','q','k','b','n','r'];
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let c = 0; c < 8; c++) {
    board[0][c] = { p:1, t:back[c] };
    board[1][c] = { p:1, t:'p' };
    board[6][c] = { p:0, t:'p' };
    board[7][c] = { p:0, t:back[c] };
  }
  return board;
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
  if (game === 'chess') return { board: initChessBoard(), turn: 0, winner: null, lastMove: null, check: null, checkMate: null, castlingRights: { 0:{ king:true, queen:true }, 1:{ king:true, queen:true } } };
  if (game === 'nim') return { sticks: 21, turn: 0, lastTake: null, winner: null };
  if (game === 'code') return { secret: makeSecret(), guesses: [], maxGuesses: 10, winner: null };
  if (game === 'wordguess') return { secret: chooseWord('ru'), lang:'ru', wordLength:5, guesses:[], maxGuesses:6, winner:null, finished:false, reveal:null };
  if (game === 'millionaire') return { questions: makeQuestionList('millionaire'), qIndex: 0, answers: {}, points: initScores(maxPlayers), showAnswer: null, finished: false };
  if (game === 'biblequiz') return { questions: makeQuestionList('bible'), qIndex: 0, answers: {}, points: initScores(maxPlayers), showAnswer: null, finished: false };
  if (game === 'teamquiz') return { questions: makeQuestionList('general'), qIndex: 0, answers: {}, teamPoints: initScores(teamCount), showAnswer: null, finished: false };
  if (game === 'mathrace') return { round: 1, maxRounds: 6, problem: makeProblem(), answers: {}, points: initScores(maxPlayers), showAnswer: null, finished: false };
  if (game === 'guesstime') return {
    timeMode: 'minute',
    targetMs: 60000,
    activeIndex: 0,
    phase: 'setup',
    startAt: null,
    stoppedAt: null,
    elapsedMs: null,
    diffMs: null,
    attempts: [],
    lastResult: null
  };
  if (game === 'whoami') return {
    hostIndex: null,
    scores: initScores(maxPlayers),
    order: [],
    turnPos: 0,
    currentPlayer: null,
    currentHolder: null,
    originalPlayer: null,
    transferDepth: 0,
    phase: 'ready',
    question: null,
    pending: null,
    used: [],
    spinEndsAt: null,
    lastEvent: null
  };
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
    name: BOT_NAMES[room.difficulty] || 'SMQ Bot',
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
  const difficulty = normalizeDifficulty(payload.difficulty);
  let room = payload.roomId ? rooms.get(String(payload.roomId).toUpperCase()) : null;
  if (!room) room = makeRoom({ game, mode, teamCount, difficulty });
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
      if (room.game === 'whoami' && (room.state.hostIndex === null || room.state.hostIndex === undefined)) {
        room.state.hostIndex = index;
        room.hostIndex = index;
      }
      role = `player${index + 1}`;
      if (room.game === 'wordguess' && !room.state.guesses?.length) {
        const lang = ['ru','es','en'].includes(payload?.lang) ? payload.lang : 'ru';
        room.state.lang = lang;
        room.state.secret = chooseWord(lang);
      }
    } else {
      room.spectators.add(socket.id);
    }
  } else {
    room.spectators.add(socket.id);
  }

  if (room.mode === 'bot') addBot(room);
  if (room.game === 'whoami') prepareWhoAmI(room);
  if (room.game === 'guesstime') normalizeGuessTimeState(room);
  if (shouldStart(room) && room.status === 'waiting') room.status = 'playing';
  if (room.game === 'whoami') prepareWhoAmI(room);
  if (room.game === 'guesstime') normalizeGuessTimeState(room);
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
    difficulty: room.difficulty || 'normal',
    requestedDifficulty: room.requestedDifficulty || room.difficulty || 'normal',
    teamScores: room.teamScores,
    hostIndex: room.game === 'whoami' ? room.state.hostIndex : room.hostIndex,
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
  if (room.game === 'wordguess') return { ...room.state, secret: undefined };
  if (room.game === 'whoami') {
    const state = { ...room.state };
    if (state.phase === 'spinning' && state.question) state.question = { id: state.question.id };
    return state;
  }
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
  if (['ttt', 'connect4', 'memory', 'twentyone', 'checkers', 'chess', 'nim'].includes(room.game)) return room.state.turn === index;
  if (['millionaire', 'teamquiz', 'mathrace', 'biblequiz'].includes(room.game)) return !room.state.answers[String(index)] && !room.state.showAnswer;
  if (['code','wordguess'].includes(room.game)) return index === 0;
  if (room.game === 'guesstime') return room.state.activeIndex === index && ['setup','ready','running','stopped'].includes(room.state.phase);
  return true;
}

function handleAction(socket, action) {
  const room = rooms.get(socket.data.roomId);
  if (!room || room.status !== 'playing') return;
  const index = currentPlayerIndex(socket, room);
  if (index < 0) return;
  if (room.game === 'whoami') {
    whoamiAction(room, index, action || {});
    room.scores = [...(room.state.scores || room.scores)];
    emitRoom(room);
    return;
  }
  if (!isPlayersTurn(room, index)) return;
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
    case 'chess': return chessAction(room, index, action);
    case 'nim': return nimAction(room, index, action);
    case 'code': return codeAction(room, index, action);
    case 'wordguess': return wordGuessAction(room, index, action);
    case 'millionaire': return quizAction(room, index, action, false);
    case 'teamquiz': return quizAction(room, index, action, true);
    case 'biblequiz': return quizAction(room, index, action, false);
    case 'mathrace': return mathRaceAction(room, index, action);
    case 'whoami': return whoamiAction(room, index, action);
    case 'guesstime': return guessTimeAction(room, index, action);
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
  const piece = board?.[fr]?.[fc];
  const target = board?.[tr]?.[tc];
  if (!piece || piece.p !== player || target || (tr + tc) % 2 !== 1) return null;
  const dr = tr - fr, dc = tc - fc;
  const adr = Math.abs(dr), adc = Math.abs(dc);
  if (adr !== adc || adr === 0) return null;

  if (!piece.k) {
    const forward = player === 0 ? -1 : 1;
    if (adr === 1 && dr === forward) return { capture: null };
    if (adr === 2) {
      const mr = fr + dr / 2, mc = fc + dc / 2;
      const middle = board?.[mr]?.[mc];
      if (middle && middle.p !== player) return { capture: [mr, mc] };
    }
    return null;
  }

  const sr = Math.sign(dr), sc = Math.sign(dc);
  let enemy = null;
  for (let r = fr + sr, c = fc + sc; r !== tr; r += sr, c += sc) {
    const current = board?.[r]?.[c];
    if (!current) continue;
    if (current.p === player) return null;
    if (enemy) return null;
    enemy = [r, c];
  }
  return { capture: enemy };
}

function legalCheckersMoves(board, player) {
  const moves = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const piece = board?.[r]?.[c];
    if (!piece || piece.p !== player) continue;
    if (piece.k) {
      for (const dr of [-1, 1]) for (const dc of [-1, 1]) {
        for (let step = 1; step < 8; step++) {
          const tr = r + dr * step, tc = c + dc * step;
          if (tr < 0 || tr > 7 || tc < 0 || tc > 7) break;
          const move = validateCheckersMove(board, player, r, c, tr, tc);
          if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
        }
      }
    } else {
      const forward = player === 0 ? -1 : 1;
      for (const dc of [-1, 1]) {
        const tr = r + forward, tc = c + dc;
        const move = validateCheckersMove(board, player, r, c, tr, tc);
        if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
      }
      for (const dr of [-2, 2]) for (const dc of [-2, 2]) {
        const tr = r + dr, tc = c + dc;
        const move = validateCheckersMove(board, player, r, c, tr, tc);
        if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
      }
    }
  }
  return moves;
}

function cloneChessBoard(board) {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

function findKing(board, player) {
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const piece = board[r][c];
    if (piece && piece.p === player && piece.t === 'k') return [r, c];
  }
  return null;
}

function isChessPathClear(board, fr, fc, tr, tc) {
  const dr = tr - fr, dc = tc - fc;
  const sr = Math.sign(dr), sc = Math.sign(dc);
  let r = fr + sr, c = fc + sc;
  while (r !== tr || c !== tc) {
    if (board[r][c]) return false;
    r += sr; c += sc;
  }
  return true;
}

function isSquareAttacked(board, r, c, byPlayer) {
  for (let fr = 0; fr < 8; fr++) for (let fc = 0; fc < 8; fc++) {
    const piece = board[fr][fc];
    if (!piece || piece.p !== byPlayer) continue;
    const dr = r - fr, dc = c - fc, adr = Math.abs(dr), adc = Math.abs(dc);
    const dir = byPlayer === 0 ? -1 : 1;
    if (piece.t === 'p' && dr === dir && adc === 1) return true;
    if (piece.t === 'n' && ((adr === 2 && adc === 1) || (adr === 1 && adc === 2))) return true;
    if (piece.t === 'k' && Math.max(adr, adc) === 1) return true;
    if (piece.t === 'b' && adr === adc && isChessPathClear(board, fr, fc, r, c)) return true;
    if (piece.t === 'r' && (dr === 0 || dc === 0) && isChessPathClear(board, fr, fc, r, c)) return true;
    if (piece.t === 'q' && (dr === 0 || dc === 0 || adr === adc) && isChessPathClear(board, fr, fc, r, c)) return true;
  }
  return false;
}

function isKingInCheck(board, player) {
  const king = findKing(board, player);
  if (!king) return true;
  return isSquareAttacked(board, king[0], king[1], player === 0 ? 1 : 0);
}

function pseudoChessMove(board, player, fr, fc, tr, tc, state = {}) {
  if (![fr,fc,tr,tc].every(n => Number.isInteger(n) && n >= 0 && n < 8)) return null;
  if (fr === tr && fc === tc) return null;
  const piece = board?.[fr]?.[fc];
  const target = board?.[tr]?.[tc];
  if (!piece || piece.p !== player || (target && target.p === player)) return null;
  const dr = tr - fr, dc = tc - fc, adr = Math.abs(dr), adc = Math.abs(dc);
  const dir = player === 0 ? -1 : 1;

  if (piece.t === 'k' && dr === 0 && adc === 2 && !target) {
    const homeRow = player === 0 ? 7 : 0;
    if (fr !== homeRow || fc !== 4 || isKingInCheck(board, player)) return null;
    const side = dc > 0 ? 'king' : 'queen';
    const rights = state.castlingRights?.[player]?.[side] !== false;
    const rookCol = dc > 0 ? 7 : 0;
    const rook = board[homeRow][rookCol];
    if (!rights || !rook || rook.p !== player || rook.t !== 'r') return null;
    const between = dc > 0 ? [5, 6] : [1, 2, 3];
    if (between.some(col => board[homeRow][col])) return null;
    const through = dc > 0 ? [5, 6] : [3, 2];
    if (through.some(col => isSquareAttacked(board, homeRow, col, player === 0 ? 1 : 0))) return null;
    return { capture:false, castle:{ rookFrom:[homeRow, rookCol], rookTo:[homeRow, dc > 0 ? 5 : 3] } };
  }

  switch (piece.t) {
    case 'p':
      if (dc === 0 && !target) {
        if (dr === dir) return { capture:false };
        const start = player === 0 ? 6 : 1;
        if (fr === start && dr === dir * 2 && !board[fr + dir][fc]) return { capture:false };
      }
      if (adc === 1 && dr === dir && target && target.p !== player) return { capture:true };
      return null;
    case 'r': if ((dr === 0 || dc === 0) && isChessPathClear(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'b': if (adr === adc && isChessPathClear(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'q': if ((dr === 0 || dc === 0 || adr === adc) && isChessPathClear(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'n': if ((adr === 2 && adc === 1) || (adr === 1 && adc === 2)) return { capture:!!target }; return null;
    case 'k': if (Math.max(adr, adc) === 1) return { capture:!!target }; return null;
  }
  return null;
}

function applyChessMoveToBoard(board, fr, fc, tr, tc, move) {
  const copy = cloneChessBoard(board);
  const piece = copy[fr][fc];
  copy[tr][tc] = piece;
  copy[fr][fc] = null;
  if (move?.castle) {
    const [rr, rc] = move.castle.rookFrom;
    const [trr, trc] = move.castle.rookTo;
    copy[trr][trc] = copy[rr][rc];
    copy[rr][rc] = null;
  }
  if (piece?.t === 'p' && ((piece.p === 0 && tr === 0) || (piece.p === 1 && tr === 7))) piece.t = 'q';
  return copy;
}

function validateChessMove(board, player, fr, fc, tr, tc, state = {}) {
  const move = pseudoChessMove(board, player, fr, fc, tr, tc, state);
  if (!move) return null;
  const after = applyChessMoveToBoard(board, fr, fc, tr, tc, move);
  if (isKingInCheck(after, player)) return null;
  return move;
}

function legalChessMoves(board, player, state = {}) {
  const moves = [];
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
    const piece = board[r][c];
    if (!piece || piece.p !== player) continue;
    for (let tr=0;tr<8;tr++) for (let tc=0;tc<8;tc++) {
      const mv = validateChessMove(board, player, r,c,tr,tc,state);
      if (mv) moves.push({ from:[r,c], to:[tr,tc], capture:mv.capture, castle:mv.castle });
    }
  }
  return moves;
}
function hasKing(board, player) {
  return board.some(row => row.some(cell => cell && cell.p === player && cell.t === 'k'));
}
function updateCastlingRights(state, player, piece, from, to, captured) {
  if (!state.castlingRights) state.castlingRights = { 0:{ king:true, queen:true }, 1:{ king:true, queen:true } };
  if (!state.castlingRights[player]) state.castlingRights[player] = { king:true, queen:true };
  const other = player === 0 ? 1 : 0;
  if (!state.castlingRights[other]) state.castlingRights[other] = { king:true, queen:true };
  if (piece.t === 'k') { state.castlingRights[player].king = false; state.castlingRights[player].queen = false; }
  if (piece.t === 'r') {
    if (from[0] === (player === 0 ? 7 : 0) && from[1] === 0) state.castlingRights[player].queen = false;
    if (from[0] === (player === 0 ? 7 : 0) && from[1] === 7) state.castlingRights[player].king = false;
  }
  if (captured && captured.t === 'r') {
    if (to[0] === (other === 0 ? 7 : 0) && to[1] === 0) state.castlingRights[other].queen = false;
    if (to[0] === (other === 0 ? 7 : 0) && to[1] === 7) state.castlingRights[other].king = false;
  }
}
function chessAction(room, index, action) {
  const from = action.from || [];
  const to = action.to || [];
  const move = validateChessMove(room.state.board, index, from[0], from[1], to[0], to[1], room.state);
  if (!move || room.state.turn !== index) return;
  const piece = room.state.board[from[0]][from[1]];
  const captured = room.state.board[to[0]][to[1]];
  room.state.board[to[0]][to[1]] = piece;
  room.state.board[from[0]][from[1]] = null;
  if (move.castle) {
    const [rr, rc] = move.castle.rookFrom;
    const [trr, trc] = move.castle.rookTo;
    room.state.board[trr][trc] = room.state.board[rr][rc];
    room.state.board[rr][rc] = null;
  }
  if (piece.t === 'p' && ((piece.p === 0 && to[0] === 0) || (piece.p === 1 && to[0] === 7))) piece.t = 'q';
  updateCastlingRights(room.state, index, piece, from, to, captured);
  room.state.lastMove = { player:index, from, to, captured: captured ? captured.t : null, castle: !!move.castle };
  const other = index === 0 ? 1 : 0;
  room.state.check = isKingInCheck(room.state.board, other) ? other : null;
  room.state.checkMate = null;
  const nextMoves = legalChessMoves(room.state.board, other, room.state);
  const notation = `${room.players[index]?.name}: ${from.join(',')} → ${to.join(',')}${move.castle ? ' 0-0' : captured ? ' ×' : ''}`;
  if (!hasKing(room.state.board, other) || (!nextMoves.length && room.state.check === other)) {
    room.state.checkMate = other;
    finishRound(room, index, { type:'chess', captured: captured ? captured.t : null, check: room.state.check, checkMate: other, lastMove:`${notation} · mate` });
  } else if (!nextMoves.length) {
    finishRound(room, null, { type:'chess', check: null, checkMate: null, lastMove:'Stalemate' });
  } else room.state.turn = other;
}
function wordHint(secret, guess) {
  const hints = Array(secret.length).fill('absent');
  const rest = {};
  for (let i = 0; i < secret.length; i++) {
    if (guess[i] === secret[i]) hints[i] = 'correct';
    else rest[secret[i]] = (rest[secret[i]] || 0) + 1;
  }
  for (let i = 0; i < secret.length; i++) {
    if (hints[i] === 'correct') continue;
    const ch = guess[i];
    if (rest[ch]) { hints[i] = 'present'; rest[ch] -= 1; }
  }
  return hints;
}
function wordGuessAction(room, index, action) {
  const guess = String(action.guess || '').trim().toUpperCase().replace(/[^A-ZА-ЯЁ]/gi, '').slice(0, 5);
  if (index !== 0 || room.state.finished || guess.length !== room.state.wordLength) return;
  const hints = wordHint(room.state.secret, guess);
  room.state.guesses.push({ guess, letters: guess.split(''), hints });
  if (guess === room.state.secret) {
    room.state.winner = true; room.state.finished = true; finishRound(room, 0, { type:'wordguess', lastMove:`${guess}` }); return;
  }
  if (room.state.guesses.length >= room.state.maxGuesses) {
    room.state.winner = false; room.state.finished = true; room.state.reveal = room.state.secret; finishRound(room, null, { type:'wordguess', lastMove:`${room.state.secret}`, secret:room.state.secret });
  }
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
  if (!q || !Number.isInteger(answer) || answer < 0 || answer >= questionAnswerCount(q) || room.state.answers[String(index)] || room.state.showAnswer) return;
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
    finishRound(room, winners.length === 1 ? winners[0] : null, { type: room.game, lastMove: `Финальный счёт: ${room.state.points.filter((_, i) => room.players[i]).join(' · ')}` });
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


function guessTimeActiveIndices(room) {
  return activePlayers(room).filter(p => !p.isBot).map(p => p.index);
}

function normalizeGuessTimeState(room) {
  if (room.game !== 'guesstime') return;
  const s = room.state;
  const active = guessTimeActiveIndices(room);
  if (!active.length) return;
  if (!active.includes(s.activeIndex)) s.activeIndex = active[0];
  if (!s.targetMs) s.targetMs = newGuessTimeTarget(s.timeMode || 'minute');
  if (!Array.isArray(s.attempts)) s.attempts = [];
}

function nextGuessTimeIndex(room) {
  const s = room.state;
  const active = guessTimeActiveIndices(room);
  const attempted = new Set((s.attempts || []).map(a => a.playerIndex));
  const remaining = active.filter(i => !attempted.has(i));
  if (!remaining.length) return null;
  const pos = remaining.indexOf(s.activeIndex);
  if (pos >= 0 && remaining[pos + 1] !== undefined) return remaining[pos + 1];
  return remaining[0];
}

function sortedGuessTimeResults(state) {
  return [...(state.attempts || [])].sort((a, b) => (a.diffMs || 0) - (b.diffMs || 0));
}

function guessTimeAction(room, index, action) {
  normalizeGuessTimeState(room);
  const s = room.state;
  const type = action.type;
  const active = guessTimeActiveIndices(room);
  if (!active.length) return;

  if (type === 'setMode' && (s.phase === 'setup' || s.phase === 'ready') && (s.attempts || []).length === 0) {
    const mode = action.mode === 'random' ? 'random' : 'minute';
    s.timeMode = mode;
    s.targetMs = newGuessTimeTarget(mode);
    s.phase = 'ready';
    s.lastResult = null;
    s.elapsedMs = null;
    s.diffMs = null;
    return;
  }

  if (index !== s.activeIndex) return;

  if (type === 'start' && (s.phase === 'setup' || s.phase === 'ready' || s.phase === 'stopped')) {
    if ((s.attempts || []).some(a => a.playerIndex === index)) return;
    s.phase = 'running';
    s.startAt = Date.now();
    s.stoppedAt = null;
    s.elapsedMs = null;
    s.diffMs = null;
    s.lastResult = null;
    return;
  }

  if (type === 'stop' && s.phase === 'running' && s.startAt) {
    const stoppedAt = Date.now();
    const elapsedMs = Math.max(0, stoppedAt - s.startAt);
    const diffMs = Math.abs(elapsedMs - s.targetMs);
    const result = {
      playerIndex: index,
      targetMs: s.targetMs,
      stoppedMs: elapsedMs,
      diffMs,
      startedAt: s.startAt,
      stoppedAt
    };
    s.attempts = (s.attempts || []).filter(a => a.playerIndex !== index).concat(result);
    s.phase = 'stopped';
    s.stoppedAt = stoppedAt;
    s.elapsedMs = elapsedMs;
    s.diffMs = diffMs;
    s.lastResult = result;
    s.startAt = null;

    const attempted = new Set(s.attempts.map(a => a.playerIndex));
    const allDone = active.every(i => attempted.has(i));
    if (allDone) {
      s.phase = 'finished';
      const sorted = sortedGuessTimeResults(s);
      const winnerIndex = sorted[0]?.playerIndex ?? null;
      setTimeout(() => {
        const liveRoom = rooms.get(room.id);
        if (!liveRoom || liveRoom.status !== 'playing' || liveRoom.game !== 'guesstime') return;
        const liveSorted = sortedGuessTimeResults(liveRoom.state);
        const liveWinner = liveSorted[0]?.playerIndex ?? null;
        finishRound(liveRoom, liveWinner, {
          type: 'guesstime',
          targetMs: liveRoom.state.targetMs,
          results: liveSorted,
          lastMove: `🎯 ${formatMs(liveRoom.state.targetMs)} · ${room.players[index]?.name || 'Player'}: ${formatMs(elapsedMs)} (${diffMs} ms)`
        });
      }, 2400);
    } else {
      const currentStop = stoppedAt;
      setTimeout(() => {
        const liveRoom = rooms.get(room.id);
        if (!liveRoom || liveRoom.status !== 'playing' || liveRoom.game !== 'guesstime') return;
        const liveState = liveRoom.state;
        if (liveState.phase !== 'stopped' || liveState.stoppedAt !== currentStop) return;
        const next = nextGuessTimeIndex(liveRoom);
        if (next === null) return;
        liveState.activeIndex = next;
        liveState.phase = 'ready';
        liveState.startAt = null;
        liveState.stoppedAt = null;
        liveState.elapsedMs = null;
        liveState.diffMs = null;
        liveState.lastResult = null;
        emitRoom(liveRoom);
      }, 2600);
    }
  }
}


function whoamiActiveIndices(room) {
  return activePlayers(room).filter(p => !p.isBot).map(p => p.index);
}

function prepareWhoAmI(room) {
  if (room.game !== 'whoami') return;
  const s = room.state;
  const active = whoamiActiveIndices(room);
  s.order = (s.order || []).filter(i => active.includes(i));
  for (const i of active) if (!s.order.includes(i)) s.order.push(i);
  if (s.hostIndex === null || s.hostIndex === undefined || !active.includes(s.hostIndex)) s.hostIndex = active[0] ?? null;
  room.hostIndex = s.hostIndex;
  if ((s.currentPlayer === null || s.currentPlayer === undefined || !active.includes(s.currentPlayer)) && active.length) {
    s.currentPlayer = s.order[s.turnPos % s.order.length] ?? active[0];
  }
  if (s.currentHolder !== null && s.currentHolder !== undefined && !active.includes(s.currentHolder)) s.currentHolder = s.currentPlayer;
  if (!Array.isArray(s.scores)) s.scores = initScores(room.players.length);
  room.scores = [...s.scores];
}

function pickWhoAmIQuestion(state) {
  if (!Array.isArray(state.used)) state.used = [];
  let available = WHOAMI_QUESTIONS.filter(q => !state.used.includes(q.id));
  if (!available.length) {
    state.used = [];
    available = [...WHOAMI_QUESTIONS];
  }
  const q = available[Math.floor(Math.random() * available.length)];
  state.used.push(q.id);
  return q;
}

function resetWhoAmIQuestionState(state) {
  state.currentHolder = null;
  state.originalPlayer = null;
  state.transferDepth = 0;
  state.phase = 'ready';
  state.question = null;
  state.pending = null;
  state.spinEndsAt = null;
}

function nextWhoAmITurn(room, preferredIndex = null) {
  prepareWhoAmI(room);
  const s = room.state;
  const order = s.order || [];
  if (!order.length) return;
  if (preferredIndex !== null && order.includes(preferredIndex)) {
    s.currentPlayer = preferredIndex;
    s.turnPos = order.indexOf(preferredIndex);
  } else {
    const currentPos = Math.max(0, order.indexOf(s.currentPlayer));
    s.turnPos = (currentPos + 1) % order.length;
    s.currentPlayer = order[s.turnPos];
  }
  resetWhoAmIQuestionState(s);
}

function finishWhoAmIGame(room) {
  prepareWhoAmI(room);
  const players = activePlayers(room).filter(p => !p.isBot);
  if (!players.length) return;
  const scores = room.state.scores || [];
  const max = Math.max(...players.map(p => scores[p.index] || 0));
  const winners = players.filter(p => (scores[p.index] || 0) === max).map(p => p.index);
  room.scores = [...scores];
  finishRound(room, winners.length === 1 ? winners[0] : null, {
    type: 'whoami',
    lastMove: `Финальный счёт: ${players.map(p => `${p.name} ${scores[p.index] || 0}`).join(' · ')}`
  });
}

function whoamiAction(room, index, action) {
  if (room.game !== 'whoami' || room.status !== 'playing') return;
  prepareWhoAmI(room);
  const s = room.state;
  const active = whoamiActiveIndices(room);
  const type = String(action.type || '');
  const isHost = index === s.hostIndex;

  if (type === 'assignHost' && isHost) {
    const target = Number(action.targetIndex);
    if (Number.isInteger(target) && active.includes(target)) {
      s.hostIndex = target;
      room.hostIndex = target;
      s.lastEvent = `${room.players[target]?.name || 'Player'} теперь ведущий`;
    }
    return;
  }

  if (type === 'finishGame' && isHost) {
    finishWhoAmIGame(room);
    return;
  }

  if (type === 'startSpin' && s.phase === 'ready' && index === s.currentPlayer) {
    const delay = 5000 + Math.floor(Math.random() * 10000);
    const q = pickWhoAmIQuestion(s);
    s.phase = 'spinning';
    s.question = q;
    s.originalPlayer = index;
    s.currentHolder = index;
    s.transferDepth = 0;
    s.pending = null;
    s.spinEndsAt = Date.now() + delay;
    s.lastEvent = `${room.players[index]?.name || 'Player'} запускает рулетку`;
    const roomId = room.id;
    const questionId = q.id;
    setTimeout(() => {
      const r = rooms.get(roomId);
      if (!r || r.game !== 'whoami' || r.status !== 'playing') return;
      if (r.state.phase !== 'spinning' || r.state.question?.id !== questionId) return;
      r.state.phase = 'question';
      r.state.lastEvent = `Вопрос №${questionId}`;
      emitRoom(r);
    }, delay);
    return;
  }

  if (type === 'answer' && s.phase === 'question' && index === s.currentHolder) {
    const points = 2 + (s.transferDepth || 0);
    s.phase = 'awaitingHost';
    s.pending = { player: index, points, at: Date.now() };
    s.lastEvent = `${room.players[index]?.name || 'Player'} отвечает. Ожидаем ведущего: +${points}`;
    return;
  }

  if (type === 'pass' && s.phase === 'question' && index === s.currentHolder) {
    const target = Number(action.targetIndex);
    if (!Number.isInteger(target) || !active.includes(target) || target === index) return;
    const cost = 1 + (s.transferDepth || 0);
    s.scores[index] = (s.scores[index] || 0) - cost;
    s.transferDepth = (s.transferDepth || 0) + 1;
    s.currentHolder = target;
    s.pending = null;
    s.lastEvent = `${room.players[index]?.name || 'Player'} передаёт вопрос игроку ${room.players[target]?.name || 'Player'}: -${cost}`;
    room.scores = [...s.scores];
    return;
  }

  if (type === 'hostConfirm' && isHost && s.phase === 'awaitingHost' && s.pending) {
    const accepted = !!action.accept;
    const pending = s.pending;
    if (accepted) {
      s.scores[pending.player] = (s.scores[pending.player] || 0) + pending.points;
      room.scores = [...s.scores];
      s.lastEvent = `${room.players[pending.player]?.name || 'Player'} получает +${pending.points}`;
      const repeatForOriginal = pending.player !== s.originalPlayer ? s.originalPlayer : null;
      nextWhoAmITurn(room, repeatForOriginal);
    } else {
      s.phase = 'question';
      s.pending = null;
      s.lastEvent = `Ведущий просит продолжить ответ или передать вопрос`;
    }
    return;
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
  const previousHostIndex = room.game === 'whoami' ? room.state?.hostIndex : null;
  room.state = initState(room.game, meta.maxPlayers, room.teamCount);
  if (room.game === 'whoami' && previousHostIndex !== null && previousHostIndex !== undefined) room.state.hostIndex = previousHostIndex;
  if (room.game === 'whoami') prepareWhoAmI(room);
  if (room.game === 'guesstime') normalizeGuessTimeState(room);
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
  const diff = room.difficulty || 'normal';
  if (room.game === 'rps') return { move: ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)] };
  if (room.game === 'dice') return { type: 'roll' };
  if (room.game === 'ttt') return { cell: diff === 'beginner' ? chooseRandomEmptyCell(s.board) : chooseTttCell(s.board) };
  if (room.game === 'connect4') return { col: diff === 'beginner' ? chooseRandomConnect4Col(s.board) : chooseConnect4Col(s.board) };
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
    return chooseCheckersBotMove(s.board, moves, diff);
  }
  if (room.game === 'chess') {
    const moves = legalChessMoves(s.board, 1, s);
    return chooseChessBotMove(s.board, moves, diff);
  }
  if (room.game === 'nim') {
    const take = s.sticks <= 3 ? s.sticks : ((s.sticks - 1) % 4) || (1 + Math.floor(Math.random() * 3));
    return { take: Math.max(1, Math.min(3, take)) };
  }
  return null;
}


function chooseBestByScore(moves, scoreFn) {
  if (!moves.length) return null;
  const scored = moves.map(m => ({ move: m, score: scoreFn(m) }));
  const max = Math.max(...scored.map(x => x.score));
  const best = scored.filter(x => x.score === max).map(x => x.move);
  return best[Math.floor(Math.random() * best.length)] || null;
}
function chooseCheckersBotMove(board, moves, diff) {
  if (!moves.length) return null;
  if (diff === 'beginner') return moves[Math.floor(Math.random() * moves.length)] || null;
  const captures = moves.filter(m => m.capture);
  if (diff === 'normal') {
    const pool = captures.length && Math.random() < 0.7 ? captures : moves;
    return pool[Math.floor(Math.random() * pool.length)] || null;
  }
  return chooseBestByScore(moves, m => {
    const piece = board[m.from[0]][m.from[1]];
    let score = 0;
    if (m.capture) score += 50;
    if (piece?.k) score += 7;
    if (piece && !piece.k && m.to[0] === 7) score += 18;
    score += m.to[0];
    return diff === 'champion' ? score + Math.floor(Math.random() * 3) : score;
  });
}
const CHESS_VALUE = { p: 10, n: 30, b: 32, r: 50, q: 90, k: 1000 };
function chooseChessBotMove(board, moves, diff) {
  if (!moves.length) return null;
  if (diff === 'beginner') return moves[Math.floor(Math.random() * moves.length)] || null;
  const captures = moves.filter(m => m.capture);
  if (diff === 'normal') {
    const pool = captures.length && Math.random() < 0.65 ? captures : moves;
    return pool[Math.floor(Math.random() * pool.length)] || null;
  }
  return chooseBestByScore(moves, m => {
    const target = board[m.to[0]]?.[m.to[1]];
    const piece = board[m.from[0]]?.[m.from[1]];
    let score = 0;
    if (target) score += CHESS_VALUE[target.t] || 0;
    if (piece?.t === 'p' && (m.to[0] === 0 || m.to[0] === 7)) score += 75;
    if (m.castle) score += 18;
    const centerBonus = 8 - (Math.abs(3.5 - m.to[0]) + Math.abs(3.5 - m.to[1]));
    score += Math.round(centerBonus);
    return diff === 'champion' ? score + Math.floor(Math.random() * 4) : score;
  });
}
function chooseRandomEmptyCell(board) {
  const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)] ?? 0;
}
function chooseRandomConnect4Col(board) {
  const valid = [];
  for (let c = 0; c < 7; c++) if (board[0][c] === null) valid.push(c);
  return valid[Math.floor(Math.random() * valid.length)] ?? 0;
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
    if (room.game === 'whoami') prepareWhoAmI(room);
    if (room.game === 'guesstime') normalizeGuessTimeState(room);
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
