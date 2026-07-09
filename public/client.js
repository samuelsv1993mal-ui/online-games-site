const socket = io();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const views = {
  login: $('#loginView'),
  home: $('#homeView'),
  profile: $('#profileView'),
  game: $('#gameView')
};

const homeBtn = $('#homeBtn');
const profileBtn = $('#profileBtn');
const topAvatarImg = $('#topAvatarImg');
const topAvatarInitials = $('#topAvatarInitials');
const homeAvatarImg = $('#homeAvatarImg');
const homeAvatarInitials = $('#homeAvatarInitials');
const profileAvatarImg = $('#profileAvatarImg');
const profileAvatarInitials = $('#profileAvatarInitials');
const homeProfileName = $('#homeProfileName');
const googleLoginBtn = $('#googleLoginBtn');
const guestLoginBtn = $('#guestLoginBtn');
const openProfileFromHomeBtn = $('#openProfileFromHomeBtn');
const closeProfileBtn = $('#closeProfileBtn');
const saveProfileBtn = $('#saveProfileBtn');
const logoutBtn = $('#logoutBtn');
const avatarInput = $('#avatarInput');
const profileNameInput = $('#profileNameInput');
const fontSizeInput = $('#fontSizeInput');
const themeInput = $('#themeInput');
const languageSelects = $$('.languageSelect');

const nameInput = $('#nameInput');
const gameInput = $('#gameInput');
const roomInput = $('#roomInput');
const createRoomBtn = $('#createRoomBtn');
const joinRoomBtn = $('#joinRoomBtn');
const watchRoomBtn = $('#watchRoomBtn');
const errorText = $('#errorText');

const roomCode = $('#roomCode');
const copyRoomBtn = $('#copyRoomBtn');
const shareRoomBtn = $('#shareRoomBtn');
const shareWatchBtn = $('#shareWatchBtn');
const roleBadge = $('#roleBadge');
const modeBadge = $('#modeBadge');
const spectatorBadge = $('#spectatorBadge');
const gameSelect = $('#gameSelect');
const resetGameBtn = $('#resetGameBtn');
const resetScoresBtn = $('#resetScoresBtn');
const leaveRoomBtn = $('#leaveRoomBtn');
const playerXName = $('#playerXName');
const playerOName = $('#playerOName');
const playerXCard = $('#playerXCard');
const playerOCard = $('#playerOCard');
const scoreText = $('#scoreText');
const drawText = $('#drawText');
const noticeText = $('#noticeText');
const rpsPanel = $('#rpsPanel');
const tttPanel = $('#tttPanel');
const dicePanel = $('#dicePanel');
const c4Panel = $('#c4Panel');
const rpsResult = $('#rpsResult');
const tttBoard = $('#tttBoard');
const rollDiceBtn = $('#rollDiceBtn');
const diceResult = $('#diceResult');
const dieX = $('#dieX');
const dieO = $('#dieO');
const c4Board = $('#c4Board');

const STORAGE_KEY = 'smqGamesProfile.v3';

