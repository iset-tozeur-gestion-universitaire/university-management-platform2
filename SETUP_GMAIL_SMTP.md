# 📧 Configuration Gmail SMTP (GRATUIT - 5 minutes)

## ✅ Pourquoi Gmail au lieu de Mailtrap ?
- **100% GRATUIT** - Pas besoin de compte payant
- **500 emails/jour** - Largement suffisant pour les tests
- **Emails RÉELS** - Vous recevrez vraiment les emails
- **Facile à configurer** - Juste 2 étapes

---

## 🚀 ÉTAPES DE CONFIGURATION (5 minutes)

### Étape 1 : Activer la validation en 2 étapes sur Gmail

1. Allez sur votre compte Google : https://myaccount.google.com/
2. Cliquez sur **"Sécurité"** dans le menu de gauche
3. Cherchez **"Validation en deux étapes"**
4. Activez-la si ce n'est pas déjà fait (suivez les instructions)

---

### Étape 2 : Générer un mot de passe d'application

1. Une fois la validation en 2 étapes activée, retournez sur https://myaccount.google.com/security
2. Cherchez **"Mots de passe des applications"** (App passwords)
   - Ou allez directement sur : https://myaccount.google.com/apppasswords
3. Si on vous demande, entrez votre mot de passe Gmail
4. Dans "Sélectionner l'application", choisissez **"Mail"**
5. Dans "Sélectionner l'appareil", choisissez **"Autre (nom personnalisé)"**
6. Tapez : **"University Platform"**
7. Cliquez sur **"Générer"**
8. Google va générer un mot de passe de 16 caractères (comme : `abcd efgh ijkl mnop`)
9. **COPIEZ CE MOT DE PASSE** (sans les espaces)

---

### Étape 3 : Mettre à jour le fichier .env

1. Ouvrez le fichier `.env` dans `backend/auth-service/`
2. Remplacez la ligne `MAIL_PASS=YOUR_GMAIL_APP_PASSWORD_HERE` par :
   ```
   MAIL_PASS=abcdefghijklmnop
   ```
   (Utilisez le mot de passe que Google vient de générer, SANS les espaces)

3. Vérifiez que `MAIL_USER` contient votre adresse Gmail :
   ```
   MAIL_USER=rayenchraiet2000@gmail.com
   ```

---

## 📝 Exemple de configuration finale dans .env

```env
# Gmail SMTP Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=rayenchraiet2000@gmail.com
MAIL_PASS=abcdefghijklmnop
```

---

## ✅ Tester la configuration

1. Redémarrez le backend :
   ```bash
   cd backend
   npm run start:dev
   ```

2. Allez sur votre frontend et testez "Mot de passe oublié"

3. **Vous devriez recevoir un email RÉEL dans votre boîte Gmail !** 📬

---

## 🎯 Avantages de cette solution

✅ **Gratuit** - Aucun coût
✅ **Fiable** - Gmail est très stable  
✅ **Emails réels** - Pas de simulation
✅ **500 emails/jour** - Suffisant pour le développement
✅ **Facile** - Configuration en 5 minutes
✅ **Sécurisé** - Utilise un mot de passe d'application dédié

---

## ⚠️ Dépannage

### Problème : "Invalid login"
- Vérifiez que la validation en 2 étapes est activée
- Régénérez un nouveau mot de passe d'application
- Assurez-vous qu'il n'y a pas d'espaces dans le mot de passe

### Problème : "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que le port 587 n'est pas bloqué par votre firewall

### Problème : Email non reçu
- Vérifiez vos spams
- Attendez 1-2 minutes (peut être lent parfois)
- Vérifiez les logs du backend pour voir les erreurs

---

## 📚 Liens utiles

- Gestion des mots de passe d'application : https://myaccount.google.com/apppasswords
- Documentation Gmail SMTP : https://support.google.com/mail/answer/7126229

---

**C'est tout ! Maintenant vous pouvez envoyer des emails RÉELS gratuitement ! 🎉**
