const $ = (id) => document.getElementById(id);

const I18N = {
  ru: {
    appTitle: 'SMQ Games', appSubtitle: 'Играй онлайн, с другом, против компьютера или наблюдай за комнатой.', loginGoogle: 'Войти через Google', continueGuest: 'Продолжить как гость', googleHint: 'Google-вход сохраняет фото профиля и историю игр.',
    hello: 'Привет', mobileGame: 'Мобильная онлайн-арена', chooseGame: 'Выбери игру', chooseMode: 'Играй с компьютером или создай комнату для друга.', newGame: 'Новая игра', game: 'Игра', mode: 'Режим', onlineRoom: 'Онлайн-комната', playComputer: 'С компьютером', createRoom: 'Создать комнату', joinRoom: 'Войти в комнату', joinAsPlayer: 'Играть', watch: 'Наблюдать', history: 'История игр', refresh: 'Обновить', spectators: 'Наблюдатели', copyPlayerLink: 'Ссылка игроку', copySpectatorLink: 'Ссылка зрителю', newRound: 'Новая партия', profile: 'Профиль', changePhoto: 'Изменить фото', resetPhoto: 'Сбросить', name: 'Имя', language: 'Язык', fontSize: 'Размер шрифта', small: 'Маленький', medium: 'Средний', large: 'Большой', xlarge: 'Очень большой', theme: 'Тема', darkTheme: 'Тёмная', lightTheme: 'Светлая', music: 'Музыка', musicOn: 'Включить музыку', musicOff: 'Выключить музыку', volume: 'Громкость', uploadMusic: 'Добавить свою музыку', saveProfile: 'Сохранить профиль', logout: 'Выйти', continue: 'Продолжить',
    copied: 'Ссылка скопирована', waitingFriend: 'Ждём второго игрока...', youSpectator: 'Вы наблюдатель', yourTurn: 'Ваш ход', opponentTurn: 'Ход соперника', botTurn: 'Ход компьютера', roomCreated: 'Комната создана', profileSaved: 'Профиль сохранён', googleNotConfigured: 'Google-вход нужно настроить в Render переменными GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET.', noHistory: 'Истории пока нет', win: 'Победа', lose: 'Поражение', draw: 'Ничья', vs: 'против', tapWhenGreen: 'Жми, когда станет зелёным!', tooEarly: 'Рано!', go: 'ЖМИ!', total: 'Сумма', add: 'Добавить', roll: 'Бросить', selectMove: 'Выбери ход', chooseCard: 'Открой карту',
    games: { rps: ['Камень · Ножницы · Бумага', 'Быстрая дуэль на удачу'], ttt: ['Крестики-нолики', 'Классика 3×3'], dice: ['Кубики', 'У кого выпадет больше'], connect4: ['Четыре в ряд', 'Собери линию первым'], memory: ['Мемори', 'Запоминай пары карточек'], twentyone: ['21', 'Дойди ровно до 21'], reaction: ['Реакция', 'Кто нажмёт быстрее'] },
    moves: { rock: 'Камень', paper: 'Бумага', scissors: 'Ножницы' }
  },
  es: {
    appTitle: 'SMQ Games', appSubtitle: 'Juega online con un amigo, contra la computadora o mira una sala.', loginGoogle: 'Entrar con Google', continueGuest: 'Continuar como invitado', googleHint: 'Con Google se guardan tu foto de perfil y tu historial.',
    hello: 'Hola', mobileGame: 'Arena móvil online', chooseGame: 'Elige un juego', chooseMode: 'Juega contra la computadora o crea una sala para tu amigo.', newGame: 'Nuevo juego', game: 'Juego', mode: 'Modo', onlineRoom: 'Sala online', playComputer: 'Contra computadora', createRoom: 'Crear sala', joinRoom: 'Entrar a sala', joinAsPlayer: 'Jugar', watch: 'Observar', history: 'Historial', refresh: 'Actualizar', spectators: 'Observadores', copyPlayerLink: 'Link jugador', copySpectatorLink: 'Link observador', newRound: 'Nueva partida', profile: 'Perfil', changePhoto: 'Cambiar foto', resetPhoto: 'Restablecer', name: 'Nombre', language: 'Idioma', fontSize: 'Tamaño de letra', small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Muy grande', theme: 'Tema', darkTheme: 'Oscuro', lightTheme: 'Claro', music: 'Música', musicOn: 'Activar música', musicOff: 'Apagar música', volume: 'Volumen', uploadMusic: 'Agregar tu música', saveProfile: 'Guardar perfil', logout: 'Salir', continue: 'Continuar',
    copied: 'Link copiado', waitingFriend: 'Esperando al segundo jugador...', youSpectator: 'Estás observando', yourTurn: 'Tu turno', opponentTurn: 'Turno del rival', botTurn: 'Turno de la computadora', roomCreated: 'Sala creada', profileSaved: 'Perfil guardado', googleNotConfigured: 'Configura Google en Render con GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET.', noHistory: 'Aún no hay historial', win: 'Victoria', lose: 'Derrota', draw: 'Empate', vs: 'contra', tapWhenGreen: '¡Toca cuando esté verde!', tooEarly: '¡Muy pronto!', go: '¡TOCA!', total: 'Total', add: 'Sumar', roll: 'Lanzar', selectMove: 'Elige tu jugada', chooseCard: 'Abre una carta',
    games: { rps: ['Piedra · Papel · Tijeras', 'Duelo rápido de suerte'], ttt: ['Tres en raya', 'Clásico 3×3'], dice: ['Dados', 'Gana el número mayor'], connect4: ['Cuatro en línea', 'Forma una línea primero'], memory: ['Memoria', 'Encuentra las parejas'], twentyone: ['21', 'Llega exactamente a 21'], reaction: ['Reacción', '¿Quién toca más rápido?'] },
    moves: { rock: 'Piedra', paper: 'Papel', scissors: 'Tijeras' }
  },
  en: {
    appTitle: 'SMQ Games', appSubtitle: 'Play online with a friend, against the computer, or watch a room.', loginGoogle: 'Sign in with Google', continueGuest: 'Continue as guest', googleHint: 'Google sign-in saves your profile photo and game history.',
    hello: 'Hello', mobileGame: 'Mobile online arena', chooseGame: 'Choose a game', chooseMode: 'Play against the computer or create a room for a friend.', newGame: 'New game', game: 'Game', mode: 'Mode', onlineRoom: 'Online room', playComputer: 'Computer', createRoom: 'Create room', joinRoom: 'Join room', joinAsPlayer: 'Play', watch: 'Watch', history: 'Game history', refresh: 'Refresh', spectators: 'Spectators', copyPlayerLink: 'Player link', copySpectatorLink: 'Spectator link', newRound: 'New round', profile: 'Profile', changePhoto: 'Change photo', resetPhoto: 'Reset', name: 'Name', language: 'Language', fontSize: 'Font size', small: 'Small', medium: 'Medium', large: 'Large', xlarge: 'Extra large', theme: 'Theme', darkTheme: 'Dark', lightTheme: 'Light', music: 'Music', musicOn: 'Turn music on', musicOff: 'Turn music off', volume: 'Volume', uploadMusic: 'Add your music', saveProfile: 'Save profile', logout: 'Log out', continue: 'Continue',
    copied: 'Link copied', waitingFriend: 'Waiting for second player...', youSpectator: 'You are watching', yourTurn: 'Your turn', opponentTurn: 'Opponent turn', botTurn: 'Computer turn', roomCreated: 'Room created', profileSaved: 'Profile saved', googleNotConfigured: 'Configure Google on Render with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.', noHistory: 'No history yet', win: 'Win', lose: 'Loss', draw: 'Draw', vs: 'vs', tapWhenGreen: 'Tap when it turns green!', tooEarly: 'Too early!', go: 'TAP!', total: 'Total', add: 'Add', roll: 'Roll', selectMove: 'Choose your move', chooseCard: 'Open a card',
    games: { rps: ['Rock · Paper · Scissors', 'Fast luck duel'], ttt: ['Tic Tac Toe', 'Classic 3×3'], dice: ['Dice Duel', 'Highest roll wins'], connect4: ['Four in a Row', 'Connect a line first'], memory: ['Memory Match', 'Find matching pairs'], twentyone: ['Twenty One', 'Reach exactly 21'], reaction: ['Reaction Tap', 'Who taps faster?'] },
    moves: { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' }
  }
};

const games = [
  { id: 'rps', emoji: '✊' },
  { id: 'ttt', emoji: '⭕' },
  { id: 'dice', emoji: '🎲' },
  { id: 'connect4', emoji: '🔴' },
  { id: 'memory', emoji: '🧠' },
  { id: 'twentyone', emoji: '21' },
  { id: 'reaction', emoji: '⚡' }
];

const state = {
  user: null,
  entered: localStorage.getItem('smq_entered') === '1',
  lang: localStorage.getItem('smq_lang') || 'ru',
  theme: localStorage.getItem('smq_theme') || 'dark',
  fontSize: localStorage.getItem('smq_fontSize') || 'medium',
  selectedGame: localStorage.getItem('smq_game') || 'rps',
  selectedMode: localStorage.getItem('smq_mode') || 'online',
  socket: null,
  room: null,
  role: null,
  lastRoundKey: null,
  musicOn: localStorage.getItem('smq_music_on') === '1'
};

function t(key) {
  const dict = I18N[state.lang] || I18N.ru;
  return key.split('.').reduce((obj, part) => obj && obj[part], dict) || key;
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  $('quickLang').value = state.lang;
  $('profileLang').value = state.lang;
  $('toggleMusicBtn').textContent = state.musicOn ? t('musicOff') : t('musicOn');
  renderGameCards();
  renderHistory();
  if (state.room) renderRoom(state.room);
}

function applyThemeAndFont() {
  document.body.classList.toggle('light', state.theme === 'light');
  document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
  document.body.classList.add(`font-${state.fontSize}`);
  $('themeSelect').value = state.theme;
  $('fontSizeSelect').value = state.fontSize;
}

function showScreen(name) {
  ['loginScreen', 'homeScreen', 'roomScreen'].forEach(id => $(id).classList.add('hidden'));
  $(name).classList.remove('hidden');
}

function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.classList.add('hidden'), 2400);
}

