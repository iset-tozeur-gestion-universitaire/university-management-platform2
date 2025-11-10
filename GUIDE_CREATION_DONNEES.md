# 🌱 Guide de Création des Données de Test

## 📋 Option 1 : Utiliser le Script Automatique (RECOMMANDÉ)

### Étape 1 : Démarrer le Backend
```powershell
cd backend/admin-service
npm run start:dev
```
✅ Attendez que le message apparaisse : `🚀 Application running on: http://localhost:3000`

### Étape 2 : Ouvrir un NOUVEAU Terminal
**Important** : Ne fermez pas le terminal du backend, ouvrez-en un nouveau !

### Étape 3 : Exécuter le Script de Seed
```powershell
cd backend/admin-service
npm run seed
```

### ✅ Résultat Attendu
Vous devriez voir :
```
🌱 Début du seed...

📁 Création des départements...
✅ 3 départements créés

🎯 Création des spécialités...
✅ 4 spécialités créées

📊 Création des niveaux...
✅ 5 niveaux créés

🏫 Création des classes...
✅ 6 classes créées

👨‍🏫 Création des enseignants...
✅ 3 enseignants créés

🎓 Création des étudiants...
✅ 8 étudiants créés

🎉 Seed terminé avec succès !

📊 Résumé :
- 3 Départements
- 4 Spécialités
- 5 Niveaux
- 6 Classes
- 3 Enseignants
- 8 Étudiants

✅ Vous pouvez maintenant tester le dashboard !
```

---

## 📋 Option 2 : Créer Manuellement via Swagger

### Étape 1 : Ouvrir Swagger UI
- Ouvrir dans le navigateur : `http://localhost:3000/api`

### Étape 2 : Créer un Département
1. Cliquer sur `POST /departement`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "Informatique"
}
```
4. Cliquer sur "Execute"
5. Noter l'ID retourné (ex: 1)

### Étape 3 : Créer une Spécialité
1. Cliquer sur `POST /specialite`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "Développement Web",
  "departementId": 1
}
```
*(Remplacer 1 par l'ID du département créé)*
4. Noter l'ID retourné

### Étape 4 : Créer un Niveau
1. Cliquer sur `POST /niveau`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "Licence 1",
  "specialiteId": 1
}
```
*(Remplacer 1 par l'ID de la spécialité créée)*
4. Noter l'ID retourné

### Étape 5 : Créer une Classe
1. Cliquer sur `POST /classe`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "L1-DEV-A",
  "niveauId": 1
}
```
*(Remplacer 1 par l'ID du niveau créé)*
4. Noter l'ID retourné

### Étape 6 : Créer un Enseignant
1. Cliquer sur `POST /enseignant`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@university.com",
  "grade": "Professeur",
  "departementId": 1,
  "specialiteIds": [1],
  "classeIds": [1]
}
```
*(Remplacer les IDs par ceux créés précédemment)*

### Étape 7 : Créer un Étudiant
1. Cliquer sur `POST /etudiants`
2. Cliquer sur "Try it out"
3. Entrer :
```json
{
  "nom": "Durand",
  "prenom": "Alice",
  "email": "alice.durand@student.com",
  "cin": "12345678",
  "classeId": 1
}
```
*(Remplacer 1 par l'ID de la classe créée)*

---

## 📋 Option 3 : Créer via CURL (Terminal)

### Département
```powershell
curl -X POST http://localhost:3000/departement -H "Content-Type: application/json" -d '{\"nom\":\"Informatique\"}'
```

### Spécialité
```powershell
curl -X POST http://localhost:3000/specialite -H "Content-Type: application/json" -d '{\"nom\":\"Développement Web\",\"departementId\":1}'
```

### Niveau
```powershell
curl -X POST http://localhost:3000/niveau -H "Content-Type: application/json" -d '{\"nom\":\"Licence 1\",\"specialiteId\":1}'
```

### Classe
```powershell
curl -X POST http://localhost:3000/classe -H "Content-Type: application/json" -d '{\"nom\":\"L1-DEV-A\",\"niveauId\":1}'
```

### Enseignant
```powershell
curl -X POST http://localhost:3000/enseignant -H "Content-Type: application/json" -d '{\"nom\":\"Dupont\",\"prenom\":\"Jean\",\"email\":\"jean.dupont@university.com\",\"grade\":\"Professeur\",\"departementId\":1,\"specialiteIds\":[1],\"classeIds\":[1]}'
```

### Étudiant
```powershell
curl -X POST http://localhost:3000/etudiants -H "Content-Type: application/json" -d '{\"nom\":\"Durand\",\"prenom\":\"Alice\",\"email\":\"alice.durand@student.com\",\"cin\":\"12345678\",\"classeId\":1}'
```

---

## 🎯 Après la Création des Données

### Vérifier que tout fonctionne :

1. **Vérifier les départements** :
```powershell
curl http://localhost:3000/departement
```

2. **Vérifier les étudiants** :
```powershell
curl http://localhost:3000/etudiants
```

3. **Vérifier les enseignants** :
```powershell
curl http://localhost:3000/enseignant
```

4. **Vérifier les classes** :
```powershell
curl http://localhost:3000/classe
```

---

## 🖥️ Tester le Dashboard Frontend

### Étape 1 : Démarrer le Frontend
```powershell
cd frontend/front
npm start
```

### Étape 2 : Ouvrir dans le Navigateur
- URL : `http://localhost:3003` (ou le port indiqué)

