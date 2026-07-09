# SMQ Games v11

Версия с мультиязычными играми и расширенной библейской базой вопросов.

## Что добавлено в v10

- Все основные игровые вопросы поддерживают 3 языка: русский, испанский и английский.
- В игру «Кто я?» добавлены английские варианты всех 158 вопросов.
- Для «Что? Где? Когда? — Библия» и «Кто хочет стать миллионером» добавлена большая библейская база из 114 вопросов разной сложности.
- Вопросы и ответы отображаются на языке профиля пользователя.
- Ответы в викторинах перемешиваются автоматически, поэтому правильный ответ не всегда находится под одной буквой.
- Логотип стал проще и чище.
- Добавлена кнопка «Обновить приложение» внутри профиля и кнопка обновления в верхней панели.
- Обновлён PWA cache до `smq-games-v10`.

## Запуск

```bash
npm install
npm start
```

## Деплой на Render

Build Command:

```bash
npm install
```

Start Command:

```bash
node server.js
```

После `git push` Render должен сам начать новый деплой.


## v11 changes
- Added user playlist in Profile with up to 10 songs, local per-user persistence, delete/select/play-pause/next/previous controls.
- Fixed quiz answer text to remain white/readable in all answer states.
- Improved checkers board: last move/status below board, green legal targets, red unavailable targets, drag/drop + tap movement, flying kings, backward captures.
- Service worker cache updated to v11.