function avatarInitial(name) {
  return (name || 'S').trim().slice(0, 1).toUpperCase();
}

function setAvatar(imgEl, fallbackEl, url, name) {
  if (url) {
    imgEl.src = url;
    imgEl.style.display = 'block';
    fallbackEl.style.display = 'none';
  } else {
    imgEl.removeAttribute('src');
    imgEl.style.display = 'none';
    fallbackEl.style.display = 'inline';
    fallbackEl.textContent = avatarInitial(name);
  }
}

async function api(path, options = {}) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, credentials: 'same-origin', ...options });
  return res.json();
}

async function loadUser() {
  const data = await api('/api/me');
  state.user = data.user;
  if (state.user?.provider === 'google') state.entered = true;
  const settings = state.user?.settings || {};
  state.lang = settings.lang || localStorage.getItem('smq_lang') || state.lang;
  state.theme = settings.theme || localStorage.getItem('smq_theme') || state.theme;
  state.fontSize = settings.fontSize || localStorage.getItem('smq_fontSize') || state.fontSize;
  $('googleLoginBtn').classList.toggle('disabled', !data.googleEnabled);
  updateProfileUI();
  applyThemeAndFont();
  applyI18n();
  const params = new URLSearchParams(location.search);
  if (params.get('auth') === 'google-not-configured') toast(t('googleNotConfigured'));
  const roomFromPath = getRoomFromPath();
  if (!state.entered) {
    showScreen('loginScreen');
    return;
  }
  showScreen('homeScreen');
  await loadHistory();
  if (roomFromPath) joinRoom(roomFromPath, params.get('spectate') === '1');
}

