const $ = (id) => document.getElementById(id);

const I18N = {
  ru: {
    appTitle:'SMQ Games', appSubtitle:'Играй онлайн, с другом, против компьютера или наблюдай за комнатой.', loginGoogle:'Войти через Google', continueGuest:'Продолжить как гость', googleHint:'Google сохраняет фото, цвет профиля, настройки и историю игр.', installApp:'Скачать как приложение', installUnavailable:'Установка появится после открытия сайта в Chrome/браузере и обновления страницы.', installReady:'Можно установить SMQ Games как приложение.', appInstalled:'SMQ Games установлено.', updateApp:'Обновить приложение', updateChecking:'Проверяем обновление...', updateReady:'Обновляем приложение...',
    hello:'Привет', mobileGame:'Игровая арена', chooseGame:'Выбери игру', chooseMode:'Играй один, с компьютером, с друзьями или командами.', newGame:'Новая игра', game:'Игра', mode:'Режим', onlineRoom:'Онлайн-комната', playComputer:'С компьютером', createRoom:'Создать комнату', joinRoom:'Войти в комнату', joinAsPlayer:'Играть', watch:'Наблюдать', history:'История игр', refresh:'Обновить', spectators:'Наблюдатели', copyPlayerLink:'Ссылка игроку', copySpectatorLink:'Ссылка зрителю', newRound:'Новая партия', profile:'Профиль', changePhoto:'Изменить фото', resetPhoto:'Сбросить', name:'Имя', profileColor:'Цвет игрока', language:'Язык', fontSize:'Размер шрифта', small:'Маленький', medium:'Средний', large:'Большой', xlarge:'Очень большой', theme:'Тема', darkTheme:'Тёмная', lightTheme:'Светлая', music:'Музыка', musicOn:'Включить музыку', musicOff:'Выключить музыку', volume:'Громкость', uploadMusic:'Добавить свою музыку', playlistFromDevice:'Файл с устройства', playlistOrLink:'Или ссылка из интернета', saveProfile:'Сохранить профиль', logout:'Выйти', continue:'Продолжить', myPlaylist:'Мой плейлист', addSong:'Добавить песню', songTitle:'Название песни', audioLink:'Ссылка на аудио', delete:'Удалить', playlistEmpty:'Плейлист пока пуст. Добавьте песню.', playlistLimit:'Можно добавить не больше 10 песен', nowPlaying:'Сейчас играет', previousSong:'Предыдущая песня', nextSong:'Следующая песня', play:'Play', pause:'Pause', invalidSong:'Добавьте название и ссылку или выберите аудиофайл', playlistFileOnly:'Выберите аудиофайл или вставьте ссылку', invalidWord:'Введите слово из 5 букв', wordAttempts:'Попытки', secretWord:'Загаданное слово', wordWin:'Слово угадано!', wordLose:'Попробуй снова в новой партии',
    copied:'Ссылка скопирована', waitingFriend:'Ждём игроков...', youSpectator:'Вы наблюдатель', yourTurn:'Ваш ход', opponentTurn:'Ход соперника', botTurn:'Ход компьютера', roomCreated:'Комната создана', profileSaved:'Профиль сохранён', noHistory:'Истории пока нет', win:'Победа', lose:'Поражение', draw:'Ничья', vs:'против', tapWhenGreen:'Жми, когда станет зелёным!', tooEarly:'Рано!', go:'ЖМИ!', total:'Сумма', add:'Добавить', roll:'Бросить', selectMove:'Выбери ход', chooseCard:'Открой карту', reviewing:'Последний ход показан. Считаем результат...', resultSoon:'Результат через мгновение...', lastMove:'Последний ход', teams:'Команды', players:'Игроки', maxPlayers:'до {n} игроков', take:'Взять', sticks:'палочек', guessCode:'Угадай код из 4 цифр от 1 до 6', send:'Отправить', question:'Вопрос', answered:'Ответ принят', correct:'Верно', wrong:'Неверно', team:'Команда', fullscreen:'На весь экран', difficulty:'Сложность', computerDifficulty:'Сложность компьютера и игр', gameDifficulty:'Сложность игр', beginner:'Новичок', normal:'Обычная', expert:'Сложная', champion:'Чемпион мира', randomBot:'Случайный соперник', boardFullscreen:'Развернуть доску', boardExitFullscreen:'Свернуть доску', noobHelp:'Подсказки для новичка', checkersHint:'Выберите шашку, затем зелёную клетку. Красные клетки недоступны.', chessHint:'Выберите фигуру, затем подсвеченную клетку. Фигуры двигаются по базовым правилам шахмат.', chessCheck:'Шах!', chessMate:'Мат!', chessCapture:'Фигура взята!', source:'Источник', easy:'Лёгкий', hard:'Сложный', whoamiHost:'Ведущий', whoamiCurrent:'Сейчас отвечает', whoamiQuestion:'Вопрос', whoamiGo:'ГО', whoamiSpinning:'Рулетка крутится...', whoamiAnswer:'Ответить', whoamiPass:'Передать вопрос', whoamiConfirm:'Засчитать ответ', whoamiReject:'Не засчитывать', whoamiAssignHost:'Назначить ведущим', whoamiFinish:'Завершить игру', whoamiWaitingHost:'Ждём решение ведущего', whoamiPoints:'Очки', whoamiPassHint:'Передача забирает очки, но следующий ответ приносит больше.', whoamiChoosePlayer:'Кому передать?', originalGetsNew:'получает новый вопрос, если ответ засчитан.', guessTime:'Угадай время', stopTimerAt:'Останови таймер на', start:'Старт', stop:'Стоп', timerRunningBlind:'Таймер запущен. Останови его в нужный момент.', targetTime:'Целевое время', stoppedTime:'Время остановки', difference:'Разница', milliseconds:'миллисекунд', veryClose:'Очень близко!', goodTry:'Хорошая попытка!', tryAgain:'Попробуй ещё раз!', results:'Результаты', randomTime:'Случайное время', oneMinute:'1 минута', waitingStart:'Ожидание старта', timerGoes:'Таймер идёт', playerStopped:'Игрок остановил таймер', currentPlayer:'Активный игрок', place:'Место', timeMode:'Режим времени', yourTimerHidden:'Вы не видите таймер. Другие игроки и зрители видят время.', 
    games:{ rps:['Камень · Ножницы · Бумага','Быстрая дуэль'], ttt:['Крестики-нолики','Цветные X и O'], dice:['Кубики','У кого выпадет больше'], connect4:['Четыре в ряд','Собери линию'], memory:['Мемори','Найди пары'], twentyone:['21','Дойди ровно до 21'], reaction:['Реакция','Кто быстрее'], checkers:['Шашки','Стратегия 8×8'], chess:['Шахматы','Классическая партия 8×8'], nim:['Ним','Логика с палочками'], code:['Взлом кода','Логика и дедукция'], wordguess:['Отгадай слово','Буквы на месте — зелёные'], millionaire:['Кто хочет стать миллионером','Библейские вопросы до 10 игроков'], teamquiz:['Командная викторина','2, 3 или 4 команды'], mathrace:['Математическая гонка','Быстрый счёт до 10 игроков'], biblequiz:['Что? Где? Когда? — Библия','Библейские вопросы разной сложности'], whoami:['Кто я?','Ведущий, вопросы, передачи и очки'], guesstime:['Угадай время','Останови таймер вслепую'] },
    moves:{ rock:'Камень', paper:'Бумага', scissors:'Ножницы' }
  },
  es: {
    appTitle:'SMQ Games', appSubtitle:'Juega online con amigos, contra la computadora o mira una sala.', loginGoogle:'Entrar con Google', continueGuest:'Continuar como invitado', googleHint:'Google guarda tu foto, color, ajustes e historial.', installApp:'Descargar como app', installUnavailable:'La instalación aparecerá después de abrir el sitio en Chrome/navegador y actualizar.', installReady:'Puedes instalar SMQ Games como app.', appInstalled:'SMQ Games instalado.', updateApp:'Actualizar app', updateChecking:'Buscando actualización...', updateReady:'Actualizando la app...',
    hello:'Hola', mobileGame:'Arena de juegos', chooseGame:'Elige un juego', chooseMode:'Juega solo, contra computadora, con amigos o en equipos.', newGame:'Nuevo juego', game:'Juego', mode:'Modo', onlineRoom:'Sala online', playComputer:'Computadora', createRoom:'Crear sala', joinRoom:'Entrar a sala', joinAsPlayer:'Jugar', watch:'Observar', history:'Historial', refresh:'Actualizar', spectators:'Observadores', copyPlayerLink:'Link jugador', copySpectatorLink:'Link observador', newRound:'Nueva partida', profile:'Perfil', changePhoto:'Cambiar foto', resetPhoto:'Restablecer', name:'Nombre', profileColor:'Color del jugador', language:'Idioma', fontSize:'Tamaño de letra', small:'Pequeño', medium:'Mediano', large:'Grande', xlarge:'Muy grande', theme:'Tema', darkTheme:'Oscuro', lightTheme:'Claro', music:'Música', musicOn:'Activar música', musicOff:'Apagar música', volume:'Volumen', uploadMusic:'Agregar tu música', playlistFromDevice:'Archivo del dispositivo', playlistOrLink:'O enlace de internet', saveProfile:'Guardar perfil', logout:'Salir', continue:'Continuar', myPlaylist:'Mi playlist', addSong:'Agregar canción', songTitle:'Nombre de la canción', audioLink:'Enlace de audio', delete:'Eliminar', playlistEmpty:'La playlist está vacía. Agrega una canción.', playlistLimit:'Puedes agregar máximo 10 canciones', nowPlaying:'Reproduciendo ahora', previousSong:'Canción anterior', nextSong:'Siguiente canción', play:'Play', pause:'Pause', invalidSong:'Agrega el nombre y el enlace o elige un archivo de audio', playlistFileOnly:'Elige un archivo de audio o pega un enlace', invalidWord:'Escribe una palabra de 5 letras', wordAttempts:'Intentos', secretWord:'Palabra secreta', wordWin:'¡Palabra adivinada!', wordLose:'Inténtalo otra vez en una nueva partida',
    copied:'Link copiado', waitingFriend:'Esperando jugadores...', youSpectator:'Estás observando', yourTurn:'Tu turno', opponentTurn:'Turno del rival', botTurn:'Turno de la computadora', roomCreated:'Sala creada', profileSaved:'Perfil guardado', noHistory:'Aún no hay historial', win:'Victoria', lose:'Derrota', draw:'Empate', vs:'contra', tapWhenGreen:'¡Toca cuando esté verde!', tooEarly:'¡Muy pronto!', go:'¡TOCA!', total:'Total', add:'Sumar', roll:'Lanzar', selectMove:'Elige tu jugada', chooseCard:'Abre una carta', reviewing:'Mostrando la última jugada. Calculando resultado...', resultSoon:'Resultado en un momento...', lastMove:'Última jugada', teams:'Equipos', players:'Jugadores', maxPlayers:'hasta {n} jugadores', take:'Tomar', sticks:'palitos', guessCode:'Adivina el código de 4 dígitos del 1 al 6', send:'Enviar', question:'Pregunta', answered:'Respuesta recibida', correct:'Correcto', wrong:'Incorrecto', team:'Equipo', fullscreen:'Pantalla completa', difficulty:'Dificultad', computerDifficulty:'Dificultad de computadora y juegos', gameDifficulty:'Dificultad de juegos', beginner:'Principiante', normal:'Normal', expert:'Difícil', champion:'Campeón mundial', randomBot:'Rival aleatorio', boardFullscreen:'Ampliar tablero', boardExitFullscreen:'Cerrar tablero', noobHelp:'Ayuda para principiantes', checkersHint:'Elige una ficha y luego una casilla verde. Las casillas rojas no están disponibles.', chessHint:'Elige una pieza y luego una casilla resaltada. Las piezas siguen reglas básicas de ajedrez.', chessCheck:'¡Jaque!', chessMate:'¡Jaque mate!', chessCapture:'¡Pieza capturada!', source:'Fuente', easy:'Fácil', hard:'Difícil', whoamiHost:'Conductor', whoamiCurrent:'Responde ahora', whoamiQuestion:'Pregunta', whoamiGo:'GO', whoamiSpinning:'La ruleta gira...', whoamiAnswer:'Responder', whoamiPass:'Pasar pregunta', whoamiConfirm:'Aceptar respuesta', whoamiReject:'No aceptar', whoamiAssignHost:'Hacer conductor', whoamiFinish:'Terminar juego', whoamiWaitingHost:'Esperando al conductor', whoamiPoints:'Puntos', whoamiPassHint:'Pasar resta puntos, pero el siguiente acierto da más.', whoamiChoosePlayer:'¿A quién pasar?', originalGetsNew:'recibe otra pregunta si se acepta la respuesta.', guessTime:'Adivina el tiempo', stopTimerAt:'Detén el temporizador en', start:'Iniciar', stop:'Detener', timerRunningBlind:'El temporizador está en marcha. Detenlo en el momento correcto.', targetTime:'Tiempo objetivo', stoppedTime:'Tiempo detenido', difference:'Diferencia', milliseconds:'milisegundos', veryClose:'¡Muy cerca!', goodTry:'¡Buen intento!', tryAgain:'Inténtalo de nuevo', results:'Resultados', randomTime:'Tiempo aleatorio', oneMinute:'1 minuto', waitingStart:'Esperando inicio', timerGoes:'El temporizador está corriendo', playerStopped:'El jugador detuvo el temporizador', currentPlayer:'Jugador activo', place:'Lugar', timeMode:'Modo de tiempo', yourTimerHidden:'No ves el temporizador. Los demás jugadores y observadores sí ven el tiempo.', 
    games:{ rps:['Piedra · Papel · Tijeras','Duelo rápido'], ttt:['Tres en raya','X y O de color'], dice:['Dados','Gana el número mayor'], connect4:['Cuatro en línea','Conecta una línea'], memory:['Memoria','Encuentra pares'], twentyone:['21','Llega a 21'], reaction:['Reacción','El más rápido'], checkers:['Damas','Estrategia 8×8'], chess:['Ajedrez','Partida clásica 8×8'], nim:['Nim','Lógica con palitos'], code:['Romper el código','Deducción lógica'], wordguess:['Adivina la palabra','Letras en su sitio = verde'], millionaire:['¿Quién quiere ser millonario?','Preguntas bíblicas hasta 10 jugadores'], teamquiz:['Trivia por equipos','2, 3 o 4 equipos'], mathrace:['Carrera matemática','Cálculo rápido'], biblequiz:['¿Qué? ¿Dónde? ¿Cuándo? — Biblia','Preguntas bíblicas por dificultad'], whoami:['¿Quién soy?','Conductor, preguntas, pases y puntos'], guesstime:['Adivina el tiempo','Detén el temporizador a ciegas'] },
    moves:{ rock:'Piedra', paper:'Papel', scissors:'Tijeras' }
  },
  en: {
    appTitle:'SMQ Games', appSubtitle:'Play online with friends, against the computer, or watch a room.', loginGoogle:'Sign in with Google', continueGuest:'Continue as guest', googleHint:'Google saves your photo, color, settings, and history.', installApp:'Download as app', installUnavailable:'Install will appear after opening the site in Chrome/browser and refreshing.', installReady:'You can install SMQ Games as an app.', appInstalled:'SMQ Games installed.', updateApp:'Update app', updateChecking:'Checking for update...', updateReady:'Updating app...',
    hello:'Hello', mobileGame:'Game arena', chooseGame:'Choose a game', chooseMode:'Play solo, vs computer, with friends, or in teams.', newGame:'New game', game:'Game', mode:'Mode', onlineRoom:'Online room', playComputer:'Computer', createRoom:'Create room', joinRoom:'Join room', joinAsPlayer:'Play', watch:'Watch', history:'Game history', refresh:'Refresh', spectators:'Spectators', copyPlayerLink:'Player link', copySpectatorLink:'Spectator link', newRound:'New round', profile:'Profile', changePhoto:'Change photo', resetPhoto:'Reset', name:'Name', profileColor:'Player color', language:'Language', fontSize:'Font size', small:'Small', medium:'Medium', large:'Large', xlarge:'Extra large', theme:'Theme', darkTheme:'Dark', lightTheme:'Light', music:'Music', musicOn:'Turn music on', musicOff:'Turn music off', volume:'Volume', uploadMusic:'Add your music', playlistFromDevice:'File from device', playlistOrLink:'Or internet link', saveProfile:'Save profile', logout:'Log out', continue:'Continue', myPlaylist:'My playlist', addSong:'Add song', songTitle:'Song title', audioLink:'Audio link', delete:'Delete', playlistEmpty:'Your playlist is empty. Add a song.', playlistLimit:'You can add up to 10 songs only', nowPlaying:'Now playing', previousSong:'Previous song', nextSong:'Next song', play:'Play', pause:'Pause', invalidSong:'Add the song title and audio link or choose an audio file', playlistFileOnly:'Choose an audio file or paste a link', invalidWord:'Enter a 5-letter word', wordAttempts:'Attempts', secretWord:'Secret word', wordWin:'Word guessed!', wordLose:'Try again in a new round',
    copied:'Link copied', waitingFriend:'Waiting for players...', youSpectator:'You are watching', yourTurn:'Your turn', opponentTurn:'Opponent turn', botTurn:'Computer turn', roomCreated:'Room created', profileSaved:'Profile saved', noHistory:'No history yet', win:'Win', lose:'Loss', draw:'Draw', vs:'vs', tapWhenGreen:'Tap when it turns green!', tooEarly:'Too early!', go:'TAP!', total:'Total', add:'Add', roll:'Roll', selectMove:'Choose your move', chooseCard:'Open a card', reviewing:'Showing the last move. Calculating result...', resultSoon:'Result coming soon...', lastMove:'Last move', teams:'Teams', players:'Players', maxPlayers:'up to {n} players', take:'Take', sticks:'sticks', guessCode:'Guess the 4-digit code from 1 to 6', send:'Send', question:'Question', answered:'Answer received', correct:'Correct', wrong:'Wrong', team:'Team', fullscreen:'Fullscreen', difficulty:'Difficulty', computerDifficulty:'Computer and game difficulty', gameDifficulty:'Game difficulty', beginner:'Beginner', normal:'Normal', expert:'Hard', champion:'World Champion', randomBot:'Random opponent', boardFullscreen:'Expand board', boardExitFullscreen:'Exit board', noobHelp:'Beginner hints', checkersHint:'Select a checker, then choose a green square. Red squares are not available.', chessHint:'Select a piece, then choose a highlighted square. Pieces follow basic chess rules.', chessCheck:'Check!', chessMate:'Checkmate!', chessCapture:'Piece captured!', source:'Source', easy:'Easy', hard:'Hard', whoamiHost:'Host', whoamiCurrent:'Answering now', whoamiQuestion:'Question', whoamiGo:'GO', whoamiSpinning:'Roulette is spinning...', whoamiAnswer:'Answer', whoamiPass:'Pass question', whoamiConfirm:'Confirm answer', whoamiReject:'Reject', whoamiAssignHost:'Make host', whoamiFinish:'Finish game', whoamiWaitingHost:'Waiting for host', whoamiPoints:'Points', whoamiPassHint:'Passing costs points, but the next answer gives more.', whoamiChoosePlayer:'Pass to whom?', originalGetsNew:'gets a new question if the answer is accepted.', guessTime:'Guess the Time', stopTimerAt:'Stop the timer at', start:'Start', stop:'Stop', timerRunningBlind:'The timer is running. Stop it at the right moment.', targetTime:'Target time', stoppedTime:'Stopped time', difference:'Difference', milliseconds:'milliseconds', veryClose:'Very close!', goodTry:'Good try!', tryAgain:'Try again', results:'Results', randomTime:'Random time', oneMinute:'1 minute', waitingStart:'Waiting for start', timerGoes:'Timer is running', playerStopped:'Player stopped the timer', currentPlayer:'Active player', place:'Place', timeMode:'Time mode', yourTimerHidden:'You cannot see the timer. Other players and spectators can see the time.', 
    games:{ rps:['Rock · Paper · Scissors','Fast duel'], ttt:['Tic Tac Toe','Colored X and O'], dice:['Dice Duel','Highest roll wins'], connect4:['Four in a Row','Connect a line'], memory:['Memory Match','Find pairs'], twentyone:['Twenty One','Reach 21 exactly'], reaction:['Reaction Tap','Fastest wins'], checkers:['Checkers','8×8 strategy'], chess:['Chess','Classic 8×8 match'], nim:['Nim','Logic with sticks'], code:['Code Breaker','Logic deduction'], wordguess:['Guess the Word','Right place letters = green'], millionaire:['Who Wants to Be a Millionaire','Bible questions for up to 10 players'], teamquiz:['Team Quiz','2, 3 or 4 teams'], mathrace:['Math Race','Fast arithmetic'], biblequiz:['What? Where? When? — Bible','Bible questions by difficulty'], whoami:['Who am I?','Host, questions, passes and points'], guesstime:['Guess the Time','Stop the timer blindly'] },
    moves:{ rock:'Rock', paper:'Paper', scissors:'Scissors' }
  }
};

