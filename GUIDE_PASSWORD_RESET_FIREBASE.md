# 🔐 Guide Complet - Réinitialisation de Mot de Passe avec Firebase

## 🎯 Principe de Fonctionnement

Le système utilise **Firebase Authentication** pour gérer la réinitialisation de mot de passe, comme dans la branche `feature/email-verification-microservice`.

### Flux Complet

```
1. Utilisateur → Frontend: Demande réinitialisation (email)
2. Frontend → Backend: POST /api/auth/forgot-password
3. Backend → Firebase: Crée utilisateur si nécessaire
4. Backend → Firebase: Génère lien de réinitialisation Firebase
5. Backend → Ethereal: Envoie email avec lien Firebase
6. Utilisateur → Email: Clique sur le lien
7. Firebase → Frontend: Redirige vers /reset-password?mode=resetPassword&oobCode=...
8. Frontend → Firebase: Vérifie le code (oobCode)
9. Utilisateur: Entre nouveau mot de passe
10. Frontend → Firebase: Confirme réinitialisation
11. Frontend: Redirige vers /login
```

## 📁 Fichiers Modifiés

### Backend

#### 1. `backend/auth-service/src/auth/auth.service.ts`

**Imports ajoutés :**
```typescript
import { generateEmailVerificationLink, generatePasswordResetLink, ensureFirebaseUser, updateFirebasePassword } from 'src/firebase/firebase.service';
```

**Méthode `forgotPassword` modifiée :**
```typescript
async forgotPassword(email: string) {
  const user = await this.usersRepo.findOne({ where: { email } });
  if (!user) {
    return { message: 'Si cet email existe, un lien de réinitialisation a été envoyé' };
  }

  // Crée l'utilisateur dans Firebase si nécessaire
  await ensureFirebaseUser(email, user.cin ?? 'TempPass123!');
  
  // Génère un lien Firebase qui redirige vers notre frontend
  const continueUrl = `${process.env.FRONTEND_URL ?? 'http://localhost:3003'}/reset-password`;
  const firebaseResetLink = await generatePasswordResetLink(email, continueUrl);
  
  // Envoie l'email avec le lien Firebase
  await this.mailerService.sendMail({
    to: email,
    subject: '🔐 Réinitialisation de votre mot de passe - ISETT',
    text: `Cliquez sur ce lien: ${firebaseResetLink}`,
    html: `<p>Bonjour ${user.prenom || user.email},</p><p><a href="${firebaseResetLink}">Réinitialiser mon mot de passe</a></p>`,
  });

  return { message: 'Si cet email existe, un lien de réinitialisation a été envoyé' };
}
```

### Frontend

#### 2. `frontend/front/src/components/ResetPasswordPage.jsx`

**Imports modifiés :**
```javascript
import firebaseAuthService from '../services/firebaseAuthService';
```

**État ajouté :**
```javascript
const [oobCode, setOobCode] = useState('');
const [verifying, setVerifying] = useState(true);
```

**useEffect modifié pour gérer Firebase :**
```javascript
useEffect(() => {
  const verifyCode = async () => {
    const mode = searchParams.get('mode');
    const code = searchParams.get('oobCode');
    
    if (mode === 'resetPassword' && code) {
      setOobCode(code);
      try {
        const userEmail = await firebaseAuthService.verifyPasswordResetCode(code);
        setEmail(userEmail);
        setVerifying(false);
      } catch (err) {
        setError('Le lien de réinitialisation est invalide ou a expiré.');
        setVerifying(false);
      }
    } else {
      setError('Lien invalide.');
      setVerifying(false);
    }
  };

  verifyCode();
}, [searchParams]);
```