function updateProfileUI() {
  const user = state.user || { name: 'Player' };
  $('headerName').textContent = user.name || 'Player';
  $('profileName').value = user.name || 'Player';
  setAvatar($('headerAvatar'), $('avatarFallback'), user.avatarUrl, user.name);
  setAvatar($('profileAvatar'), $('profileFallback'), user.avatarUrl, user.name);
}

function renderGameCards() {
  const wrap = $('gameCards');
  wrap.innerHTML = '';
  games.forEach(game => {
    const info = t(`games.${game.id}`);
    const btn = document.createElement('button');
    btn.className = `game-card ${state.selectedGame === game.id ? 'active' : ''}`;
    btn.innerHTML = `<span class="emoji">${game.emoji}</span><strong>${info?.[0] || game.id}</strong><small>${info?.[1] || ''}</small>`;
    btn.onclick = () => {
      state.selectedGame = game.id;
      localStorage.setItem('smq_game', game.id);
      renderGameCards();
    };
    wrap.appendChild(btn);
  });
}

async function loadHistory() {
  try {
    const data = await api('/api/history');
    state.history = data.history || [];
    renderHistory();
  } catch (_) {}
}

function renderHistory() {
  const wrap = $('historyList');
  if (!wrap) return;
  const history = state.history || [];
  if (!history.length) {
    wrap.innerHTML = `<div class="history-item"><span>${t('noHistory')}</span></div>`;
    return;
  }
  wrap.innerHTML = history.slice(0, 10).map(item => {
    const resultText = t(item.result === 'win' ? 'win' : item.result === 'lose' ? 'lose' : 'draw');
    const resultClass = item.result === 'win' ? 'result-win' : item.result === 'lose' ? 'result-lose' : 'result-draw';
    const gameName = t(`games.${item.game}`)?.[0] || item.game;
    const date = new Date(item.date).toLocaleDateString(state.lang === 'ru' ? 'ru-RU' : state.lang === 'es' ? 'es-MX' : 'en-US', { day: '2-digit', month: 'short' });
    return `<div class="history-item"><div><b>${gameName}</b><br><small>${t('vs')} ${item.opponent}</small></div><div><b class="${resultClass}">${resultText}</b><br><small>${item.score} · ${date}</small></div></div>`;
  }).join('');
}

