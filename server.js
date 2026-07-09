const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'games-db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: {}, googleIndex: {}, games: [] }, null, 2));
}

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('DB read error:', err);
    return { users: {}, googleIndex: {}, games: [] };
  }
}

function writeDb(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('DB write error:', err);
  }
}

function makeDefaultSettings() {
  return { lang: 'ru', theme: 'dark', fontSize: 'medium', musicVolume: 0.35 };
}

function sanitizeText(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  return value.replace(/[<>]/g, '').trim().slice(0, 80) || fallback;
}

function sanitizeDataUrl(value) {
  if (typeof value !== 'string') return null;
  if (!value.startsWith('data:image/')) return null;
  if (value.length > 900_000) return null;
  return value;
}

function sanitizeFirebaseUid(value) {
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 140);
  return cleaned || null;
}

function sanitizeAvatarUrl(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith('https://')) return null;
  if (trimmed.length > 1200) return null;
  return trimmed;
}

function getOrCreateGuestUser(req) {
  const db = readDb();
  if (!req.session.guestUserId) req.session.guestUserId = `guest:${uuid()}`;
  const id = req.session.guestUserId;
  if (!db.users[id]) {
    db.users[id] = {
      id,
      provider: 'guest',
      name: 'Guest Player',
      email: null,
      avatarUrl: null,
      avatarData: null,
      settings: makeDefaultSettings(),
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
  }
  return db.users[id];
}

function upsertGoogleUser(profile) {
  const db = readDb();
  const googleId = profile.id;
  let userId = db.googleIndex[googleId];
  if (!userId) {
    userId = `google:${googleId}`;
    db.googleIndex[googleId] = userId;
  }
  const current = db.users[userId] || {};
  db.users[userId] = {
    id: userId,
    provider: 'google',
    googleId,
    name: current.name || profile.displayName || 'Google Player',
    email: profile.emails?.[0]?.value || current.email || null,
    avatarUrl: current.avatarUrl || profile.photos?.[0]?.value || null,
    googleAvatarUrl: profile.photos?.[0]?.value || current.googleAvatarUrl || null,
    avatarData: current.avatarData || null,
    settings: { ...makeDefaultSettings(), ...(current.settings || {}) },
    history: current.history || [],
    createdAt: current.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  writeDb(db);
  return db.users[userId];
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const db = readDb();
  done(null, db.users[id] || false);
});

const hasGoogleOAuth = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
if (hasGoogleOAuth) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL.replace(/\/$/, '')}/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    try {
      const user = upsertGoogleUser(profile);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));
}

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, credentials: true }
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(PUBLIC_DIR));

function requireUser(req) {
  return req.user || getOrCreateGuestUser(req);
}

app.get('/auth/google', (req, res, next) => {
  if (!hasGoogleOAuth) {
    return res.redirect('/?auth=google-not-configured');
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback', (req, res, next) => {
  if (!hasGoogleOAuth) return res.redirect('/?auth=google-not-configured');
  passport.authenticate('google', { failureRedirect: '/?auth=failed' })(req, res, () => {
    res.redirect('/?auth=success');
  });
});

app.post('/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ ok: true });
  });
});

app.get('/api/config', (req, res) => {
  res.json({ googleEnabled: hasGoogleOAuth, baseUrl: BASE_URL });
});

app.get('/api/me', (req, res) => {
  const user = requireUser(req);
  res.json({ user: publicUser(user), googleEnabled: hasGoogleOAuth });
});

app.get('/api/profile', (req, res) => {
  const user = requireUser(req);
  const db = readDb();
  res.json({ user: publicUser(db.users[user.id] || user) });
});

app.put('/api/profile', (req, res) => {
  const user = requireUser(req);
  const db = readDb();
  const current = db.users[user.id] || user;
  const body = req.body || {};
  current.name = sanitizeText(body.name, current.name || 'Player');
  if (body.avatarData !== undefined) {
    current.avatarData = sanitizeDataUrl(body.avatarData);
    if (current.avatarData) current.avatarUrl = null;
  }
  if (body.clearAvatar) {
    current.avatarData = null;
    current.avatarUrl = current.googleAvatarUrl || current.avatarUrl || null;
  }
  current.settings = {
    ...makeDefaultSettings(),
    ...(current.settings || {}),
    ...(body.settings || {})
  };
  if (!['ru', 'es', 'en'].includes(current.settings.lang)) current.settings.lang = 'ru';
  if (!['dark', 'light'].includes(current.settings.theme)) current.settings.theme = 'dark';
  if (!['small', 'medium', 'large', 'xlarge'].includes(current.settings.fontSize)) current.settings.fontSize = 'medium';
  current.updatedAt = new Date().toISOString();
  db.users[current.id] = current;
  writeDb(db);
  res.json({ ok: true, user: publicUser(current) });
});

