# Documentation Lab13 - Modules de Visualisation Cartographique

Ce lab13 contient trois modules de visualisation de données géospatiales sur une carte interactive utilisant MapLibre GL / Mapbox GL.

---

## 📊 Module 1 : `generateClusters.js`

### Objectif
Crée une visualisation de clusters/groupes de points pour afficher efficacement une grande quantité de données sans surcharger la carte.

### Fonctionnement

#### Données d'entrée
- Variable globale `randomPoints` : GeoJSON contenant les points à clusteriser

#### Processus

1. **Suppression des couches existantes**
   ```javascript
   removeAllLayersAndSources();
   ```
   Nettoie la carte avant d'ajouter les nouvelles couches.

2. **Création de la source avec clustering**
   ```javascript
   map.addSource('clusters-source', {
       type: 'geojson',
       data: randomPoints,
       cluster: true,           // Active le clustering
       clusterMaxZoom: 14,       // Niveau de zoom où le clustering s'arrête
       clusterRadius: 50         // Rayon en pixels pour grouper les points
   });
   ```

3. **Couche des clusters**
   - Les clusters sont affichés sous forme de cercles
   - La **couleur** dépend du nombre de points
   - La **taille** augmente avec le nombre de points

   | Plage de points | Couleur | Rayon |
   |-----------------|---------|-------|
   | 10 | Cyan (#51bbd6) | 5px |
   | 20 | Jaune (#f1f075) | 20px |
   | 30 | Rose (#f28cb1) | 40px |

4. **Couche des points non-clusterisés**
   - Au zoom 15 et plus, les points individuels apparaissent
   - Cercles bleus de 4px avec contour blanc

### Sortie
- Clusters interactifs en fonction du niveau de zoom
- Points individuels au zoom élevé

### Cas d'usage
- Visualiser la densité de points
- Navigation progressive (zoom pour voir les détails)
- Optimisation des performances avec de grandes données

---

## 🏢 Module 2 : `generateExtrusion.js`

### Objectif
Crée une visualisation 2.5D/3D avec des polygones extrudés pour montrer des données volumétriques ou hiérarchiques.

### Fonctionnement

#### Prérequis
- Les données doivent être préalablement ``union``ées (fusionnées)
- La couche 'union' doit contenir les propriétés :
  - `extrusion-height` : hauteur de l'extrusion
  - `extrusion-base` : point de départ de l'extrusion

#### Processus

1. **Vérification de la couche union**
   ```javascript
   if (!map.getLayer('union')) {
       dissolver();  // Crée l'union si nécessaire
   }
   ```

2. **Création de la couche d'extrusion**
   - Type : `fill-extrusion` (polygone en 3D)
   - Source : données fusionnées ('union-source')
   - Couleur : Bleu (#627BC1)
   - Opacité : 60%

3. **Interpolation en fonction du zoom**
   - Crée un effet d'extrusion progressive au zoom

### Propriétés requises dans les données

```json
{
  "type": "Feature",
  "properties": {
    "extrusion-height": 100,  // hauteur de l'extrusion en unités
    "extrusion-base": 0       // niveau de base
  },
  "geometry": { ... }
}
```

### Sortie
- Polygones extrudés en 3D
- Effet perspectif basé sur le niveau de zoom
- Visualisation 2.5D au-dessus de la couche "water"

### Cas d'usage
- Visualiser des bâtiments avec hauteur
- Représenter des volumes de données
- Créer des cartes 3D interactives

---

## 🔥 Module 3 : `generateHeatmap.js`

### Objectif
Crée une carte de chaleur (heatmap) pour afficher la densité de points avec un dégradé de couleurs.

### Fonctionnement

#### Données d'entrée
- Variable globale `randomPoints` : GeoJSON contenant les points

#### Processus

1. **Suppression des couches existantes**
   ```javascript
   removeAllLayersAndSources();
   ```

2. **Création de la source heatmap**
   ```javascript
   map.addSource('heatmap-source', {
       type: 'geojson',
       data: randomPoints
   });
   ```

3. **Configuration de la couche heatmap**

#### Dégradé de couleur (densité)
| Densité | Couleur | Signification |
|---------|---------|--------------|
| 0% | Bleu transparent | Aucun point |
| 10% | Bleu royal | Faible densité |
| 30% | Cyan | Densité basse-moyenne |
| 50% | Vert citron | Densité moyenne |
| 70% | Jaune | Densité moyenne-haute |
| 100% | Rouge | Haute densité |

#### Propriétés dynamiques

- **Weight (poids)** : Influence par le zoom
  - Zoom 0 : poids = 0
  - Zoom 22 : poids = 1

- **Intensity (intensité)** : Contraste multiplicateur
  - Zoom 0 : intensité = 0
  - Zoom 22 : intensité = 1.2

- **Radius (rayon) d'influence** : Augmente avec le zoom
  - Zoom 0 : 2px
  - Zoom 22 : 20px

- **Opacity (opacité)** : Diminue légèrement au zoom élevé
  - Zoom 7 : 100%
  - Zoom 9+ : 80%

### Sortie
- Dégradé de chaleur sur la carte
- Points fusionnés dans des zones rouges (haute densité)
- Gradation lisse et interpolée

### Cas d'usage
- Visualiser la concentration de phénomènes
- Identifier les hotspots/points chauds
- Représenter les aglutinations de données
- Analyses de densité spatiale

---

## 🔗 Points Communs

### Enregistrement dans le contrôle
```javascript
registerLayerControl('couche-id', 'Nom affiché');
```
Ajoute la couche au panneau de contrôle pour permettre l'activation/désactivation.

### Dépendances
- `randomPoints` : donnée source GeoJSON
- `map` : objet de carte global MapLibre GL / Mapbox GL
- `removeAllLayersAndSources()` : fonction utilitaire
- `registerLayerControl()` : fonction de gestion d'interface
- `dissolver()` : pour l'union (utilisé par extrusion)

---

## 📚 Comparaison des Modules

| Aspect | Clusters | Extrusion | Heatmap |
|--------|----------|-----------|---------|
| **Type de données** | Points nombreux | Polygones | Points nombreux |
| **Visualisation** | Cercles groupés | Polygones 3D | Dégradé continu |
| **Meilleur pour** | Entités discrètes | Structures/volumes | Densités/concentrations |
| **Interactivité** | Zoom dynamique | Perspective 3D | Zoom fluide |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Clarté** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Exemple d'Utilisation

```javascript
// Générer un nuage de points aléatoires
generateRandomPoints(1000);

// Afficher les clusters
generateClusters();

// Ou afficher une heatmap
generateHeatmap();

// Ou afficher l'extrusion 3D
generateExtrusion();

// Les utilisateurs peuvent basculer entre les modes
// via le panneau de contrôle de couches
```

---

## 🛠️ Dépannage

### La couche n'apparaît pas
- Vérifier que `randomPoints` contient des données
- Vérifier que `map` est initialisée
- Vérifier la console du navigateur pour les erreurs

### L'extrusion ne s'affiche pas
- Vérifier que la fonction `dissolver()` a été appelée
- Vérifier que les polygones contiennent `extrusion-height`
- Vérifier le niveau de zoom (effet interpolé entre 15 et 15.05)

### La heatmap est trop uniforme
- Vérifier la distribution des points
- Ajuster le `clusterRadius` ou le `heatmap-radius`
- Modifier la plage de densité dans le dégradé de couleur

---

## 📖 Pour Aller Plus Loin

- Documentation MapLibre GL : https://maplibre.org/maplibre-gl-js/docs/
- Types de couches disponibles
- Expressions de style avancées
- Animation et interactivité

