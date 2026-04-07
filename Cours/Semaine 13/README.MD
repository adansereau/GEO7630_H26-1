# GEO7630 – Cours 13 : Webmapping avancé et architecture applicative

## Date
- **Cours 13 – Hiver 2026**

## Thème du cours
Ce cours approfondit les concepts de **webmapping avancé** en s’intéressant non seulement à la visualisation cartographique interactive, mais aussi à la logique applicative qui permet de construire des interfaces plus riches, plus dynamiques et plus intelligentes.

Après avoir vu les bases du développement cartographique web, nous abordons ici une étape supérieure : **faire interagir la carte, les données, l’interface et les traitements spatiaux** dans une même application.

L’objectif n’est plus simplement d’afficher une carte, mais de commencer à concevoir une **véritable application géospatiale interactive**.

---

## Objectifs du cours

À la fin de ce cours, vous serez capables de :

1. Comprendre ce qui distingue une carte web simple d’une **application de webmapping avancée**.
2. Structurer une application cartographique en séparant plus clairement :
   - l’interface,
   - la logique,
   - les données,
   - les traitements.
3. Exploiter des concepts avancés de **MapLibre GL JS** pour enrichir les interactions cartographiques.
4. Réaliser des traitements spatiaux simples directement dans le navigateur à l’aide de **TurfJS**.
5. Utiliser les événements de carte et les interactions utilisateur pour produire des comportements dynamiques.
6. Comprendre les bases d’une **architecture applicative modulaire** en JavaScript.
7. Déboguer plus efficacement une application webmapping à l’aide des outils du navigateur.
8. Réinvestir ces concepts dans le **TP3**.

---

## Idée centrale du cours

> Une application de webmapping avancée ne se contente pas d’afficher des données : elle réagit, calcule, filtre, interroge et transforme l’information en fonction du contexte d’usage.

Autrement dit, on passe :
- d’une **carte consultative**
- à une **carte interactive**
- puis à une **application géospatiale active**

---

## Logique pédagogique du cours

Le cours est structuré autour de quatre grandes dimensions :

### 1. Interface
Comment rendre l’application plus claire, plus lisible et plus manipulable par l’utilisateur ?

### 2. Interaction
Comment déclencher des actions en fonction du clic, du zoom, du déplacement ou du chargement de la carte ?

### 3. Analyse
Comment effectuer des opérations spatiales simples dans le web sans dépendre d’un traitement serveur complexe ?

### 4. Architecture
Comment organiser le code pour qu’il demeure compréhensible, réutilisable et maintenable ?

---

## Contenu du cours

## 1. Retour sur l’évolution du webmapping
- Rappel des notions vues précédemment :
  - HTML, CSS, JavaScript
  - GeoJSON
  - couches, sources, styles
  - services web
  - logique front-end
- Limites d’une carte web de base
- Passage vers une logique applicative plus riche

---

## 2. Architecture applicative d’une application cartographique
- Différence entre :
  - page web avec carte
  - démonstrateur cartographique
  - application webmapping structurée
- Principes de base d’une architecture plus claire :
  - séparation du HTML, du CSS et du JavaScript
  - découpage logique des fonctions
  - réutilisation
  - lisibilité
- Pourquoi modulariser ?
  - meilleure compréhension
  - meilleur entretien
  - moins de duplication
  - meilleure évolutivité

---

## 3. Débogage et inspection d’une application web
- Utilisation des outils de développement du navigateur :
  - inspecteur HTML/CSS
  - console JavaScript
  - onglet Network
- Identifier :
  - les erreurs de syntaxe
  - les problèmes de chargement
  - les fichiers manquants
  - les comportements inattendus
- Développer de bons réflexes de diagnostic

---

## 4. JavaScript modulaire et organisation du code
- Qu’est-ce qu’un module JavaScript ?
- Quand découper le code en fonctions ou modules ?
- Exemples de responsabilités qu’on peut isoler :
  - génération aléatoire de points
  - calcul de distance
  - buffering
  - jointure spatiale simple
  - comptage dynamique
- Intérêt pédagogique :
  - comprendre l’architecture par petits blocs
  - mieux tester chaque composante

---

## 5. Analyse spatiale dans le web avec TurfJS
Introduction à des opérations spatiales simples réalisables côté client :

- génération de points aléatoires
- calcul de distance
- création de buffers
- dissolve
- grilles hexagonales
- jointure spatiale simple
- agrégation ou comptage

L’objectif n’est pas de remplacer un SIG complet, mais de comprendre :
- ce qu’il est possible de faire dans le navigateur ;
- ce qui relève du front-end ;
- ce qui devient plus coûteux ou moins pertinent à mesure que le volume et la complexité augmentent.

---

## 6. Interactions avancées avec MapLibre GL JS
- Utilisation des événements de carte :
  - `load`
  - `click`
  - `move`
  - `zoom`
  - `idle`
