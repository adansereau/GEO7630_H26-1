# 📚 GEO 7630 - Semaine 12 : Principes, Architectures et Services Géospatiaux

## 🗓️ Date
- **31 mars 2026**

## 

## 🎯 Objectifs du cours 12
1. Comprendre les **principes et bases** du développement d'applications de webmapping.
2. Découvrir les **architectures d’applications web open source**.
3. Explorer les **normes géospatiales OGC** (WMS, WMTS, WFS, etc.).
4. Utiliser **GeoServer** pour la diffusion et visualisation des données géospatiales.

---


### ** Présentation générale**
-  [Cours 12 - Slides](https://docs.google.com/presentation/d/1CERWKEY3ZjXm6kVr9Amvyxb3kb8OHX65rNUgedP-PC4/edit?usp=sharing)


## 📋 Contenu du cours

### **1. Développement d’applications web géospatiales**
- **Principes du webmapping** :
  - Développement d’applications pour la diffusion des données géospatiales sur le web.
  - Utilisation d’interfaces client-serveur pour le rendu des cartes.
- **Bases fondamentales** :
  - Structuration des données géospatiales.
  - Intégration des services web et API géospatiales.

### **2. Architecture d’une application web open source**
#### **L’architecture client-serveur**
- **Composants** :
  - **Client** : Interface utilisateur pour accéder aux services (navigateur web, application).
  - **Serveur** : Fournit les services et gère les requêtes des clients.
  - **Protocole** : Communication entre client et serveur (HTTP, WebSocket).
- **Couches de l’architecture** :
  - **Données** : Gestion des données géospatiales.
  - **Traitement** : Manipulation et calcul des données.
  - **Sécurité** : Protection des communications et des accès.

#### **Avantages et inconvénients**
- **Avantages** :
  - Séparation des composants (maintenance facilitée).
  - Centralisation des données pour une meilleure sécurité.
  - Scalabilité et flexibilité pour gérer les besoins croissants.
- **Inconvénients** :
  - Dépendance entre le client et le serveur.
  - Temps de latence pour les communications.
  - Complexité accrue pour la maintenance.

---

### **3. Les normes géospatiales de l’OGC**
L’**Open Geospatial Consortium (OGC)** définit des standards pour assurer l’interopérabilité des données géospatiales.

#### **Normes de services web géospatiaux**
1. **WMS (Web Map Service)** :
   - Diffusion de cartes en tant qu’images géoréférencées.
   - Exemple d’URL :
     ```http
     https://example.com/geoserver/wms?service=WMS&request=GetMap&layers=layer_name&bbox=...&format=image/png
     ```
2. **WMTS (Web Map Tile Service)** :
   - Diffusion de tuiles pré-générées pour améliorer les performances.
3. **WFS (Web Feature Service)** :
   - Diffusion des données vectorielles (points, lignes, polygones).
4. **WCS (Web Coverage Service)** :
   - Diffusion des données raster pour des surfaces continues (imagerie satellite, DEM).
5. **WPS (Web Processing Service)** :
   - Automatisation des traitements géospatiaux.

#### **Formats d’échange**
- **GeoJSON** : Format léger pour les données géospatiales vectorielles.
- **GeoPackage** : Format de stockage basé sur SQLite pour les données géospatiales.

---

### **4. Diffusion des données géospatiales avec GeoServer**
#### **Introduction à GeoServer**
- **Objectif** : Publier des données géospatiales et créer des services web compatibles OGC.
- **Fonctionnalités principales** :
  - Configuration des couches (WMS, WMTS, WFS).
  - Gestion des données vectorielles et matricielles.
  - Personnalisation de l’apparence des cartes.

#### **Laboratoire : Diffusion et visualisation des données**
1. **Installation et configuration de GeoServer**.
2. **Publication d’un service WMS et WFS** :
   - Importation des données vectorielles depuis une base PostGIS.
   - Configuration des styles cartographiques (SLD).
3. **Visualisation avec MapLibre GL** :
   - Consommation des services WMS et WFS pour afficher les cartes interactives.

---

## 🧪 Laboratoire
### **Thème : Diffusion et visualisation avec GeoServer et MapLibre GL**
1. **Configuration de GeoServer** :
   - Importer et configurer une couche vectorielle.
   - Publier un service WMS.
2. **Connexion avec MapLibre GL** :
   - Ajouter un service WMS dans une carte interactive.
   - Consommer et afficher des données vectorielles (WFS).
3. **Personnalisation des styles** :
   - Modifier l’apparence des cartes en utilisant des fichiers SLD.

---

## 📂 Ressources et liens utiles
- **GeoServer Documentation** : [GeoServer Tutorials](https://docs.geoserver.org/latest/en/user/tutorials/index.html)
- **Normes OGC** :
  - [OGC WMS Documentation](https://docs.geoserver.org/latest/en/user/services/wms/index.html)
  - [OGC GeoJSON Standard](https://geojson.org/)
- **MapLibre GL** : [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/)

---

## 📝 Devoir
- **Travail pratique 4 (TP4)** : Diffusion et visualisation des données avec GeoServer.
- **Livrables** :
  - Configuration d’un service **WMS** avec GeoServer.
  - Carte interactive utilisant **MapLibre GL** pour consommer et afficher le service.
- **Date de remise** : **25 mars 2025**.

---

## ❓ Questions et échanges
- Discussion sur les **normes OGC** et leur importance pour l’interopérabilité des données.
- Retour sur les défis rencontrés avec GeoServer et MapLibre GL.

---

**🚀 À la semaine prochaine pour le cours 11 !**