function setupSocket() {
  if (state.socket) return;
  state.socket = io({ withCredentials: true });
  state.socket.on('joined_room', (payload) => {
    state.role = payload.role;
    showScreen('roomScreen');
    tryFullscreen();
  });
  state.socket.on('room_state', (room) => {
    state.room = room;
    renderRoom(room);
  });
}

function getRoomFromPath() {
  const match = location.pathname.match(/^\/room\/([A-Z0-9]+)/i);
  return match ? match[1].toUpperCase() : null;
}

function createRoom() {
  setupSocket();
  state.socket.emit('join_room', { game: state.selectedGame, mode: state.selectedMode, name: state.user?.name || 'Player' });
  toast(t('roomCreated'));
}

function joinRoom(roomId, spectate) {
  if (!roomId) return;
  setupSocket();
  state.socket.emit('join_room', { roomId: roomId.toUpperCase(), spectate: !!spectate, name: state.user?.name || 'Player' });
  history.replaceState({}, '', `/room/${roomId.toUpperCase()}${spectate ? '?spectate=1' : ''}`);
}

function renderRoom(room) {
  $('roomCodeLabel').textContent = room.id;
  const gameName = t(`games.${room.game}`)?.[0] || room.game;
  $('gameTitle').textContent = gameName;
  $('p1Name').textContent = room.players[0]?.name || 'Player 1';
  $('p2Name').textContent = room.players[1]?.name || (room.mode === 'bot' ? 'SMQ Bot' : 'Player 2');
  $('p1Score').textContent = room.scores[0] ?? 0;
  $('p2Score').textContent = room.scores[1] ?? 0;
  $('spectatorCount').textContent = room.spectators || 0;
  renderTurnBanner(room);
  renderGame(room);
  maybeShowWinner(room);
}

function renderTurnBanner(room) {
  const banner = $('turnBanner');
  if (room.status === 'waiting') { banner.textContent = t('waitingFriend'); return; }
  if (state.role === 'spectator') { banner.textContent = t('youSpectator'); return; }
  if (room.status === 'roundOver') { banner.textContent = room.winnerMessage?.text || ''; return; }
  const turn = room.state?.turn;
  if (typeof turn === 'number') {
    const myIndex = state.role === 'player1' ? 0 : state.role === 'player2' ? 1 : -1;
    if (turn === myIndex) banner.textContent = t('yourTurn');
    else if (room.players[turn]?.isBot) banner.textContent = t('botTurn');
    else banner.textContent = t('opponentTurn');
    return;
  }
  banner.textContent = room.game === 'rps' ? t('selectMove') : '';
}

