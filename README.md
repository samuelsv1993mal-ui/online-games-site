# SMQ Games — Render + Firebase

Мобильный сайт с онлайн-играми, комнатами, режимом наблюдателя, игрой с ботом, профилем, музыкой, темами, языками и историей игр.

## Что хранит Firebase

Firebase используется для:

- входа через Google;
- имени, email и фото профиля Google;
- настроек профиля: язык, тема, размер шрифта;
- истории игр;
- статистики побед, поражений и ничьих.

Render продолжает использоваться для игрового сервера и Socket.IO-комнат.

## Firebase config

Файл уже создан:

```text
public/firebase-config.js
```

В нём указан web config проекта `smqgames26`.

## Обязательные шаги в Firebase Console

1. Authentication → Sign-in method → Google → Enable → Save.
2. Authentication → Settings → Authorized domains → Add domain:

```text
online-games-site.onrender.com
```

3. Firestore Database → Create database.
4. Firestore Rules → вставить правила ниже и нажать Publish.

## Firestore Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /history/{historyId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Обновление сайта через Termux

```bash
cd ~
cp /storage/emulated/0/Download/online-games-site-firebase-auth.zip ~/
rm -rf ~/online-games-site-v5
unzip -o online-games-site-firebase-auth.zip
cp -r ~/online-games-site-v5/* ~/online-games-site/
cd ~/online-games-site
git add .
git commit -m "Connect Firebase Google auth and Firestore history"
git push
```

Render после `git push` должен автоматически сделать новый deploy.

## Render

Настройки Render остаются такими же:

```text
Build Command: npm install
Start Command: node server.js
```

Для Firebase-входа переменные `GOOGLE_CLIENT_ID` и `GOOGLE_CLIENT_SECRET` больше не нужны.
