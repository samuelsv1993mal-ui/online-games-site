# SMQ Games — Google, profile, history, full-screen arena, music

Это версия сайта для Render с полноценным Node.js + Express + Socket.IO сервером.

## Что добавлено

- Google OAuth вход.
- Фото профиля из Google.
- Настройки профиля: имя, фото, язык, размер шрифта, светлая/тёмная тема.
- Сохранение истории игр на сервере в `data/games-db.json`.
- Игры онлайн, с компьютером и в режиме наблюдателя.
- Большой игровой экран под телефон.
- Большой счёт сверху.
- Имена игроков сверху.
- Большое сообщение о победе по центру экрана.
- Анимация победы и конфетти.
- Фоновая музыка, встроенный оригинальный loop `smq-theme.wav`.
- Возможность добавить свою музыку на устройстве пользователя.
- Языки: русский, español, English.
- Игры: камень-ножницы-бумага, крестики-нолики, кубики, четыре в ряд, мемори, 21, реакция.

## Запуск локально

```bash
npm install
npm start
```

Открыть:

```text
http://localhost:3000
```

## Настройка Google OAuth для Render

В Google Cloud Console нужно создать OAuth Client типа **Web application**.

Authorized redirect URI для Render:

```text
https://online-games-site.onrender.com/auth/google/callback
```

Если у тебя другой адрес Render, замени домен на свой.

В Render открой:

```text
online-games-site → Environment
```

Добавь переменные:

```text
GOOGLE_CLIENT_ID=твой_client_id
GOOGLE_CLIENT_SECRET=твой_client_secret
SESSION_SECRET=любой_длинный_секретный_текст
BASE_URL=https://online-games-site.onrender.com
```

После добавления переменных нажми:

```text
Manual Deploy → Deploy latest commit
```

## Render команды

Build Command:

```bash
npm install
```

Start Command:

```bash
node server.js
```

или:

```bash
npm start
```

## Обновление с телефона через Termux

```bash
cd ~
cp /storage/emulated/0/Download/online-games-site-google-history-music.zip ~/
rm -rf ~/online-games-site-v4
unzip -o online-games-site-google-history-music.zip
cp -r ~/online-games-site-v4/* ~/online-games-site/
cd ~/online-games-site
git add .
git commit -m "Add Google OAuth profile history arena music"
git push
```

Render сам начнёт деплой после `git push`.