function canAct(turnRequired = false) {
  if (!state.room || state.room.status !== 'playing') return false;
  if (state.role !== 'player1' && state.role !== 'player2') return false;
  if (!turnRequired) return true;
  const myIndex = state.role === 'player1' ? 0 : 1;
  return state.room.state?.turn === myIndex;
}

function sendAction(action) {
  if (!state.socket) return;
  state.socket.emit('game_action', action);
}

function renderGame(room) {
  const board = $('gameBoard');
  if (room.status === 'waiting') {
    board.innerHTML = `<div class="total-card"><h2>${t('waitingFriend')}</h2><p>${location.origin}${room.playerLink}</p></div>`;
    return;
  }
  if (room.game === 'rps') return renderRps(board, room);
  if (room.game === 'ttt') return renderTtt(board, room);
  if (room.game === 'dice') return renderDice(board, room);
  if (room.game === 'connect4') return renderConnect4(board, room);
  if (room.game === 'memory') return renderMemory(board, room);
  if (room.game === 'twentyone') return renderTwentyOne(board, room);
  if (room.game === 'reaction') return renderReaction(board, room);
}

function renderRps(board, room) {
  const moves = [{ id: 'rock', emoji: '✊' }, { id: 'paper', emoji: '✋' }, { id: 'scissors', emoji: '✌️' }];
  board.innerHTML = `<div class="rps-grid">${moves.map(m => `<button class="game-big-btn" data-move="${m.id}" ${!canAct(false) ? 'disabled' : ''}>${m.emoji}<small>${t(`moves.${m.id}`)}</small></button>`).join('')}</div>`;
  board.querySelectorAll('[data-move]').forEach(btn => btn.onclick = () => sendAction({ move: btn.dataset.move }));
}

function markSymbol(value) { return value === 0 ? '×' : value === 1 ? '○' : ''; }
function isWinCellTtt(room, index) { return room.state?.winLine?.includes(index); }
function renderTtt(board, room) {
  board.innerHTML = `<div class="ttt-board">${room.state.board.map((cell, i) => `<button class="ttt-cell ${isWinCellTtt(room, i) ? 'win' : ''}" data-cell="${i}" ${!canAct(true) || cell !== null ? 'disabled' : ''}>${markSymbol(cell)}</button>`).join('')}</div>`;
  board.querySelectorAll('[data-cell]').forEach(btn => btn.onclick = () => sendAction({ cell: Number(btn.dataset.cell) }));
}

function renderDice(board, room) {
  const myCanAct = canAct(false);
  const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  board.innerHTML = `<div class="dice-grid"><div class="dice-card"><div><small>${room.players[0]?.name || 'P1'}</small><div class="dice-face">${room.state.rolls[0] ? faces[room.state.rolls[0]-1] : '🎲'}</div></div></div><div class="dice-card"><div><small>${room.players[1]?.name || 'P2'}</small><div class="dice-face">${room.state.rolls[1] ? faces[room.state.rolls[1]-1] : '🎲'}</div></div></div><button class="btn primary full" id="rollBtn" ${!myCanAct ? 'disabled' : ''}>${t('roll')}</button></div>`;
  const roll = $('rollBtn');
  if (roll) roll.onclick = () => sendAction({ type: 'roll' });
}

function isWinCellConnect(room, r, c) { return (room.state?.winLine || []).some(([rr, cc]) => rr === r && cc === c); }
function renderConnect4(board, room) {
  let html = '<div class="connect-board">';
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const v = room.state.board[r][c];
      html += `<button class="connect-cell ${v === 0 ? 'p0' : v === 1 ? 'p1' : ''} ${isWinCellConnect(room, r, c) ? 'win' : ''}" data-col="${c}" ${!canAct(true) ? 'disabled' : ''}></button>`;
    }
  }
  html += '</div>';
  board.innerHTML = html;
  board.querySelectorAll('[data-col]').forEach(btn => btn.onclick = () => sendAction({ col: Number(btn.dataset.col) }));
}

function renderMemory(board, room) {
  board.innerHTML = `<div class="memory-board">${room.state.cards.map(card => `<button class="memory-card ${card.value ? '' : 'closed'} ${card.matched ? 'matched' : ''}" data-card="${card.id}" ${!canAct(true) || card.matched || card.revealed ? 'disabled' : ''}>${card.value || '?'}</button>`).join('')}</div>`;
  board.querySelectorAll('[data-card]').forEach(btn => btn.onclick = () => sendAction({ card: Number(btn.dataset.card) }));
}