app.get('/api/history', (req, res) => {
  const user = requireUser(req);
  const db = readDb();
  const history = db.users[user.id]?.history || [];
  res.json({ history: history.slice(-80).reverse() });
});

function publicUser(user) {
  return {
    id: user.id,
    provider: user.provider,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarData || user.avatarUrl || user.googleAvatarUrl || null,
    settings: { ...makeDefaultSettings(), ...(user.settings || {}) },
    historyCount: user.history?.length || 0
  };
}

// Socket.IO session bridge
io.engine.use(sessionMiddleware);
io.engine.use(passport.initialize());
io.engine.use(passport.session());

const rooms = new Map();
const gameMeta = {
  rps: { emoji: '✊', title: 'Rock Paper Scissors' },
  ttt: { emoji: '⭕', title: 'Tic Tac Toe' },
  dice: { emoji: '🎲', title: 'Dice Duel' },
  connect4: { emoji: '🔴', title: 'Four in a Row' },
  memory: { emoji: '🧠', title: 'Memory Match' },
  twentyone: { emoji: '21', title: 'Twenty One' },
  reaction: { emoji: '⚡', title: 'Reaction Tap' }
};

function socketUser(socket) {
  const req = socket.request;
  if (req.user) return req.user;
  if (!req.session.guestUserId) req.session.guestUserId = `guest:${uuid()}`;
  req.session.save(() => {});
  const db = readDb();
  const id = req.session.guestUserId;
  if (!db.users[id]) {
    db.users[id] = {
      id,
      provider: 'guest',
      name: 'Guest Player',
      email: null,
      avatarUrl: null,
      avatarData: null,
      settings: makeDefaultSettings(),
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
  }
  return db.users[id];
}

function getAvatar(user) {
  return user?.avatarData || user?.avatarUrl || user?.googleAvatarUrl || null;
}

function playerPublic(player) {
  if (!player) return null;
  return {
    name: player.name,
    avatarUrl: player.avatarUrl || null,
    isBot: !!player.isBot,
    connected: !!player.connected
  };
}

function makeRoomId() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 5; i++) id += alphabet[Math.floor(Math.random() * alphabet.length)];
  return rooms.has(id) ? makeRoomId() : id;
}

function makeRoom({ game, mode }) {
  const id = makeRoomId();
  const room = {
    id,
    game: gameMeta[game] ? game : 'rps',
    mode: mode === 'bot' ? 'bot' : 'online',
    players: [null, null],
    spectators: new Set(),
    scores: [0, 0],
    ties: 0,
    status: 'waiting',
    winnerMessage: null,
    lastRound: null,
    state: initState(gameMeta[game] ? game : 'rps'),
    createdAt: Date.now()
  };
  rooms.set(id, room);
  return room;
}

function initState(game) {
  if (game === 'ttt') return { board: Array(9).fill(null), turn: 0, winner: null, winLine: null };
  if (game === 'connect4') return { board: Array.from({ length: 6 }, () => Array(7).fill(null)), turn: 0, winner: null, winLine: null };
  if (game === 'dice') return { rolls: [null, null], winner: null };
  if (game === 'memory') {
    const symbols = ['🍒', '🍋', '🍇', '🍉', '⭐', '🚀', '🎧', '💎'];
    const cards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, revealed: false, matched: false }));
    return { cards, open: [], turn: 0, pairScore: [0, 0], winner: null, locked: false };
  }
  if (game === 'twentyone') return { total: 0, turn: 0, winner: null, lastAdd: null };
  if (game === 'reaction') return { round: 1, readyAt: Date.now() + 1800 + Math.floor(Math.random() * 3200), taps: [null, null], winner: null, falseStart: null };
  return { moves: [null, null], winner: null, result: null };
}

