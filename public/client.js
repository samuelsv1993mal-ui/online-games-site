const $ = (id) => document.getElementById(id);

const I18N = {
  ru: {
    appTitle:'SMQ Games', appSubtitle:'Играй онлайн, с другом, против компьютера или наблюдай за комнатой.', loginGoogle:'Войти через Google', continueGuest:'Продолжить как гость', googleHint:'Google сохраняет фото, цвет профиля, настройки и историю игр.', installApp:'Скачать как приложение', installUnavailable:'Установка появится после открытия сайта в Chrome/браузере и обновления страницы.', installReady:'Можно установить SMQ Games как приложение.', appInstalled:'SMQ Games установлено.',
    hello:'Привет', mobileGame:'Игровая арена', chooseGame:'Выбери игру', chooseMode:'Играй один, с компьютером, с друзьями или командами.', newGame:'Новая игра', game:'Игра', mode:'Режим', onlineRoom:'Онлайн-комната', playComputer:'С компьютером', createRoom:'Создать комнату', joinRoom:'Войти в комнату', joinAsPlayer:'Играть', watch:'Наблюдать', history:'История игр', refresh:'Обновить', spectators:'Наблюдатели', copyPlayerLink:'Ссылка игроку', copySpectatorLink:'Ссылка зрителю', newRound:'Новая партия', profile:'Профиль', changePhoto:'Изменить фото', resetPhoto:'Сбросить', name:'Имя', profileColor:'Цвет игрока', language:'Язык', fontSize:'Размер шрифта', small:'Маленький', medium:'Средний', large:'Большой', xlarge:'Очень большой', theme:'Тема', darkTheme:'Тёмная', lightTheme:'Светлая', music:'Музыка', musicOn:'Включить музыку', musicOff:'Выключить музыку', volume:'Громкость', uploadMusic:'Добавить свою музыку', saveProfile:'Сохранить профиль', logout:'Выйти', continue:'Продолжить',
    copied:'Ссылка скопирована', waitingFriend:'Ждём игроков...', youSpectator:'Вы наблюдатель', yourTurn:'Ваш ход', opponentTurn:'Ход соперника', botTurn:'Ход компьютера', roomCreated:'Комната создана', profileSaved:'Профиль сохранён', noHistory:'Истории пока нет', win:'Победа', lose:'Поражение', draw:'Ничья', vs:'против', tapWhenGreen:'Жми, когда станет зелёным!', tooEarly:'Рано!', go:'ЖМИ!', total:'Сумма', add:'Добавить', roll:'Бросить', selectMove:'Выбери ход', chooseCard:'Открой карту', reviewing:'Последний ход показан. Считаем результат...', resultSoon:'Результат через мгновение...', lastMove:'Последний ход', teams:'Команды', players:'Игроки', maxPlayers:'до {n} игроков', take:'Взять', sticks:'палочек', guessCode:'Угадай код из 4 цифр от 1 до 6', send:'Отправить', question:'Вопрос', answered:'Ответ принят', correct:'Верно', wrong:'Неверно', team:'Команда', fullscreen:'На весь экран', difficulty:'Сложность', source:'Источник', easy:'Лёгкий', hard:'Сложный', 
    games:{ rps:['Камень · Ножницы · Бумага','Быстрая дуэль'], ttt:['Крестики-нолики','Цветные X и O'], dice:['Кубики','У кого выпадет больше'], connect4:['Четыре в ряд','Собери линию'], memory:['Мемори','Найди пары'], twentyone:['21','Дойди ровно до 21'], reaction:['Реакция','Кто быстрее'], checkers:['Шашки','Стратегия 8×8'], nim:['Ним','Логика с палочками'], code:['Взлом кода','Логика и дедукция'], millionaire:['Кто хочет стать миллионером','Викторина до 10 игроков'], teamquiz:['Командная викторина','2, 3 или 4 команды'], mathrace:['Математическая гонка','Быстрый счёт до 10 игроков'], biblequiz:['Что? Где? Когда? — Библия','Библейские вопросы разной сложности'] },
    moves:{ rock:'Камень', paper:'Бумага', scissors:'Ножницы' }
  },
  es: {
    appTitle:'SMQ Games', appSubtitle:'Juega online con amigos, contra la computadora o mira una sala.', loginGoogle:'Entrar con Google', continueGuest:'Continuar como invitado', googleHint:'Google guarda tu foto, color, ajustes e historial.', installApp:'Descargar como app', installUnavailable:'La instalación aparecerá después de abrir el sitio en Chrome/navegador y actualizar.', installReady:'Puedes instalar SMQ Games como app.', appInstalled:'SMQ Games instalado.',
    hello:'Hola', mobileGame:'Arena de juegos', chooseGame:'Elige un juego', chooseMode:'Juega solo, contra computadora, con amigos o en equipos.', newGame:'Nuevo juego', game:'Juego', mode:'Modo', onlineRoom:'Sala online', playComputer:'Computadora', createRoom:'Crear sala', joinRoom:'Entrar a sala', joinAsPlayer:'Jugar', watch:'Observar', history:'Historial', refresh:'Actualizar', spectators:'Observadores', copyPlayerLink:'Link jugador', copySpectatorLink:'Link observador', newRound:'Nueva partida', profile:'Perfil', changePhoto:'Cambiar foto', resetPhoto:'Restablecer', name:'Nombre', profileColor:'Color del jugador', language:'Idioma', fontSize:'Tamaño de letra', small:'Pequeño', medium:'Mediano', large:'Grande', xlarge:'Muy grande', theme:'Tema', darkTheme:'Oscuro', lightTheme:'Claro', music:'Música', musicOn:'Activar música', musicOff:'Apagar música', volume:'Volumen', uploadMusic:'Agregar tu música', saveProfile:'Guardar perfil', logout:'Salir', continue:'Continuar',
    copied:'Link copiado', waitingFriend:'Esperando jugadores...', youSpectator:'Estás observando', yourTurn:'Tu turno', opponentTurn:'Turno del rival', botTurn:'Turno de la computadora', roomCreated:'Sala creada', profileSaved:'Perfil guardado', noHistory:'Aún no hay historial', win:'Victoria', lose:'Derrota', draw:'Empate', vs:'contra', tapWhenGreen:'¡Toca cuando esté verde!', tooEarly:'¡Muy pronto!', go:'¡TOCA!', total:'Total', add:'Sumar', roll:'Lanzar', selectMove:'Elige tu jugada', chooseCard:'Abre una carta', reviewing:'Mostrando la última jugada. Calculando resultado...', resultSoon:'Resultado en un momento...', lastMove:'Última jugada', teams:'Equipos', players:'Jugadores', maxPlayers:'hasta {n} jugadores', take:'Tomar', sticks:'palitos', guessCode:'Adivina el código de 4 dígitos del 1 al 6', send:'Enviar', question:'Pregunta', answered:'Respuesta recibida', correct:'Correcto', wrong:'Incorrecto', team:'Equipo', fullscreen:'Pantalla completa', difficulty:'Dificultad', source:'Fuente', easy:'Fácil', hard:'Difícil', 
    games:{ rps:['Piedra · Papel · Tijeras','Duelo rápido'], ttt:['Tres en raya','X y O de color'], dice:['Dados','Gana el número mayor'], connect4:['Cuatro en línea','Conecta una línea'], memory:['Memoria','Encuentra pares'], twentyone:['21','Llega a 21'], reaction:['Reacción','El más rápido'], checkers:['Damas','Estrategia 8×8'], nim:['Nim','Lógica con palitos'], code:['Romper el código','Deducción lógica'], millionaire:['¿Quién quiere ser millonario?','Trivia hasta 10 jugadores'], teamquiz:['Trivia por equipos','2, 3 o 4 equipos'], mathrace:['Carrera matemática','Cálculo rápido'], biblequiz:['¿Qué? ¿Dónde? ¿Cuándo? — Biblia','Preguntas bíblicas por dificultad'] },
    moves:{ rock:'Piedra', paper:'Papel', scissors:'Tijeras' }
  },
  en: {
    appTitle:'SMQ Games', appSubtitle:'Play online with friends, against the computer, or watch a room.', loginGoogle:'Sign in with Google', continueGuest:'Continue as guest', googleHint:'Google saves your photo, color, settings, and history.', installApp:'Download as app', installUnavailable:'Install will appear after opening the site in Chrome/browser and refreshing.', installReady:'You can install SMQ Games as an app.', appInstalled:'SMQ Games installed.',
    hello:'Hello', mobileGame:'Game arena', chooseGame:'Choose a game', chooseMode:'Play solo, vs computer, with friends, or in teams.', newGame:'New game', game:'Game', mode:'Mode', onlineRoom:'Online room', playComputer:'Computer', createRoom:'Create room', joinRoom:'Join room', joinAsPlayer:'Play', watch:'Watch', history:'Game history', refresh:'Refresh', spectators:'Spectators', copyPlayerLink:'Player link', copySpectatorLink:'Spectator link', newRound:'New round', profile:'Profile', changePhoto:'Change photo', resetPhoto:'Reset', name:'Name', profileColor:'Player color', language:'Language', fontSize:'Font size', small:'Small', medium:'Medium', large:'Large', xlarge:'Extra large', theme:'Theme', darkTheme:'Dark', lightTheme:'Light', music:'Music', musicOn:'Turn music on', musicOff:'Turn music off', volume:'Volume', uploadMusic:'Add your music', saveProfile:'Save profile', logout:'Log out', continue:'Continue',
    copied:'Link copied', waitingFriend:'Waiting for players...', youSpectator:'You are watching', yourTurn:'Your turn', opponentTurn:'Opponent turn', botTurn:'Computer turn', roomCreated:'Room created', profileSaved:'Profile saved', noHistory:'No history yet', win:'Win', lose:'Loss', draw:'Draw', vs:'vs', tapWhenGreen:'Tap when it turns green!', tooEarly:'Too early!', go:'TAP!', total:'Total', add:'Add', roll:'Roll', selectMove:'Choose your move', chooseCard:'Open a card', reviewing:'Showing the last move. Calculating result...', resultSoon:'Result coming soon...', lastMove:'Last move', teams:'Teams', players:'Players', maxPlayers:'up to {n} players', take:'Take', sticks:'sticks', guessCode:'Guess the 4-digit code from 1 to 6', send:'Send', question:'Question', answered:'Answer received', correct:'Correct', wrong:'Wrong', team:'Team', fullscreen:'Fullscreen', difficulty:'Difficulty', source:'Source', easy:'Easy', hard:'Hard', 
    games:{ rps:['Rock · Paper · Scissors','Fast duel'], ttt:['Tic Tac Toe','Colored X and O'], dice:['Dice Duel','Highest roll wins'], connect4:['Four in a Row','Connect a line'], memory:['Memory Match','Find pairs'], twentyone:['Twenty One','Reach 21 exactly'], reaction:['Reaction Tap','Fastest wins'], checkers:['Checkers','8×8 strategy'], nim:['Nim','Logic with sticks'], code:['Code Breaker','Logic deduction'], millionaire:['Who Wants to Be a Millionaire','Quiz for up to 10 players'], teamquiz:['Team Quiz','2, 3 or 4 teams'], mathrace:['Math Race','Fast arithmetic'], biblequiz:['What? Where? When? — Bible','Bible questions by difficulty'] },
    moves:{ rock:'Rock', paper:'Paper', scissors:'Scissors' }
  }
};

