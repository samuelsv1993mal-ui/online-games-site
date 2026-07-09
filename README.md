# SMQ Games v7

Мобильная онлайн-арена игр для Render + Socket.IO + Firebase.

## Что добавлено в v7

- Новый SVG-логотип SMQ Games в блоке входа.
- Firebase Auth теперь использует локальную persistence: после входа через Google пользователь остаётся авторизованным, пока сам не нажмёт «Выйти».
- Улучшена читаемость в тёмной и светлой темах: кнопки, поля, карточки, ответы викторин и игровые панели получили дополнительные контрасты.
- Добавлена новая игра: **«Что? Где? Когда? — Библия»**.
- Добавлена база оригинальных библейских вопросов разной сложности: лёгкие, средние и сложные.
- У вопросов есть короткие источники для проверки: jw.org / wol.jw.org + библейская книга или справочная тема.

## Важно по вопросной базе

Вопросы составлены оригинально по библейским сюжетам и справочным темам. Тексты публикаций jw.org и wol.jw.org не копируются в базу; используются только краткие ссылки-ориентиры для самостоятельной проверки ответа.

## Firebase

Firebase используется для:

- Google-входа;
- фото профиля;
- цвета игрока;
- языка, темы и размера шрифта;
- истории игр и статистики.

Файл Firebase-конфига:

```text
public/firebase-config.js
```

## Render

Настройки Render:

```text
Build Command:
npm install

Start Command:
node server.js
```

## Обновление с телефона через Termux

```bash
cd ~
cp /storage/emulated/0/Download/online-games-site-v7.zip ~/
rm -rf ~/online-games-site-v7
unzip -o online-games-site-v7.zip
cp -r ~/online-games-site-v7/* ~/online-games-site/
cd ~/online-games-site
git add .
git commit -m "Add logo auth persistence theme polish and Bible quiz"
git push
```

После `git push` Render автоматически запустит новый деплой.