const games = [
  { id:'rps', emoji:'✊', max:2 }, { id:'ttt', emoji:'⭕', max:2 }, { id:'dice', emoji:'🎲', max:2 }, { id:'connect4', emoji:'🔴', max:2 },
  { id:'memory', emoji:'🧠', max:2 }, { id:'twentyone', emoji:'21', max:2 }, { id:'reaction', emoji:'⚡', max:2 }, { id:'checkers', emoji:'⚫', max:2 }, { id:'chess', emoji:'♞', max:2 },
  { id:'nim', emoji:'🪵', max:2 }, { id:'code', emoji:'🔐', max:1 }, { id:'wordguess', emoji:'🔤', max:1 }, { id:'millionaire', emoji:'💰', max:10 }, { id:'biblequiz', emoji:'📖', max:10 }, { id:'whoami', emoji:'🎭', max:10 }, { id:'guesstime', emoji:'⏱️', max:10 }, { id:'teamquiz', emoji:'🏁', max:10 }, { id:'mathrace', emoji:'🧮', max:10 }
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
  difficulty: localStorage.getItem('smq_difficulty') || 'random',
  socket:null,
  room:null,
  role:null,
  lastWinnerKey:null,
  lastHistoryKey:null,
  selectedChecker:null,
  selectedChess:null,
  musicOn: localStorage.getItem('smq_music_on') === '1',
  history: [],
  playlist: [],
  playlistIndex: 0,
  deferredInstallPrompt:null,
  isStandalone: window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
};