**handleSubmit modifié pour utiliser Firebase :**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (newPassword !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas');
    return;
  }

  try {
    await firebaseAuthService.confirmPasswordReset(oobCode, newPassword);
    setMessage('Mot de passe réinitialisé avec succès !');
    setTimeout(() => navigate('/login'), 3000);
  } catch (err) {
    setError(err.message || 'Une erreur est survenue.');
  }
};
```

#### 3. `frontend/front/src/services/firebaseAuthService.js`

**Déjà implémenté :**
- `requestPasswordReset(email)` - Appelle le backend
- `verifyPasswordResetCode(oobCode)` - Vérifie le code Firebase
- `confirmPasswordReset(oobCode, newPassword)` - Réinitialise avec Firebase

## 🧪 Test du Flux Complet

### Étape 1: Accéder à la page Forgot Password
```
http://localhost:3003/forgot-password
```

### Étape 2: Entrer l'email de test
```
Email: khaledzeineb81@gmail.com
```

### Étape 3: Vérifier l'email sur Ethereal

**URL:** https://ethereal.email/login

**Identifiants:**
```
Email: esbtjkkxwbeqkfw6@ethereal.email
Password: RP8GYWQGRyxMc1VcaJ
```

### Étape 4: Cliquer sur le lien dans l'email

Le lien Firebase ressemble à :
```
https://isett-497f3.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=ABC123...&continueUrl=http://localhost:3003/reset-password
```

Firebase vous redirigera automatiquement vers :
```
http://localhost:3003/reset-password?mode=resetPassword&oobCode=ABC123...
```

### Étape 5: Entrer le nouveau mot de passe

- Entrez un mot de passe (min 8 caractères)
- Confirmez le mot de passe
- Cliquez sur "Réinitialiser"

### Étape 6: Se connecter

Vous serez redirigé automatiquement vers `/login` après 3 secondes.

## 🔍 Vérifications Backend

### Logs à surveiller:

```
🔍 [ForgotPassword] Started for email: khaledzeineb81@gmail.com
✅ [ForgotPassword] User found: khaledzeineb81@gmail.com
🔗 [ForgotPassword] Firebase Reset Link generated
📧 [ForgotPassword] Sending email with Firebase reset link...
✅ [ForgotPassword] Email sent successfully!
```

## 📊 Différences avec l'ancienne version

### Avant (Token local)
```
Backend génère token → Stocke en DB → Envoie lien local
URL: http://localhost:3003/reset-password?email=...&token=...
Backend vérifie token → Réinitialise en DB
```

### Maintenant (Firebase)
```
Backend → Firebase génère lien → Envoie lien Firebase  
URL: Firebase redirige → http://localhost:3003/reset-password?mode=resetPassword&oobCode=...
Frontend vérifie oobCode → Firebase réinitialise
```

## ✅ Avantages de Firebase

1. **Sécurité renforcée** : Firebase gère la validation des codes
2. **Expiration automatique** : Les codes expirent automatiquement
3. **Pas de stockage en DB** : Pas besoin de stocker resetToken/resetTokenExpires
4. **Cohérence** : Même logique que l'email verification
5. **Simplicité** : Moins de code backend à maintenir

## 🚀 Services Actifs

- **Frontend**: http://localhost:3003
- **Auth Service**: http://localhost:3001
- **Admin Service**: http://localhost:3000 (erreur DB, pas critique)

## 📧 Email de Test

**Compte Ethereal (auto-généré):**
```
Host: smtp.ethereal.email
Port: 587
Email: esbtjkkxwbeqkfw6@ethereal.email
Password: RP8GYWQGRyxMc1VcaJ
```

**Accès web:** https://ethereal.email/login

## 🔧 Dépannage

### Problème: "Lien invalide"
- Vérifiez que l'URL contient `mode=resetPassword` et `oobCode=...`
- Le code Firebase expire après un certain temps

### Problème: Pas d'email reçu
- Vérifiez les logs backend: `✅ [ForgotPassword] Email sent successfully!`
- Connectez-vous sur Ethereal avec les identifiants ci-dessus

### Problème: Erreur Firebase
- Vérifiez que Firebase est configuré dans `.env`
- Vérifiez que le fichier `isett-497f3-firebase-adminsdk-fbsvc-cc94a3ba88.json` existe

## 📝 Configuration Nécessaire

### Backend `.env`
```env
FRONTEND_URL=http://localhost:3003
FIREBASE_PROJECT_ID=isett-497f3
# Ethereal Email (auto-généré)
```

### Frontend `.env`
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyCojKuAFn28aHiUQCatlQlWf7-pg-h-KNI
REACT_APP_FIREBASE_AUTH_DOMAIN=isett-497f3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=isett-497f3
REACT_APP_AUTH_API_URL=http://localhost:3001/api
```

## 🎉 Résultat Final

Le système de réinitialisation de mot de passe utilise maintenant **Firebase Authentication** exactement comme la vérification d'email dans la branche `feature/email-verification-microservice`. C'est plus sécurisé, plus simple et plus cohérent !
