# Laboratoire 13

[**Créer et styliser des clusters ]

[**Créer et styliser une carte de chaleur (heatmap) ]

[Créer et visualiser une couche de polygones extrudées]


##

## Prérequis : 

- Ouvrir github

- Ouvrir codespace 

- Faire un git pull

![](https://lh7-us.googleusercontent.com/9hrK7pezwX-pzGLmZk1KeKrhZUb_SgBHdQHds4rMzoltbJVQ6efTsd_e2F9sfO2lJfS7KWsU0oe3WQMkTM81GydJ7ptuw4tGbQ24uHfYUjF-SErZkCS6DURfQLVDUGoRqSZ4yxyCnfj-yNXoDthbCY4)

- Placez vous sur la branche “lab13”

Pour vérifier sur quelle branche vous êtes : 

![](https://lh7-us.googleusercontent.com/08sW5PuM3f5kprK6BiJSZK8a7cTKtTNjUDMfit4DM0xV_ZEyGtPS-ejtglOs_mKIPYoVTktMOWSmzThTsstVz5Y8-XX-oyjagnwO4z9cxx9Ji68Y4xA87-5PKcKbgIlBXKD9EHhHawFoHNPlSK-UTA4)

Pour changer de branche : 

![](https://lh7-us.googleusercontent.com/b44W6QobKZpsRNZgY-VKnrzFMCFiLiWPboughrE1N03HxcTdjZ6j_94EWv4t2IzQlSwl66oUuUl9Tuw4D5jpIzQw1gB5ORJQ7KN2GJZhb3InBVBJJYiP_C7YChv3uAW_qHBmRcNj2IUGQoD1hZivhPQ)

![](https://lh7-us.googleusercontent.com/ufoUaqK-MNtMK5CgtznmJF5gRDprdICFWjA95PAhAh74dF_2M5kED0IrbHHCEyDm_TgrsQACM1294Ql96j3Q51Jva4uR4DtUaybkw7hpJNcX2dcRI_Sld6lWC4MMuso7Qr-SdvSHCU7Vw5GTBPN8Hdg)

Une fois que vous avez basculé il est simple de le savoir

![](https://lh7-us.googleusercontent.com/Y8tcMADTDgOKYIyNZseMH4D63QoIntdU579-jLTRDQ5u5pmmUvZ_d8oNFyvLPkn4EEnNw_3Lq2FGXySJkQHyTwQuo5Tw1tdSysi9-qAlNBp2xJTkLL01Zm7xDp-R9nLmW0nsxA_e50W7q4aHSBwK0n4)

Si ce n’est pas déjà fait installer l’extension DOCKER (ctrl+shift+x) ou simplement sur l’icône de blocks sur le côté gauche

Chercher Docker et installer l’extension

![](https://lh7-us.googleusercontent.com/N9yCDW-jAUv0lDcWewiyzcHvlchxCYlRSE5kD1kLb85wJuaBumvlTSI5WkAxmE6hOLTNxXuwOw6D-rkeVLW_3NdPlTR8h1_enu0Mw3CAv8jIFWdIGrairejSznLbfH5m2EY79vWzFinH0csbwvv9meY)

!! Avant de lancer les containers applicatifs, assurez vous d’avoir copier coller le fichier .env.example , de remplir les variables d’environnement et de renommer le fichier en .env

![](https://lh7-us.googleusercontent.com/d880WbvMICx_3se8ET9EqyUCQhPJgDdbqDjNn-d6_QORpA3YhbS6VJeSlooBEeRnWQq1BeqpGLhMpIyWH5lx0JoJJarvl0tIvmYOkwBeyLe_CGa4--jKSd4RSOmvyxU2YaqY7EkpqqskPwOxBYrLIoU)

Monter les containers avec Docker compose up

Faites un clic droit sur le ficher .yaml et choisissez compose up

![](https://lh7-us.googleusercontent.com/_fyTBG6ks_M5d7seP2WWhqMSXSY-3yv_U67Zw7NGG7r8nrs_rahGDdPE-de3yG7yzee8VLR4DfpSIgdAe_1XoUR3263whXdf1P2bEhFMVhpM7z1THu1HAT8V-jVEVxFcsVKFAbiAtSqTPeEAO4nIk-8)

Vérifier que vous avez accès à la page web de l’Atlas en vous assurant que les containers soit tous au vert (sinon relancer les avec un clic droit Start ou Restart)

![](https://lh7-us.googleusercontent.com/fGO5_ORaqjd96iJFvVko84v1lilw1mpu7LJnpTNGzAZnD8CK-hNdlauUVen5X_7hYi89zuYYI7aTbzoMzw1l6h5ce9Akgh4xlZKvseVjyfSvKmt4YAlpwcXXy-LYhMVdvQ3LVaC8-X5NZUwbVHfvNSM)

Cela devrait ouvrir un nouvel onglet avec l’atlas


![alt text](image.png)

### Objectif du laboratoire

Ce laboratoire a pour objectif de vous faire pratiquer l'architecture d'une application web cartographique avec MapLibre GL.

Vous allez apprendre à :

- structurer le code en modules JavaScript séparés,
- charger une source GeoJSON et ajouter des couches MapLibre,
- créer des visualisations de clusters, de heatmap et d'extrusion 3D,
- connecter vos modules à la page `index.html` et à des boutons d'interface.

Cette page n'est pas un tutoriel étape par étape. Elle donne les grandes lignes et les éléments essentiels à implémenter pour tester votre montée en compétence.

Pour réussir ce laboratoire, procédez par étapes :

1. Créez un module distinct pour chaque visualisation.
2. Ajoutez les scripts correspondants dans `index.html`.
3. Vérifiez que les sources et les couches sont correctement déclarées.
4. Testez chaque fonction dans le navigateur et corrigez les erreurs.

## Exercices du laboratoire

Le dossier `Atlas/app/lab13/exercices` contient trois exercices et leurs solutions :

- `exercice1_Clusters.js`
- `exercice2_Extrusion.js`
- `exercice3_Heatmap.js`
- `SOLUTION_exercice1_Clusters.js`
- `SOLUTION_exercice2_Extrusion.js`
- `SOLUTION_exercice3_Heatmap.js`

Chaque fichier d’exercice contient des `TODO` à compléter. Les solutions sont fournies pour vérification.

### Exercice 1 : Clusters
![alt text](image-1.png)
Ouvrez `Atlas/app/lab13/exercices/exercice1_Clusters.js` et complétez les TODOs pour :

- configurer la source `clusters-source`
- activer le clustering sur `randomPoints`
- définir les styles `circle-color` et `circle-radius`
- styliser les points non clusterisés

Ce travail permet de comprendre :

- l’ajout d’une source GeoJSON
- le clustering MapLibre
- l’utilisation des expressions `step`
- les filtres `['has', 'point_count']` et `['!', ['has', 'point_count']]`

### Exercice 2 : Extrusion 3D+

![alt text](image-3.png)

Ouvrez `Atlas/app/lab13/exercices/exercice2_Extrusion.js` et complétez les TODOs pour :

- utiliser la source `union-source`
- appliquer `fill-extrusion-color`
- construire une interpolation de zoom pour `fill-extrusion-height`
- construire une interpolation de zoom pour `fill-extrusion-base`
- régler `fill-extrusion-opacity`

Ce travail permet de comprendre :

- l’utilisation d’une source fusionnée
- la création d’un effet 2.5D avec `interpolate`
- la liaison entre propriétés de données et styles MapLibre

### Exercice 3 : Heatmap

![alt text](image-2.png)

Ouvrez `Atlas/app/lab13/exercices/exercice3_Heatmap.js` et complétez les TODOs pour :

- ajouter la source `heatmap-source`
- configurer `heatmap-weight`, `heatmap-intensity`, `heatmap-color`, `heatmap-radius` et `heatmap-opacity`
- utiliser `['heatmap-density']` pour le dégradé de couleur
- définir un dégradé froid->chaud

Ce travail permet de comprendre :

- la création d’une couche `heatmap`
- les expressions `interpolate` sur `zoom` et `heatmap-density`
- les ajustements de rendu par densité

### Vérification

Comparez votre code avec les fichiers solution :

- `SOLUTION_exercice1_Clusters.js`
- `SOLUTION_exercice2_Extrusion.js`
- `SOLUTION_exercice3_Heatmap.js`

Ces solutions permettent de valider vos réponses et de comprendre les bonnes pratiques.

### Pratique recommandée

- Travaillez exercice par exercice.
- Ne modifiez pas les noms de sources ou de couches sans raison.
- Vérifiez chaque erreur dans la console du navigateur.

Beau travail ! Vous êtes maintenant en train de faire des exercices alignés avec les fichiers présents dans `app/lab13/exercices`. 💪