const games = [
  { id:'rps', emoji:'✊', max:2 }, { id:'ttt', emoji:'⭕', max:2 }, { id:'dice', emoji:'🎲', max:2 }, { id:'connect4', emoji:'🔴', max:2 },
  { id:'memory', emoji:'🧠', max:2 }, { id:'twentyone', emoji:'21', max:2 }, { id:'reaction', emoji:'⚡', max:2 }, { id:'checkers', emoji:'⚫', max:2 },
  { id:'nim', emoji:'🪵', max:2 }, { id:'code', emoji:'🔐', max:1 }, { id:'millionaire', emoji:'💰', max:10 }, { id:'biblequiz', emoji:'📖', max:10 }, { id:'teamquiz', emoji:'🏁', max:10 }, { id:'mathrace', emoji:'🧮', max:10 }
];

const state = {
  user:null,
  entered: localStorage.getItem('smq_entered') === '1',
  lang: localStorage.getItem('smq_lang') || 'ru',
  theme: localStorage.getItem('smq_theme') || 'dark',
  fontSize: localStorage.getItem('smq_fontSize') || 'medium',
  color: localStorage.getItem('smq_color') || '#8b5cf6',
  selectedGame: localStorage.getItem('smq_game') || 'rps',
  selectedMode: localStorage.getItem('smq_mode') || 'online',
  selectedTeams: Number(localStorage.getItem('smq_team_count') || '2'),
  socket:null,
  room:null,
  role:null,
  lastWinnerKey:null,
  lastHistoryKey:null,
  selectedChecker:null,
  musicOn: localStorage.getItem('smq_music_on') === '1',
  history: [],
  deferredInstallPrompt:null,
  isStandalone: window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
};

