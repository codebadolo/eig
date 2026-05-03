# Déploiement cPanel — Excellis Invest Group

## Architecture sur cPanel

```
public_html/              → Site vitrine (React build)
public_html/admin/        → Interface admin (React build)
public_html/api/          → Proxy Apache → Node.js App
~/node_apps/eig-backend/  → Application Node.js (via Node.js Selector)
```

---

## 1. Base de données MySQL

1. cPanel → **MySQL Databases** → Créer une base : `eig_db`
2. Créer un utilisateur MySQL avec tous les privilèges sur cette base
3. Noter : `user`, `password`, `host` (généralement `localhost`)

---

## 2. Déployer le Backend Node.js

### Via cPanel Node.js Selector

1. cPanel → **Node.js** (ou "Setup Node.js App")
2. Créer une nouvelle application :
   - **Node.js version** : 18.x ou 20.x
   - **Application mode** : Production
   - **Application root** : `node_apps/eig-backend`
   - **Application URL** : `votredomaine.com/api`
   - **Application startup file** : `src/index.js`

3. Uploader les fichiers du dossier `backend/` dans `node_apps/eig-backend/`
4. Via SSH ou le terminal cPanel :
   ```bash
   cd ~/node_apps/eig-backend
   cp .env.example .env
   nano .env   # remplir DATABASE_URL, JWT_SECRET
   npm install
   npx prisma db push
   node src/seed.js
   ```

### Fichier `.env` à remplir :
```
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/eig_db"
JWT_SECRET="une_clé_très_longue_et_aléatoire_ici"
PORT=3001
FRONTEND_URL="https://votredomaine.com"
ADMIN_URL="https://votredomaine.com/admin"
```

---

## 3. Déployer le Site Vitrine

```bash
# En local
cd /chemin/vers/projet
cp .env.example .env
# Mettre VITE_API_URL=https://votredomaine.com/api
npm install
npm run build
```

Uploader le contenu du dossier `dist/` dans `public_html/`

---

## 4. Déployer l'Interface Admin

```bash
# En local
cd admin/
cp .env.example .env
# Mettre VITE_API_URL=https://votredomaine.com/api
npm install
npm run build
```

Uploader le contenu du dossier `admin/dist/` dans `public_html/admin/`

---

## 5. Configuration Apache (.htaccess)

Créer `public_html/api/.htaccess` :
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3001/api/$1 [P,L]
```

Vérifier que `public_html/.htaccess` contient (pour React Router) :
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 6. Premiers accès

- **Site** : https://votredomaine.com
- **Admin** : https://votredomaine.com/admin
- **Login admin** : `admin@excellis-invest-group.com` / `Admin@EIG2026!`

> **IMPORTANT** : Changer le mot de passe admin immédiatement après la première connexion.

---

## Commandes utiles (SSH cPanel)

```bash
# Voir les logs Node.js
tail -f ~/node_apps/eig-backend/logs/error.log

# Redémarrer l'app Node.js
cd ~/node_apps/eig-backend && npm start

# Remettre à jour la base
cd ~/node_apps/eig-backend && node src/seed.js
```
