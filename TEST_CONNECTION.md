# 🧪 Guide de Test de Connexion Frontend-Backend

## ✅ Vérifications Préalables

### 1. Backend démarré
```bash
cd backend/admin-service
npm run start:dev
```
**Vérifier** : Le serveur doit afficher `🚀 Application running on: http://localhost:3000`

### 2. Frontend démarré
```bash
cd frontend/front
npm start
```
**Vérifier** : React doit démarrer sur `http://localhost:3003` ou `http://localhost:3000`

### 3. PostgreSQL actif
Vérifier que PostgreSQL est démarré et que la base `university_db` existe.

---

## 🔧 Configuration Actuelle

### Backend (admin-service)
- **Port** : 3000
- **CORS** : Autorise `http://localhost:3003`
- **Base de données** : PostgreSQL `university_db`
  - Host: localhost
  - Port: 5432
  - Username: postgres
  - Password: 123456789

### Frontend
- **Port** : 3003 ou 3004
- **API URL** : `http://localhost:3000`

---

## 📋 Endpoints Disponibles

### 🏛️ Départements (`/departement`)
- ✅ GET `/departement` - Liste tous les départements
- ✅ GET `/departement/:id` - Un département
- ✅ POST `/departement` - Créer un département
  ```json
  {
    "nom": "Informatique",
    "code": "INFO"
  }
  ```
- ✅ PATCH `/departement/:id` - Modifier un département
- ✅ DELETE `/departement/:id` - Supprimer un département

### 👨‍🏫 Enseignants (`/enseignant`)
- ✅ GET `/enseignant` - Liste tous les enseignants
- ✅ GET `/enseignant/:id` - Un enseignant
- ✅ POST `/enseignant` - Créer un enseignant
  ```json
  {
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "grade": "Professeur",
    "departementId": 1,
    "specialiteIds": [1, 2],
    "classeIds": [1]
  }
  ```
- ✅ PATCH `/enseignant/:id` - Modifier un enseignant
- ✅ DELETE `/enseignant/:id` - Supprimer un enseignant

### 🎓 Étudiants (`/etudiants`)
- ✅ GET `/etudiants` - Liste tous les étudiants
- ✅ GET `/etudiants/:id` - Un étudiant
- ✅ POST `/etudiants` - Créer un étudiant
  ```json
  {
    "nom": "Martin",
    "prenom": "Sophie",
    "email": "sophie.martin@example.com",
    "cin": "12345678",
    "classeId": 1
  }
  ```
- ✅ PATCH `/etudiants/:id` - Modifier un étudiant
- ✅ DELETE `/etudiants/:id` - Supprimer un étudiant

### 📚 Classes (`/classe`)
- ✅ GET `/classe` - Liste toutes les classes
- ✅ GET `/classe/:id` - Une classe
- ✅ POST `/classe` - Créer une classe
- ✅ PATCH `/classe/:id` - Modifier une classe
- ✅ DELETE `/classe/:id` - Supprimer une classe

### 🎯 Spécialités (`/specialite`)
- ✅ GET `/specialite` - Liste toutes les spécialités
- ✅ GET `/specialite/:id` - Une spécialité
- ✅ POST `/specialite` - Créer une spécialité
- ✅ PATCH `/specialite/:id` - Modifier une spécialité
- ✅ DELETE `/specialite/:id` - Supprimer une spécialité

### 📊 Niveaux (`/niveau`)
- ✅ GET `/niveau` - Liste tous les niveaux
- ✅ GET `/niveau/:id` - Un niveau
- ✅ POST `/niveau` - Créer un niveau
- ✅ PATCH `/niveau/:id` - Modifier un niveau
- ✅ DELETE `/niveau/:id` - Supprimer un niveau

---

## 🧪 Tests manuels avec CURL

### Test 1 : Récupérer tous les départements
```powershell
curl http://localhost:3000/departement
```

### Test 2 : Créer un département
```powershell
curl -X POST http://localhost:3000/departement -H "Content-Type: application/json" -d '{\"nom\":\"Informatique\",\"code\":\"INFO\"}'
```