let fbApp = null, fbAuth = null, fbDb = null;

function t(key) {
  const dict = I18N[state.lang] || I18N.ru;
  return key.split('.').reduce((obj, part) => obj && obj[part], dict) || key;
}

function defaultSettings() {
  return { lang: state.lang, theme: state.theme, fontSize: state.fontSize, color: state.color, musicVolume: Number(localStorage.getItem('smq_volume') || '0.35') };
}

function initFirebase() {
  if (fbApp || !window.firebase || !window.firebaseConfig) return !!fbApp;
  try {
    fbApp = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
    fbAuth = firebase.auth();
    try { fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (_) {}
    fbDb = firebase.firestore();
    return true;
  } catch (error) { console.error(error); return false; }
}

function waitForAuthReady() {
  if (!initFirebase() || !fbAuth) return Promise.resolve(null);
  return new Promise(resolve => {
    const unsub = fbAuth.onAuthStateChanged(user => { unsub(); resolve(user); }, () => resolve(null));
  });
}

function guestId() {
  let id = localStorage.getItem('smq_guest_id');
  if (!id) { id = `guest-${Math.random().toString(36).slice(2)}-${Date.now()}`; localStorage.setItem('smq_guest_id', id); }
  return id;
}

function localGuestUser() {
  const stored = JSON.parse(localStorage.getItem('smq_guest_profile') || '{}');
  const settings = { ...defaultSettings(), ...(stored.settings || {}) };
  return { id: guestId(), provider:'guest', name: stored.name || 'Guest Player', email:null, avatarUrl: stored.avatarData || null, settings, color: settings.color || state.color };
}

async function loadFirebaseProfile(fbUser) {
  const ref = fbDb.collection('users').doc(fbUser.uid);
  const snap = await ref.get();
  const current = snap.exists ? snap.data() : {};
  const settings = { ...defaultSettings(), ...(current.settings || {}) };
  const now = new Date().toISOString();
  const base = {
    uid: fbUser.uid,
    provider:'google',
    email: fbUser.email || current.email || null,
    googleName: fbUser.displayName || current.googleName || 'Google Player',
    googlePhotoURL: fbUser.photoURL || current.googlePhotoURL || null,
    photoURL: fbUser.photoURL || current.photoURL || null,
    settings,
    updatedAt: now,
    lastLoginAt: now
  };
  if (!snap.exists) { base.name = fbUser.displayName || 'Google Player'; base.createdAt = now; base.stats = { played:0, wins:0, losses:0, draws:0 }; }
  await ref.set(base, { merge:true });
  const merged = { ...current, ...base, name: current.name || base.name || base.googleName };
  return { id: fbUser.uid, provider:'firebase-google', name: merged.name, email: merged.email, avatarUrl: merged.avatarData || merged.photoURL || fbUser.photoURL || null, settings: { ...defaultSettings(), ...(merged.settings || {}) }, color: (merged.settings && merged.settings.color) || state.color, stats: merged.stats || { played:0, wins:0, losses:0, draws:0 } };
}

async function signInWithGoogleFirebase() {
  if (!initFirebase() || !fbAuth) return toast('Firebase не подключён');
  const provider = new firebase.auth.GoogleAuthProvider();
  try { await fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (_) {}
  try {
    await fbAuth.signInWithPopup(provider);
    localStorage.setItem('smq_entered', '1');
    state.entered = true;
    await loadUser();
  } catch (e) {
    console.warn('Popup failed, redirect:', e);
    localStorage.setItem('smq_entered', '1');
    await fbAuth.signInWithRedirect(provider);
  }
}

function currentSocketIdentity() {
  const fbUser = fbAuth?.currentUser || null;
  return { firebaseUid: fbUser?.uid || null, avatarUrl: state.user?.avatarUrl || null, color: state.user?.settings?.color || state.user?.color || state.color };
}

function getRoomFromPath() {
  const match = location.pathname.match(/^\/room\/([A-Z0-9]+)/i);
  return match ? match[1].toUpperCase() : null;
}

async function loadUser() {
  const params = new URLSearchParams(location.search);
  const roomFromPath = getRoomFromPath();
  const fbUser = await waitForAuthReady();
  if (fbUser) {
    state.entered = true; localStorage.setItem('smq_entered', '1'); state.user = await loadFirebaseProfile(fbUser);
  } else if (state.entered) state.user = localGuestUser();
  else {
    state.user = localGuestUser(); updateProfileUI(); applyThemeAndFont(); applyI18n(); showScreen('loginScreen'); return;
  }
  const s = state.user.settings || defaultSettings();
  state.lang = s.lang || state.lang; state.theme = s.theme || state.theme; state.fontSize = s.fontSize || state.fontSize; state.color = s.color || state.color;
  localStorage.setItem('smq_lang', state.lang); localStorage.setItem('smq_theme', state.theme); localStorage.setItem('smq_fontSize', state.fontSize); localStorage.setItem('smq_color', state.color);
  updateProfileUI(); applyThemeAndFont(); applyI18n(); showScreen('homeScreen'); await loadHistory();
  if (roomFromPath) joinRoom(roomFromPath, params.get('spectate') === '1');
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $('quickLang').value = state.lang; $('profileLang').value = state.lang;
  $('toggleMusicBtn').textContent = state.musicOn ? t('musicOff') : t('musicOn');
  renderGameCards(); renderHistory(); if (state.room) renderRoom(state.room);
}

function applyThemeAndFont() {
  document.body.classList.toggle('light', state.theme === 'light');
  document.body.classList.remove('font-small','font-medium','font-large','font-xlarge');
  document.body.classList.add(`font-${state.fontSize}`);
  document.documentElement.style.setProperty('--my-color', state.color);
  $('themeSelect').value = state.theme; $('fontSizeSelect').value = state.fontSize;
}

function showScreen(name) { ['loginScreen','homeScreen','roomScreen'].forEach(id => $(id).classList.add('hidden')); $(name).classList.remove('hidden'); }
function toast(message) { const el = $('toast'); el.textContent = message; el.classList.remove('hidden'); clearTimeout(toast._timer); toast._timer = setTimeout(() => el.classList.add('hidden'), 2400); }
function avatarInitial(name) { return (name || 'S').trim().slice(0,1).toUpperCase(); }
function setAvatar(imgEl, fallbackEl, url, name) { if (url) { imgEl.src = url; imgEl.style.display = 'block'; fallbackEl.style.display = 'none'; } else { imgEl.removeAttribute('src'); imgEl.style.display = 'none'; fallbackEl.style.display = 'inline'; fallbackEl.textContent = avatarInitial(name); } }
function myIndex() { const m = String(state.role || '').match(/^player(\d+)$/); return m ? Number(m[1]) - 1 : -1; }
function activePlayers(room) { return (room.players || []).map((p,i) => p ? { ...p, index:i } : null).filter(Boolean); }

function updateProfileUI() {
  const u = state.user || { name:'Player' };
  $('headerName').textContent = u.name || 'Player'; $('profileName').value = u.name || 'Player';
  const color = u.settings?.color || u.color || state.color;
  state.color = color; $('profileColor').value = color;
  setAvatar($('headerAvatar'), $('avatarFallback'), u.avatarUrl, u.name); setAvatar($('profileAvatar'), $('profileFallback'), u.avatarUrl, u.name);
}

function renderGameCards() {
  const wrap = $('gameCards'); if (!wrap) return; wrap.innerHTML = '';
  games.forEach(game => {
    const info = t(`games.${game.id}`);
    const btn = document.createElement('button');
    btn.className = `game-card ${state.selectedGame === game.id ? 'active' : ''}`;
    btn.innerHTML = `<span class="emoji">${game.emoji}</span><strong>${info?.[0] || game.id}</strong><small>${info?.[1] || ''}</small><em>${t('maxPlayers').replace('{n}', game.max)}</em>`;
    btn.onclick = () => { state.selectedGame = game.id; localStorage.setItem('smq_game', game.id); renderGameCards(); };
    wrap.appendChild(btn);
  });
}

async function loadHistory() {
  try {
    if (fbAuth?.currentUser && fbDb) {
      const snap = await fbDb.collection('users').doc(fbAuth.currentUser.uid).collection('history').orderBy('date','desc').limit(50).get();
      state.history = snap.docs.map(doc => ({ id:doc.id, ...doc.data() }));
    } else state.history = JSON.parse(localStorage.getItem('smq_guest_history') || '[]');
  } catch (e) { console.error(e); state.history = []; }
  renderHistory();
}

function renderHistory() {
  const wrap = $('historyList'); if (!wrap) return;
  if (!state.history.length) { wrap.innerHTML = `<div class="history-item"><span>${t('noHistory')}</span></div>`; return; }
  wrap.innerHTML = state.history.slice(0, 12).map(item => {
    const resultText = t(item.result === 'win' ? 'win' : item.result === 'lose' ? 'lose' : 'draw');
    const resultClass = item.result === 'win' ? 'result-win' : item.result === 'lose' ? 'result-lose' : 'result-draw';
    const gameName = t(`games.${item.game}`)?.[0] || item.game;
    const date = new Date(item.date).toLocaleDateString(state.lang === 'ru' ? 'ru-RU' : state.lang === 'es' ? 'es-MX' : 'en-US', { day:'2-digit', month:'short' });
    return `<div class="history-item"><div><b>${gameName}</b><br><small>${t('vs')} ${item.opponent}</small></div><div><b class="${resultClass}">${resultText}</b><br><small>${item.score} · ${date}</small></div></div>`;
  }).join('');
}

function setupSocket() {
  if (state.socket) return;
  state.socket = io({ withCredentials:true });
  state.socket.on('joined_room', payload => { state.role = payload.role; showScreen('roomScreen'); tryFullscreen(); });
  state.socket.on('room_state', room => { state.room = room; renderRoom(room); });
}

function createRoom() {
  setupSocket();
  state.socket.emit('join_room', { game: state.selectedGame, mode: state.selectedMode, teamCount: state.selectedTeams, name: state.user?.name || 'Player', ...currentSocketIdentity() });
  toast(t('roomCreated'));
}

function joinRoom(roomId, spectate) {
  if (!roomId) return;
  setupSocket();
  state.socket.emit('join_room', { roomId: roomId.toUpperCase(), spectate: !!spectate, name: state.user?.name || 'Player', ...currentSocketIdentity() });
  history.replaceState({}, '', `/room/${roomId.toUpperCase()}${spectate ? '?spectate=1' : ''}`);
}

function renderRoom(room) {
  const p0 = room.players[0], p1 = room.players[1];
  document.documentElement.style.setProperty('--p0', p0?.color || '#8b5cf6');
  document.documentElement.style.setProperty('--p1', p1?.color || '#06b6d4');
  $('roomCodeLabel').textContent = room.id;
  $('gameTitle').textContent = t(`games.${room.game}`)?.[0] || room.game;
  $('p1Name').textContent = p0?.name || 'Player 1'; $('p2Name').textContent = p1?.name || (room.mode === 'bot' ? 'SMQ Bot' : 'Player 2');
  $('p1Score').textContent = room.scores[0] ?? 0; $('p2Score').textContent = room.scores[1] ?? 0; $('spectatorCount').textContent = room.spectators || 0;
  renderPlayerStrip(room); renderTurnBanner(room); renderGame(room); renderReviewPanel(room); maybeShowWinner(room); maybeSaveRoundHistory(room);
}

function renderPlayerStrip(room) {
  const strip = $('playerStrip'); if (!strip) return;
  strip.innerHTML = activePlayers(room).map(p => `<div class="player-chip" style="--pc:${p.color || '#8b5cf6'}"><span>${p.isBot ? '🤖' : '●'}</span><b>${p.name}</b><em>${room.game === 'teamquiz' ? `${t('team')} ${p.team + 1} · ` : ''}${room.scores[p.index] || 0}</em></div>`).join('');
}

function summarizeLastMove(room) {
  const d = room.review?.details || room.lastRound?.details || {};
  if (d.lastMove) return d.lastMove;
  return t('resultSoon');
}

function renderTurnBanner(room) {
  const banner = $('turnBanner');
  if (room.status === 'waiting') { banner.textContent = t('waitingFriend'); return; }
  if (room.status === 'review') { banner.textContent = t('reviewing'); return; }
  if (state.role === 'spectator') { banner.textContent = t('youSpectator'); return; }
  if (room.status === 'roundOver') { banner.textContent = room.winnerMessage?.text || ''; return; }
  const idx = myIndex();
  if (['millionaire','teamquiz','mathrace','biblequiz'].includes(room.game)) { banner.textContent = room.state.answers?.[String(idx)] ? t('answered') : t('yourTurn'); return; }
  const turn = room.state?.turn;
  if (typeof turn === 'number') {
    if (turn === idx) banner.textContent = t('yourTurn');
    else if (room.players[turn]?.isBot) banner.textContent = t('botTurn');
    else banner.textContent = t('opponentTurn');
    return;
  }
  banner.textContent = room.game === 'rps' ? t('selectMove') : '';
}

function renderReviewPanel(room) {
  const panel = $('reviewPanel'); if (!panel) return;
  if (room.status !== 'review') { panel.classList.add('hidden'); panel.innerHTML = ''; return; }
  panel.classList.remove('hidden');
  panel.innerHTML = `<strong>✨ ${t('lastMove')}</strong><span>${summarizeLastMove(room)}</span><em>${t('resultSoon')}</em>`;
}

function canAct(turnRequired = false) {
  if (!state.room || state.room.status !== 'playing') return false;
  const idx = myIndex(); if (idx < 0) return false;
  if (!turnRequired) return true;
  return state.room.state?.turn === idx;
}
function sendAction(action) { state.socket?.emit('game_action', action); }

function renderGame(room) {
  const board = $('gameBoard'); state.selectedChecker = null;
  if (room.status === 'waiting') { board.innerHTML = `<div class="total-card"><h2>${t('waitingFriend')}</h2><p>${location.origin}${room.playerLink}</p></div>`; return; }
  const map = { rps:renderRps, ttt:renderTtt, dice:renderDice, connect4:renderConnect4, memory:renderMemory, twentyone:renderTwentyOne, reaction:renderReaction, checkers:renderCheckers, nim:renderNim, code:renderCode, millionaire:renderMillionaire, biblequiz:renderMillionaire, teamquiz:renderMillionaire, mathrace:renderMathRace };
  (map[room.game] || renderRps)(board, room);
}

function renderRps(board, room) {
  const moves = [{ id:'rock', emoji:'✊' }, { id:'paper', emoji:'✋' }, { id:'scissors', emoji:'✌️' }];
  board.innerHTML = `<div class="rps-grid">${moves.map(m => `<button class="game-big-btn" data-move="${m.id}" ${!canAct(false) || room.state.moves?.[myIndex()] ? 'disabled' : ''}>${m.emoji}<small>${t(`moves.${m.id}`)}</small></button>`).join('')}</div>`;
  board.querySelectorAll('[data-move]').forEach(btn => btn.onclick = () => sendAction({ move: btn.dataset.move }));
}

function markSymbol(value) { return value === 0 ? '×' : value === 1 ? '○' : ''; }
function renderTtt(board, room) {
  board.innerHTML = `<div class="ttt-board">${room.state.board.map((cell,i) => `<button class="ttt-cell ${cell === 0 ? 'p0-mark' : cell === 1 ? 'p1-mark' : ''} ${room.state.winLine?.includes(i) ? 'win' : ''}" data-cell="${i}" ${!canAct(true) || cell !== null ? 'disabled' : ''}>${markSymbol(cell)}</button>`).join('')}</div>`;
  board.querySelectorAll('[data-cell]').forEach(btn => btn.onclick = () => sendAction({ cell:Number(btn.dataset.cell) }));
}

function renderDice(board, room) {
  const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  const players = activePlayers(room).slice(0, 4);
  board.innerHTML = `<div class="dice-grid">${players.map(p => `<div class="dice-card" style="--pc:${p.color}"><small>${p.name}</small><div class="dice-face">${room.state.rolls[p.index] ? faces[room.state.rolls[p.index]-1] : '🎲'}</div></div>`).join('')}<button class="btn primary full" id="rollBtn" ${!canAct(false) || room.state.rolls?.[myIndex()] ? 'disabled' : ''}>${t('roll')}</button></div>`;
  $('rollBtn') && ($('rollBtn').onclick = () => sendAction({ type:'roll' }));
}

function renderConnect4(board, room) {
  let html = '<div class="connect-board">';
  for (let r=0;r<6;r++) for (let c=0;c<7;c++) {
    const v = room.state.board[r][c];
    html += `<button class="connect-cell ${v === 0 ? 'p0' : v === 1 ? 'p1' : ''} ${room.state.winLine?.some(([rr,cc]) => rr === r && cc === c) ? 'win' : ''}" data-col="${c}" ${!canAct(true) ? 'disabled' : ''}></button>`;
  }
  board.innerHTML = html + '</div>';
  board.querySelectorAll('[data-col]').forEach(btn => btn.onclick = () => sendAction({ col:Number(btn.dataset.col) }));
}

function renderMemory(board, room) {
  board.innerHTML = `<div class="memory-board">${room.state.cards.map(card => `<button class="memory-card ${card.value ? '' : 'closed'} ${card.matched ? 'matched' : ''}" data-card="${card.id}" ${!canAct(true) || card.matched || card.revealed ? 'disabled' : ''}>${card.value || '?'}</button>`).join('')}</div><div class="mini-score">${room.state.pairScore?.map((s,i)=>`${room.players[i]?.name || 'P'+(i+1)}: ${s}`).join(' · ')}</div>`;
  board.querySelectorAll('[data-card]').forEach(btn => btn.onclick = () => sendAction({ card:Number(btn.dataset.card) }));
}

function renderTwentyOne(board, room) {
  board.innerHTML = `<div class="twentyone-grid"><div class="total-card"><small>${t('total')}</small><div class="total-number">${room.state.total}</div></div><div class="add-buttons">${[1,2,3].map(n => `<button class="game-big-btn" data-add="${n}" ${!canAct(true) || room.state.total + n > 21 ? 'disabled' : ''}>+${n}<small>${t('add')}</small></button>`).join('')}</div></div>`;
  board.querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => sendAction({ add:Number(btn.dataset.add) }));
}

function renderReaction(board, room) {
  const now = Date.now(); const ready = now >= room.state.readyAt;
  board.innerHTML = `<div class="reaction-grid"><p>${ready ? t('go') : t('tapWhenGreen')}</p><button class="reaction-button ${ready ? 'go' : ''}" id="reactionBtn" ${!canAct(false) ? 'disabled' : ''}>${ready ? t('go') : '...'}</button></div>`;
  $('reactionBtn').onclick = () => sendAction({ type:'tap' });
  if (!ready && room.status === 'playing') setTimeout(() => state.room && renderReaction($('gameBoard'), state.room), Math.max(80, room.state.readyAt - now));
}

function renderCheckers(board, room) {
  const idx = myIndex();
  let html = '<div class="checkers-board">';
  room.state.board.forEach((row,r) => row.forEach((piece,c) => {
    const dark = (r+c)%2 === 1;
    html += `<button class="checkers-cell ${dark ? 'dark' : 'light'} ${piece ? `piece p${piece.p}` : ''}" data-r="${r}" data-c="${c}" ${!dark || !canAct(true) ? 'disabled' : ''}>${piece ? `<span>${piece.k ? '♛' : '●'}</span>` : ''}</button>`;
  }));
  board.innerHTML = html + '</div><div class="hint-line">' + (room.state.lastMove ? `${t('lastMove')}: ${room.state.lastMove.from?.join(',')} → ${room.state.lastMove.to?.join(',')}` : '') + '</div>';
  board.querySelectorAll('.checkers-cell.dark').forEach(btn => btn.onclick = () => {
    const r = Number(btn.dataset.r), c = Number(btn.dataset.c); const piece = room.state.board[r][c];
    if (!state.selectedChecker && piece && piece.p === idx) { state.selectedChecker = [r,c]; btn.classList.add('selected'); return; }
    if (state.selectedChecker) { sendAction({ from: state.selectedChecker, to:[r,c] }); state.selectedChecker = null; }
  });
}

function renderNim(board, room) {
  const sticks = Math.max(0, room.state.sticks);
  board.innerHTML = `<div class="nim-wrap"><div class="total-card"><small>NIM</small><div class="total-number">${sticks}</div><p>${t('sticks')}</p></div><div class="sticks">${Array.from({length: Math.min(sticks, 40)}, () => '<span></span>').join('')}</div><div class="add-buttons">${[1,2,3].map(n => `<button class="game-big-btn" data-take="${n}" ${!canAct(true) || n > sticks ? 'disabled' : ''}>-${n}<small>${t('take')}</small></button>`).join('')}</div></div>`;
  board.querySelectorAll('[data-take]').forEach(btn => btn.onclick = () => sendAction({ take:Number(btn.dataset.take) }));
}

function renderCode(board, room) {
  board.innerHTML = `<div class="code-wrap"><div class="total-card"><h2>🔐</h2><p>${t('guessCode')}</p><input id="codeInput" class="input code-input" inputmode="numeric" maxlength="4" placeholder="1234" ${!canAct(false) ? 'disabled' : ''}/><button class="btn primary full" id="codeBtn" ${!canAct(false) ? 'disabled' : ''}>${t('send')}</button></div><div class="guess-list">${room.state.guesses.map(g => `<div><b>${g.guess}</b><span>${g.bulls} bulls · ${g.cows} cows</span></div>`).join('')}</div></div>`;
  $('codeBtn') && ($('codeBtn').onclick = () => { const val = $('codeInput').value; sendAction({ guess: val }); $('codeInput').value = ''; });
}

function renderMillionaire(board, room) {
  const s = room.state; const q = s.questions[s.qIndex]; const idx = myIndex(); const isTeam = room.game === 'teamquiz';
  if (!q) { board.innerHTML = '<div class="total-card">...</div>'; return; }
  const answered = s.answers?.[String(idx)] !== undefined;
  const diff = q.difficulty ? `<span class="difficulty-badge diff-${q.difficulty}">${t('difficulty')}: ${t(q.difficulty) || q.difficulty}</span>` : '';
  const src = q.source ? `<small class="source-line">${t('source')}: ${q.source}</small>` : '';
  board.innerHTML = `<div class="quiz-wrap"><div class="quiz-score">${isTeam ? room.teamScores.map((x,i)=>`${t('team')} ${i+1}: ${s.teamPoints?.[i] ?? 0}`).join(' · ') : activePlayers(room).map(p=>`${p.name}: ${s.points?.[p.index] ?? 0}`).join(' · ')}</div><div class="question-card"><small>${t('question')} ${s.qIndex + 1}/${s.questions.length}</small>${diff}<h2>${q.q}</h2>${src}</div><div class="answer-grid">${q.a.map((a,i) => `<button class="answer-btn ${s.showAnswer ? (i === s.showAnswer.correct ? 'correct' : (s.answers?.[String(idx)] === i ? 'wrong' : '')) : ''}" data-answer="${i}" ${!canAct(false) || answered || s.showAnswer ? 'disabled' : ''}>${String.fromCharCode(65+i)}. ${a}</button>`).join('')}</div>${answered && !s.showAnswer ? `<p class="hint-line">${t('answered')}</p>` : ''}</div>`;
  board.querySelectorAll('[data-answer]').forEach(btn => btn.onclick = () => sendAction({ answer:Number(btn.dataset.answer) }));
}

function renderMathRace(board, room) {
  const s = room.state; const idx = myIndex(); const answered = s.answers?.[String(idx)] !== undefined;
  board.innerHTML = `<div class="math-wrap"><div class="quiz-score">${activePlayers(room).map(p=>`${p.name}: ${s.points?.[p.index] ?? 0}`).join(' · ')}</div><div class="total-card"><small>${s.round}/${s.maxRounds}</small><div class="total-number">${s.problem.text}</div>${s.showAnswer ? `<p>${t('correct')}: ${s.showAnswer.correct}</p>` : `<input id="mathInput" class="input code-input" inputmode="numeric" placeholder="?" ${!canAct(false) || answered ? 'disabled' : ''}/><button id="mathBtn" class="btn primary full" ${!canAct(false) || answered ? 'disabled' : ''}>${t('send')}</button>`}</div></div>`;
  $('mathBtn') && ($('mathBtn').onclick = () => sendAction({ answer: Number($('mathInput').value) }));
}

function maybeShowWinner(room) {
  const key = room.lastRound ? `${room.id}:${room.lastRound.at}` : null;
  if (room.status === 'roundOver' && key && key !== state.lastWinnerKey) {
    state.lastWinnerKey = key;
    const text = room.winnerMessage?.winnerIndex == null ? t('draw').toUpperCase() : room.winnerMessage.text;
    $('winnerText').textContent = text;
    $('winnerOverlay').classList.remove('hidden');
    launchConfetti(); loadHistory();
  }
}

function copy(text) { navigator.clipboard?.writeText(text).then(() => toast(t('copied'))).catch(() => toast(text)); }
function fullUrl(path) { return `${location.origin}${path}`; }
function tryFullscreen() { if (window.innerWidth < 900 && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(()=>{}); }

function launchConfetti() {
  const canvas = $('confettiCanvas'); const ctx = canvas.getContext('2d'); canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio;
  const colors = ['#8b5cff','#00e8ff','#ffce4a','#ff4d8d','#38f7a1'];
  const pieces = Array.from({length:160}, () => ({ x:Math.random()*canvas.width, y:-Math.random()*canvas.height*.35, size:6*devicePixelRatio+Math.random()*8*devicePixelRatio, speed:3*devicePixelRatio+Math.random()*8*devicePixelRatio, rot:Math.random()*6, spin:-.12+Math.random()*.24, color:colors[Math.floor(Math.random()*colors.length)] }));
  let frame = 0; (function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); pieces.forEach(p=>{ p.y+=p.speed; p.x+=Math.sin((frame+p.y)/24)*2; p.rot+=p.spin; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55); ctx.restore(); }); frame++; if(frame<170) requestAnimationFrame(draw); else ctx.clearRect(0,0,canvas.width,canvas.height); })();
}