### Étape 3 : Ouvrir la Console
- Appuyer sur `F12` pour ouvrir les outils de développement
- Aller dans l'onglet "Console"

### Étape 4 : Naviguer vers le Dashboard Administratif
- Cliquer sur le menu "Dashboard" ou "Administration"

### Étape 5 : Vérifier
✅ Les statistiques s'affichent (nombre d'étudiants, enseignants, etc.)  
✅ Les tableaux contiennent des données  
✅ Pas d'erreur dans la console  
✅ Le design est stylisé avec Tailwind  

---

## ❌ En Cas d'Erreur

### Erreur : "Classe non trouvée"
➡️ Vous devez créer une classe avant de créer un étudiant

### Erreur : "Département introuvable"
➡️ Vous devez créer un département avant de créer un enseignant ou une spécialité

### Erreur : "Cannot connect to database"
➡️ PostgreSQL n'est pas démarré ou les credentials sont incorrects

### Erreur : "Port 3000 already in use"
➡️ Le backend est déjà lancé dans un autre terminal

### Erreur : "ts-node: command not found" lors du seed
➡️ Installer ts-node :
```powershell
cd backend/admin-service
npm install --save-dev ts-node
```

---

## 🔄 Réinitialiser les Données

Si vous voulez recommencer à zéro :

### Option 1 : Via PostgreSQL
```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Supprimer et recréer la base
DROP DATABASE university_db;
CREATE DATABASE university_db;
```

### Option 2 : Redémarrer le Backend
Le backend avec `synchronize: true` recrée automatiquement les tables.

Puis relancer le seed :
```powershell
npm run seed
```

---

## ✅ Checklist Complète

- [ ] PostgreSQL est démarré
- [ ] Base `university_db` existe
- [ ] Backend tourne sur port 3000
- [ ] Script seed exécuté OU données créées manuellement
- [ ] Au moins 1 département existe
- [ ] Au moins 1 classe existe
- [ ] Au moins 1 étudiant existe
- [ ] Frontend démarré
- [ ] Dashboard accessible sans erreur
- [ ] Les données s'affichent dans le dashboard

---

## 🎉 Félicitations !

Si tout fonctionne, vous pouvez maintenant :
- ✅ Voir la liste des étudiants
- ✅ Voir la liste des enseignants
- ✅ Voir la liste des départements
- ✅ Voir les statistiques
- ✅ Chercher dans les listes
- ✅ Supprimer des entrées

**Prochaines étapes** : Ajouter les formulaires de création et modification dans le frontend !
