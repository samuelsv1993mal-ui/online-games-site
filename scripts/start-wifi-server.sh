#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")/.."
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
echo "SMQ Games local Wi-Fi server"
echo "1) Turn on phone hotspot."
echo "2) Let friends connect to your Wi-Fi."
echo "3) Open one of these addresses on friends' devices:"
(ip -4 addr show 2>/dev/null || true) | awk '/inet / {print $2}' | cut -d/ -f1 | grep -v '^127\.' | while read ip; do
  echo "   http://$ip:$PORT"
done
echo "On this phone you can open: http://127.0.0.1:$PORT"
echo "Starting server..."
HOST="$HOST" PORT="$PORT" node server.js