function renderTwentyOne(board, room) {
  board.innerHTML = `<div class="twentyone-grid"><div class="total-card"><small>${t('total')}</small><div class="total-number">${room.state.total}</div></div><div class="add-buttons">${[1,2,3].map(n => `<button class="game-big-btn" data-add="${n}" ${!canAct(true) || room.state.total + n > 21 ? 'disabled' : ''}>+${n}<small>${t('add')}</small></button>`).join('')}</div></div>`;
  board.querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => sendAction({ add: Number(btn.dataset.add) }));
}

function renderReaction(board, room) {
  const now = Date.now();
  const ready = now >= room.state.readyAt;
  board.innerHTML = `<div class="reaction-grid"><p>${ready ? t('go') : t('tapWhenGreen')}</p><button class="reaction-button ${ready ? 'go' : ''}" id="reactionBtn" ${!canAct(false) ? 'disabled' : ''}>${ready ? t('go') : '...'}</button></div>`;
  $('reactionBtn').onclick = () => sendAction({ type: 'tap' });
  if (!ready && room.status === 'playing') setTimeout(() => state.room && renderReaction($('gameBoard'), state.room), Math.max(80, room.state.readyAt - now));
}

function maybeShowWinner(room) {
  const key = room.lastRound ? `${room.id}:${room.lastRound.at}` : null;
  if (room.status === 'roundOver' && key && key !== state.lastRoundKey) {
    state.lastRoundKey = key;
    const text = room.winnerMessage?.winnerIndex == null ? t('draw').toUpperCase() : room.winnerMessage.text;
    $('winnerText').textContent = text;
    $('winnerOverlay').classList.remove('hidden');
    launchConfetti();
    loadHistory();
  }
}

function copy(text) {
  navigator.clipboard?.writeText(text).then(() => toast(t('copied'))).catch(() => toast(text));
}