let fbApp = null, fbAuth = null, fbDb = null;

function t(key) {
  const dict = I18N[state.lang] || I18N.ru;
  return key.split('.').reduce((obj, part) => obj && obj[part], dict) || key;
}

function l10n(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[state.lang] || value.ru || value.es || value.en || '';
}

function l10nList(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== 'object') return [];
  return value[state.lang] || value.ru || value.es || value.en || [];
}

function defaultSettings() {
  return { lang: state.lang, theme: state.theme, fontSize: state.fontSize, color: state.color, difficulty: state.difficulty, musicVolume: Number(localStorage.getItem('smq_volume') || '0.35') };
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
  return { firebaseUid: fbUser?.uid || null, avatarUrl: state.user?.avatarUrl || null, color: state.user?.settings?.color || state.user?.color || state.color, lang: state.lang, difficulty: state.difficulty };
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
  state.lang = s.lang || state.lang; state.theme = s.theme || state.theme; state.fontSize = s.fontSize || state.fontSize; state.color = s.color || state.color; state.difficulty = s.difficulty || state.difficulty;
  localStorage.setItem('smq_lang', state.lang); localStorage.setItem('smq_theme', state.theme); localStorage.setItem('smq_fontSize', state.fontSize); localStorage.setItem('smq_color', state.color); localStorage.setItem('smq_difficulty', state.difficulty);
  updateProfileUI(); applyThemeAndFont(); applyI18n(); showScreen('homeScreen'); await loadHistory();
  if (roomFromPath) joinRoom(roomFromPath, params.get('spectate') === '1');
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $('quickLang').value = state.lang; $('profileLang').value = state.lang; if ($('difficultySelect')) $('difficultySelect').value = state.difficulty;
  if ($('toggleMusicBtn')) $('toggleMusicBtn').textContent = state.musicOn ? t('musicOff') : t('musicOn');
  renderGameCards(); renderHistory(); renderPlaylist(); if (state.room) renderRoom(state.room);
}

function applyThemeAndFont() {
  document.body.classList.toggle('light', state.theme === 'light');
  document.body.classList.remove('font-small','font-medium','font-large','font-xlarge');
  document.body.classList.add(`font-${state.fontSize}`);
  document.documentElement.style.setProperty('--my-color', state.color);
  $('themeSelect').value = state.theme; $('fontSizeSelect').value = state.fontSize; if ($('difficultySelect')) $('difficultySelect').value = state.difficulty;
}

