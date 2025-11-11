# 🧪 Guide de Test - University Management Platform

## 📡 Architecture des Services

### Backend (2 services NestJS)

#### 1️⃣ **AUTH-SERVICE** (Port 3001)
- **URL**: `http://localhost:3001`
- **Rôle**: Authentification et gestion des utilisateurs
- **Endpoints principaux**:
  - `POST /api/auth/login` - Connexion
  - `POST /api/auth/change-password` - Changement de mot de passe
  - `POST /api/auth/forgot-password` - Mot de passe oublié
  - `POST /api/auth/reset-password` - Réinitialisation
  - `GET /api/auth/me` - Informations utilisateur connecté

#### 2️⃣ **ADMIN-SERVICE** (Port 3000)
- **URL**: `http://localhost:3000`
- **Rôle**: Gestion administrative (départements, classes, étudiants, enseignants)
- **Swagger UI**: `http://localhost:3000/api`
- **Endpoints principaux**:
  - `/api/departement/*` - Gestion des départements
  - `/api/classe/*` - Gestion des classes
  - `/api/etudiant/*` - Gestion des étudiants
  - `/api/enseignant/*` - Gestion des enseignants
  - `/api/niveau/*` - Gestion des niveaux
  - `/api/specialite/*` - Gestion des spécialités

### Frontend (React)
- **URL**: `http://localhost:3000` (par défaut React)
- **Connexion actuelle**: `http://localhost:3001/api` (AUTH-SERVICE uniquement)

---

## 🚀 Comment Démarrer Tous les Services

### Option 1: Démarrer tout ensemble
```powershell
# Backend (les 2 services en même temps)
cd C:\Users\zeine\Desktop\university-temp\backend
npm run start:dev

# Frontend (dans un autre terminal)
cd C:\Users\zeine\Desktop\university-temp\frontend\front
npm start
```

### Option 2: Démarrer service par service
```powershell
# Terminal 1 - Auth Service
cd C:\Users\zeine\Desktop\university-temp\backend\auth-service
npm run start:dev

# Terminal 2 - Admin Service
cd C:\Users\zeine\Desktop\university-temp\backend\admin-service
npm run start:dev

# Terminal 3 - Frontend
cd C:\Users\zeine\Desktop\university-temp\frontend\front
npm start
```

---

## 🧪 Comment Tester les Services

### 1. Tester AUTH-SERVICE (Port 3001)

#### Test avec le navigateur:
```
http://localhost:3001/api/auth/me
```

#### Test avec PowerShell (exemple de login):
```powershell
$body = @{
    email = "directeur@university.com"
    password = "votre_mot_de_passe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

### 2. Tester ADMIN-SERVICE (Port 3000)

#### Via Swagger UI (Interface graphique):
```
http://localhost:3000/api
```
👉 **C'est la nouvelle interface que vous cherchez !**

#### Via le navigateur (exemple: liste des départements):
```
http://localhost:3000/api/departement
```

#### Via PowerShell:
```powershell
# Liste des départements
Invoke-RestMethod -Uri "http://localhost:3000/api/departement" -Method Get

# Liste des classes
Invoke-RestMethod -Uri "http://localhost:3000/api/classe" -Method Get
```

---

## 🔗 Comment Faire la Liaison Frontend ↔️ Backend

### Problème actuel:
Votre frontend se connecte **seulement** à l'AUTH-SERVICE (port 3001), mais pas à l'ADMIN-SERVICE (port 3000).

### Solution 1: Utiliser un API Gateway (Recommandé)
Créer un point d'entrée unique qui redirige vers les bons services.

### Solution 2: Configurer le Frontend pour utiliser les 2 services
Modifier le frontend pour qu'il utilise:
- `http://localhost:3001/api` pour l'authentification
- `http://localhost:3000/api` pour les données administratives

### Solution 3: Utiliser le même port avec des préfixes différents
- AUTH-SERVICE: `/api/auth/*`
- ADMIN-SERVICE: `/api/admin/*`

---

## 📝 Checklist de Test

- [ ] **Backend AUTH-SERVICE démarre** (Port 3001)
- [ ] **Backend ADMIN-SERVICE démarre** (Port 3000)
- [ ] **Frontend démarre** (Port 3000 par défaut React - conflit!)
- [ ] **Swagger accessible** sur `http://localhost:3000/api`
- [ ] **Login fonctionne** via frontend
- [ ] **Départements visibles** dans l'interface
- [ ] **Classes visibles** dans l'interface

---

## ⚠️ Conflits de Ports à Résoudre

**PROBLÈME**: React (frontend) et ADMIN-SERVICE utilisent tous les deux le port 3000 !

### Solutions:
1. **Changer le port du frontend**:
   ```powershell
   # Dans frontend/front
   $env:PORT=3002; npm start
   ```

2. **Changer le port du admin-service** (modifier `src/main.ts`):
   ```typescript
   await app.listen(3003); // Au lieu de 3000
   ```

---

## 🎯 Prochaines Étapes

1. ✅ Installer les dépendances des deux services backend
2. ✅ Démarrer les deux services backend
3. ⏳ Résoudre le conflit de ports
4. ⏳ Connecter le frontend aux deux services
5. ⏳ Tester l'interface Swagger
6. ⏳ Tester le flux complet: Login → Dashboard → Gestion

---

## 💡 Commandes Utiles

```powershell
# Vérifier quel processus utilise un port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Tuer un processus par PID
taskkill /PID <numéro_PID> /F

# Voir les logs en temps réel
# Les logs s'affichent automatiquement dans le terminal où vous avez lancé npm run start:dev
```