function newRound(room, keepScore = true) {
  room.state = initState(room.game);
  room.winnerMessage = null;
  room.lastRound = null;
  if (room.players[0] && (room.players[1] || room.mode === 'bot')) room.status = 'playing';
  if (room.mode === 'bot' && !room.players[1]) addBot(room);
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function addBot(room) {
  room.players[1] = {
    socketId: `bot:${room.id}`,
    userId: `bot:${room.id}`,
    name: 'SMQ Bot',
    avatarUrl: null,
    connected: true,
    isBot: true
  };
}

function joinRoom(socket, payload) {
  const user = socketUser(socket);
  const game = payload?.game || 'rps';
  const mode = payload?.mode || 'online';
  const wantsSpectator = !!payload?.spectate;
  let room = payload?.roomId ? rooms.get(String(payload.roomId).toUpperCase()) : null;
  if (!room) room = makeRoom({ game, mode });
  const name = sanitizeText(payload?.name, user.name || 'Player');
  const firebaseUid = sanitizeFirebaseUid(payload?.firebaseUid);
  const publicName = name || user.name || 'Player';
  const member = {
    socketId: socket.id,
    userId: firebaseUid ? `firebase:${firebaseUid}` : user.id,
    name: publicName,
    avatarUrl: sanitizeAvatarUrl(payload?.avatarUrl) || getAvatar(user),
    connected: true,
    isBot: false
  };

  let role = 'spectator';
  if (!wantsSpectator) {
    const existingIndex = room.players.findIndex(p => p && p.userId === user.id && !p.isBot);
    const emptyIndex = room.players.findIndex(p => !p || (!p.connected && !p.isBot));
    if (existingIndex >= 0) {
      room.players[existingIndex] = member;
      role = `player${existingIndex + 1}`;
    } else if (emptyIndex >= 0 && room.mode !== 'bot') {
      room.players[emptyIndex] = member;
      role = `player${emptyIndex + 1}`;
    } else if (room.mode === 'bot' && !room.players[0]) {
      room.players[0] = member;
      role = 'player1';
    } else {
      room.spectators.add(socket.id);
    }
  } else {
    room.spectators.add(socket.id);
  }

  if (room.mode === 'bot') addBot(room);
  if (room.players[0] && room.players[1]) room.status = 'playing';
  socket.join(room.id);
  socket.data.roomId = room.id;
  socket.data.role = role;
  socket.emit('joined_room', { roomId: room.id, role, game: room.game, mode: room.mode });
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function emitRoom(room) {
  io.to(room.id).emit('room_state', serializeRoom(room));
}

function serializeRoom(room) {
  return {
    id: room.id,
    game: room.game,
    gameMeta: gameMeta[room.game],
    mode: room.mode,
    status: room.status,
    players: room.players.map(playerPublic),
    spectators: room.spectators.size,
    scores: room.scores,
    ties: room.ties,
    state: safeState(room),
    winnerMessage: room.winnerMessage,
    lastRound: room.lastRound,
    playerLink: `/room/${room.id}`,
    spectatorLink: `/room/${room.id}?spectate=1`
  };
}

function safeState(room) {
  if (room.game === 'memory') {
    return {
      ...room.state,
      cards: room.state.cards.map(c => ({ id: c.id, value: c.revealed || c.matched ? c.value : null, revealed: c.revealed, matched: c.matched }))
    };
  }
  return room.state;
}

function currentPlayerIndex(socket, room) {
  return room.players.findIndex(p => p && p.socketId === socket.id);
}

function isPlayersTurn(room, index) {
  if (!room.players[index]) return false;
  if (room.players[index].isBot) return true;
  if (['ttt', 'connect4', 'memory', 'twentyone'].includes(room.game)) return room.state.turn === index;
  return true;
}

function handleAction(socket, action) {
  const room = rooms.get(socket.data.roomId);
  if (!room || room.status !== 'playing') return;
  const index = currentPlayerIndex(socket, room);
  if (index < 0) return;
  if (!isPlayersTurn(room, index)) return;
  applyAction(room, index, action);
  emitRoom(room);
  if (room.mode === 'bot') maybeBotMove(room);
}

function applyAction(room, index, action) {
  if (room.winnerMessage && action?.type !== 'newRound') return;
  switch (room.game) {
    case 'rps': return rpsAction(room, index, action);
    case 'ttt': return tttAction(room, index, action);
    case 'dice': return diceAction(room, index, action);
    case 'connect4': return connect4Action(room, index, action);
    case 'memory': return memoryAction(room, index, action);
    case 'twentyone': return twentyoneAction(room, index, action);
    case 'reaction': return reactionAction(room, index, action);
    default: return;
  }
}

function rpsAction(room, index, action) {
  const move = action?.move;
  if (!['rock', 'paper', 'scissors'].includes(move)) return;
  if (room.state.moves[index]) return;
  room.state.moves[index] = move;
  if (room.state.moves[0] && room.state.moves[1]) {
    const w = rpsWinner(room.state.moves[0], room.state.moves[1]);
    finishRound(room, w, { moves: room.state.moves });
  }
}

function rpsWinner(a, b) {
  if (a === b) return null;
  if ((a === 'rock' && b === 'scissors') || (a === 'paper' && b === 'rock') || (a === 'scissors' && b === 'paper')) return 0;
  return 1;
}

function diceAction(room, index) {
  if (room.state.rolls[index]) return;
  room.state.rolls[index] = 1 + Math.floor(Math.random() * 6);
  if (room.state.rolls[0] && room.state.rolls[1]) {
    const [a, b] = room.state.rolls;
    const w = a === b ? null : a > b ? 0 : 1;
    finishRound(room, w, { rolls: room.state.rolls });
  }
}

function tttAction(room, index, action) {
  const cell = Number(action?.cell);
  if (Number.isNaN(cell) || cell < 0 || cell > 8) return;
  if (room.state.board[cell] !== null || room.state.turn !== index) return;
  room.state.board[cell] = index;
  const result = tttResult(room.state.board);
  if (result.done) {
    room.state.winner = result.winner;
    room.state.winLine = result.line;
    finishRound(room, result.winner, { board: room.state.board, winLine: result.line });
  } else {
    room.state.turn = index === 0 ? 1 : 0;
  }
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
  const col = Number(action?.col);
  if (Number.isNaN(col) || col < 0 || col > 6 || room.state.turn !== index) return;
  const board = room.state.board;
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      board[row][col] = index;
      const result = connect4Result(board);
      if (result.done) {
        room.state.winner = result.winner;
        room.state.winLine = result.line;
        finishRound(room, result.winner, { board, winLine: result.line });
      } else {
        room.state.turn = index === 0 ? 1 : 0;
      }
      return;
    }
  }
}