function showScreen(name) { ['loginScreen','homeScreen','roomScreen'].forEach(id => $(id).classList.add('hidden')); $(name).classList.remove('hidden'); }
function toast(message) { const el = $('toast'); el.textContent = message; el.classList.remove('hidden'); clearTimeout(toast._timer); toast._timer = setTimeout(() => el.classList.add('hidden'), 2400); }
function avatarInitial(name) { return (name || 'S').trim().slice(0,1).toUpperCase(); }
function setAvatar(imgEl, fallbackEl, url, name) { if (url) { imgEl.src = url; imgEl.style.display = 'block'; fallbackEl.style.display = 'none'; } else { imgEl.removeAttribute('src'); imgEl.style.display = 'none'; fallbackEl.style.display = 'inline'; fallbackEl.textContent = avatarInitial(name); } }
function myIndex() { const m = String(state.role || '').match(/^player(\d+)$/); return m ? Number(m[1]) - 1 : -1; }
function activePlayers(room) { return (room.players || []).map((p,i) => p ? { ...p, index:i } : null).filter(Boolean); }
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
}
function initials(name) {
  const parts = String(name || 'S').trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'S').toUpperCase() + (parts[1]?.[0] || '').toUpperCase();
}
function playerAvatar(p, size = 'sm', extraClass = '') {
  const name = escapeHtml(p?.name || 'Player');
  const color = p?.color || '#8b5cf6';
  const active = state.room?.state?.turn === p?.index || state.room?.state?.activeIndex === p?.index || state.room?.state?.currentHolder === p?.index || state.room?.state?.currentPlayer === p?.index;
  const winner = state.room?.winnerMessage?.winnerIndex === p?.index || state.room?.lastRound?.winnerIndex === p?.index;
  const faded = p && p.connected === false ? ' offline' : '';
  const ring = active ? ' active' : winner ? ' winner' : '';
  const img = p?.avatarUrl ? `<img src="${escapeHtml(p.avatarUrl)}" alt="${name}" loading="lazy"/>` : `<span>${escapeHtml(initials(p?.name))}</span>`;
  return `<span class="player-avatar ${size} ${extraClass}${ring}${faded}" style="--pc:${color}" title="${name}" data-player-name="${name}">${img}</span>`;
}
function playerLabel(p, size = 'sm') {
  const name = escapeHtml(p?.name || 'Player');
  return `<span class="player-label">${playerAvatar(p, size)}<span class="player-label-name">${name}</span></span>`;
}
function formatGameTime(ms) {
  const safe = Math.max(0, Math.round(Number(ms) || 0));
  const m = Math.floor(safe / 60000);
  const sec = Math.floor((safe % 60000) / 1000);
  const milli = safe % 1000;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(milli).padStart(3, '0')}`;
}
function guessTimeRating(diff) {
  if (diff <= 250) return t('veryClose');
  if (diff <= 1500) return t('goodTry');
  return t('tryAgain');
}

function updateProfileUI() {
  const u = state.user || { name:'Player' };
  $('headerName').textContent = u.name || 'Player'; $('profileName').value = u.name || 'Player';
  const color = u.settings?.color || u.color || state.color;
  state.color = color; $('profileColor').value = color;
  setAvatar($('headerAvatar'), $('avatarFallback'), u.avatarUrl, u.name); setAvatar($('profileAvatar'), $('profileFallback'), u.avatarUrl, u.name);
  loadPlaylist();
  renderPlaylist();
}


function playlistKey() {
  const id = state.user?.id || guestId();
  return `smq_playlist_${id}`;
}

function loadPlaylist() {
  try {
    const raw = localStorage.getItem(playlistKey());
    const parsed = raw ? JSON.parse(raw) : [];
    state.playlist = Array.isArray(parsed) ? parsed.filter(song => song && song.title && song.url).slice(0, 10) : [];
  } catch (_) { state.playlist = []; }
  if (state.playlistIndex >= state.playlist.length) state.playlistIndex = Math.max(0, state.playlist.length - 1);
}

function savePlaylist() {
  try {
    localStorage.setItem(playlistKey(), JSON.stringify(state.playlist.slice(0, 10)));
  } catch (error) {
    toast('Файл слишком большой для сохранения на этом устройстве');
    throw error;
  }
}

function formatAudioTime(seconds) {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updatePlaylistTimeline() {
  const audio = $('playlistAudio');
  const seek = $('playlistSeek');
  const current = $('playlistCurrentTime');
  const duration = $('playlistDuration');
  if (!audio) return;
  const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
  if (current) current.textContent = formatAudioTime(audio.currentTime || 0);
  if (duration) duration.textContent = formatAudioTime(dur);
  if (seek && !seek.matches(':active')) seek.value = dur ? String((audio.currentTime / dur) * 100) : '0';
}

function setPlaylistAudio(index, autoplay = false) {
  if (!state.playlist.length) { renderPlaylist(); return; }
  const safeIndex = ((index % state.playlist.length) + state.playlist.length) % state.playlist.length;
  state.playlistIndex = safeIndex;
  const song = state.playlist[safeIndex];
  const audio = $('playlistAudio');
  if (!audio || !song) return;
  const absoluteUrl = song.url.startsWith('data:') || song.url.startsWith('blob:') ? song.url : new URL(song.url, location.href).href;
  if (audio.src !== absoluteUrl) {
    audio.src = song.url;
    audio.load();
  }
  audio.volume = Number(localStorage.getItem('smq_volume') || '0.35');
  renderPlaylist();
  updatePlaylistTimeline();
  if (autoplay) audio.play().then(renderPlaylist).catch(() => toast(t('invalidSong')));
}

function renderPlaylist() {
  const list = $('playlistList');
  if (!list) return;
  const now = $('playlistNow');
  const playBtn = $('playlistPlayBtn');
  const audio = $('playlistAudio');
  const prevBtn = $('playlistPrevBtn');
  const nextBtn = $('playlistNextBtn');
  if (!state.playlist.length) {
    list.innerHTML = `<div class="playlist-empty">${t('playlistEmpty')}</div>`;
    if (now) now.textContent = '—';
    if (playBtn) { playBtn.textContent = t('play'); playBtn.disabled = true; }
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    updatePlaylistTimeline();
    return;
  }
  if (playBtn) { playBtn.disabled = false; playBtn.textContent = audio && !audio.paused ? t('pause') : t('play'); }
  if (prevBtn) prevBtn.disabled = state.playlist.length < 2;
  if (nextBtn) nextBtn.disabled = state.playlist.length < 2;
  const current = state.playlist[state.playlistIndex] || state.playlist[0];
  if (now) now.textContent = current?.title || '—';
  list.innerHTML = state.playlist.map((song, index) => `
    <div class="playlist-item ${index === state.playlistIndex ? 'active' : ''}">
      <button class="playlist-select" type="button" data-song-index="${index}">
        <span>${index + 1}</span><b>${escapeHtml(song.title)}</b>
      </button>
      <button class="playlist-delete" type="button" data-delete-song="${index}">${t('delete')}</button>
    </div>`).join('');
  list.querySelectorAll('[data-song-index]').forEach(btn => btn.onclick = () => setPlaylistAudio(Number(btn.dataset.songIndex), true));
  list.querySelectorAll('[data-delete-song]').forEach(btn => btn.onclick = () => removePlaylistSong(Number(btn.dataset.deleteSong)));
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function addPlaylistSong() {
  loadPlaylist();
  if (state.playlist.length >= 10) return toast(t('playlistLimit'));
  const title = $('songTitleInput')?.value.trim();
  const url = $('songUrlInput')?.value.trim();
  const file = $('songFileInput')?.files?.[0] || null;
  if (!title || (!url && !file)) return toast(file ? t('invalidSong') : t('playlistFileOnly'));
  const pushSong = (finalUrl) => {
    state.playlist.push({ title: title.slice(0, 80), url: String(finalUrl || '').slice(0, 7000000), createdAt: Date.now() });
    try { savePlaylist(); } catch (error) { state.playlist.pop(); return; }
    $('songTitleInput').value = '';
    $('songUrlInput').value = '';
    if ($('songFileInput')) $('songFileInput').value = '';
    setPlaylistAudio(state.playlist.length - 1, false);
    renderPlaylist();
  };
  if (file) {
    if (file.size > 4500000) return toast('Max 4.5 MB');
    const reader = new FileReader();
    reader.onload = () => pushSong(reader.result);
    reader.readAsDataURL(file);
    return;
  }
  pushSong(url);
}

function removePlaylistSong(index) {
  loadPlaylist();
  if (index < 0 || index >= state.playlist.length) return;
  state.playlist.splice(index, 1);
  if (state.playlistIndex >= state.playlist.length) state.playlistIndex = Math.max(0, state.playlist.length - 1);
  savePlaylist();
  const audio = $('playlistAudio');
  if (!state.playlist.length && audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); }
  else setPlaylistAudio(state.playlistIndex, false);
  renderPlaylist();
}

function playlistNext() { if (state.playlist.length) setPlaylistAudio(state.playlistIndex + 1, true); }
function playlistPrev() { if (state.playlist.length) setPlaylistAudio(state.playlistIndex - 1, true); }
function playlistPlayPause() {
  if (!state.playlist.length) return;
  const audio = $('playlistAudio');
  if (!audio) return;
  if (!audio.src) setPlaylistAudio(state.playlistIndex, false);
  if (audio.paused) audio.play().then(renderPlaylist).catch(() => toast(t('invalidSong')));
  else { audio.pause(); renderPlaylist(); }
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
  $('p1Name').innerHTML = p0 ? playerLabel(p0, 'sm') : escapeHtml('Player 1');
  $('p2Name').innerHTML = p1 ? playerLabel(p1, 'sm') : escapeHtml(room.mode === 'bot' ? 'SMQ Bot' : 'Player 2');
  $('p1Score').textContent = room.scores[0] ?? 0; $('p2Score').textContent = room.scores[1] ?? 0; $('spectatorCount').textContent = room.spectators || 0;
  renderPlayerStrip(room); renderTurnBanner(room); renderGame(room); renderReviewPanel(room); maybeShowWinner(room); maybeSaveRoundHistory(room);
}

function renderPlayerStrip(room) {
  const strip = $('playerStrip'); if (!strip) return;
  strip.innerHTML = activePlayers(room).map(p => `<div class="player-chip" style="--pc:${p.color || '#8b5cf6'}">${playerAvatar(p, 'md')}<b>${escapeHtml(p.name)}${p.isBot ? ' 🤖' : ''}</b><em>${room.game === 'teamquiz' ? `${t('team')} ${p.team + 1} · ` : ''}${room.scores[p.index] || 0}</em></div>`).join('');
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
  if (room.game === 'whoami') {
    const s = room.state || {};
    if (s.phase === 'spinning') banner.textContent = t('whoamiSpinning');
    else if (s.phase === 'awaitingHost') banner.textContent = `${t('whoamiWaitingHost')}: ${room.players?.[s.hostIndex]?.name || t('whoamiHost')}`;
    else if (s.phase === 'question') banner.textContent = `${t('whoamiCurrent')}: ${room.players?.[s.currentHolder]?.name || 'Player'}`;
    else banner.textContent = s.currentPlayer === idx ? t('yourTurn') : `${t('whoamiCurrent')}: ${room.players?.[s.currentPlayer]?.name || 'Player'}`;
    return;
  }
  if (room.game === 'guesstime') {
    const s = room.state || {};
    const activeName = room.players?.[s.activeIndex]?.name || 'Player';
    if (s.phase === 'running') banner.textContent = s.activeIndex === idx ? t('timerRunningBlind') : `${t('timerGoes')}: ${activeName}`;
    else if (s.phase === 'stopped' || s.phase === 'finished') banner.textContent = `${t('playerStopped')}: ${activeName}`;
    else banner.textContent = s.activeIndex === idx ? t('yourTurn') : `${t('currentPlayer')}: ${activeName}`;
    return;
  }
  if (['millionaire','teamquiz','mathrace','biblequiz'].includes(room.game)) { banner.textContent = room.state.answers?.[String(idx)] ? t('answered') : t('yourTurn'); return; }
  if (room.game === 'wordguess') { banner.textContent = room.state.winner === null ? t('yourTurn') : (room.state.winner ? t('wordWin') : t('wordLose')); return; }
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
  return Number(state.room.state?.turn) === idx;
}
function moveButtonLabel(move) { return `${move.from[0] + 1},${move.from[1] + 1} → ${move.to[0] + 1},${move.to[1] + 1}${move.capture ? ' ×' : ''}`; }
function sendAction(action) { state.socket?.emit('game_action', action); }

function renderGame(room) {
  const board = $('gameBoard');
  if (room.status === 'waiting') { board.innerHTML = `<div class="total-card"><h2>${t('waitingFriend')}</h2><p>${location.origin}${room.playerLink}</p></div>`; return; }
  const map = { rps:renderRps, ttt:renderTtt, dice:renderDice, connect4:renderConnect4, memory:renderMemory, twentyone:renderTwentyOne, reaction:renderReaction, checkers:renderCheckers, chess:renderChess, nim:renderNim, code:renderCode, wordguess:renderWordGuess, millionaire:renderMillionaire, biblequiz:renderMillionaire, teamquiz:renderMillionaire, mathrace:renderMathRace, whoami:renderWhoAmI, guesstime:renderGuessTime };
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
  board.innerHTML = `<div class="dice-grid">${players.map(p => `<div class="dice-card" style="--pc:${p.color}"><small>${playerLabel(p, 'sm')}</small><div class="dice-face">${room.state.rolls[p.index] ? faces[room.state.rolls[p.index]-1] : '🎲'}</div></div>`).join('')}<button class="btn primary full" id="rollBtn" ${!canAct(false) || room.state.rolls?.[myIndex()] ? 'disabled' : ''}>${t('roll')}</button></div>`;
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
  board.innerHTML = `<div class="memory-board">${room.state.cards.map(card => `<button class="memory-card ${card.value ? '' : 'closed'} ${card.matched ? 'matched' : ''}" data-card="${card.id}" ${!canAct(true) || card.matched || card.revealed ? 'disabled' : ''}>${card.value || '?'}</button>`).join('')}</div><div class="mini-score">${room.state.pairScore?.map((score,i)=>room.players[i] ? `${playerAvatar({...room.players[i], index:i}, 'xs')} ${escapeHtml(room.players[i].name)}: ${score}` : `P${i+1}: ${score}`).join(' · ')}</div>`;
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

function clientValidateCheckersMove(board, player, fr, fc, tr, tc) {
  if (![fr,fc,tr,tc].every(n => Number.isInteger(n) && n >= 0 && n < 8)) return null;
  const piece = board?.[fr]?.[fc];
  const target = board?.[tr]?.[tc];
  if (!piece || piece.p !== player || target || (tr + tc) % 2 !== 1) return null;
  const dr = tr - fr, dc = tc - fc;
  const adr = Math.abs(dr), adc = Math.abs(dc);
  if (adr !== adc || adr === 0) return null;

  // Simple checker: moves one square forward, captures one enemy forward/backward.
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

  // King checker: chess-style stable selection, flying diagonally any length.
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

function clientLegalCheckersMoves(board, player, fromOnly = null) {
  const moves = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    if (fromOnly && (fromOnly[0] !== r || fromOnly[1] !== c)) continue;
    const piece = board?.[r]?.[c];
    if (!piece || piece.p !== player) continue;
    if (piece.k) {
      for (const dr of [-1, 1]) for (const dc of [-1, 1]) {
        for (let step = 1; step < 8; step++) {
          const tr = r + dr * step, tc = c + dc * step;
          if (tr < 0 || tr > 7 || tc < 0 || tc > 7) break;
          const move = clientValidateCheckersMove(board, player, r, c, tr, tc);
          if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
        }
      }
    } else {
      const forward = player === 0 ? -1 : 1;
      for (const dc of [-1, 1]) {
        const tr = r + forward, tc = c + dc;
        const move = clientValidateCheckersMove(board, player, r, c, tr, tc);
        if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
      }
      for (const dr of [-2, 2]) for (const dc of [-2, 2]) {
        const tr = r + dr, tc = c + dc;
        const move = clientValidateCheckersMove(board, player, r, c, tr, tc);
        if (move) moves.push({ from: [r,c], to: [tr,tc], capture: move.capture });
      }
    }
  }
  return moves;
}

function checkerMoveLabel(move) {
  return `${String.fromCharCode(65 + move.to[1])}${8 - move.to[0]}${move.capture ? ' ×' : ''}`;
}

function toggleBoardFullscreen() {
  const wrap = document.querySelector('.checkers-wrap, .chess-wrap');
  if (!wrap) return;
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    return;
  }
  if (wrap.requestFullscreen) {
    wrap.requestFullscreen().catch(() => wrap.classList.toggle('board-expanded'));
  } else {
    wrap.classList.toggle('board-expanded');
  }
}
function bindBoardFullscreen(board) {
  board.querySelector('[data-board-fullscreen]')?.addEventListener('click', toggleBoardFullscreen);
}
function boardToolbarHtml() {
  return `<div class="board-toolbar"><button class="chip-btn board-full-btn" type="button" data-board-fullscreen>⛶ ${t('boardFullscreen')}</button></div>`;
}

function renderCheckers(board, room) {
  const idx = myIndex();
  const canMove = room.status === 'playing' && idx >= 0 && state.role !== 'spectator' && room.state?.turn === idx;
  const selected = state.selectedChecker;
  const allMyMoves = canMove ? clientLegalCheckersMoves(room.state.board, idx) : [];
  const legalMoves = selected && canMove ? clientLegalCheckersMoves(room.state.board, idx, selected) : [];
  const legalTargets = new Set(legalMoves.map(m => `${m.to[0]},${m.to[1]}`));
  const lastMove = room.state.lastMove || {};
  let html = `<div class="checkers-wrap">${boardToolbarHtml()}<div class="rules-tip">💡 ${t('checkersHint')}</div><div class="checkers-board recreated-checkers-board">`;
  room.state.board.forEach((row,r) => row.forEach((piece,c) => {
    const dark = (r+c)%2 === 1;
    const isMine = piece && piece.p === idx;
    const hasMove = allMyMoves.some(m => m.from[0] === r && m.from[1] === c);
    const isSelected = selected && selected[0] === r && selected[1] === c;
    const targetKey = `${r},${c}`;
    const legalTarget = selected && !piece && legalTargets.has(targetKey) ? 'legal-target' : '';
    const movable = isMine && hasMove ? 'movable-piece' : '';
    const wasFrom = lastMove.from && lastMove.from[0] === r && lastMove.from[1] === c;
    const wasTo = lastMove.to && lastMove.to[0] === r && lastMove.to[1] === c;
    html += `<button type="button" class="checkers-cell ${dark ? 'dark' : 'light'} ${piece ? `piece p${piece.p}` : ''} ${isSelected ? 'selected' : ''} ${legalTarget} ${movable} ${wasFrom ? 'move-from' : ''} ${wasTo ? 'capture-hit' : ''}" data-r="${r}" data-c="${c}">${piece ? `<span>${piece.k ? '♛' : '●'}</span>` : ''}</button>`;
  }));
  const last = room.state.lastMove ? `${t('lastMove')}: ${room.state.lastMove.from?.join(',')} → ${room.state.lastMove.to?.join(',')}${room.state.lastMove.captured ? ' ×' : ''}` : t('selectMove');
  const moveTray = selected && legalMoves.length
    ? `<div class="move-tray">${legalMoves.map((m, i) => `<button class="chip-btn move-choice" type="button" data-checkers-index="${i}">${checkerMoveLabel(m)}</button>`).join('')}</div>`
    : `<div class="move-tray muted">${canMove ? t('selectMove') : t('opponentTurn')}</div>`;
  board.innerHTML = html + `</div><div class="checkers-status">${last}</div>${moveTray}</div>`;
  bindBoardFullscreen(board);

  board.querySelectorAll('.checkers-cell').forEach(btn => {
    const r = Number(btn.dataset.r), c = Number(btn.dataset.c);
    btn.onclick = () => {
      if (!canMove) return toast(t('opponentTurn'));
      const piece = room.state.board?.[r]?.[c];
      if (piece && piece.p === idx) {
        const moves = clientLegalCheckersMoves(room.state.board, idx, [r,c]);
        if (!moves.length) return toast(t('selectMove'));
        state.selectedChecker = [r,c];
        renderCheckers(board, room);
        return;
      }
      if (state.selectedChecker && legalTargets.has(`${r},${c}`)) {
        sendAction({ from: state.selectedChecker, to:[r,c] });
        state.selectedChecker = null;
      } else if (state.selectedChecker) {
        toast(t('selectMove'));
      }
    };
  });
  board.querySelectorAll('[data-checkers-index]').forEach(btn => {
    btn.onclick = () => {
      const move = legalMoves[Number(btn.dataset.checkersIndex)];
      if (!move) return;
      sendAction({ from: move.from, to: move.to });
      state.selectedChecker = null;
    };
  });
}

const CHESS_ICONS = {
  0:{ k:'♔', q:'♕', r:'♖', b:'♗', n:'♘', p:'♙' },
  1:{ k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟' }
};

function cloneChessBoardClient(board) {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}
function findKingClient(board, player) {
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) if (board[r][c]?.p === player && board[r][c]?.t === 'k') return [r,c];
  return null;
}
function isChessPathClearClient(board, fr, fc, tr, tc) {
  const dr = tr - fr, dc = tc - fc;
  const sr = Math.sign(dr), sc = Math.sign(dc);
  let r = fr + sr, c = fc + sc;
  while (r !== tr || c !== tc) { if (board[r][c]) return false; r += sr; c += sc; }
  return true;
}
function isSquareAttackedClient(board, r, c, byPlayer) {
  for (let fr=0; fr<8; fr++) for (let fc=0; fc<8; fc++) {
    const piece = board[fr][fc];
    if (!piece || piece.p !== byPlayer) continue;
    const dr = r - fr, dc = c - fc, adr = Math.abs(dr), adc = Math.abs(dc);
    const dir = byPlayer === 0 ? -1 : 1;
    if (piece.t === 'p' && dr === dir && adc === 1) return true;
    if (piece.t === 'n' && ((adr === 2 && adc === 1) || (adr === 1 && adc === 2))) return true;
    if (piece.t === 'k' && Math.max(adr, adc) === 1) return true;
    if (piece.t === 'b' && adr === adc && isChessPathClearClient(board, fr, fc, r, c)) return true;
    if (piece.t === 'r' && (dr === 0 || dc === 0) && isChessPathClearClient(board, fr, fc, r, c)) return true;
    if (piece.t === 'q' && (dr === 0 || dc === 0 || adr === adc) && isChessPathClearClient(board, fr, fc, r, c)) return true;
  }
  return false;
}
function isKingInCheckClient(board, player) {
  const king = findKingClient(board, player);
  if (!king) return true;
  return isSquareAttackedClient(board, king[0], king[1], player === 0 ? 1 : 0);
}
function pseudoChessMoveClient(board, player, fr, fc, tr, tc, state = {}) {
  if (![fr,fc,tr,tc].every(n => Number.isInteger(n) && n >= 0 && n < 8)) return null;
  if (fr === tr && fc === tc) return null;
  const piece = board?.[fr]?.[fc];
  const target = board?.[tr]?.[tc];
  if (!piece || piece.p !== player || (target && target.p === player)) return null;
  const dr = tr - fr, dc = tc - fc, adr = Math.abs(dr), adc = Math.abs(dc);
  const dir = player === 0 ? -1 : 1;
  if (piece.t === 'k' && dr === 0 && adc === 2 && !target) {
    const homeRow = player === 0 ? 7 : 0;
    if (fr !== homeRow || fc !== 4 || isKingInCheckClient(board, player)) return null;
    const side = dc > 0 ? 'king' : 'queen';
    const rights = state.castlingRights?.[player]?.[side] !== false;
    const rookCol = dc > 0 ? 7 : 0;
    const rook = board[homeRow][rookCol];
    if (!rights || !rook || rook.p !== player || rook.t !== 'r') return null;
    const between = dc > 0 ? [5,6] : [1,2,3];
    if (between.some(col => board[homeRow][col])) return null;
    const through = dc > 0 ? [5,6] : [3,2];
    if (through.some(col => isSquareAttackedClient(board, homeRow, col, player === 0 ? 1 : 0))) return null;
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
    case 'r': if ((dr === 0 || dc === 0) && isChessPathClearClient(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'b': if (adr === adc && isChessPathClearClient(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'q': if ((dr === 0 || dc === 0 || adr === adc) && isChessPathClearClient(board, fr, fc, tr, tc)) return { capture:!!target }; return null;
    case 'n': if ((adr === 2 && adc === 1) || (adr === 1 && adc === 2)) return { capture:!!target }; return null;
    case 'k': if (Math.max(adr, adc) === 1) return { capture:!!target }; return null;
  }
  return null;
}
function applyChessMoveClient(board, fr, fc, tr, tc, move) {
  const copy = cloneChessBoardClient(board);
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
function clientValidateChessMove(board, player, fr, fc, tr, tc, state = {}) {
  const move = pseudoChessMoveClient(board, player, fr, fc, tr, tc, state);
  if (!move) return null;
  const after = applyChessMoveClient(board, fr, fc, tr, tc, move);
  if (isKingInCheckClient(after, player)) return null;
  return move;
}
function clientLegalChessMoves(board, player, fromOnly = null, state = {}) {
  const out = [];
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
    if (fromOnly && (fromOnly[0] !== r || fromOnly[1] !== c)) continue;
    const piece = board?.[r]?.[c];
    if (!piece || piece.p !== player) continue;
    for (let tr=0;tr<8;tr++) for (let tc=0;tc<8;tc++) {
      const mv = clientValidateChessMove(board, player, r,c,tr,tc,state);
      if (mv) out.push({ from:[r,c], to:[tr,tc], capture:mv.capture, castle:mv.castle });
    }
  }
  return out;
}
function renderChess(board, room) {
  const idx = myIndex();
  const canMove = canAct(true) && idx >= 0;
  const selected = state.selectedChess;
  const allMyMoves = canMove ? clientLegalChessMoves(room.state.board, idx, null, room.state) : [];
  const legalMoves = selected && canMove ? clientLegalChessMoves(room.state.board, idx, selected, room.state) : [];
  const legalTargets = new Set(legalMoves.map(m => `${m.to[0]},${m.to[1]}`));
  const lastMove = room.state.lastMove || {};
  const isCaptureMove = !!lastMove.captured;
  const isMate = room.state.checkMate !== null && room.state.checkMate !== undefined;
  const isCheck = !isMate && room.state.check !== null && room.state.check !== undefined;
  const statusText = isMate ? t('chessMate') : isCheck ? t('chessCheck') : isCaptureMove ? t('chessCapture') : '';
  let html = `<div class="checkers-wrap chess-wrap">${boardToolbarHtml()}<div class="rules-tip">💡 ${t('chessHint')}</div>${statusText ? `<div class="chess-alert ${isMate ? 'mate' : isCheck ? 'check' : 'capture'}">${statusText}</div>` : ''}<div class="chess-stage"><div class="chess-board ${isCheck ? 'is-check' : ''} ${isMate ? 'is-mate' : ''}">`;
  room.state.board.forEach((row,r) => row.forEach((piece,c) => {
    const dark = (r+c)%2 === 1;
    const isMine = piece && piece.p === idx;
    const hasMove = allMyMoves.some(m => m.from[0] === r && m.from[1] === c);
    const isSelected = selected && selected[0] === r && selected[1] === c;
    const targetKey = `${r},${c}`;
    const targetClass = selected && !piece ? (legalTargets.has(targetKey) ? 'legal-target' : 'illegal-target') : '';
    const captureClass = selected && piece && legalTargets.has(targetKey) ? 'capture-target' : '';
    const movable = isMine && hasMove ? 'movable-piece' : '';
    const wasFrom = lastMove.from && lastMove.from[0] === r && lastMove.from[1] === c;
    const wasTo = lastMove.to && lastMove.to[0] === r && lastMove.to[1] === c;
    const captureHit = wasTo && isCaptureMove ? 'capture-hit' : '';
    const moveFrom = wasFrom ? 'move-from' : '';
    const kingDanger = piece && piece.t === 'k' && (piece.p === room.state.check || piece.p === room.state.checkMate) ? 'king-danger' : '';
    const icon = piece ? CHESS_ICONS[piece.p]?.[piece.t] || '♟' : '';
    html += `<button type="button" class="chess-cell ${dark ? 'dark' : 'light'} ${piece ? `piece p${piece.p}` : ''} ${isSelected ? 'selected' : ''} ${targetClass} ${captureClass} ${movable} ${captureHit} ${moveFrom} ${kingDanger}" data-r="${r}" data-c="${c}">${piece ? `<span aria-hidden="true">${icon}</span>` : ''}</button>`;
  }));
  const checkText = isMate ? ` · ${t('chessMate')}` : isCheck ? ` · ${t('chessCheck')}` : '';
  const last = room.state.lastMove ? `${t('lastMove')}: ${room.state.lastMove.from?.join(',')} → ${room.state.lastMove.to?.join(',')}${room.state.lastMove.castle ? ' 0-0' : room.state.lastMove.captured ? ' ×' : ''}${checkText}` : `${t('selectMove')}${checkText}`;
  const moveTray = selected && legalMoves.length
    ? `<div class="move-tray">${legalMoves.slice(0, 14).map((m, i) => `<button class="chip-btn move-choice" data-chess-index="${i}">${moveButtonLabel(m)}</button>`).join('')}</div>`
    : `<div class="move-tray muted">${canMove ? t('selectMove') : t('opponentTurn')}</div>`;
  board.innerHTML = html + `</div></div><div class="checkers-status">${last}</div>${moveTray}</div>`;
  bindBoardFullscreen(board);
  board.querySelectorAll('.chess-cell').forEach(btn => {
    const r = Number(btn.dataset.r), c = Number(btn.dataset.c);
    btn.onclick = () => {
      const piece = room.state.board[r][c];
      if (!canMove) return;
      if (piece && piece.p === idx) {
        const moves = clientLegalChessMoves(room.state.board, idx, [r,c], room.state);
        if (!moves.length) return toast(t('selectMove'));
        state.selectedChess = [r,c];
        renderChess(board, room);
        return;
      }
      if (state.selectedChess) {
        if (clientValidateChessMove(room.state.board, idx, state.selectedChess[0], state.selectedChess[1], r, c, room.state)) {
          sendAction({ from: state.selectedChess, to:[r,c] });
          state.selectedChess = null;
        } else toast(t('selectMove'));
      }
    };
  });
  board.querySelectorAll('[data-chess-index]').forEach(btn => btn.onclick = () => {
    const move = legalMoves[Number(btn.dataset.chessIndex)];
    if (move) { sendAction({ from: move.from, to: move.to }); state.selectedChess = null; }
  });
}

function renderWordGuess(board, room) {
  const s = room.state || {};
  const won = s.winner === true;
  const lost = s.finished && !won;
  const rows = (s.guesses || []).map(item => `<div class="word-row">${item.letters.map((letter, i) => `<span class="word-cell ${item.hints[i] || ''}">${escapeHtml(letter)}</span>`).join('')}</div>`).join('');
  const slots = Array.from({ length: s.wordLength || 5 }, () => `<span class="word-cell empty">?</span>`).join('');
  const left = Math.max(0, (s.maxGuesses || 6) - (s.guesses?.length || 0));
  board.innerHTML = `<div class="wordguess-wrap"><div class="wordguess-panel"><h2>🔤</h2><p>${t(`games.wordguess`)?.[1] || ''}</p><div class="word-meta"><span>${t('wordAttempts')}: <b>${left}</b></span>${lost ? `<span>${t('secretWord')}: <b>${escapeHtml(s.reveal || '')}</b></span>` : ''}</div><div class="word-grid">${rows || `<div class="word-row">${slots}</div>`}</div><div class="word-input-row"><input id="wordGuessInput" class="input word-input" maxlength="${s.wordLength || 5}" autocapitalize="characters" ${won || lost ? 'disabled' : ''}/><button class="btn primary" id="wordGuessBtn" ${won || lost ? 'disabled' : ''}>${t('send')}</button></div><div class="checkers-status">${won ? t('wordWin') : lost ? t('wordLose') : t('selectMove')}</div></div></div>`;
  $('wordGuessBtn') && ($('wordGuessBtn').onclick = () => {
    const value = $('wordGuessInput').value.trim().toUpperCase();
    if (value.length !== (s.wordLength || 5)) return toast(t('invalidWord'));
    sendAction({ guess:value });
    $('wordGuessInput').value = '';
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
  const srcText = l10n(q.source);
  const src = srcText ? `<small class="source-line">${t('source')}: ${srcText}</small>` : '';
  const qText = l10n(q.q);
  const answers = l10nList(q.a);
  board.innerHTML = `<div class="quiz-wrap"><div class="quiz-score">${isTeam ? room.teamScores.map((x,i)=>`${t('team')} ${i+1}: ${s.teamPoints?.[i] ?? 0}`).join(' · ') : activePlayers(room).map(p=>`${playerAvatar(p, 'xs')} ${escapeHtml(p.name)}: ${s.points?.[p.index] ?? 0}`).join(' · ')}</div><div class="question-card"><small>${t('question')} ${s.qIndex + 1}/${s.questions.length}</small>${diff}<h2>${qText}</h2>${src}</div><div class="answer-grid">${answers.map((a,i) => `<button class="answer-btn ${s.showAnswer ? (i === s.showAnswer.correct ? 'correct' : (s.answers?.[String(idx)] === i ? 'wrong' : '')) : ''}" data-answer="${i}" ${!canAct(false) || answered || s.showAnswer ? 'disabled' : ''}>${String.fromCharCode(65+i)}. ${a}</button>`).join('')}</div>${answered && !s.showAnswer ? `<p class="hint-line">${t('answered')}</p>` : ''}</div>`;
  board.querySelectorAll('[data-answer]').forEach(btn => btn.onclick = () => sendAction({ answer:Number(btn.dataset.answer) }));
}

function renderMathRace(board, room) {
  const s = room.state; const idx = myIndex(); const answered = s.answers?.[String(idx)] !== undefined;
  board.innerHTML = `<div class="math-wrap"><div class="quiz-score">${activePlayers(room).map(p=>`${playerAvatar(p, 'xs')} ${escapeHtml(p.name)}: ${s.points?.[p.index] ?? 0}`).join(' · ')}</div><div class="total-card"><small>${s.round}/${s.maxRounds}</small><div class="total-number">${s.problem.text}</div>${s.showAnswer ? `<p>${t('correct')}: ${s.showAnswer.correct}</p>` : `<input id="mathInput" class="input code-input" inputmode="numeric" placeholder="?" ${!canAct(false) || answered ? 'disabled' : ''}/><button id="mathBtn" class="btn primary full" ${!canAct(false) || answered ? 'disabled' : ''}>${t('send')}</button>`}</div></div>`;
  $('mathBtn') && ($('mathBtn').onclick = () => sendAction({ answer: Number($('mathInput').value) }));
}


function renderGuessTime(board, room) {
  const s = room.state || {};
  const idx = myIndex();
  const isActive = idx >= 0 && idx === s.activeIndex && state.role !== 'spectator';
  const players = activePlayers(room).filter(p => !p.isBot);
  const active = room.players?.[s.activeIndex] ? { ...room.players[s.activeIndex], index: s.activeIndex } : players[0];
  const target = Number(s.targetMs || 60000);
  const running = s.phase === 'running' && s.startAt;
  const elapsed = running ? Math.max(0, Date.now() - Number(s.startAt)) : Number(s.elapsedMs || s.lastResult?.stoppedMs || 0);
  const visibleTimer = running && !isActive;
  const statusKey = s.phase === 'running' ? 'timerGoes' : s.phase === 'stopped' || s.phase === 'finished' ? 'playerStopped' : 'waitingStart';
  const last = s.lastResult;
  const attempts = Array.isArray(s.attempts) ? [...s.attempts].sort((a,b) => (a.diffMs || 0) - (b.diffMs || 0)) : [];
  const canConfigure = isActive && ['setup','ready'].includes(s.phase) && attempts.length === 0;
  const canStart = isActive && ['setup','ready'].includes(s.phase) && !attempts.some(a => a.playerIndex === idx);
  const canStop = isActive && s.phase === 'running';
  const resultCard = last ? `<div class="guess-result-card">
      <div><small>${t('targetTime')}</small><b>${formatGameTime(last.targetMs)}</b></div>
      <div><small>${t('stoppedTime')}</small><b>${formatGameTime(last.stoppedMs)}</b></div>
      <div><small>${t('difference')}</small><b>${Math.round(last.diffMs)} ms</b></div>
      <strong>${guessTimeRating(last.diffMs)}</strong>
    </div>` : '';
  const rows = attempts.map((a, i) => {
    const p = room.players?.[a.playerIndex] ? { ...room.players[a.playerIndex], index:a.playerIndex } : { name:`Player ${a.playerIndex + 1}`, index:a.playerIndex };
    return `<tr><td>${i + 1}</td><td>${playerAvatar(p, 'sm')}</td><td>${escapeHtml(p.name)}</td><td>${formatGameTime(a.targetMs)}</td><td>${formatGameTime(a.stoppedMs)}</td><td>${Math.round(a.diffMs)} ms</td></tr>`;
  }).join('');
  board.innerHTML = `<div class="guess-time-wrap">
    <div class="guess-time-card">
      <div class="guess-time-title"><span class="game-icon">⏱️</span><div><h2>${t('guessTime')}</h2><p>${t('stopTimerAt')} <b>${formatGameTime(target)}</b></p></div></div>
      <div class="guess-active-player"><small>${t('currentPlayer')}</small>${active ? playerLabel(active, 'lg') : '—'}</div>
      ${canConfigure ? `<div class="guess-mode-row"><span>${t('timeMode')}</span><button class="chip-btn ${s.timeMode !== 'random' ? 'active' : ''}" data-guess-mode="minute">${t('oneMinute')}</button><button class="chip-btn ${s.timeMode === 'random' ? 'active' : ''}" data-guess-mode="random">${t('randomTime')}</button></div>` : ''}
      <div class="timer-display ${isActive && running ? 'hidden-timer' : ''}">${visibleTimer ? formatGameTime(elapsed) : running ? t('timerRunningBlind') : formatGameTime(Number(s.elapsedMs || 0))}</div>
      ${isActive && running ? `<p class="hint-line">${t('yourTimerHidden')}</p>` : `<p class="hint-line">${t(statusKey)}</p>`}
      <div class="guess-actions">
        ${canStart ? `<button class="guess-main-btn start" data-guess-start>${t('start')}</button>` : ''}
        ${canStop ? `<button class="guess-main-btn stop" data-guess-stop>${t('stop')}</button>` : ''}
      </div>
      ${resultCard}
    </div>
    <div class="guess-results glass">
      <h3>${t('results')}</h3>
      <table><thead><tr><th>${t('place')}</th><th></th><th>${t('players')}</th><th>${t('targetTime')}</th><th>${t('stoppedTime')}</th><th>${t('difference')}</th></tr></thead><tbody>${rows || `<tr><td colspan="6">${t('waitingStart')}</td></tr>`}</tbody></table>
    </div>
  </div>`;
  board.querySelectorAll('[data-guess-mode]').forEach(btn => btn.onclick = () => sendAction({ type:'setMode', mode:btn.dataset.guessMode }));
  board.querySelector('[data-guess-start]')?.addEventListener('click', () => sendAction({ type:'start' }));
  board.querySelector('[data-guess-stop]')?.addEventListener('click', () => sendAction({ type:'stop' }));
  if (running && state.room?.game === 'guesstime') setTimeout(() => state.room?.game === 'guesstime' && renderGuessTime($('gameBoard'), state.room), 37);
}


function renderWhoAmI(board, room) {
  const s = room.state || {};
  const idx = myIndex();
  const players = activePlayers(room);
  const isHost = idx >= 0 && idx === s.hostIndex;
  const lang = ['ru','es','en'].includes(state.lang) ? state.lang : 'ru';
  const qText = s.question ? (s.question[lang] || s.question.ru || s.question.es || s.question.en || '') : '';
  const eventText = s.phase === 'spinning' ? t('whoamiSpinning') : s.phase === 'awaitingHost' ? t('whoamiWaitingHost') : s.phase === 'question' ? `${t('whoamiQuestion')} ${s.question?.id ? `№${s.question.id}` : ''}` : ''; 
  const qId = s.question?.id ? `№${s.question.id}` : '№?';
  const holder = room.players?.[s.currentHolder]?.name || 'Player';
  const original = room.players?.[s.originalPlayer]?.name || 'Player';
  const answerPoints = 2 + (s.transferDepth || 0);
  const passCost = 1 + (s.transferDepth || 0);
  const canStart = idx >= 0 && s.phase === 'ready' && s.currentPlayer === idx;
  const canAnswer = idx >= 0 && s.phase === 'question' && s.currentHolder === idx;
  const scoreCards = players.map(p => `<div class="whoami-score" style="--pc:${p.color || '#8b5cf6'}"><b>${playerAvatar(p, 'md')} ${escapeHtml(p.name)}${p.index === s.hostIndex ? ' 👑' : ''}</b><strong>${s.scores?.[p.index] ?? 0}</strong></div>`).join('');
  const hostControls = isHost ? `<div class="whoami-host-controls"><button class="chip-btn danger-soft" data-finish-whoami>${t('whoamiFinish')}</button>${players.filter(p => p.index !== idx).map(p => `<button class="chip-btn" data-host-target="${p.index}">👑 ${p.name}</button>`).join('')}</div>` : '';

  let body = '';
  if (s.phase === 'spinning') {
    const left = Math.max(0, (s.spinEndsAt || Date.now()) - Date.now());
    body = `<div class="whoami-stage spinning-stage"><button class="whoami-go spinning" disabled>${t('whoamiGo')}</button><h2>${t('whoamiSpinning')}</h2><p>${Math.ceil(left/1000)}s</p></div>`;
    setTimeout(() => state.room && state.room.game === 'whoami' && renderWhoAmI($('gameBoard'), state.room), 250);
  } else if (s.phase === 'question' || s.phase === 'awaitingHost') {
    const passButtons = players.filter(p => p.index !== idx).map(p => `<button class="chip-btn pass-target" data-pass-target="${p.index}" style="--pc:${p.color || '#8b5cf6'}">${p.name}</button>`).join('');
    body = `<div class="whoami-stage question-stage">
      <button class="whoami-go small" disabled>${qId}</button>
      <div class="whoami-question-card">
        <small>${t('whoamiQuestion')} ${qId} · ${t('whoamiCurrent')}: ${holder} · ${t('whoamiHost')}: ${room.players?.[s.hostIndex]?.name || 'Host'}</small>
        <h2>${qText}</h2>
        <p>${t('whoamiPassHint')} ${original !== holder ? `${original} ${t('originalGetsNew')}` : ''}</p>
      </div>
      ${s.phase === 'awaitingHost' ? `<div class="whoami-await"><b>${t('whoamiWaitingHost')}</b><span>${room.players?.[s.pending?.player]?.name || holder}: +${s.pending?.points || answerPoints}</span></div>` : ''}
      ${canAnswer ? `<div class="whoami-actions"><button class="btn primary" data-whoami-answer>${t('whoamiAnswer')} +${answerPoints}</button><div class="pass-box"><b>${t('whoamiChoosePlayer')} (-${passCost})</b><div>${passButtons}</div></div></div>` : ''}
      ${isHost && s.phase === 'awaitingHost' ? `<div class="whoami-host-decision"><button class="btn primary" data-host-confirm="1">✅ ${t('whoamiConfirm')}</button><button class="btn ghost" data-host-confirm="0">↩ ${t('whoamiReject')}</button></div>` : ''}
    </div>`;
  } else {
    body = `<div class="whoami-stage ready-stage"><button class="whoami-go ${canStart ? '' : 'locked'}" data-whoami-go ${!canStart ? 'disabled' : ''}>${t('whoamiGo')}</button><h2>${t('whoamiCurrent')}: ${room.players?.[s.currentPlayer]?.name || 'Player'}</h2><p>${t('whoamiPassHint')}</p></div>`;
  }

  board.innerHTML = `<div class="whoami-wrap"><div class="whoami-score-grid">${scoreCards}</div>${hostControls}<div class="whoami-event">${eventText}</div>${body}</div>`;
  board.querySelector('[data-whoami-go]')?.addEventListener('click', () => sendAction({ type:'startSpin' }));
  board.querySelector('[data-whoami-answer]')?.addEventListener('click', () => sendAction({ type:'answer' }));
  board.querySelectorAll('[data-pass-target]').forEach(btn => btn.onclick = () => sendAction({ type:'pass', targetIndex:Number(btn.dataset.passTarget) }));
  board.querySelectorAll('[data-host-confirm]').forEach(btn => btn.onclick = () => sendAction({ type:'hostConfirm', accept: btn.dataset.hostConfirm === '1' }));
  board.querySelectorAll('[data-host-target]').forEach(btn => btn.onclick = () => sendAction({ type:'assignHost', targetIndex:Number(btn.dataset.hostTarget) }));
  board.querySelector('[data-finish-whoami]')?.addEventListener('click', () => sendAction({ type:'finishGame' }));
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

async function updateAppNow() {
  toast(t('updateChecking'));
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith('smq-games')).map(key => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(reg => reg.update().catch(() => {})));
    }
    toast(t('updateReady'));
    setTimeout(() => location.reload(), 450);
  } catch (error) {
    console.warn(error);
    location.reload();
  }
}

function setupMusic() {
  localStorage.removeItem('smq_custom_music');
  localStorage.removeItem('smq_music_on');
  const audio = $('playlistAudio');
  const volume = Number(localStorage.getItem('smq_volume') || '0.35');
  if ($('volumeSlider')) $('volumeSlider').value = volume;
  if (audio) {
    audio.volume = volume;
    audio.addEventListener('timeupdate', updatePlaylistTimeline);
    audio.addEventListener('loadedmetadata', updatePlaylistTimeline);
    audio.addEventListener('durationchange', updatePlaylistTimeline);
    audio.addEventListener('seeking', updatePlaylistTimeline);
  }
}
function toggleMusic() { playlistPlayPause(); }

async function saveProfile() {
  const avatarData = $('profileAvatar').dataset.newAvatar || undefined;
  const settings = { lang:$('profileLang').value, theme:$('themeSelect').value, fontSize:$('fontSizeSelect').value, color:$('profileColor').value, difficulty: $('difficultySelect')?.value || state.difficulty, musicVolume:Number($('volumeSlider').value) };
  const name = $('profileName').value.trim() || 'Player';
  if (fbAuth?.currentUser && fbDb) {
    const update = { name, settings, updatedAt:new Date().toISOString() }; if (avatarData) update.avatarData = avatarData;
    await fbDb.collection('users').doc(fbAuth.currentUser.uid).set(update, { merge:true }); state.user = await loadFirebaseProfile(fbAuth.currentUser);
  } else {
    const guest = localGuestUser(); localStorage.setItem('smq_guest_profile', JSON.stringify({ name, settings, avatarData: avatarData || guest.avatarUrl || null })); state.user = localGuestUser();
  }
  state.lang = settings.lang; state.theme = settings.theme; state.fontSize = settings.fontSize; state.color = settings.color; state.difficulty = settings.difficulty;
  localStorage.setItem('smq_lang', state.lang); localStorage.setItem('smq_theme', state.theme); localStorage.setItem('smq_fontSize', state.fontSize); localStorage.setItem('smq_color', state.color); localStorage.setItem('smq_difficulty', state.difficulty);
  delete $('profileAvatar').dataset.newAvatar; updateProfileUI(); applyThemeAndFont(); applyI18n(); toast(t('profileSaved'));
}

function bindEvents() {
  $('googleLoginBtn').onclick = signInWithGoogleFirebase;
  $('installAppBtn') && ($('installAppBtn').onclick = installApp);
  $('installHeaderBtn') && ($('installHeaderBtn').onclick = installApp);
  $('updateAppBtn') && ($('updateAppBtn').onclick = updateAppNow);
  $('updateProfileBtn') && ($('updateProfileBtn').onclick = updateAppNow);
  $('guestLoginBtn').onclick = async () => { localStorage.setItem('smq_entered','1'); state.entered = true; state.user = localGuestUser(); updateProfileUI(); showScreen('homeScreen'); await loadHistory(); const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); };
  $('openProfileBtn').onclick = () => $('profileDrawer').classList.remove('hidden'); $('closeProfileBtn').onclick = () => $('profileDrawer').classList.add('hidden'); $('closeProfileBackdrop').onclick = () => $('profileDrawer').classList.add('hidden');
  $('quickLang').onchange = () => { state.lang = $('quickLang').value; localStorage.setItem('smq_lang', state.lang); $('profileLang').value = state.lang; applyI18n(); };
  $('profileLang').onchange = () => { state.lang = $('profileLang').value; localStorage.setItem('smq_lang', state.lang); applyI18n(); };
  $('profileColor').oninput = () => { state.color = $('profileColor').value; localStorage.setItem('smq_color', state.color); document.documentElement.style.setProperty('--my-color', state.color); };
  $('themeBtn').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('themeSelect').onchange = () => { state.theme = $('themeSelect').value; localStorage.setItem('smq_theme', state.theme); applyThemeAndFont(); };
  $('fontSizeSelect').onchange = () => { state.fontSize = $('fontSizeSelect').value; localStorage.setItem('smq_fontSize', state.fontSize); applyThemeAndFont(); };
  $('difficultySelect') && ($('difficultySelect').onchange = () => { state.difficulty = $('difficultySelect').value; localStorage.setItem('smq_difficulty', state.difficulty); });
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
  if ($('toggleMusicBtn')) $('toggleMusicBtn').onclick = toggleMusic;
  $('volumeSlider') && ($('volumeSlider').oninput = () => { const v = Number($('volumeSlider').value); const audio = $('playlistAudio'); if (audio) audio.volume = v; localStorage.setItem('smq_volume', String(v)); });
  $('playlistSeek') && ($('playlistSeek').oninput = () => { const audio = $('playlistAudio'); if (!audio || !Number.isFinite(audio.duration)) return; audio.currentTime = audio.duration * (Number($('playlistSeek').value) / 100); updatePlaylistTimeline(); });
  $('addSongBtn') && ($('addSongBtn').onclick = addPlaylistSong);
  $('playlistPlayBtn') && ($('playlistPlayBtn').onclick = playlistPlayPause);
  $('playlistNextBtn') && ($('playlistNextBtn').onclick = playlistNext);
  $('playlistPrevBtn') && ($('playlistPrevBtn').onclick = playlistPrev);
  $('playlistAudio') && ($('playlistAudio').onended = playlistNext);
  $('playlistAudio') && ($('playlistAudio').onplay = () => { renderPlaylist(); updatePlaylistTimeline(); });
  $('playlistAudio') && ($('playlistAudio').onpause = () => { renderPlaylist(); updatePlaylistTimeline(); });
  $('playlistAudio') && ($('playlistAudio').onloadedmetadata = updatePlaylistTimeline);
  $('playlistAudio') && ($('playlistAudio').ontimeupdate = updatePlaylistTimeline);
  window.addEventListener('popstate', () => { const roomId = getRoomFromPath(); if (roomId) joinRoom(roomId, new URLSearchParams(location.search).get('spectate') === '1'); else showScreen('homeScreen'); });
}

async function init() {
  applyThemeAndFont(); setupPWA(); bindEvents(); renderGameCards(); setupMusic(); $('teamCountSelect').value = String(state.selectedTeams); await loadUser();
}

init();
