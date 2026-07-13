# SMQ Games v23

Добавлен телефонный клиент для запуска игры без интернета через Wi‑Fi / точку доступа.

Главное:
- Android-телефон ведущего может работать как локальный сервер;
- друзья подключаются к точке доступа ведущего;
- сайт открывается по локальному адресу `http://IP-ТЕЛЕФОНА:3000`;
- комнаты Socket.IO работают без Render и без интернета;
- добавлен быстрый запуск для Termux:Widget;
- добавлен скрипт `scripts/install-phone-client.sh`;
- добавлен скрипт `scripts/start-phone-client.sh`;
- инструкция находится в `PHONE_CLIENT.md` и `OFFLINE_WIFI.md`.

## Быстрый запуск

Первичная подготовка, пока есть интернет:

```bash
cd ~/online-games-site
bash scripts/install-phone-client.sh
```

Запуск без интернета:

```bash
cd ~/online-games-site
bash scripts/start-phone-client.sh
```

После запуска друзья открывают адрес, который покажет Termux.

# SMQ Games v22

Добавлен режим локального сервера по Wi‑Fi / точке доступа для игры без интернета.

# SMQ Games v21

Rebuilt checkers tap controls again using chess-style div cells, event delegation, pointerup support and always-visible move buttons.


## v24
- Исправлен установщик телефонного Wi‑Fi клиента: `qrencode` и `termux-api` теперь необязательны.
- Исправлен запуск `start-phone-client.sh` в Termux.
- Если QR недоступен, адрес для друзей показывается текстом.


## v25
- Добавлена игра Домино (RU/ES/EN).
- Тексты новой игры и подписи ходов отображаются на выбранном языке профиля.
- Имена компьютерного соперника в интерфейсе локализуются по выбранному языку.