function connect4Result(board) {
  const dirs = [[1,0],[0,1],[1,1],[1,-1]];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
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
  }
  if (board.every(row => row.every(v => v !== null))) return { done: true, winner: null, line: null };
  return { done: false };
}

function memoryAction(room, index, action) {
  if (room.state.locked || room.state.turn !== index) return;
  const cardIndex = Number(action?.card);
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
      const allMatched = room.state.cards.every(c => c.matched);
      if (allMatched) {
        const [s0, s1] = room.state.pairScore;
        const winner = s0 === s1 ? null : s0 > s1 ? 0 : 1;
        finishRound(room, winner, { pairScore: room.state.pairScore });
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
  const add = Number(action?.add);
  if (![1,2,3].includes(add) || room.state.turn !== index) return;
  if (room.state.total + add > 21) return;
  room.state.total += add;
  room.state.lastAdd = { player: index, add };
  if (room.state.total === 21) {
    finishRound(room, index, { total: room.state.total });
  } else {
    room.state.turn = index === 0 ? 1 : 0;
  }
}

function reactionAction(room, index) {
  const now = Date.now();
  if (room.state.winner !== null || room.state.taps[index]) return;
  if (now < room.state.readyAt) {
    const other = index === 0 ? 1 : 0;
    room.state.falseStart = index;
    finishRound(room, other, { falseStart: index });
    return;
  }
  room.state.taps[index] = now;
  finishRound(room, index, { reactionMs: now - room.state.readyAt });
}

function finishRound(room, winnerIndex, details) {
  if (winnerIndex === null || winnerIndex === undefined) {
    room.ties += 1;
    room.winnerMessage = { type: 'draw', text: 'DRAW!', winnerIndex: null };
  } else {
    room.scores[winnerIndex] += 1;
    const playerName = room.players[winnerIndex]?.name || `Player ${winnerIndex + 1}`;
    room.winnerMessage = { type: 'win', text: `${playerName} WINS!`, winnerIndex };
  }
  room.lastRound = { winnerIndex: winnerIndex ?? null, details, at: Date.now() };
  room.status = 'roundOver';
  saveHistory(room, winnerIndex, details);
}

function saveHistory(room, winnerIndex, details) {
  const db = readDb();
  const recordId = uuid();
  const date = new Date().toISOString();
  const participants = room.players.map(p => p ? { userId: p.userId, name: p.name, isBot: p.isBot } : null);
  const gameRecord = { id: recordId, roomId: room.id, game: room.game, mode: room.mode, winnerIndex: winnerIndex ?? null, scores: room.scores, ties: room.ties, participants, details, date };
  db.games.push(gameRecord);
  for (let i = 0; i < 2; i++) {
    const player = room.players[i];
    if (!player || player.isBot || !db.users[player.userId]) continue;
    const opponent = room.players[i === 0 ? 1 : 0];
    const result = winnerIndex === null || winnerIndex === undefined ? 'draw' : winnerIndex === i ? 'win' : 'lose';
    db.users[player.userId].history = db.users[player.userId].history || [];
    db.users[player.userId].history.push({
      id: recordId,
      date,
      game: room.game,
      mode: room.mode,
      result,
      opponent: opponent?.name || 'Unknown',
      score: `${room.scores[0]}:${room.scores[1]}`,
      ties: room.ties
    });
    db.users[player.userId].history = db.users[player.userId].history.slice(-150);
    db.users[player.userId].updatedAt = date;
  }
  writeDb(db);
}

function maybeBotMove(room) {
  if (room.mode !== 'bot' || room.status !== 'playing') return;
  const botIndex = 1;
  if (!room.players[botIndex]?.isBot) return;
  if (!isPlayersTurn(room, botIndex)) return;
  setTimeout(() => {
    if (!rooms.has(room.id) || room.status !== 'playing') return;
    const action = chooseBotAction(room);
    if (!action) return;
    applyAction(room, botIndex, action);
    emitRoom(room);
    if (room.status === 'playing' && ['memory'].includes(room.game)) maybeBotMove(room);
  }, 650 + Math.floor(Math.random() * 650));
}

function chooseBotAction(room) {
  const state = room.state;
  if (room.game === 'rps') return { move: ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)] };
  if (room.game === 'dice') return { type: 'roll' };
  if (room.game === 'ttt') return { cell: chooseTttCell(state.board) };
  if (room.game === 'connect4') return { col: chooseConnect4Col(state.board) };
  if (room.game === 'memory') {
    const available = state.cards.map((c, i) => (!c.matched && !c.revealed ? i : null)).filter(v => v !== null);
    if (!available.length) return null;
    return { card: available[Math.floor(Math.random() * available.length)] };
  }
  if (room.game === 'twentyone') {
    const total = state.total;
    if (21 - total <= 3) return { add: 21 - total };
    const targetRemainder = 1; // keep total at 1,5,9,13,17 when possible
    let add = ((targetRemainder - total) % 4 + 4) % 4;
    if (add < 1 || add > 3) add = 1 + Math.floor(Math.random() * 3);
    if (total + add > 21) add = 21 - total;
    return { add };
  }
  if (room.game === 'reaction') {
    const delay = Math.max(0, state.readyAt - Date.now() + 180 + Math.floor(Math.random() * 550));
    setTimeout(() => {
      if (room.status !== 'playing') return;
      applyAction(room, 1, { type: 'tap' });
      emitRoom(room);
    }, delay);
    return null;
  }
  return null;
}