function fullUrl(path) { return `${location.origin}${path}`; }
function tryFullscreen() {
  if (window.innerWidth < 900 && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function launchConfetti() {
  const canvas = $('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  const colors = ['#8b5cff', '#00e8ff', '#ffce4a', '#ff4d8d', '#38f7a1'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height * .35,
    size: 6 * devicePixelRatio + Math.random() * 8 * devicePixelRatio,
    speed: 3 * devicePixelRatio + Math.random() * 8 * devicePixelRatio,
    rot: Math.random() * 6,
    spin: -.12 + Math.random() * .24,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin((frame + p.y) / 24) * 2;
      p.rot += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .55);
      ctx.restore();
    });
    frame++;
    if (frame < 170) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

function setupMusic() {
  const audio = $('bgMusic');
  const custom = localStorage.getItem('smq_custom_music');
  if (custom) audio.src = custom;
  const volume = Number(localStorage.getItem('smq_volume') || '0.35');
  audio.volume = volume;
  $('volumeSlider').value = volume;
  if (state.musicOn) audio.play().catch(() => {});
}

function toggleMusic() {
  const audio = $('bgMusic');
  state.musicOn = !state.musicOn;
  localStorage.setItem('smq_music_on', state.musicOn ? '1' : '0');
  if (state.musicOn) audio.play().catch(() => toast(t('musicOn'))); else audio.pause();
  $('toggleMusicBtn').textContent = state.musicOn ? t('musicOff') : t('musicOn');
}

async function saveProfile() {
  const avatarData = $('profileAvatar').dataset.newAvatar || undefined;
  const settings = { lang: $('profileLang').value, theme: $('themeSelect').value, fontSize: $('fontSizeSelect').value, musicVolume: Number($('volumeSlider').value) };
  const data = await api('/api/profile', { method: 'PUT', body: JSON.stringify({ name: $('profileName').value, avatarData, settings }) });
  state.user = data.user;
  state.lang = settings.lang; state.theme = settings.theme; state.fontSize = settings.fontSize;
  localStorage.setItem('smq_lang', state.lang); localStorage.setItem('smq_theme', state.theme); localStorage.setItem('smq_fontSize', state.fontSize);
  delete $('profileAvatar').dataset.newAvatar;
  updateProfileUI(); applyThemeAndFont(); applyI18n(); toast(t('profileSaved'));
}

function bindEvents() {
  $('guestLoginBtn').onclick = async () => { localStorage.setItem('smq_entered', '1'); state.entered = true; showScreen('homeScreen'); await loadHistory(); const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); };
  $('openProfileBtn').onclick = () => $('profileDrawer').classList.remove('hidden');
  $('closeProfileBtn').onclick = () => $('profileDrawer').classList.add('hidden');
  $('closeProfileBackdrop').onclick = () => $('profileDrawer').classList.add('hidden');
  $('quickLang').onchange = () => { state.lang = $('quickLang').value; localStorage.setItem('smq_lang', state.lang); $('profileLang').value = state.lang; applyI18n(); };
  $('profileLang').onchange = () => { state.lang = $('profileLang').value; localStorage.setItem('smq_lang', state.lang); applyI18n(); };
  $('themeBtn').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('themeSelect').onchange = () => { state.theme = $('themeSelect').value; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('fontSizeSelect').onchange = () => { state.fontSize = $('fontSizeSelect').value; localStorage.setItem('smq_fontSize', state.fontSize); applyThemeAndFont(); };
  document.querySelectorAll('.segment').forEach(btn => btn.onclick = () => { document.querySelectorAll('.segment').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.selectedMode = btn.dataset.mode; localStorage.setItem('smq_mode', state.selectedMode); });
  $('createRoomBtn').onclick = createRoom;
  $('joinPlayerBtn').onclick = () => joinRoom($('roomCodeInput').value.trim(), false);
  $('joinSpectatorBtn').onclick = () => joinRoom($('roomCodeInput').value.trim(), true);
  $('backHomeBtn').onclick = () => { history.pushState({}, '', '/'); showScreen('homeScreen'); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); loadHistory(); };
  $('copyPlayerLinkBtn').onclick = () => state.room && copy(fullUrl(state.room.playerLink));
  $('copySpectatorLinkBtn').onclick = () => state.room && copy(fullUrl(state.room.spectatorLink));
  $('newRoundBtn').onclick = () => state.socket?.emit('new_round');
  $('winnerNextBtn').onclick = () => { $('winnerOverlay').classList.add('hidden'); if (state.role === 'player1' || state.role === 'player2') state.socket?.emit('new_round'); };
  $('refreshHistoryBtn').onclick = loadHistory;
  $('changeAvatarBtn').onclick = () => $('avatarInput').click();
  $('avatarInput').onchange = (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 900_000) return toast('Max 900 KB');
    const reader = new FileReader();
    reader.onload = () => { const data = reader.result; $('profileAvatar').dataset.newAvatar = data; setAvatar($('profileAvatar'), $('profileFallback'), data, $('profileName').value); };
    reader.readAsDataURL(file);
  };
  $('clearAvatarBtn').onclick = async () => {
    const data = await api('/api/profile', { method: 'PUT', body: JSON.stringify({ name: $('profileName').value, clearAvatar: true, settings: { lang: state.lang, theme: state.theme, fontSize: state.fontSize } }) });
    state.user = data.user; updateProfileUI();
  };
  $('saveProfileBtn').onclick = saveProfile;
  $('logoutBtn').onclick = async () => { await fetch('/auth/logout', { method: 'POST' }); localStorage.removeItem('smq_entered'); location.href = '/'; };
  $('toggleMusicBtn').onclick = toggleMusic;
  $('volumeSlider').oninput = () => { const v = Number($('volumeSlider').value); $('bgMusic').volume = v; localStorage.setItem('smq_volume', String(v)); };
  $('musicInput').onchange = (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 4_500_000) return toast('Max 4.5 MB');
    const reader = new FileReader();
    reader.onload = () => { localStorage.setItem('smq_custom_music', reader.result); $('bgMusic').src = reader.result; state.musicOn = true; localStorage.setItem('smq_music_on', '1'); $('bgMusic').play().catch(() => {}); $('toggleMusicBtn').textContent = t('musicOff'); };
    reader.readAsDataURL(file);
  };
  window.addEventListener('popstate', () => { const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); else showScreen('homeScreen'); });
}

async function init() {
  applyThemeAndFont();
  bindEvents();
  renderGameCards();
  setupMusic();
  await loadUser();
}

init();