- Déclencher une action à partir d’une interaction utilisateur
- Mettre à jour dynamiquement une couche ou une information affichée
- Interroger la carte :
  - `queryRenderedFeatures`
  - distinction entre ce qui est affiché et ce qui existe dans la source
- Produire une interface plus réactive et plus “applicative”

---

## 7. Gestion dynamique des couches
- Ajouter et retirer des couches
- Changer leur ordre
- Mettre à jour leur style
- Modifier l’affichage en fonction du contexte
- Comprendre qu’une application cartographique avancée repose souvent sur une logique de couches vivantes plutôt que statiques

---

## 8. Expressions avancées et logique de rendu
- Rappels sur les propriétés `paint` et `layout`
- Ajustement du style selon :
  - le zoom
  - les attributs
  - le contexte d’affichage
- Idée centrale :
  - la symbologie dans le web n’est pas seulement décorative ;
  - elle devient une partie intégrée de la logique de lecture et d’interaction

---

## 9. Limites, performance et choix de conception
- Quand éviter de tout faire côté client ?
- Effets de la volumétrie sur le rendu
- Arbitrages entre :
  - richesse fonctionnelle
  - performance
  - simplicité
  - maintenabilité
- Réflexe attendu :
  - choisir des fonctionnalités utiles plutôt qu’accumuler des effets

---

## Déroulement suggéré du cours

### Bloc 1 – Mise en contexte
- Qu’est-ce qui fait qu’une carte web devient une vraie application ?
- Exemples de comportements avancés :
  - compter dynamiquement
  - calculer des distances
  - générer des buffers
  - changer l’affichage selon le zoom
  - créer des interactions pilotées par l’utilisateur

### Bloc 2 – Présentation conceptuelle
- Architecture applicative
- Debug
- Modules JavaScript
- Analyse spatiale côté client
- Interactions avancées MapLibre

### Bloc 3 – Démonstration guidée
- Présentation d’une application exemple
- Lecture du code
- Identification des modules
- Lien entre interface, logique, événements et traitements spatiaux

### Bloc 4 – Atelier
- Manipulation directe du code
- Ajout ou modification de comportements avancés
- Réinvestissement dans le TP3

---

## Laboratoire – Webmapping avancé

Pendant le laboratoire, vous serez amenés à expérimenter plusieurs mécanismes avancés de webmapping, par exemple :

- changer l’apparence d’une couche selon le niveau de zoom ;
- créer une heatmap ;
- créer et styliser des clusters ;
- afficher des bâtiments en 3D ;
- utiliser des expressions avancées dans `paint` et `layout` ;
- utiliser TurfJS pour effectuer des traitements spatiaux simples ;
- manipuler les événements de carte pour déclencher des actions ;
- créer ou réorganiser des couches de façon dynamique.

Le laboratoire vise autant la **compréhension du code** que la **capacité à concevoir une logique interactive cohérente**.

---

## Lien avec le TP3

Le cours 13 constitue une étape importante du TP3.

L’objectif n’est pas seulement d’ajouter des fonctionnalités “impressionnantes”, mais de se demander :

- Qu’est-ce que l’utilisateur doit pouvoir comprendre ?
- Quelle interaction apporte une vraie valeur ?
- Quel traitement spatial est pertinent dans l’interface ?
- Quelle structure de code permettra encore de comprendre le projet dans deux semaines ?

---

## Questions directrices du cours

- Est-ce que ma carte réagit intelligemment ou seulement visuellement ?
- Est-ce que mon application aide à explorer, comparer, filtrer ou comprendre ?
- Est-ce que mes interactions servent un besoin réel ?
- Est-ce que je peux expliquer clairement où se trouve la logique de mon application ?
- Est-ce que mon code est encore lisible à mesure que l’application se complexifie ?

---

## Bonnes pratiques à retenir

- Une fonctionnalité avancée n’a de valeur que si elle sert la lecture ou l’analyse.
- La console du navigateur est un outil normal de développement.
- Plus une application devient interactive, plus la structure du code devient importante.
- TurfJS et MapLibre sont puissants, mais ne remplacent pas une réflexion sur l’architecture.
- Le bon webmapping avancé n’est pas celui qui en montre le plus, mais celui qui rend l’exploration plus intelligente.

---

## Préparation pour la suite

Ce cours prépare directement la prochaine étape :
- **stabiliser**,
- **structurer**,
- **diffuser**,
- **mettre en production**.

Autrement dit :
- **Cours 13** = construire plus intelligemment ;
- **Cours 14** = rendre diffusable ;
- **Cours 15** = évaluation.

---

## Ressources suggérées

- Documentation MapLibre GL JS
- Documentation TurfJS
- MDN Web Docs
- Exemples de styles dynamiques et d’interactions cartographiques
- Documentation des fonctions de debug du navigateur