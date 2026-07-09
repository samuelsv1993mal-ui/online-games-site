#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")/.."
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"

clear 2>/dev/null || true
printf '\n🎮 SMQ Games — телефон-сервер Wi‑Fi\n'
printf '====================================\n\n'
printf '1) Включи точку доступа на этом телефоне.\n'
printf '2) Подключи телефоны друзей к этой Wi‑Fi сети.\n'
printf '3) Друзья открывают один из адресов ниже.\n\n'

termux-wake-lock 2>/dev/null || true

ips="$((ip -4 addr show 2>/dev/null || true) | awk '/inet / {print $2}' | cut -d/ -f1 | grep -Ev '^(127|169\.254)\.' || true)"
if [ -z "$ips" ]; then
  printf '⚠️  Локальный IP не найден. Включи точку доступа и перезапусти скрипт.\n\n'
else
  printf 'Адреса для друзей:\n'
  for ip in $ips; do
    printf '   http://%s:%s\n' "$ip" "$PORT"
  done
  first_ip="$(printf '%s\n' "$ips" | head -n 1)"
  if command -v qrencode >/dev/null 2>&1; then
    printf '\nQR для друзей:\n'
    qrencode -t ANSIUTF8 "http://$first_ip:$PORT" || true
  fi
fi

printf '\nНа этом телефоне открой:\n   http://127.0.0.1:%s\n\n' "$PORT"
printf 'Сервер запускается. Чтобы остановить: Ctrl + C\n\n'

if command -v termux-open-url >/dev/null 2>&1; then
  (sleep 2; termux-open-url "http://127.0.0.1:$PORT" >/dev/null 2>&1 || true) &
fi

HOST="$HOST" PORT="$PORT" node server.js