async function maybeSaveRoundHistory(room) {
  if (!room || room.status !== 'roundOver' || !room.lastRound) return;
  const idx = myIndex(); if (idx < 0) return;
  const recordId = `${room.id}-${room.lastRound.at}-${idx}`; if (state.lastHistoryKey === recordId) return; state.lastHistoryKey = recordId;
  const winnerIndex = room.lastRound.winnerIndex;
  const result = winnerIndex === null || winnerIndex === undefined ? 'draw' : winnerIndex === idx ? 'win' : 'lose';
  const item = { id: recordId, date: new Date(room.lastRound.at).toISOString(), game: room.game, mode: room.mode, result, opponent: activePlayers(room).filter(p=>p.index!==idx).map(p=>p.name).join(', ') || 'SMQ', score: `${room.scores[idx] || 0}:${Math.max(...room.scores.filter((_,i)=>i!==idx), 0)}`, ties: room.ties || 0, roomId: room.id };
  try {
    if (fbAuth?.currentUser && fbDb) {
      const userRef = fbDb.collection('users').doc(fbAuth.currentUser.uid);
      await userRef.collection('history').doc(recordId).set(item, { merge:true });
      const inc = firebase.firestore.FieldValue.increment;
      await userRef.set({ lastGameAt:item.date, stats:{ played:inc(1), wins:inc(result==='win'?1:0), losses:inc(result==='lose'?1:0), draws:inc(result==='draw'?1:0) } }, { merge:true });
      await loadHistory();
    } else {
      const items = JSON.parse(localStorage.getItem('smq_guest_history') || '[]').filter(h=>h.id!==recordId); items.unshift(item); localStorage.setItem('smq_guest_history', JSON.stringify(items.slice(0,50))); state.history = items.slice(0,50); renderHistory();
    }
  } catch(e) { console.error(e); }
}


