# 📚 GEO 7630 - Cours 10 : Bases HTML, CSS et JavaScript - Introduction au WebMapping Front-End

## 🗓️ Date
- **17 mars 2026**


## 🎯 Objectifs du cours 10
1. Comprendre les bases de **HTML**, **CSS**, et **JavaScript** pour le développement web.
2. Introduction aux formats **JSON** et **GeoJSON** pour les données géospatiales.
3. Apprendre à utiliser les **APIs cartographiques** pour le WebMapping.
4. Développer une application cartographique simple avec **MapLibreGL**.

---

### ** Présentation générale**
-  [Cours 10 - Slides](https://docs.google.com/presentation/d/1AD63vQfz7aJtf0oHcKwdpqfW50u77q0-SKUEHhlTvro/edit?usp=sharing)


### **1. Bases HTML, CSS et JavaScript**
#### **HTML**
- **Structure d'un document HTML** :
  - Balises principales : `<html>`, `<head>`, `<body>`.
  - Balises de contenu : `<h1>` à `<h6>`, `<p>`, `<div>`, `<img>`, `<a>`, `<input>`, `<button>`.
- **Attributs importants** :
  - `id`, `class`, `style`, `src`, `href`, `alt`, `title`, `target`.
- **Exercice pratique** : Créer une page HTML basique.
  - Exemple : Ajouter un titre, une carte, et un bouton avec [JSFiddle](https://jsfiddle.net).

#### **CSS**
- **Définition** : Langage permettant de styliser les pages web.
- **Propriétés de base** :
  - `width`, `height`, `padding`, `margin`, `color`.
- **Positionnement** :
  - `static`, `relative`, `absolute`, `fixed`, `sticky`.
- **Flexbox et Grid** pour le design moderne.
- **Exercice pratique** : Ajouter du style CSS pour améliorer l'apparence de la page.

#### **JavaScript**
- **Introduction** : Langage de programmation pour les interactions dynamiques.
- **Concepts clés** :
  - Variables : `var`, `let`, `const`.
  - Types de données : `Number`, `String`, `Boolean`, `Array`, `Object`.
  - Structures de contrôle : `if-else`, `switch`, `for`, `while`.
  - Opérateurs : `==`, `===`, `+`, `-`, `*`, `&&`, `||`.
- **Exercice pratique** : Ajouter un script pour afficher un message avec un bouton.

---

### **2. Introduction aux formats JSON et GeoJSON**
#### **JSON (JavaScript Object Notation)**
- Format léger pour l’échange de données structuré en **paires clé-valeur**.
- **Exemple** :
  ```json
  {
    "name": "John",
    "age": 30,
    "city": "Montréal"
  }
  ```

#### **GeoJSON**
- Extension de JSON pour les données géospatiales.
- **Types de géométries** : `Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiPolygon`.
- **Exemple** :
  ```json
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-73.5673, 45.5017]
        },
        "properties": {
          "name": "Montréal"
        }
      }
    ]
  }
  ```
- **Ressource** : [OGC GeoJSON Standard](https://www.ogc.org/standard/eo-geojson/).

---

### **3. Revue des APIs cartographiques**
- **Introduction aux APIs pour le WebMapping** :
  - **MapLibre GL** : Open-source pour le WebMapping 2D/3D.
  - **Mapbox GL** : Visualisation interactive avec des styles personnalisés.
  - **Leaflet** : API simple pour les cartes interactives.
  - **OpenLayers** : API puissante pour le WebMapping avancé.
  - **ESRI ArcGIS API for JavaScript** : Intégration des services ArcGIS.
  - **Google Maps API** : Services de géolocalisation et visualisation.
- **Ressources** :
  - [MapLibreGL Docs](https://maplibre.org/maplibre-gl-js-docs/).
  - [Leaflet API](https://leafletjs.com/).

---

## 🧪 Laboratoire
### **Thème : Création d'une application cartographique web basique avec MapLibreGL**
1. **Création d'une page HTML** :
   - Ajout des balises `<div>` pour la carte et le titre.
2. **Stylisation avec CSS** :
   - Définir la taille et la position de la carte.
3. **Ajout de JavaScript** :
   - Utilisation de **MapLibreGL** pour afficher une carte avec des données GeoJSON.
   - Exemple :
   ```html
   <div id="map" style="width: 100%; height: 400px;"></div>
   <script>
     maplibregl.accessToken = 'your_access_token';
     const map = new maplibregl.Map({
       container: 'map',
       style: 'https://demotiles.maplibre.org/style.json',
       center: [-73.5673, 45.5017],
       zoom: 10
     });
   </script>
   ```

4. **Ajout d'une interaction** :
   - Affichage d'un popup au clic sur un point GeoJSON.

---

## 📂 Ressources et liens utiles
- **HTML/CSS/JavaScript** :
  - [MDN Web Docs - HTML](https://developer.mozilla.org/fr/docs/Learn/HTML)
  - [MDN Web Docs - CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
  - [MDN Web Docs - JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- **GeoJSON** : [OGC GeoJSON Standard](https://www.ogc.org/standard/eo-geojson/)
- **MapLibreGL** : [Documentation officielle](https://maplibre.org/maplibre-gl-js-docs/)
- **APIs cartographiques** :
  - [Leaflet API](https://leafletjs.com/)
  - [OpenLayers](https://openlayers.org/)

---

## 📝 Devoir
- **Travail pratique 3 (TP3)** : Création d'une application cartographique web intégrant des données GeoJSON et des interactions basiques.
- **Livrables** :
  - Code source complet (HTML, CSS, JavaScript).
  - Carte affichant des données GeoJSON avec interactions.
- **Date de remise** : **11 mars 2025**.

---

## ❓ Questions et échanges
- Retour sur les défis rencontrés pour l'intégration des données GeoJSON.
- Discussion sur les avantages des différentes APIs cartographiques.

---

**🚀 À la semaine prochaine pour le cours 10 !**
