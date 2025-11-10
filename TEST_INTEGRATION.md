# 🧪 Test de Connexion Frontend-Backend

## Status: ✅ Backend Démarré

Le backend admin-service est maintenant actif sur **http://localhost:3000**

### URLs importantes:
- 🚀 API Backend: `http://localhost:3000`
- 📘 Swagger Documentation: `http://localhost:3000/api`
- 🎨 Frontend (à démarrer): `http://localhost:3003`

## Prochaines Étapes:

### 1. Tester l'API avec Swagger

Ouvrir dans le navigateur: `http://localhost:3000/api`

Vous pouvez tester directement les endpoints:
- `/departement` - Gestion des départements
- `/enseignant` - Gestion des enseignants
- `/etudiants` - Gestion des étudiants
- `/classe` - Gestion des classes
- `/specialite` - Gestion des spécialités
- `/niveau` - Gestion des niveaux

### 2. Démarrer le Frontend

Ouvrir un nouveau terminal et exécuter:
```powershell
cd frontend/front
npm start
```

Le frontend démarrera sur: `http://localhost:3003`

### 3. Tester le Dashboard

1. Ouvrir `http://localhost:3003` dans votre navigateur
2. Se connecter avec vos identifiants
3. Naviguer vers le Dashboard Administratif
4. Observer:
   - ✅ Les statistiques se chargent automatiquement
   - ✅ Les données proviennent de la base de données
   - ✅ La recherche fonctionne
   - ✅ Les boutons de suppression sont opérationnels

### 4. Test des Fonctionnalités

#### Tableau de Bord:
- [ ] Les 4 cartes de statistiques s'affichent
- [ ] Les départements apparaissent dans la liste
- [ ] Le bouton "Actualiser" fonctionne

#### Page Étudiants:
- [ ] La liste des étudiants se charge
- [ ] La recherche filtre correctement
- [ ] Le bouton de suppression fonctionne avec confirmation

#### Page Enseignants:
- [ ] La liste des enseignants se charge
- [ ] La recherche fonctionne
- [ ] La suppression fonctionne

#### Page Départements:
- [ ] Les cartes de départements s'affichent
- [ ] Les informations (nom, code, description) sont visibles
- [ ] La suppression fonctionne

#### Page Classes:
- [ ] Les classes s'affichent en grille
- [ ] Les informations sont correctes

## Tests API Rapides

### Test 1: Récupérer tous les départements
```bash
curl http://localhost:3000/departement
```

### Test 2: Récupérer tous les étudiants
```bash
curl http://localhost:3000/etudiants
```

### Test 3: Récupérer tous les enseignants
```bash
curl http://localhost:3000/enseignant
```

### Test 4: Créer un département (exemple)
```bash
curl -X POST http://localhost:3000/departement \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Test Department\",\"code\":\"TEST\",\"description\":\"Test description\"}"
```

## Résolution de Problèmes

### Si le frontend ne se connecte pas au backend:

1. **Vérifier que le backend est actif**
   ```powershell
   netstat -ano | findstr :3000
   ```
   Vous devriez voir le port 3000 en LISTENING

2. **Vérifier CORS**
   - Le CORS doit autoriser `http://localhost:3003`
   - Déjà configuré dans `backend/admin-service/src/main.ts`

3. **Vérifier la console du navigateur**
   - Appuyer sur F12
   - Aller dans l'onglet "Console"
   - Regarder les erreurs éventuelles
   - Vérifier l'onglet "Network" pour voir les requêtes

4. **Vérifier la base de données**
   - PostgreSQL doit être actif
   - La base `university_db` doit exister
   - Les tables doivent être créées (auto via TypeORM)

### Si les données ne s'affichent pas:

1. **Vérifier qu'il y a des données dans la base**
   Utiliser Swagger (`http://localhost:3000/api`) pour:
   - Créer quelques départements
   - Créer quelques enseignants
   - Créer quelques étudiants

2. **Cliquer sur "Actualiser"**
   Le bouton dans l'en-tête du dashboard force le rechargement des données

3. **Vérifier la console du navigateur**
   Les erreurs API apparaîtront ici

## État Actuel

✅ **Complété:**
- Backend admin-service démarré et fonctionnel
- CORS configuré
- Tous les endpoints opérationnels
- Swagger documentation disponible
- Services frontend créés et configurés
- Dashboard mis à jour avec intégration backend
- Documentation complète créée

⏳ **À faire:**
- Démarrer le frontend
- Tester l'intégration complète
- Ajouter des données de test si nécessaire
- Implémenter les modales d'ajout/modification

## Commandes Utiles

### Redémarrer le backend:
```powershell
# Trouver le processus
netstat -ano | findstr :3000
# Tuer le processus (remplacer PID par le numéro)
taskkill /F /PID [PID]
# Redémarrer
cd backend/admin-service
npm run start:dev
```

### Voir les logs du backend:
Les logs s'affichent automatiquement dans le terminal où vous avez démarré le backend.

### Tester avec curl:
```powershell
# PowerShell équivalent
Invoke-WebRequest -Uri "http://localhost:3000/departement" -Method GET
```

---

**Prochaine étape:** Démarrer le frontend avec `cd frontend/front; npm start`
