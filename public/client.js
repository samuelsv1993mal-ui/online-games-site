const $ = (id) => document.getElementById(id);

const I18N = {
  ru: {
    appTitle: 'SMQ Games', appSubtitle: 'Играй онлайн, с другом, против компьютера или наблюдай за комнатой.', loginGoogle: 'Войти через Google', continueGuest: 'Продолжить как гость', googleHint: 'Google-вход сохраняет фото профиля и историю игр.',
    hello: 'Привет', mobileGame: 'Мобильная онлайн-арена', chooseGame: 'Выбери игру', chooseMode: 'Играй с компьютером или создай комнату для друга.', newGame: 'Новая игра', game: 'Игра', mode: 'Режим', onlineRoom: 'Онлайн-комната', playComputer: 'С компьютером', createRoom: 'Создать комнату', joinRoom: 'Войти в комнату', joinAsPlayer: 'Играть', watch: 'Наблюдать', history: 'История игр', refresh: 'Обновить', spectators: 'Наблюдатели', copyPlayerLink: 'Ссылка игроку', copySpectatorLink: 'Ссылка зрителю', newRound: 'Новая партия', profile: 'Профиль', changePhoto: 'Изменить фото', resetPhoto: 'Сбросить', name: 'Имя', language: 'Язык', fontSize: 'Размер шрифта', small: 'Маленький', medium: 'Средний', large: 'Большой', xlarge: 'Очень большой', theme: 'Тема', darkTheme: 'Тёмная', lightTheme: 'Светлая', music: 'Музыка', musicOn: 'Включить музыку', musicOff: 'Выключить музыку', volume: 'Громкость', uploadMusic: 'Добавить свою музыку', saveProfile: 'Сохранить профиль', logout: 'Выйти', continue: 'Продолжить',
    copied: 'Ссылка скопирована', waitingFriend: 'Ждём второго игрока...', youSpectator: 'Вы наблюдатель', yourTurn: 'Ваш ход', opponentTurn: 'Ход соперника', botTurn: 'Ход компьютера', roomCreated: 'Комната создана', profileSaved: 'Профиль сохранён', googleNotConfigured: 'Google-вход нужно включить в Firebase Authentication и добавить домен Render.', noHistory: 'Истории пока нет', win: 'Победа', lose: 'Поражение', draw: 'Ничья', vs: 'против', tapWhenGreen: 'Жми, когда станет зелёным!', tooEarly: 'Рано!', go: 'ЖМИ!', total: 'Сумма', add: 'Добавить', roll: 'Бросить', selectMove: 'Выбери ход', chooseCard: 'Открой карту',
    games: { rps: ['Камень · Ножницы · Бумага', 'Быстрая дуэль на удачу'], ttt: ['Крестики-нолики', 'Классика 3×3'], dice: ['Кубики', 'У кого выпадет больше'], connect4: ['Четыре в ряд', 'Собери линию первым'], memory: ['Мемори', 'Запоминай пары карточек'], twentyone: ['21', 'Дойди ровно до 21'], reaction: ['Реакция', 'Кто нажмёт быстрее'] },
    moves: { rock: 'Камень', paper: 'Бумага', scissors: 'Ножницы' }
  },
  es: {
    appTitle: 'SMQ Games', appSubtitle: 'Juega online con un amigo, contra la computadora o mira una sala.', loginGoogle: 'Entrar con Google', continueGuest: 'Continuar como invitado', googleHint: 'Con Google se guardan tu foto de perfil y tu historial.',
    hello: 'Hola', mobileGame: 'Arena móvil online', chooseGame: 'Elige un juego', chooseMode: 'Juega contra la computadora o crea una sala para tu amigo.', newGame: 'Nuevo juego', game: 'Juego', mode: 'Modo', onlineRoom: 'Sala online', playComputer: 'Contra computadora', createRoom: 'Crear sala', joinRoom: 'Entrar a sala', joinAsPlayer: 'Jugar', watch: 'Observar', history: 'Historial', refresh: 'Actualizar', spectators: 'Observadores', copyPlayerLink: 'Link jugador', copySpectatorLink: 'Link observador', newRound: 'Nueva partida', profile: 'Perfil', changePhoto: 'Cambiar foto', resetPhoto: 'Restablecer', name: 'Nombre', language: 'Idioma', fontSize: 'Tamaño de letra', small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Muy grande', theme: 'Tema', darkTheme: 'Oscuro', lightTheme: 'Claro', music: 'Música', musicOn: 'Activar música', musicOff: 'Apagar música', volume: 'Volumen', uploadMusic: 'Agregar tu música', saveProfile: 'Guardar perfil', logout: 'Salir', continue: 'Continuar',
    copied: 'Link copiado', waitingFriend: 'Esperando al segundo jugador...', youSpectator: 'Estás observando', yourTurn: 'Tu turno', opponentTurn: 'Turno del rival', botTurn: 'Turno de la computadora', roomCreated: 'Sala creada', profileSaved: 'Perfil guardado', googleNotConfigured: 'Activa Google en Firebase Authentication y agrega el dominio de Render.', noHistory: 'Aún no hay historial', win: 'Victoria', lose: 'Derrota', draw: 'Empate', vs: 'contra', tapWhenGreen: '¡Toca cuando esté verde!', tooEarly: '¡Muy pronto!', go: '¡TOCA!', total: 'Total', add: 'Sumar', roll: 'Lanzar', selectMove: 'Elige tu jugada', chooseCard: 'Abre una carta',
    games: { rps: ['Piedra · Papel · Tijeras', 'Duelo rápido de suerte'], ttt: ['Tres en raya', 'Clásico 3×3'], dice: ['Dados', 'Gana el número mayor'], connect4: ['Cuatro en línea', 'Forma una línea primero'], memory: ['Memoria', 'Encuentra las parejas'], twentyone: ['21', 'Llega exactamente a 21'], reaction: ['Reacción', '¿Quién toca más rápido?'] },
    moves: { rock: 'Piedra', paper: 'Papel', scissors: 'Tijeras' }
  },
  en: {
    appTitle: 'SMQ Games', appSubtitle: 'Play online with a friend, against the computer, or watch a room.', loginGoogle: 'Sign in with Google', continueGuest: 'Continue as guest', googleHint: 'Google sign-in saves your profile photo and game history.',
    hello: 'Hello', mobileGame: 'Mobile online arena', chooseGame: 'Choose a game', chooseMode: 'Play against the computer or create a room for a friend.', newGame: 'New game', game: 'Game', mode: 'Mode', onlineRoom: 'Online room', playComputer: 'Computer', createRoom: 'Create room', joinRoom: 'Join room', joinAsPlayer: 'Play', watch: 'Watch', history: 'Game history', refresh: 'Refresh', spectators: 'Spectators', copyPlayerLink: 'Player link', copySpectatorLink: 'Spectator link', newRound: 'New round', profile: 'Profile', changePhoto: 'Change photo', resetPhoto: 'Reset', name: 'Name', language: 'Language', fontSize: 'Font size', small: 'Small', medium: 'Medium', large: 'Large', xlarge: 'Extra large', theme: 'Theme', darkTheme: 'Dark', lightTheme: 'Light', music: 'Music', musicOn: 'Turn music on', musicOff: 'Turn music off', volume: 'Volume', uploadMusic: 'Add your music', saveProfile: 'Save profile', logout: 'Log out', continue: 'Continue',
    copied: 'Link copied', waitingFriend: 'Waiting for second player...', youSpectator: 'You are watching', yourTurn: 'Your turn', opponentTurn: 'Opponent turn', botTurn: 'Computer turn', roomCreated: 'Room created', profileSaved: 'Profile saved', googleNotConfigured: 'Enable Google in Firebase Authentication and add the Render domain.', noHistory: 'No history yet', win: 'Win', lose: 'Loss', draw: 'Draw', vs: 'vs', tapWhenGreen: 'Tap when it turns green!', tooEarly: 'Too early!', go: 'TAP!', total: 'Total', add: 'Add', roll: 'Roll', selectMove: 'Choose your move', chooseCard: 'Open a card',
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

let fbApp = null;
let fbAuth = null;
let fbDb = null;

function defaultSettings() {
  return {
    lang: localStorage.getItem('smq_lang') || 'ru',
    theme: localStorage.getItem('smq_theme') || 'dark',
    fontSize: localStorage.getItem('smq_fontSize') || 'medium',
    musicVolume: Number(localStorage.getItem('smq_volume') || '0.35')
  };
}

function initFirebase() {
  if (fbApp || !window.firebase || !window.firebaseConfig) return !!fbApp;
  try {
    fbApp = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
    fbAuth = firebase.auth();
    fbDb = firebase.firestore();
    return true;
  } catch (error) {
    console.error('Firebase init error:', error);
    return false;
  }
}

function waitForAuthReady() {
  if (!initFirebase() || !fbAuth) return Promise.resolve(null);
  return new Promise(resolve => {
    const unsub = fbAuth.onAuthStateChanged(user => {
      unsub();
      resolve(user);
    }, () => resolve(null));
  });
}

function guestId() {
  let id = localStorage.getItem('smq_guest_id');
  if (!id) {
    id = `guest-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    localStorage.setItem('smq_guest_id', id);
  }
  return id;
}

function localGuestUser() {
  const settings = defaultSettings();
  const stored = JSON.parse(localStorage.getItem('smq_guest_profile') || '{}');
  return {
    id: guestId(),
    provider: 'guest',
    name: stored.name || 'Guest Player',
    email: null,
    avatarUrl: stored.avatarData || null,
    settings: { ...settings, ...(stored.settings || {}) }
  };
}

function cleanProfileData(data) {
  return data && typeof data === 'object' ? data : {};
}

async function loadFirebaseProfile(fbUser) {
  const ref = fbDb.collection('users').doc(fbUser.uid);
  const snap = await ref.get();
  const current = cleanProfileData(snap.exists ? snap.data() : {});
  const settings = { ...defaultSettings(), ...(current.settings || {}) };
  const now = new Date().toISOString();
  const base = {
    uid: fbUser.uid,
    provider: 'google',
    email: fbUser.email || current.email || null,
    googleName: fbUser.displayName || current.googleName || 'Google Player',
    googlePhotoURL: fbUser.photoURL || current.googlePhotoURL || null,
    photoURL: fbUser.photoURL || current.photoURL || null,
    settings,
    updatedAt: now,
    lastLoginAt: now
  };
  if (!snap.exists) {
    base.name = fbUser.displayName || 'Google Player';
    base.createdAt = now;
    base.stats = { played: 0, wins: 0, losses: 0, draws: 0 };
  }
  await ref.set(base, { merge: true });
  const merged = { ...current, ...base, name: current.name || base.name || base.googleName };
  return {
    id: fbUser.uid,
    provider: 'firebase-google',
    name: merged.name || fbUser.displayName || 'Google Player',
    email: merged.email || fbUser.email || null,
    avatarUrl: merged.avatarData || merged.photoURL || fbUser.photoURL || null,
    googleAvatarUrl: fbUser.photoURL || merged.googlePhotoURL || null,
    settings: { ...defaultSettings(), ...(merged.settings || {}) },
    stats: merged.stats || { played: 0, wins: 0, losses: 0, draws: 0 }
  };
}

async function signInWithGoogleFirebase() {
  if (!initFirebase() || !fbAuth) {
    toast('Firebase не подключён');
    return;
  }
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await fbAuth.signInWithPopup(provider);
    localStorage.setItem('smq_entered', '1');
    state.entered = true;
    await loadUser();
  } catch (error) {
    console.warn('Popup sign-in failed, trying redirect:', error);
    try {
      localStorage.setItem('smq_entered', '1');
      await fbAuth.signInWithRedirect(provider);
    } catch (redirectError) {
      console.error(redirectError);
      toast('Google вход не сработал. Проверь Authorized domains в Firebase.');
    }
  }
}

function currentSocketIdentity() {
  const fbUser = fbAuth?.currentUser || null;
  return {
    firebaseUid: fbUser?.uid || null,
    avatarUrl: state.user?.avatarUrl || null
  };
}

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
  const params = new URLSearchParams(location.search);
  const roomFromPath = getRoomFromPath();
  const fbUser = await waitForAuthReady();

  if (fbUser) {
    state.entered = true;
    localStorage.setItem('smq_entered', '1');
    state.user = await loadFirebaseProfile(fbUser);
  } else if (state.entered) {
    state.user = localGuestUser();
  } else {
    state.user = localGuestUser();
    updateProfileUI();
    applyThemeAndFont();
    applyI18n();
    showScreen('loginScreen');
    return;
  }

  const settings = state.user?.settings || defaultSettings();
  state.lang = settings.lang || localStorage.getItem('smq_lang') || state.lang;
  state.theme = settings.theme || localStorage.getItem('smq_theme') || state.theme;
  state.fontSize = settings.fontSize || localStorage.getItem('smq_fontSize') || state.fontSize;
  localStorage.setItem('smq_lang', state.lang);
  localStorage.setItem('smq_theme', state.theme);
  localStorage.setItem('smq_fontSize', state.fontSize);

  updateProfileUI();
  applyThemeAndFont();
  applyI18n();
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
    if (fbAuth?.currentUser && fbDb) {
      const snap = await fbDb
        .collection('users')
        .doc(fbAuth.currentUser.uid)
        .collection('history')
        .orderBy('date', 'desc')
        .limit(50)
        .get();
      state.history = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      state.history = JSON.parse(localStorage.getItem('smq_guest_history') || '[]');
    }
    renderHistory();
  } catch (error) {
    console.error('History load error:', error);
    state.history = [];
    renderHistory();
  }
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
  state.socket.emit('join_room', { game: state.selectedGame, mode: state.selectedMode, name: state.user?.name || 'Player', ...currentSocketIdentity() });
  toast(t('roomCreated'));
}

function joinRoom(roomId, spectate) {
  if (!roomId) return;
  setupSocket();
  state.socket.emit('join_room', { roomId: roomId.toUpperCase(), spectate: !!spectate, name: state.user?.name || 'Player', ...currentSocketIdentity() });
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
  maybeSaveRoundHistory(room);
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

async function maybeSaveRoundHistory(room) {
  if (!room || room.status !== 'roundOver' || !room.lastRound) return;
  if (state.role !== 'player1' && state.role !== 'player2') return;
  const myIndex = state.role === 'player1' ? 0 : 1;
  const recordId = `${room.id}-${room.lastRound.at || Date.now()}-${myIndex}`;
  if (state.lastRoundKey === recordId) return;
  state.lastRoundKey = recordId;

  const winnerIndex = room.lastRound.winnerIndex;
  const result = winnerIndex === null || winnerIndex === undefined ? 'draw' : winnerIndex === myIndex ? 'win' : 'lose';
  const opponent = room.players[myIndex === 0 ? 1 : 0]?.name || (room.mode === 'bot' ? 'SMQ Bot' : 'Unknown');
  const item = {
    id: recordId,
    date: new Date(room.lastRound.at || Date.now()).toISOString(),
    game: room.game,
    mode: room.mode,
    result,
    opponent,
    score: `${room.scores[0]}:${room.scores[1]}`,
    ties: room.ties || 0,
    roomId: room.id
  };

  try {
    if (fbAuth?.currentUser && fbDb) {
      const userRef = fbDb.collection('users').doc(fbAuth.currentUser.uid);
      await userRef.collection('history').doc(recordId).set(item, { merge: true });
      const inc = firebase.firestore.FieldValue.increment;
      await userRef.set({
        lastGameAt: item.date,
        stats: {
          played: inc(1),
          wins: inc(result === 'win' ? 1 : 0),
          losses: inc(result === 'lose' ? 1 : 0),
          draws: inc(result === 'draw' ? 1 : 0)
        }
      }, { merge: true });
      await loadHistory();
    } else {
      const historyItems = JSON.parse(localStorage.getItem('smq_guest_history') || '[]');
      const withoutDuplicate = historyItems.filter(h => h.id !== recordId);
      withoutDuplicate.unshift(item);
      localStorage.setItem('smq_guest_history', JSON.stringify(withoutDuplicate.slice(0, 50)));
      state.history = withoutDuplicate.slice(0, 50);
      renderHistory();
    }
  } catch (error) {
    console.error('History save error:', error);
  }
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
  const name = $('profileName').value.trim() || 'Player';

  if (fbAuth?.currentUser && fbDb) {
    const update = { name, settings, updatedAt: new Date().toISOString() };
    if (avatarData) update.avatarData = avatarData;
    await fbDb.collection('users').doc(fbAuth.currentUser.uid).set(update, { merge: true });
    state.user = await loadFirebaseProfile(fbAuth.currentUser);
  } else {
    const guest = localGuestUser();
    const profile = { name, settings, avatarData: avatarData || guest.avatarUrl || null };
    localStorage.setItem('smq_guest_profile', JSON.stringify(profile));
    state.user = localGuestUser();
  }

  state.lang = settings.lang;
  state.theme = settings.theme;
  state.fontSize = settings.fontSize;
  localStorage.setItem('smq_lang', state.lang);
  localStorage.setItem('smq_theme', state.theme);
  localStorage.setItem('smq_fontSize', state.fontSize);
  delete $('profileAvatar').dataset.newAvatar;
  updateProfileUI();
  applyThemeAndFont();
  applyI18n();
  toast(t('profileSaved'));
}

function bindEvents() {
  $('googleLoginBtn').onclick = signInWithGoogleFirebase;
  $('guestLoginBtn').onclick = async () => { localStorage.setItem('smq_entered', '1'); state.entered = true; state.user = localGuestUser(); updateProfileUI(); showScreen('homeScreen'); await loadHistory(); const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); };
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
    if (file.size > 300_000) return toast('Max 300 KB');
    const reader = new FileReader();
    reader.onload = () => { const data = reader.result; $('profileAvatar').dataset.newAvatar = data; setAvatar($('profileAvatar'), $('profileFallback'), data, $('profileName').value); };
    reader.readAsDataURL(file);
  };
  $('clearAvatarBtn').onclick = async () => {
    delete $('profileAvatar').dataset.newAvatar;
    if (fbAuth?.currentUser && fbDb) {
      await fbDb.collection('users').doc(fbAuth.currentUser.uid).set({ avatarData: firebase.firestore.FieldValue.delete(), photoURL: fbAuth.currentUser.photoURL || null, updatedAt: new Date().toISOString() }, { merge: true });
      state.user = await loadFirebaseProfile(fbAuth.currentUser);
    } else {
      const profile = JSON.parse(localStorage.getItem('smq_guest_profile') || '{}');
      delete profile.avatarData;
      localStorage.setItem('smq_guest_profile', JSON.stringify(profile));
      state.user = localGuestUser();
    }
    updateProfileUI();
  };
  $('saveProfileBtn').onclick = saveProfile;
  $('logoutBtn').onclick = async () => { if (fbAuth?.currentUser) await fbAuth.signOut(); localStorage.removeItem('smq_entered'); state.entered = false; state.user = localGuestUser(); location.href = '/'; };
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