function setInstallButtonsVisible(visible) {
  ['installAppBtn', 'installHeaderBtn'].forEach(id => {
    const el = $(id);
    if (el) el.classList.toggle('hidden', !visible || state.isStandalone);
  });
}

function setupPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(err => console.warn('SW registration failed', err));
    });
  }
  setInstallButtonsVisible(false);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    setInstallButtonsVisible(true);
    toast(t('installReady'));
  });
  window.addEventListener('appinstalled', () => {
    state.deferredInstallPrompt = null;
    state.isStandalone = true;
    setInstallButtonsVisible(false);
    toast(t('appInstalled'));
  });
}

async function installApp() {
  if (!state.deferredInstallPrompt) {
    toast(t('installUnavailable'));
    return;
  }
  const promptEvent = state.deferredInstallPrompt;
  state.deferredInstallPrompt = null;
  promptEvent.prompt();
  try { await promptEvent.userChoice; } catch (_) {}
  setInstallButtonsVisible(false);
}

function setupMusic() {
  const audio = $('bgMusic'); const custom = localStorage.getItem('smq_custom_music'); if (custom) audio.src = custom;
  const volume = Number(localStorage.getItem('smq_volume') || '0.35'); audio.volume = volume; $('volumeSlider').value = volume; if (state.musicOn) audio.play().catch(()=>{});
}
function toggleMusic() { const audio = $('bgMusic'); state.musicOn = !state.musicOn; localStorage.setItem('smq_music_on', state.musicOn ? '1':'0'); if (state.musicOn) audio.play().catch(()=>toast(t('musicOn'))); else audio.pause(); $('toggleMusicBtn').textContent = state.musicOn ? t('musicOff') : t('musicOn'); }

