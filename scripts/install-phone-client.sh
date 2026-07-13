#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")/.."

printf '\n📦 Установка клиента SMQ Games для телефона\n'
printf '==========================================\n\n'

pkg update -y

install_required() {
  pkg install "$@" -y
}

install_optional() {
  pkg install "$@" -y || printf '⚠️  Пакет %s не найден. Пропускаю, это не мешает игре.\n' "$*"
}

install_required nodejs git unzip
install_optional termux-api
install_optional qrencode
npm install

mkdir -p "$HOME/.shortcuts"
cat > "$HOME/.shortcuts/SMQ Games WiFi" <<SHORTCUT
#!/data/data/com.termux/files/usr/bin/bash
cd "$(pwd)"
bash scripts/start-phone-client.sh
SHORTCUT
chmod +x "$HOME/.shortcuts/SMQ Games WiFi"

printf '\n✅ Готово.\n\n'
printf 'Запуск без интернета:\n'
printf '  cd %s\n' "$(pwd)"
printf '  bash scripts/start-phone-client.sh\n\n'
printf 'Если qrencode не установился — ничего страшного. QR-кода не будет, но адрес для друзей будет показан текстом.\n\n'
printf 'Для запуска одной кнопкой установи приложение Termux:Widget,\n'
printf 'добавь виджет Termux на главный экран и выбери "SMQ Games WiFi".\n\n'
