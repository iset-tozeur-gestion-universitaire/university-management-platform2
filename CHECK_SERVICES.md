# 🔍 Guide de Vérification des Services

## ✅ Services Actifs

### 1. Frontend (React)
- **URL**: http://localhost:3003
- **Status**: ✅ Actif
- **Page de test**: http://localhost:3003/forgot-password

### 2. Backend Auth Service (NestJS)
- **URL**: http://localhost:3001
- **Status**: ✅ Actif
- **Endpoint de test**: http://localhost:3001/api/auth/forgot-password

### 3. Backend Admin Service (NestJS)
- **URL**: http://localhost:3000
- **Status**: ⚠️ Redémarrer si nécessaire

## 📧 Accès aux Emails Ethereal

### Identifiants de connexion:
- **Email**: `esbtjkkxwbeqkfw6@ethereal.email`
- **Mot de passe**: `RP8GYWQGRyxMc1VcaJ`
- **URL de connexion**: https://ethereal.email/login

### Comment voir vos emails:
1. Allez sur https://ethereal.email/login
2. Connectez-vous avec l'email et le mot de passe ci-dessus
3. Vous verrez tous les emails envoyés par l'application

## 🧪 Test du Flux Password Reset

### Étape 1: Demander un reset
1. Allez sur http://localhost:3003/forgot-password
2. Entrez l'email: `khaledzeineb81@gmail.com`
3. Cliquez sur "Envoyer"

### Étape 2: Vérifier l'email
1. Connectez-vous sur https://ethereal.email/login
2. Vous devriez voir un nouvel email
3. Cliquez sur l'email pour voir son contenu

### Étape 3: Cliquer sur le lien
1. Dans l'email, cliquez sur le bouton "Réinitialiser mon mot de passe"
2. Vous serez redirigé vers: `http://localhost:3003/reset-password?email=...&token=...`
3. Entrez votre nouveau mot de passe
4. Confirmez

### Étape 4: Se connecter
1. Vous serez redirigé automatiquement vers `/login`
2. Connectez-vous avec votre nouvel mot de passe

## 🐛 Vérifier les Logs Backend

Pour voir les logs en temps réel:

```powershell
# Dans un terminal PowerShell
cd c:\Users\zeine\Desktop\university-temp\backend
npm run start:dev
```

Recherchez ces messages:
- ✅ `[ForgotPassword] Started for email: ...`
- ✅ `[ForgotPassword] User found: ...`
- ✅ `[ForgotPassword] Token saved to database`
- ✅ `[ForgotPassword] Reset URL: http://localhost:3003/reset-password?...`
- ✅ `[ForgotPassword] Email sent successfully!`

## 🔧 Résolution de Problèmes

### Si aucun email n'est reçu:
1. Vérifiez les logs backend pour voir si l'email a été envoyé
2. Vérifiez que l'utilisateur existe dans la base de données
3. Vérifiez la connexion Ethereal

### Si le lien ne fonctionne pas:
1. Vérifiez que l'URL commence par `http://localhost:3003`
2. Vérifiez que le token est présent dans l'URL
3. Vérifiez que le token n'a pas expiré (1 heure de validité)

### Si le mot de passe ne se réinitialise pas:
1. Vérifiez que les deux mots de passe correspondent
2. Vérifiez que le mot de passe respecte les critères (min 8 caractères)
3. Vérifiez les logs backend

## 📊 Commandes Utiles

### Redémarrer tous les services:
```powershell
# Tuer tous les processus Node
taskkill /F /IM node.exe /T

# Redémarrer le backend
cd c:\Users\zeine\Desktop\university-temp\backend
npm run start:dev

# Redémarrer le frontend (dans un autre terminal)
cd c:\Users\zeine\Desktop\university-temp\frontend\front
npm start
```

### Vérifier les ports utilisés:
```powershell
netstat -ano | findstr :3000
netstat -ano | findstr :3001
netstat -ano | findstr :3003
```

### Tuer un processus spécifique:
```powershell
taskkill /F /PID <PID>
```

## 🎯 URL Frontend Correcte

La configuration a été mise à jour pour utiliser:
- **Frontend URL**: `http://localhost:3003` (✅ Correct)
- **Ancienne URL**: `http://localhost:3000` (❌ Incorrect)

Tous les liens de reset password pointent maintenant vers le port 3003.