async function saveProfile() {
  const avatarData = $('profileAvatar').dataset.newAvatar || undefined;
  const settings = { lang:$('profileLang').value, theme:$('themeSelect').value, fontSize:$('fontSizeSelect').value, color:$('profileColor').value, musicVolume:Number($('volumeSlider').value) };
  const name = $('profileName').value.trim() || 'Player';
  if (fbAuth?.currentUser && fbDb) {
    const update = { name, settings, updatedAt:new Date().toISOString() }; if (avatarData) update.avatarData = avatarData;
    await fbDb.collection('users').doc(fbAuth.currentUser.uid).set(update, { merge:true }); state.user = await loadFirebaseProfile(fbAuth.currentUser);
  } else {
    const guest = localGuestUser(); localStorage.setItem('smq_guest_profile', JSON.stringify({ name, settings, avatarData: avatarData || guest.avatarUrl || null })); state.user = localGuestUser();
  }
  state.lang = settings.lang; state.theme = settings.theme; state.fontSize = settings.fontSize; state.color = settings.color;
  localStorage.setItem('smq_lang', state.lang); localStorage.setItem('smq_theme', state.theme); localStorage.setItem('smq_fontSize', state.fontSize); localStorage.setItem('smq_color', state.color);
  delete $('profileAvatar').dataset.newAvatar; updateProfileUI(); applyThemeAndFont(); applyI18n(); toast(t('profileSaved'));
}