const translations = {
  ru: {
    topbarSubtitle: 'Онлайн-игры',
    loginBrand: 'Игровая платформа для друзей',
    loginBadge: '🌍 Русский · Español · English',
    loginTitle: 'Войди и играй онлайн',
    loginText: 'Создай профиль, выбери язык, тему и играй с другом, компьютером или просто наблюдай за комнатой.',
    googleLogin: 'Войти через Google',
    guestLogin: 'Продолжить как гость',
    loginHint: 'Google-вход подготовлен как страница входа. Для настоящего OAuth позже нужно добавить Google Client ID.',
    homeBrand: 'Игры для двоих онлайн',
    homeBadge: '⚡ Онлайн · Компьютер · Наблюдатели',
    homeTitle: 'Играй как в мобильном приложении',
    homeText: 'Создай комнату, отправь код другу, сыграй против компьютера или зайди наблюдателем и смотри партию в реальном времени.',
    showcaseRps: '✊ КНБ', showcaseTtt: '⭕ Крестики', showcaseDice: '🎲 Кубики', showcaseC4: '🟡 4 в ряд',
    yourProfile: 'Твой профиль', openSettings: 'Настройки профиля', nameLabel: 'Твоё имя', gameLabel: 'Игра',
    gameRps: '✊ Камень · Ножницы · Бумага', gameRpsShort: '✊ КНБ', gameTtt: '⭕ Крестики-нолики', gameDice: '🎲 Кубики', gameC4: '🟡 Четыре в ряд',
    modeOnlineTitle: 'С другом онлайн', modeOnlineText: 'Создай комнату и отправь ссылку.', modeComputerTitle: 'С компьютером', modeComputerText: 'Играй сразу против SMQ Bot.',
    createRoom: 'Создать комнату', roomCodePlaceholder: 'Код комнаты', joinRoom: 'Войти', watchRoom: 'Наблюдать', previewMode: 'Режим', previewSpectators: 'Наблюдатели',
    profileTitle: 'Профиль и настройки', profileText: 'Настрой фото, язык, размер текста и тему сайта.', backToGames: 'К играм', changePhoto: 'Изменить фото',
    profileNameLabel: 'Имя профиля', languageLabel: 'Язык сайта', fontSizeLabel: 'Размер шрифта', fontSmall: 'Маленький', fontMedium: 'Средний', fontLarge: 'Большой', themeLabel: 'Тема', themeDark: 'Тёмная', themeLight: 'Светлая', saveProfile: 'Сохранить', logout: 'Выйти',
    roomLabel: 'Комната', copyCode: 'Код', shareLink: 'Ссылка', watchLink: 'Наблюдать', newRound: 'Новая партия', resetScores: 'Сброс', leaveRoom: 'Выйти',
    playerX: 'Игрок X', playerO: 'Игрок O', scoreLabel: 'Счёт', draws: 'Ничьи: {count}',
    gameOne: 'Игра 1', gameTwo: 'Игра 2', gameThree: 'Игра 3', gameFour: 'Игра 4', rpsTitle: 'Камень · Ножницы · Бумага', rpsPill: 'Быстрый раунд', rock: 'Камень', scissors: 'Ножницы', paper: 'Бумага',
    tttTitle: 'Крестики-нолики', tttPill: 'Стратегия 3×3', diceTitle: 'Кубики', dicePill: 'Кто выбросит больше', rollDice: 'Бросить кубик', c4Title: 'Четыре в ряд', c4Pill: 'Собери линию из 4',
    waitingSecond: 'Отправь код или ссылку другу. Игра начнётся, когда второй игрок подключится.',
    spectatorNotice: 'Ты наблюдатель. Можно смотреть игру, но нельзя делать ходы.',
    spectatorReady: 'Ты наблюдаешь за партией в реальном времени.',
    rpsChoose: 'Ты играешь за {symbol}. Выбери камень, ножницы или бумагу.', rpsAccepted: 'Ход принят. Ждём выбор второго игрока.', rpsDefault: 'Сделай ход. Результат откроется, когда оба игрока выберут вариант.',
    diceChoose: 'Раунд {round}. Нажми кнопку и брось кубик.', diceAccepted: 'Твой бросок принят. Ждём соперника.', diceDefault: 'Нажми «Бросить кубик». Результат появится, когда оба игрока бросят.',
    tttWinYou: 'Ты победил в этой партии!', tttWinOther: 'Победил игрок {symbol}. Нажмите «Новая партия», чтобы сыграть ещё.', drawRound: 'Ничья. Нажмите «Новая партия», чтобы сыграть ещё.', yourTurn: 'Твой ход. Ты играешь за {symbol}.', otherTurn: 'Сейчас ход игрока {symbol}.',
    c4WinYou: 'Победа! Ты собрал линию из четырёх.', c4WinOther: 'Победил игрок {symbol}. Попробуйте ещё раз.', c4Draw: 'Поле заполнено. Ничья.', c4YourTurn: 'Твой ход. Выбери колонку и собери 4 фишки в ряд.',
    rpsWin: 'Ты выиграл раунд.', rpsLose: 'Ты проиграл раунд.', rpsDraw: 'Ничья.', rpsSpectatorResult: 'Раунд завершён. X: {x}. O: {o}. Результат: {result}.', yourChoice: 'Твой выбор: {move}. Выбор соперника: {opponent}.',
    diceResultWin: 'Ты выиграл раунд. X выбросил {x}, O выбросил {o}.', diceResultLose: 'Ты проиграл раунд. X выбросил {x}, O выбросил {o}.', diceResultDraw: 'Ничья. X выбросил {x}, O выбросил {o}.', diceSpectatorResult: 'Раунд {round}: X выбросил {x}, O выбросил {o}. Результат: {result}.',
    waitingForSecondPlayer: 'Ждём второго игрока.', copied: 'Готово', copiedLink: 'Скопировано', shareInvite: 'Заходи играть со мной в SMQ Games. Код комнаты: {room}. Ссылка: {link}', shareWatchInvite: 'Можно наблюдать за моей игрой в SMQ Games. Код комнаты: {room}. Ссылка наблюдателя: {link}',
    rolePlayer: '🎮 Игрок {symbol}', roleSpectator: '👀 Наблюдатель', modeOnline: '🌐 Онлайн', modeComputer: '🤖 Компьютер', spectators: '👀 {count}',
    roomNotFound: 'Комната не найдена.', roomFull: 'В комнате уже 2 игрока. Можно зайти наблюдателем.', computerRoomLocked: 'Это комната с компьютером. Можно зайти только наблюдателем.', enterRoomCode: 'Введи код комнаты.', createFailed: 'Не удалось создать комнату.', joinFailed: 'Не удалось войти в комнату.', watchFailed: 'Не удалось войти наблюдателем.', connectionRestored: 'Соединение восстановлено.', connectionLost: 'Связь с сервером потеряна.', profileSaved: 'Профиль сохранён.',
    googleName: 'Google Player', guestName: 'Гость', waiting: 'Ожидаем...', botName: 'SMQ Bot'
  },
  es: {
    topbarSubtitle: 'Juegos online', loginBrand: 'Plataforma de juegos para amigos', loginBadge: '🌍 Русский · Español · English', loginTitle: 'Inicia sesión y juega online', loginText: 'Crea tu perfil, elige idioma, tema y juega con un amigo, contra la computadora o mira una sala como espectador.', googleLogin: 'Entrar con Google', guestLogin: 'Continuar como invitado', loginHint: 'La pantalla de Google está preparada. Para OAuth real se debe agregar Google Client ID.',
    homeBrand: 'Juegos online para dos', homeBadge: '⚡ Online · Computadora · Espectadores', homeTitle: 'Juega como en una app móvil', homeText: 'Crea una sala, manda el código a tu amigo, juega contra la computadora o entra como espectador para mirar en tiempo real.', showcaseRps: '✊ Piedra papel tijera', showcaseTtt: '⭕ Gato', showcaseDice: '🎲 Dados', showcaseC4: '🟡 4 en línea', yourProfile: 'Tu perfil', openSettings: 'Ajustes de perfil', nameLabel: 'Tu nombre', gameLabel: 'Juego', gameRps: '✊ Piedra · Papel · Tijera', gameRpsShort: '✊ PPT', gameTtt: '⭕ Gato', gameDice: '🎲 Dados', gameC4: '🟡 Cuatro en línea', modeOnlineTitle: 'Con un amigo', modeOnlineText: 'Crea una sala y comparte el enlace.', modeComputerTitle: 'Con computadora', modeComputerText: 'Juega contra SMQ Bot.', createRoom: 'Crear sala', roomCodePlaceholder: 'Código de sala', joinRoom: 'Entrar', watchRoom: 'Observar', previewMode: 'Modo', previewSpectators: 'Espectadores',
    profileTitle: 'Perfil y ajustes', profileText: 'Configura foto, idioma, tamaño de texto y tema.', backToGames: 'A los juegos', changePhoto: 'Cambiar foto', profileNameLabel: 'Nombre del perfil', languageLabel: 'Idioma del sitio', fontSizeLabel: 'Tamaño de letra', fontSmall: 'Pequeño', fontMedium: 'Mediano', fontLarge: 'Grande', themeLabel: 'Tema', themeDark: 'Oscuro', themeLight: 'Claro', saveProfile: 'Guardar', logout: 'Salir', roomLabel: 'Sala', copyCode: 'Código', shareLink: 'Enlace', watchLink: 'Observar', newRound: 'Nueva partida', resetScores: 'Reiniciar', leaveRoom: 'Salir', playerX: 'Jugador X', playerO: 'Jugador O', scoreLabel: 'Marcador', draws: 'Empates: {count}', gameOne: 'Juego 1', gameTwo: 'Juego 2', gameThree: 'Juego 3', gameFour: 'Juego 4', rpsTitle: 'Piedra · Papel · Tijera', rpsPill: 'Ronda rápida', rock: 'Piedra', scissors: 'Tijera', paper: 'Papel', tttTitle: 'Gato', tttPill: 'Estrategia 3×3', diceTitle: 'Dados', dicePill: 'Gana el número mayor', rollDice: 'Lanzar dado', c4Title: 'Cuatro en línea', c4Pill: 'Forma una línea de 4', waitingSecond: 'Comparte el código o enlace. El juego empieza cuando entre el segundo jugador.', spectatorNotice: 'Eres espectador. Puedes mirar, pero no hacer jugadas.', spectatorReady: 'Estás mirando la partida en tiempo real.', rpsChoose: 'Juegas como {symbol}. Elige piedra, papel o tijera.', rpsAccepted: 'Jugada recibida. Esperando al otro jugador.', rpsDefault: 'Haz tu jugada. El resultado aparece cuando ambos elijan.', diceChoose: 'Ronda {round}. Presiona el botón y lanza el dado.', diceAccepted: 'Tu lanzamiento fue recibido. Esperando al rival.', diceDefault: 'Presiona “Lanzar dado”. El resultado aparece cuando ambos lancen.', tttWinYou: '¡Ganaste esta partida!', tttWinOther: 'Ganó el jugador {symbol}. Presionen “Nueva partida” para jugar otra vez.', drawRound: 'Empate. Presionen “Nueva partida” para jugar otra vez.', yourTurn: 'Tu turno. Juegas como {symbol}.', otherTurn: 'Turno del jugador {symbol}.', c4WinYou: '¡Victoria! Formaste una línea de cuatro.', c4WinOther: 'Ganó el jugador {symbol}. Intenten otra vez.', c4Draw: 'Tablero lleno. Empate.', c4YourTurn: 'Tu turno. Elige una columna y conecta 4 fichas.', rpsWin: 'Ganaste la ronda.', rpsLose: 'Perdiste la ronda.', rpsDraw: 'Empate.', rpsSpectatorResult: 'Ronda terminada. X: {x}. O: {o}. Resultado: {result}.', yourChoice: 'Tu elección: {move}. Rival: {opponent}.', diceResultWin: 'Ganaste la ronda. X sacó {x}, O sacó {o}.', diceResultLose: 'Perdiste la ronda. X sacó {x}, O sacó {o}.', diceResultDraw: 'Empate. X sacó {x}, O sacó {o}.', diceSpectatorResult: 'Ronda {round}: X sacó {x}, O sacó {o}. Resultado: {result}.', waitingForSecondPlayer: 'Esperando al segundo jugador.', copied: 'Listo', copiedLink: 'Copiado', shareInvite: 'Ven a jugar conmigo en SMQ Games. Código: {room}. Enlace: {link}', shareWatchInvite: 'Puedes observar mi juego en SMQ Games. Código: {room}. Enlace de espectador: {link}', rolePlayer: '🎮 Jugador {symbol}', roleSpectator: '👀 Espectador', modeOnline: '🌐 Online', modeComputer: '🤖 Computadora', spectators: '👀 {count}', roomNotFound: 'Sala no encontrada.', roomFull: 'La sala ya tiene 2 jugadores. Puedes entrar como espectador.', computerRoomLocked: 'Esta sala es contra computadora. Solo puedes entrar como espectador.', enterRoomCode: 'Escribe el código de la sala.', createFailed: 'No se pudo crear la sala.', joinFailed: 'No se pudo entrar a la sala.', watchFailed: 'No se pudo entrar como espectador.', connectionRestored: 'Conexión restaurada.', connectionLost: 'Se perdió la conexión con el servidor.', profileSaved: 'Perfil guardado.', googleName: 'Google Player', guestName: 'Invitado', waiting: 'Esperando...', botName: 'SMQ Bot'
  },
  en: {
    topbarSubtitle: 'Online games', loginBrand: 'Game platform for friends', loginBadge: '🌍 Русский · Español · English', loginTitle: 'Sign in and play online', loginText: 'Create your profile, choose language, theme, and play with a friend, against the computer, or watch a room as a spectator.', googleLogin: 'Continue with Google', guestLogin: 'Continue as guest', loginHint: 'The Google sign-in screen is prepared. Real OAuth needs a Google Client ID later.',
    homeBrand: 'Online games for two', homeBadge: '⚡ Online · Computer · Spectators', homeTitle: 'Play like in a mobile app', homeText: 'Create a room, send the code to a friend, play against the computer, or join as a spectator and watch in real time.', showcaseRps: '✊ RPS', showcaseTtt: '⭕ Tic-tac-toe', showcaseDice: '🎲 Dice', showcaseC4: '🟡 Connect 4', yourProfile: 'Your profile', openSettings: 'Profile settings', nameLabel: 'Your name', gameLabel: 'Game', gameRps: '✊ Rock · Paper · Scissors', gameRpsShort: '✊ RPS', gameTtt: '⭕ Tic-tac-toe', gameDice: '🎲 Dice', gameC4: '🟡 Connect Four', modeOnlineTitle: 'With a friend', modeOnlineText: 'Create a room and share the link.', modeComputerTitle: 'With computer', modeComputerText: 'Play against SMQ Bot.', createRoom: 'Create room', roomCodePlaceholder: 'Room code', joinRoom: 'Join', watchRoom: 'Watch', previewMode: 'Mode', previewSpectators: 'Spectators',
    profileTitle: 'Profile and settings', profileText: 'Set photo, language, text size, and theme.', backToGames: 'Back to games', changePhoto: 'Change photo', profileNameLabel: 'Profile name', languageLabel: 'Site language', fontSizeLabel: 'Font size', fontSmall: 'Small', fontMedium: 'Medium', fontLarge: 'Large', themeLabel: 'Theme', themeDark: 'Dark', themeLight: 'Light', saveProfile: 'Save', logout: 'Log out', roomLabel: 'Room', copyCode: 'Code', shareLink: 'Share', watchLink: 'Watch', newRound: 'New round', resetScores: 'Reset', leaveRoom: 'Leave', playerX: 'Player X', playerO: 'Player O', scoreLabel: 'Score', draws: 'Draws: {count}', gameOne: 'Game 1', gameTwo: 'Game 2', gameThree: 'Game 3', gameFour: 'Game 4', rpsTitle: 'Rock · Paper · Scissors', rpsPill: 'Fast round', rock: 'Rock', scissors: 'Scissors', paper: 'Paper', tttTitle: 'Tic-tac-toe', tttPill: '3×3 strategy', diceTitle: 'Dice', dicePill: 'Highest roll wins', rollDice: 'Roll dice', c4Title: 'Connect Four', c4Pill: 'Connect 4 discs', waitingSecond: 'Share the code or link. The game starts when the second player joins.', spectatorNotice: 'You are a spectator. You can watch, but you cannot play moves.', spectatorReady: 'You are watching the game in real time.', rpsChoose: 'You play as {symbol}. Choose rock, paper, or scissors.', rpsAccepted: 'Move accepted. Waiting for the other player.', rpsDefault: 'Make a move. The result appears when both players choose.', diceChoose: 'Round {round}. Press the button and roll the die.', diceAccepted: 'Your roll was accepted. Waiting for the opponent.', diceDefault: 'Press “Roll dice”. The result appears when both players roll.', tttWinYou: 'You won this round!', tttWinOther: 'Player {symbol} won. Press “New round” to play again.', drawRound: 'Draw. Press “New round” to play again.', yourTurn: 'Your turn. You play as {symbol}.', otherTurn: 'Player {symbol} turn.', c4WinYou: 'Victory! You connected four.', c4WinOther: 'Player {symbol} won. Try again.', c4Draw: 'Board full. Draw.', c4YourTurn: 'Your turn. Choose a column and connect 4 discs.', rpsWin: 'You won the round.', rpsLose: 'You lost the round.', rpsDraw: 'Draw.', rpsSpectatorResult: 'Round finished. X: {x}. O: {o}. Result: {result}.', yourChoice: 'Your choice: {move}. Opponent: {opponent}.', diceResultWin: 'You won the round. X rolled {x}, O rolled {o}.', diceResultLose: 'You lost the round. X rolled {x}, O rolled {o}.', diceResultDraw: 'Draw. X rolled {x}, O rolled {o}.', diceSpectatorResult: 'Round {round}: X rolled {x}, O rolled {o}. Result: {result}.', waitingForSecondPlayer: 'Waiting for the second player.', copied: 'Done', copiedLink: 'Copied', shareInvite: 'Join me in SMQ Games. Room code: {room}. Link: {link}', shareWatchInvite: 'You can watch my SMQ Games match. Room code: {room}. Watch link: {link}', rolePlayer: '🎮 Player {symbol}', roleSpectator: '👀 Spectator', modeOnline: '🌐 Online', modeComputer: '🤖 Computer', spectators: '👀 {count}', roomNotFound: 'Room not found.', roomFull: 'The room already has 2 players. You can join as a spectator.', computerRoomLocked: 'This is a computer room. You can only join as a spectator.', enterRoomCode: 'Enter the room code.', createFailed: 'Could not create the room.', joinFailed: 'Could not join the room.', watchFailed: 'Could not join as spectator.', connectionRestored: 'Connection restored.', connectionLost: 'Connection lost.', profileSaved: 'Profile saved.', googleName: 'Google Player', guestName: 'Guest', waiting: 'Waiting...', botName: 'SMQ Bot'
  }
};