function chooseTttCell(board) {
  const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
  for (const player of [1, 0]) {
    for (const cell of empty) {
      const copy = [...board]; copy[cell] = player;
      const res = tttResult(copy);
      if (res.done && res.winner === player) return cell;
    }
  }
  if (empty.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter(c => empty.includes(c));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

function chooseConnect4Col(board) {
  const valid = [];
  for (let c = 0; c < 7; c++) if (board[0][c] === null) valid.push(c);
  for (const player of [1, 0]) {
    for (const col of valid) {
      const copy = board.map(row => [...row]);
      for (let r = 5; r >= 0; r--) {
        if (copy[r][col] === null) { copy[r][col] = player; break; }
      }
      const res = connect4Result(copy);
      if (res.done && res.winner === player) return col;
    }
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
  socket.on('change_game', (payload) => {
    const room = rooms.get(socket.data.roomId);
    if (!room) return;
    const index = currentPlayerIndex(socket, room);
    if (index !== 0) return;
    const game = gameMeta[payload?.game] ? payload.game : room.game;
    room.game = game;
    room.scores = [0, 0];
    room.ties = 0;
    room.status = room.players[0] && room.players[1] ? 'playing' : 'waiting';
    newRound(room, false);
  });
  socket.on('disconnect', () => {
    const room = rooms.get(socket.data.roomId);
    if (!room) return;
    for (const player of room.players) {
      if (player && player.socketId === socket.id) player.connected = false;
    }
    room.spectators.delete(socket.id);
    emitRoom(room);
    setTimeout(() => cleanupRoom(room.id), 1000 * 60 * 10);
  });
});

function cleanupRoom(roomId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const hasHumanPlayer = room.players.some(p => p && !p.isBot && p.connected);
  if (!hasHumanPlayer && room.spectators.size === 0) rooms.delete(roomId);
}

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`SMQ Games server running on port ${PORT}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Google OAuth: ${hasGoogleOAuth ? 'enabled' : 'not configured'}`);
});