function bindEvents() {
  $('googleLoginBtn').onclick = signInWithGoogleFirebase;
  $('installAppBtn') && ($('installAppBtn').onclick = installApp);
  $('installHeaderBtn') && ($('installHeaderBtn').onclick = installApp);
  $('guestLoginBtn').onclick = async () => { localStorage.setItem('smq_entered','1'); state.entered = true; state.user = localGuestUser(); updateProfileUI(); showScreen('homeScreen'); await loadHistory(); const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); };
  $('openProfileBtn').onclick = () => $('profileDrawer').classList.remove('hidden'); $('closeProfileBtn').onclick = () => $('profileDrawer').classList.add('hidden'); $('closeProfileBackdrop').onclick = () => $('profileDrawer').classList.add('hidden');
  $('quickLang').onchange = () => { state.lang = $('quickLang').value; localStorage.setItem('smq_lang', state.lang); $('profileLang').value = state.lang; applyI18n(); };
  $('profileLang').onchange = () => { state.lang = $('profileLang').value; localStorage.setItem('smq_lang', state.lang); applyI18n(); };
  $('profileColor').oninput = () => { state.color = $('profileColor').value; localStorage.setItem('smq_color', state.color); document.documentElement.style.setProperty('--my-color', state.color); };
  $('themeBtn').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('themeSelect').onchange = () => { state.theme = $('themeSelect').value; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('fontSizeSelect').onchange = () => { state.fontSize = $('fontSizeSelect').value; localStorage.setItem('smq_fontSize', state.fontSize); applyThemeAndFont(); };
  document.querySelectorAll('.segment').forEach(btn => btn.onclick = () => { document.querySelectorAll('.segment').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.selectedMode = btn.dataset.mode; localStorage.setItem('smq_mode', state.selectedMode); });
  $('teamCountSelect').onchange = () => { state.selectedTeams = Number($('teamCountSelect').value); localStorage.setItem('smq_team_count', String(state.selectedTeams)); };
  $('createRoomBtn').onclick = createRoom; $('joinPlayerBtn').onclick = () => joinRoom($('roomCodeInput').value.trim(), false); $('joinSpectatorBtn').onclick = () => joinRoom($('roomCodeInput').value.trim(), true);
  $('backHomeBtn').onclick = () => { history.pushState({}, '', '/'); showScreen('homeScreen'); if (document.fullscreenElement) document.exitFullscreen().catch(()=>{}); loadHistory(); };
  $('fullscreenBtn').onclick = tryFullscreen;
  $('copyPlayerLinkBtn').onclick = () => state.room && copy(fullUrl(state.room.playerLink)); $('copySpectatorLinkBtn').onclick = () => state.room && copy(fullUrl(state.room.spectatorLink)); $('newRoundBtn').onclick = () => state.socket?.emit('new_round');
  $('winnerNextBtn').onclick = () => { $('winnerOverlay').classList.add('hidden'); if (myIndex() >= 0) state.socket?.emit('new_round'); };
  $('refreshHistoryBtn').onclick = loadHistory; $('changeAvatarBtn').onclick = () => $('avatarInput').click();
  $('avatarInput').onchange = (event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 300000) return toast('Max 300 KB'); const reader = new FileReader(); reader.onload = () => { const data = reader.result; $('profileAvatar').dataset.newAvatar = data; setAvatar($('profileAvatar'), $('profileFallback'), data, $('profileName').value); }; reader.readAsDataURL(file); };
  $('clearAvatarBtn').onclick = async () => { delete $('profileAvatar').dataset.newAvatar; if (fbAuth?.currentUser && fbDb) { await fbDb.collection('users').doc(fbAuth.currentUser.uid).set({ avatarData: firebase.firestore.FieldValue.delete(), updatedAt:new Date().toISOString() }, { merge:true }); state.user = await loadFirebaseProfile(fbAuth.currentUser); } else { const profile = JSON.parse(localStorage.getItem('smq_guest_profile') || '{}'); delete profile.avatarData; localStorage.setItem('smq_guest_profile', JSON.stringify(profile)); state.user = localGuestUser(); } updateProfileUI(); };
  $('saveProfileBtn').onclick = saveProfile; $('logoutBtn').onclick = async () => { if (fbAuth?.currentUser) await fbAuth.signOut(); localStorage.removeItem('smq_entered'); state.entered = false; location.href = '/'; };
  $('toggleMusicBtn').onclick = toggleMusic; $('volumeSlider').oninput = () => { const v = Number($('volumeSlider').value); $('bgMusic').volume = v; localStorage.setItem('smq_volume', String(v)); };
  $('musicInput').onchange = (event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 4500000) return toast('Max 4.5 MB'); const reader = new FileReader(); reader.onload = () => { localStorage.setItem('smq_custom_music', reader.result); $('bgMusic').src = reader.result; state.musicOn = true; localStorage.setItem('smq_music_on','1'); $('bgMusic').play().catch(()=>{}); $('toggleMusicBtn').textContent = t('musicOff'); }; reader.readAsDataURL(file); };
  window.addEventListener('popstate', () => { const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); else showScreen('homeScreen'); });
}

async function init() {
  applyThemeAndFont(); setupPWA(); bindEvents(); renderGameCards(); setupMusic(); $('teamCountSelect').value = String(state.selectedTeams); await loadUser();
}

init();