### Test 3 : Récupérer tous les étudiants
```powershell
curl http://localhost:3000/etudiants
```

### Test 4 : Récupérer tous les enseignants
```powershell
curl http://localhost:3000/enseignant
```

---

## 🐛 Problèmes Courants et Solutions

### Problème 1 : "Cannot POST /..." ou 404
**Cause** : Route inexistante ou backend non démarré  
**Solution** : Vérifier que le backend tourne et utiliser les bonnes routes

### Problème 2 : "Network Error" dans le frontend
**Cause** : CORS ou backend non accessible  
**Solution** : 
1. Vérifier que backend tourne sur port 3000
2. Vérifier CORS dans `main.ts`
3. Vérifier l'URL dans `frontend/front/src/config/api.js`

### Problème 3 : "Validation failed" lors de création
**Cause** : Données manquantes ou incorrectes  
**Solution** : Vérifier les DTOs requis :
- **Étudiant** : nom, prenom, email, cin, classeId
- **Enseignant** : nom, prenom, email, grade, departementId, specialiteIds[], classeIds[]
- **Département** : nom, code

### Problème 4 : "... not found" lors de création
**Cause** : Relations manquantes (classe, département, etc.)  
**Solution** : Créer d'abord les entités parentes :
1. Créer un département
2. Créer une spécialité
3. Créer un niveau
4. Créer une classe
5. Puis créer un étudiant ou enseignant

### Problème 5 : Frontend bloqué lors de l'ajout
**Cause** : Formulaire non implémenté ou données manquantes  
**Solution** : 
1. Ouvrir la console du navigateur (F12)
2. Regarder l'onglet "Network" pour voir les requêtes
3. Vérifier les erreurs dans "Console"
4. S'assurer que toutes les relations existent (classes, départements, etc.)

---

## 📝 Ordre de Création Recommandé

Pour éviter les erreurs de relations manquantes :

1. **Département** (ex: Informatique)
2. **Spécialité** (ex: Développement Web) avec departementId
3. **Niveau** (ex: Licence 3)
4. **Classe** (ex: L3-INFO-A) avec niveauId et specialiteId
5. **Enseignant** avec departementId, specialiteIds[], classeIds[]
6. **Étudiant** avec classeId

---

## 🎯 Test du Dashboard

1. Ouvrir `http://localhost:3003` (ou le port de votre React)
2. Se connecter (si authentification requise)
3. Naviguer vers le Dashboard Administratif
4. Vérifier :
   - ✅ Les statistiques se chargent (étudiants, enseignants, départements, classes)
   - ✅ Les tableaux affichent les données
   - ✅ Le spinner de chargement apparaît puis disparaît
   - ✅ Les messages d'erreur s'affichent en cas de problème
   - ✅ La recherche fonctionne
   - ✅ La suppression fonctionne avec confirmation

---

## 🔍 Vérification Console Navigateur

Ouvrir la console (F12) et chercher :
- ❌ Erreurs CORS : "Access-Control-Allow-Origin"
- ❌ Erreurs 404 : "Cannot GET/POST ..."
- ❌ Erreurs 500 : Problème backend
- ✅ Status 200 : Requête réussie
- ✅ Status 201 : Création réussie

---

## 📘 Documentation Swagger

Pour tester facilement avec une interface graphique :
- Ouvrir : `http://localhost:3000/api`
- Swagger UI permet de tester tous les endpoints directement

---

## ✅ Checklist Finale

- [ ] PostgreSQL démarré
- [ ] Base `university_db` existe
- [ ] Backend tourne sur port 3000
- [ ] Frontend tourne sur port 3003/3004
- [ ] Tailwind CSS CDN ajouté dans index.html
- [ ] Au moins un département créé
- [ ] Au moins une classe créée
- [ ] Dashboard accessible
- [ ] Aucune erreur dans la console navigateur
- [ ] Les données s'affichent correctement

---

## 🆘 Besoin d'aide ?

Si le problème persiste :
1. Copier l'erreur complète de la console
2. Vérifier les logs du backend
3. Tester avec CURL ou Swagger
4. Vérifier que toutes les dépendances sont installées (`npm install`)