let profile = loadProfile();
let currentRoomId = null;
let mySymbol = null;
let myRole = null;
let latestRoom = null;
let lastCelebratedKey = '';
let pendingAutoWatch = false;
let pendingAutoRoom = '';

const gamePanels = { rps: rpsPanel, ttt: tttPanel, dice: dicePanel, c4: c4Panel };
const rpsMoveKeys = { rock: 'rock', scissors: 'scissors', paper: 'paper' };

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      isLoggedIn: Boolean(saved.isLoggedIn),
      authMethod: saved.authMethod || 'guest',
      name: saved.name || '',
      avatar: saved.avatar || '',
      language: ['ru', 'es', 'en'].includes(saved.language) ? saved.language : 'ru',
      fontSize: ['small', 'medium', 'large'].includes(saved.fontSize) ? saved.fontSize : 'medium',
      theme: ['dark', 'light'].includes(saved.theme) ? saved.theme : 'dark'
    };
  } catch {
    return { isLoggedIn: false, authMethod: 'guest', name: '', avatar: '', language: 'ru', fontSize: 'medium', theme: 'dark' };
  }
}

function saveProfileToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function t(key, vars = {}) {
  const dict = translations[profile.language] || translations.ru;
  const fallback = translations.ru[key] || key;
  return String(dict[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function translatePage() {
  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
  $$('[data-i18n-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
  });
  document.documentElement.lang = profile.language;
  document.title = 'SMQ Games';
  drawText.textContent = t('draws', { count: latestRoom?.scores?.draws || 0 });
  if (latestRoom) renderRoom(latestRoom);
}

function initials(name) {
  const value = String(name || '').trim();
  if (!value) return 'S';
  return value.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function setAvatar(img, textNode) {
  textNode.textContent = initials(profile.name || t('guestName'));
  if (profile.avatar) {
    img.src = profile.avatar;
    img.classList.remove('hidden');
    textNode.classList.add('hidden');
  } else {
    img.removeAttribute('src');
    img.classList.add('hidden');
    textNode.classList.remove('hidden');
  }
}

function applyProfileToUi() {
  document.body.dataset.theme = profile.theme;
  document.body.dataset.font = profile.fontSize;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', profile.theme === 'light' ? '#f8f5ff' : '#25105f');

  languageSelects.forEach((select) => { select.value = profile.language; });
  fontSizeInput.value = profile.fontSize;
  themeInput.value = profile.theme;

  const displayName = profile.name || t('guestName');
  nameInput.value = displayName;
  profileNameInput.value = displayName;
  homeProfileName.textContent = displayName;
  profileBtn.classList.toggle('hidden', !profile.isLoggedIn);
  setAvatar(topAvatarImg, topAvatarInitials);
  setAvatar(homeAvatarImg, homeAvatarInitials);
  setAvatar(profileAvatarImg, profileAvatarInitials);
  translatePage();
}

function showView(name) {
  Object.entries(views).forEach(([viewName, node]) => {
    node.classList.toggle('hidden', viewName !== name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeLogin(method) {
  profile.isLoggedIn = true;
  profile.authMethod = method;
  if (!profile.name) profile.name = method === 'google' ? t('googleName') : t('guestName');
  saveProfileToStorage();
  applyProfileToUi();
  showView('home');
  if (pendingAutoWatch && pendingAutoRoom) {
    roomInput.value = pendingAutoRoom;
    setTimeout(() => watchRoom(), 150);
  }
}

function showError(message) {
  errorText.textContent = message || '';
}

function errorFromCode(code, fallbackKey) {
  const map = {
    ROOM_NOT_FOUND: 'roomNotFound',
    ROOM_FULL: 'roomFull',
    COMPUTER_ROOM_PLAYERS_LOCKED: 'computerRoomLocked'
  };
  return t(map[code] || fallbackKey);
}

function selectedMode() {
  return document.querySelector('input[name="mode"]:checked')?.value || 'online';
}

function myName() {
  const name = nameInput.value.trim() || profile.name || t('guestName');
  profile.name = name;
  saveProfileToStorage();
  applyProfileToUi();
  return name;
}

function enterGameView(roomId, role, symbol = null) {
  currentRoomId = roomId;
  myRole = role;
  mySymbol = symbol;
  roomCode.textContent = roomId;
  showView('game');
}

function setHomeButtonsDisabled(disabled) {
  createRoomBtn.disabled = disabled;
  joinRoomBtn.disabled = disabled;
  watchRoomBtn.disabled = disabled;
}

function createRoom() {
  showError('');
  setHomeButtonsDisabled(true);
  socket.emit('room:create', { name: myName(), game: gameInput.value, mode: selectedMode() }, (response) => {
    setHomeButtonsDisabled(false);
    if (!response?.ok) {
      showError(errorFromCode(response?.errorCode, 'createFailed'));
      return;
    }
    enterGameView(response.roomId, response.role, response.symbol);
  });
}

function normalizedRoomValue() {
  return roomInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
}

function joinRoom() {
  const value = normalizedRoomValue();
  if (!value) {
    showError(t('enterRoomCode'));
    return;
  }

  showError('');
  setHomeButtonsDisabled(true);
  socket.emit('room:join', { roomId: value, name: myName() }, (response) => {
    setHomeButtonsDisabled(false);
    if (!response?.ok) {
      showError(errorFromCode(response?.errorCode, 'joinFailed'));
      return;
    }
    enterGameView(response.roomId, response.role, response.symbol);
  });
}

function watchRoom() {
  const value = normalizedRoomValue();
  if (!value) {
    showError(t('enterRoomCode'));
    return;
  }

  showError('');
  setHomeButtonsDisabled(true);
  socket.emit('room:watch', { roomId: value, name: myName() }, (response) => {
    setHomeButtonsDisabled(false);
    if (!response?.ok) {
      showError(errorFromCode(response?.errorCode, 'watchFailed'));
      return;
    }
    enterGameView(response.roomId, response.role, null);
  });
}

function playerBySymbol(room, symbol) {
  return room.players.find((player) => player.symbol === symbol);
}

function hasTwoPlayers(room) {
  return room.players.length === 2;
}

function isSpectator() {
  return myRole === 'spectator';
}

function canPlay() {
  return myRole === 'player' && (mySymbol === 'X' || mySymbol === 'O');
}

function gameResultLabel(result) {
  if (result === 'draw') return t('rpsDraw');
  return result;
}

function moveLabel(move) {
  return t(rpsMoveKeys[move] || move);
}

function celebrate(kind = 'win') {
  const emojis = kind === 'draw' ? ['✨', '⭐', '🎮', '💫'] : ['🎉', '🏆', '✨', '🔥', '💎'];
  for (let i = 0; i < 18; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    piece.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

function celebrationKey(room) {
  if (room.game === 'ttt' && (room.ttt.winner || room.ttt.draw)) return `ttt:${room.ttt.board.join('')}:${room.ttt.winner || 'draw'}`;
  if (room.game === 'c4' && (room.c4.winner || room.c4.draw)) return `c4:${room.c4.board.join('')}:${room.c4.winner || 'draw'}`;
  if (room.game === 'rps' && room.rps.lastRound) return `rps:${room.rps.lastRound.X}:${room.rps.lastRound.O}:${room.rps.lastRound.at || ''}:${room.scores.X}:${room.scores.O}:${room.scores.draws}`;
  if (room.game === 'dice' && room.dice.lastRound) return `dice:${room.dice.lastRound.round}:${room.dice.lastRound.X}:${room.dice.lastRound.O}`;
  return '';
}

function updateNotice(room) {
  if (isSpectator()) {
    noticeText.textContent = hasTwoPlayers(room) ? t('spectatorReady') : t('spectatorNotice');
    return;
  }

  if (!hasTwoPlayers(room)) {
    noticeText.textContent = t('waitingSecond');
    return;
  }

  if (room.game === 'rps') {
    const waitingForMe = room.rps.waitingFor.includes(mySymbol);
    noticeText.textContent = waitingForMe ? t('rpsChoose', { symbol: mySymbol }) : t('rpsAccepted');
    return;
  }

  if (room.game === 'dice') {
    const waitingForMe = room.dice.waitingFor.includes(mySymbol);
    noticeText.textContent = waitingForMe ? t('diceChoose', { round: room.dice.round }) : t('diceAccepted');
    return;
  }

  if (room.game === 'ttt') {
    if (room.ttt.winner) {
      noticeText.textContent = room.ttt.winner === mySymbol ? t('tttWinYou') : t('tttWinOther', { symbol: room.ttt.winner });
      return;
    }
    if (room.ttt.draw) {
      noticeText.textContent = t('drawRound');
      return;
    }
    noticeText.textContent = room.ttt.turn === mySymbol ? t('yourTurn', { symbol: mySymbol }) : t('otherTurn', { symbol: room.ttt.turn });
    return;
  }

  if (room.game === 'c4') {
    if (room.c4.winner) {
      noticeText.textContent = room.c4.winner === mySymbol ? t('c4WinYou') : t('c4WinOther', { symbol: room.c4.winner });
      return;
    }
    if (room.c4.draw) {
      noticeText.textContent = t('c4Draw');
      return;
    }
    noticeText.textContent = room.c4.turn === mySymbol ? t('c4YourTurn') : t('otherTurn', { symbol: room.c4.turn });
  }
}

function renderPlayers(room) {
  const playerX = playerBySymbol(room, 'X');
  const playerO = playerBySymbol(room, 'O');
  playerXName.textContent = playerX ? (playerX.bot ? t('botName') : playerX.name) : t('waiting');
  playerOName.textContent = playerO ? (playerO.bot ? t('botName') : playerO.name) : t('waiting');

  const turnGame = room.game === 'ttt' || room.game === 'c4';
  const currentTurn = room.game === 'ttt' ? room.ttt.turn : room.c4.turn;
  const finished = room.game === 'ttt' ? room.ttt.winner || room.ttt.draw : room.c4.winner || room.c4.draw;

  playerXCard.classList.toggle('active-player', turnGame && currentTurn === 'X' && !finished);
  playerOCard.classList.toggle('active-player', turnGame && currentTurn === 'O' && !finished);
  playerXCard.classList.toggle('me-player', mySymbol === 'X');
  playerOCard.classList.toggle('me-player', mySymbol === 'O');
}

function renderScores(room) {
  scoreText.textContent = `${room.scores.X} : ${room.scores.O}`;
  drawText.textContent = t('draws', { count: room.scores.draws });
}

function renderBadges(room) {
  roleBadge.textContent = isSpectator() ? t('roleSpectator') : t('rolePlayer', { symbol: mySymbol || '-' });
  modeBadge.textContent = room.mode === 'computer' ? t('modeComputer') : t('modeOnline');
  spectatorBadge.textContent = t('spectators', { count: room.spectatorCount || 0 });
}

function renderGameSwitcher(room) {
  gameSelect.value = room.game;
  gameSelect.disabled = !canPlay();
  resetGameBtn.disabled = !canPlay();
  resetScoresBtn.disabled = !canPlay();
  Object.entries(gamePanels).forEach(([game, panel]) => panel.classList.toggle('hidden', room.game !== game));
}

function renderRps(room) {
  const buttons = $$('.move-btn');
  const ready = hasTwoPlayers(room);
  const waitingForMe = canPlay() && room.rps.waitingFor.includes(mySymbol);

  buttons.forEach((button) => {
    button.disabled = !ready || !waitingForMe || isSpectator();
    button.classList.toggle('pulse-ready', ready && waitingForMe && !isSpectator());
  });

  if (room.rps.lastRound) {
    const round = room.rps.lastRound;
    if (isSpectator()) {
      rpsResult.textContent = t('rpsSpectatorResult', { x: moveLabel(round.X), o: moveLabel(round.O), result: gameResultLabel(round.result) });
      return;
    }

    const myMove = moveLabel(round[mySymbol]);
    const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';
    const opponentMove = moveLabel(round[opponentSymbol]);
    let prefix = t('rpsDraw');
    if (round.result === mySymbol) prefix = t('rpsWin');
    if (round.result !== 'draw' && round.result !== mySymbol) prefix = t('rpsLose');
    rpsResult.textContent = `${prefix} ${t('yourChoice', { move: myMove, opponent: opponentMove })}`;
  } else if (!ready) {
    rpsResult.textContent = t('waitingForSecondPlayer');
  } else if (!waitingForMe && !isSpectator()) {
    rpsResult.textContent = t('rpsAccepted');
  } else {
    rpsResult.textContent = isSpectator() ? t('spectatorNotice') : t('rpsDefault');
  }
}

function renderTtt(room) {
  tttBoard.innerHTML = '';
  const ready = hasTwoPlayers(room);
  const canMove = canPlay() && ready && room.ttt.turn === mySymbol && !room.ttt.winner && !room.ttt.draw;

  room.ttt.board.forEach((value, index) => {
    const cell = document.createElement('button');
    cell.className = 'cell';
    cell.type = 'button';
    cell.textContent = value || '';
    cell.disabled = !canMove || Boolean(value);
    cell.classList.toggle('x-cell', value === 'X');
    cell.classList.toggle('o-cell', value === 'O');
    cell.classList.toggle('win', room.ttt.winningLine.includes(index));
    cell.addEventListener('click', () => socket.emit('ttt:move', { roomId: currentRoomId, index }));
    tttBoard.appendChild(cell);
  });
}

function renderDice(room) {
  const ready = hasTwoPlayers(room);
  const waitingForMe = canPlay() && room.dice.waitingFor.includes(mySymbol);
  rollDiceBtn.disabled = !ready || !waitingForMe || isSpectator();
  rollDiceBtn.classList.toggle('pulse-ready', ready && waitingForMe && !isSpectator());

  if (room.dice.lastRound) {
    const round = room.dice.lastRound;
    dieX.textContent = round.X;
    dieO.textContent = round.O;
    dieX.classList.add('rolled');
    dieO.classList.add('rolled');

    if (isSpectator()) {
      diceResult.textContent = t('diceSpectatorResult', { round: round.round, x: round.X, o: round.O, result: gameResultLabel(round.result) });
      return;
    }

    if (round.result === 'draw') diceResult.textContent = t('diceResultDraw', { x: round.X, o: round.O });
    else if (round.result === mySymbol) diceResult.textContent = t('diceResultWin', { x: round.X, o: round.O });
    else diceResult.textContent = t('diceResultLose', { x: round.X, o: round.O });
  } else {
    dieX.textContent = '?';
    dieO.textContent = '?';
    dieX.classList.remove('rolled');
    dieO.classList.remove('rolled');
    if (!ready) diceResult.textContent = t('waitingForSecondPlayer');
    else if (isSpectator()) diceResult.textContent = t('spectatorNotice');
    else if (!waitingForMe) diceResult.textContent = t('diceAccepted');
    else diceResult.textContent = t('diceDefault');
  }
}

function renderC4(room) {
  c4Board.innerHTML = '';
  const ready = hasTwoPlayers(room);
  const canMove = canPlay() && ready && room.c4.turn === mySymbol && !room.c4.winner && !room.c4.draw;

  room.c4.board.forEach((value, index) => {
    const column = index % 7;
    const cell = document.createElement('button');
    cell.className = 'c4-cell';
    cell.type = 'button';
    cell.disabled = !canMove || Boolean(room.c4.board[column]);
    cell.classList.toggle('x-disc', value === 'X');
    cell.classList.toggle('o-disc', value === 'O');
    cell.classList.toggle('win', room.c4.winningLine.includes(index));
    cell.setAttribute('aria-label', `Column ${column + 1}`);
    cell.addEventListener('click', () => socket.emit('c4:move', { roomId: currentRoomId, column }));
    c4Board.appendChild(cell);
  });
}

function maybeCelebrate(room) {
  if (isSpectator()) return;
  const key = celebrationKey(room);
  if (!key || key === lastCelebratedKey) return;
  lastCelebratedKey = key;

  const result = room.game === 'ttt'
    ? (room.ttt.winner || (room.ttt.draw ? 'draw' : null))
    : room.game === 'c4'
      ? (room.c4.winner || (room.c4.draw ? 'draw' : null))
      : room.game === 'rps'
        ? room.rps.lastRound?.result
        : room.dice.lastRound?.result;

  if (!result) return;
  if (result === 'draw') celebrate('draw');
  if (result === mySymbol) celebrate('win');
}

function renderRoom(room) {
  latestRoom = room;
  renderPlayers(room);
  renderScores(room);
  renderBadges(room);
  renderGameSwitcher(room);
  renderRps(room);
  renderTtt(room);
  renderDice(room);
  renderC4(room);
  updateNotice(room);
  maybeCelebrate(room);
}

function roomInviteLink(watch = false) {
  const url = new URL(window.location.origin);
  url.searchParams.set('room', currentRoomId);
  if (watch) url.searchParams.set('watch', '1');
  return url.toString();
}

async function copyText(text, button, restoredKey) {
  try {
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    button.textContent = t('copied');
    setTimeout(() => { button.textContent = t(restoredKey); }, 1200);
  } catch {
    button.textContent = t('copiedLink');
    setTimeout(() => { button.textContent = t(restoredKey); }, 1200);
  }
}

async function shareText(text, url, button, restoredKey) {
  try {
    if (navigator.share) {
      await navigator.share({ title: 'SMQ Games', text, url });
      return;
    }
    await copyText(text, button, restoredKey);
  } catch {
    button.textContent = t(restoredKey);
  }
}

function wireEvents() {
  googleLoginBtn.addEventListener('click', () => completeLogin('google'));
  guestLoginBtn.addEventListener('click', () => completeLogin('guest'));
  profileBtn.addEventListener('click', () => showView('profile'));
  openProfileFromHomeBtn.addEventListener('click', () => showView('profile'));
  closeProfileBtn.addEventListener('click', () => showView(currentRoomId ? 'game' : 'home'));
  homeBtn.addEventListener('click', () => showView(profile.isLoggedIn ? 'home' : 'login'));

  languageSelects.forEach((select) => {
    select.addEventListener('change', () => {
      profile.language = select.value;
      saveProfileToStorage();
      applyProfileToUi();
    });
  });

  fontSizeInput.addEventListener('change', () => {
    profile.fontSize = fontSizeInput.value;
    saveProfileToStorage();
    applyProfileToUi();
  });

  themeInput.addEventListener('change', () => {
    profile.theme = themeInput.value;
    saveProfileToStorage();
    applyProfileToUi();
  });

  saveProfileBtn.addEventListener('click', () => {
    profile.name = profileNameInput.value.trim() || t('guestName');
    profile.language = $('#profileLanguageInput').value;
    profile.fontSize = fontSizeInput.value;
    profile.theme = themeInput.value;
    saveProfileToStorage();
    applyProfileToUi();
    showError(t('profileSaved'));
    showView('home');
  });

  logoutBtn.addEventListener('click', () => {
    profile.isLoggedIn = false;
    saveProfileToStorage();
    currentRoomId = null;
    myRole = null;
    mySymbol = null;
    latestRoom = null;
    applyProfileToUi();
    showView('login');
  });

  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      profile.avatar = String(reader.result || '');
      saveProfileToStorage();
      applyProfileToUi();
    });
    reader.readAsDataURL(file);
  });

  nameInput.addEventListener('input', () => {
    profile.name = nameInput.value.trim();
    saveProfileToStorage();
    applyProfileToUi();
  });

  $$('input[name="mode"]').forEach((input) => {
    input.addEventListener('change', () => {
      $$('.mode-card').forEach((card) => card.classList.toggle('active', card.querySelector('input').checked));
    });
  });

  createRoomBtn.addEventListener('click', createRoom);
  joinRoomBtn.addEventListener('click', joinRoom);
  watchRoomBtn.addEventListener('click', watchRoom);

  roomInput.addEventListener('input', () => {
    roomInput.value = normalizedRoomValue();
  });

  roomInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') joinRoom();
  });

  gameSelect.addEventListener('change', () => {
    lastCelebratedKey = '';
    socket.emit('game:select', { roomId: currentRoomId, game: gameSelect.value });
  });

  resetGameBtn.addEventListener('click', () => {
    lastCelebratedKey = '';
    socket.emit('game:reset', { roomId: currentRoomId });
  });

  resetScoresBtn.addEventListener('click', () => {
    lastCelebratedKey = '';
    socket.emit('scores:reset', { roomId: currentRoomId });
  });

  leaveRoomBtn.addEventListener('click', () => {
    currentRoomId = null;
    myRole = null;
    mySymbol = null;
    latestRoom = null;
    showView('home');
  });

  copyRoomBtn.addEventListener('click', () => {
    if (currentRoomId) copyText(currentRoomId, copyRoomBtn, 'copyCode');
  });

  shareRoomBtn.addEventListener('click', async () => {
    if (!currentRoomId) return;
    const link = roomInviteLink(false);
    await shareText(t('shareInvite', { room: currentRoomId, link }), link, shareRoomBtn, 'shareLink');
  });

  shareWatchBtn.addEventListener('click', async () => {
    if (!currentRoomId) return;
    const link = roomInviteLink(true);
    await shareText(t('shareWatchInvite', { room: currentRoomId, link }), link, shareWatchBtn, 'watchLink');
  });

  $$('.move-btn').forEach((button) => {
    button.addEventListener('click', () => socket.emit('rps:move', { roomId: currentRoomId, move: button.dataset.move }));
  });

  rollDiceBtn.addEventListener('click', () => socket.emit('dice:roll', { roomId: currentRoomId }));
}

socket.on('room:state', (room) => {
  if (!currentRoomId || room.id !== currentRoomId) return;
  renderRoom(room);
});

socket.on('connect', () => {
  if (latestRoom) noticeText.textContent = t('connectionRestored');
});

socket.on('disconnect', () => {
  if (currentRoomId) noticeText.textContent = t('connectionLost');
});

function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const sharedRoom = params.get('room');
  pendingAutoWatch = params.get('watch') === '1';
  pendingAutoRoom = sharedRoom ? sharedRoom.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) : '';
  if (pendingAutoRoom) roomInput.value = pendingAutoRoom;
}

function boot() {
  readUrlParams();
  wireEvents();
  applyProfileToUi();
  if (profile.isLoggedIn) {
    showView('home');
    if (pendingAutoWatch && pendingAutoRoom) setTimeout(() => watchRoom(), 250);
  } else {
    showView('login');
  }
}

boot();
