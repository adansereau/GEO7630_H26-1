# Laboratoire #5 – Intégration et visualisation de données LiDAR 3D et tuiles vectorielles

> **Cours : GEO7630 – Intégration et visualisation de données géographiques**  
> **Outils : FME Workbench + MapLibreGL (HTML local)**  
> **Sortie attendue :** un fichier GeoJSON `bati3d.json` visualisable dans `MaplibreGL.html`

---

## Objectifs

À la fin de ce laboratoire, vous serez en mesure de :

- Importer et nettoyer des nuages de points LiDAR (.LAZ).
- Simplifier un nuage de points pour des usages de visualisation (performance).
- Découper spatialement un nuage de points avec un masque (limites terrestres).
- Ajouter la **couleur** d’un raster géoréférencé à un nuage de points.
- Convertir un nuage de points en **vecteurs ponctuels**.
- Joindre des propriétés de points (Z, couleur) à des polygones de bâtiments.
- Exporter un résultat **web-ready** (GeoJSON) et le visualiser dans **MapLibreGL**.

---

## Données

### Télécharger les données du laboratoire
[Lab3 data.zip](https://drive.google.com/file/d/1GNEDPSGwSdACGDY3BhyQMRrtKXjtsQb2/view?usp=drive_link)

Dézippez les données sur votre ordinateur.

---

## Table des étapes (raccourcis)
*(liens conservés tels quels)*

- [**Étape 1 Importation et nettoyage des nuages de points** **2**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.ec8u3bf6aztu)  
- [**Étape 2 Importation des limites terrestres et découpage du nuage de points** **5**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.fvbp9sj6bfxr)  
- [**Étape 3 Simplification du nuage de points** **7**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.7ijt6xek4lo)  
- [**Étape 4 Ajout de rasters géoréférencés** **8**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.23l8rlxg5p8f)  
- [**Étape 7 Ajout des empruntes et details de bâtiments** **12**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.mtbwt3oe7v)  
- [**Étape 8 Jointure des propriétés du nuage de points dans les polygones** **14**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.vj3u30n7iutj)  
- [**Étape 9 Visualisation du résultat dans MaplibreGL** **18**](https://docs.google.com/document/d/1v81pjhVysjacqn6m2l1XIWvUth7V6NP-aAYUAcyTJhI/edit#heading=h.hctb93vskptd)

---

# Préparation

## Étape 0 – Ouvrir FME et préparer votre workspace

1. Ouvrez **FME Workbench**.
2. Créez un nouveau workspace.
3. Sauvegardez-le dans votre dossier de lab (ex. `Lab3/` ou `Lab5/`).

> **Astuce pédagogique :** dès que votre workspace commence à grossir, ajoutez des *bookmarks* et nommez vos transformateurs (ça évite les erreurs de branchement).

---

# Partie 1 – Importation et préparation du nuage de points

## Étape 1 – Importation et nettoyage des nuages de points

### 1.1 Importer 6 tuiles LiDAR (LAZ)
- Ajouter les 6 nuages de points suivants avec un **_LAS READER_** :

**Description (ce que ça fait)** : lit des fichiers LAS/LAZ et produit un **nuage de points** exploitable dans FME (géométrie point cloud + attributs LiDAR).  
**Pourquoi on l’utilise ici** : démarrer la chaîne de traitement à partir des tuiles sources (6 tuiles = couverture suffisante pour l’exercice).

<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5041_2015.laz>  
<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5040_2015.laz>  
<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/301-5039_2015.laz>  
<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5041_2015.laz>  
<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5040_2015.laz>  
<http://depot.ville.montreal.qc.ca/geomatique/lidar_aerien/2015/300-5039_2015.laz>

![](https://lh7-us.googleusercontent.com/66ouBHxSYE_PTv5WKyORHmg0Nys_Be5EIXgqOsHaVVE3QqjthaVocqrPDkV4FHH-1DxR4qM96qgzbKGCjYeZW9OZqYHTR7TqwmfPZkoL-SA-lIMR1c8CaW6usu6aiPYAmnP1KepHwTcC5H2XlAG6OUc)

### 1.2 Réduire la densité (Thinner)
- Ajoutez sur chacun des reader un **_Thinner_** avec un filtre de **30**.

**Description (ce que ça fait)** : sous-échantillonne un jeu de points en ne conservant qu’un point sur *n* (selon un pas/intervalle).  
**Pourquoi on l’utilise ici** : réduire très vite la quantité de points pour **accélérer** les étapes suivantes (combinaison, reprojection, clipping).  
> **Note** : en contexte “production”, un **PointCloudSimplifier** conserve mieux la forme, mais coûte plus cher en calcul.

![](https://lh7-us.googleusercontent.com/uPxJD93bMx_fgIh885Nv5KNKEtKuht0Ps44bYujG1_oD_Y15ez3WUUIPlo7qQNXNLhZNWQW3FZmlr1erYb8y1iJTSpow0ORxmBGfG1nRKKuQ8AsPi9VRyItNQFnGJexV1JyPCdOkx8A33o1YjzdE0Rs)

### 1.3 Fusionner les 6 nuages en un seul
- Ajoutez ensuite un **_PointCloudCombiner_** pour combiner les 6 nuages de points en 1 seul.

**Description (ce que ça fait)** : agrège plusieurs nuages de points en **un seul** nuage (utile pour travailler “comme si” on avait une scène unique).  
**Pourquoi on l’utilise ici** : simplifier la suite (un seul flux à clipper, coloriser, filtrer) plutôt que 6 branches parallèles.

![](https://lh7-us.googleusercontent.com/dFGgWLowyBsxyJ2iXsDWvpMhdlEaNLhAsq6042M19VYcfpDUsS9bwYhl2prkkqvyzbPR_6XYeezNuH1MQxSIhAi9VEJ90HAl6cBid_qJnggya2y51Zv1MTrjL76ZT1iK0J4uDJuOs-GJX5-gTwIs2PU)

### 1.4 Reprojeter le nuage
- Ajoutez un **_EsriReprojector (2950 to 3857)_**.

**Description (ce que ça fait)** : reprojette les coordonnées d’un système à un autre (ici **EPSG:2950 → EPSG:3857**).  
**Pourquoi on l’utilise ici** : garantir que **toutes** les données (limites, rasters, bâtiments, points) se superposent; sinon les *Clipper* et *Overlayer* peuvent produire des résultats incohérents.

![](https://lh7-us.googleusercontent.com/HxBbiP7aCiqwFWur3T0tGanpRMua7-aT0nWLqakoet0R4XbSlNo2bShR8oqnLBSr9DCMIbw6GftNPEQ6itebl6teUItEOoLBH3CnjSejsrkiWft-khYCHBC-Bpmxi3W9U4jElvRmbNACwV_BTWXXS-g)

### 1.5 Vérification visuelle
- La première étape devrait ressembler à ça :

![](https://lh7-us.googleusercontent.com/yg066t3u4So_8TyXSTCVBHc2qRrYy937-S_wip9q2_GEtg1qdu8iMy0Ca-AIZEvFlzVkyqEOgVRqbBhKoexd7ed6NzzzcgFxQDlFqTEmbI96oP4LlFKfgqKEXGAsgrgcIJLYWUQduq_5gU4paNZ6zy0)

![](https://lh7-us.googleusercontent.com/GhmM_A88n-cRnqInpRhcVM2m_pO8tI6uTu7QSZuYbaWUs1TF0-rEaWKEY2FaRor4RmqLOePh1AVnTDOs3Jw_iSmeCHQaXbWqUpa0BNyrSvQLKzMHNIH9phpVPlEiUf3b4h73Ujt5f0PkdVruFSuHsv0)

---

# Partie 2 – Masque spatial (limites terrestres) et découpage

## Étape 2 – Importation des limites terrestres et découpage du nuage de points

### 2.1 Lire les limites terrestres (GeoJSON)
- Ajoutez un **_GeoJSONReader (URL)_** puis un **_Reprojector 4326 vers 3857_**.

**GeoJSONReader (URL)**  
- **Description** : lit un GeoJSON à partir d’un fichier ou d’une URL.  
- **Pourquoi ici** : récupérer un *masque* officiel (limites terrestres) sans devoir stocker un fichier local.

**Reprojector (4326 → 3857)**  
- **Description** : transforme les coordonnées d’un SRID à un autre (ici degrés → mètres).  
- **Pourquoi ici** : aligner les limites terrestres sur le SRID du nuage (3857) pour que le clipping fonctionne correctement.

Datasource :  
<https://data.montreal.ca/dataset/b628f1da-9dc3-4bb1-9875-1470f891afb1/resource/92cb062a-11be-4222-9ea5-867e7e64c5ff/download/limites-terrestres.geojson>

![](https://lh7-us.googleusercontent.com/IPNdPRfDGknF1S-Lhgn59ouBnxR8LB_s-aQWFsz5xFyiwU0G4n9HZPaWRstBYk5m1jShhWRwa9-4wrTkS-ysGNejOyMnWlrGCIYTgNgKd1G3DPfSjpOk4iEUpd_deKKPVSQuqGuBdnBDhrDWfr8fMEs)

### 2.2 Clipper – enlever les points hors zone terrestre
Ajoutez un **_Clipper_** pour découper le nuage de points avec la limite terrestre.

**Description (ce que ça fait)** : garde (ou exclut) les géométries **à l’intérieur** d’un polygone “couteau” (*Clipper*), appliqué sur des entités “coupées” (*Clippee*).  
**Pourquoi on l’utilise ici** : enlever les points hors zone terrestre (ex. eau) pour éviter de traiter/visualiser des points “inutiles”.

![](https://lh7-us.googleusercontent.com/-sm6WVWrxln3Pt3JiZ7epnFUHwFsd2RDpn43bWL0vm8pPPNKs-lYCTSuJPN2mN712oGVJMGfT0wzvbQHkhHAR9xtWIkuJIcWogD0epaHgqLC0N-hBHZbwyMgtwd5B1ckHmniJpZ-qOHQVrqxxFHcox4)

Cela devrait ressembler à ça :

![](https://lh7-us.googleusercontent.com/MZaeZyFpEVmZ4yy2ZTxOZ4OQ4uQKTr_rpBzVX3QeqWVIu9EMNz0tyyHBZeR_gsXATW-1Pp2hawRGvR0GP6wc9FTFL4ZQOY6jiX9haFQGPYJzo8RMlhO-bnVJXnwj_JNX7Vwyhftf7IM0VNOhRjw_4vE)

> **Connexion importante :**  
> - Connectez le nuage de points combiné comme **_Clippee_**  
> - Connectez les limites terrestres comme **_Clipper_**

---

# Partie 3 – Simplification additionnelle

## Étape 3 – Simplification du nuage de points

Ensuite, refaites un **_Thinner_** avec un interval de **5** pour encore simplifier le nuage de points.

**Description (ce que ça fait)** : deuxième sous-échantillonnage (plus léger que le premier).  
**Pourquoi on l’utilise ici** : l’étape de colorisation raster + conversion en points peut générer **beaucoup** d’entités; on fait donc une simplification supplémentaire pour garder une exécution raisonnable sur les postes étudiants.

> **Note :** normalement nous devrions effectuer un **_PointCloudSimplifier_** (plus fidèle) mais le processus est très gourmand en calcul. Pour les besoins de l’exercice, on utilise un thinner.

![](https://lh7-us.googleusercontent.com/8cQECWVO1TNpBxQOEsQE9ma6C8-IySSWWYz6_au56SR5Q3wekwsFc5FnOw0dabduroL-X9GMIIgGNVx51tYfAK5ftpk6W9rOtgIDvSQTQW1z2SxYI0ypALAZOxRZpUh4zVENYxPCRa01OrizvWi6wes)

![](https://lh7-us.googleusercontent.com/0FW3mNs_vIZGtbIKKSx28GJDv7dtzV3jhshTwGRn9w3ovOlFwnjDNQk0brMtqH8W6UBT2P5YJ9ABH2WaiwPab096YcywXbx9Ea_TuwrZMB-RY_mZj4wMr6LHEQF2gxeuCOEjCDW4xFmk4UB1VhM7YKg)

---

# Partie 4 – Ajout de rasters géoréférencés et colorisation du nuage

## Étape 4 – Ajout de rasters géoréférencés

Cet ajout nous permettra d’ajouter la couleur du raster à notre nuage de points.

### 4.1 Importer les 4 rasters
- Ajouter les 4 rasters d’un seul coup en sélectionnant les 4 et en faisant un drag and drop.

**Description (ce que ça fait)** : ajoute des *readers raster* (GeoTIFF/COG/etc.) dans le workspace.  
**Pourquoi on l’utilise ici** : le raster contient l’information de couleur (RGB) que l’on veut transférer aux points LiDAR.

![](https://lh7-us.googleusercontent.com/HTSW57OgRWy9GOKRyjdg7hu6TWMF2LQNTLbuPK1PJdeIplzIRnR_Bt84-2jDMlr_xd67kFjPm2l6XyQjGM2Knvgxfnz2mua9wRS5t2iGb5X3oIMWV6YQvuPbbarDT3BqBmpYv9WXpuq-qWQL3dVQHYI)

### 4.2 Reprojeter le raster (pour mosaïque et jointure)
- Ajoutez un **_Reprojector_** 3857 vers 32188 (équivalent au 2950 mais au standard de reprojection FME)

**Description (ce que ça fait)** : reprojette un raster, en conservant sa géoréférence.  
**Pourquoi on l’utilise ici** : certains traitements raster (mosaïque/alignement) sont plus stables quand les données sont dans un SRID local métrique (32188).

![](https://lh7-us.googleusercontent.com/T_XPW-r7g1bUtI10NwgUU8PwTF-uQbu4AKCEE-QFmCMiEpKOVGdzdCffQiQ17Pj8-EghCF7T1ZL3fu2B11dE3AU3Bi9OSh-bgzQB1T1_8Dd6rcVmVr1E_rWnmEC2NIF0G2hewR92cJwev7ATgKWfMS8)

### 4.3 Mosaïquer les rasters
- Ajouter un **_RasterMosaicker_**

**Description (ce que ça fait)** : fusionne plusieurs rasters adjacents en une **mosaïque** (un raster logique).  
**Pourquoi on l’utilise ici** : éviter d’échantillonner 4 rasters séparés lors de la colorisation des points (on échantillonne une seule mosaïque).

![](https://lh7-us.googleusercontent.com/CPZILLgAC38pJU5MeZP40n8MIzzCb0b6uVFKB21r0hSYe6dVprqT8bKo672u27MMxeP6RwCLR4Gkuk0o6qFZIXge22iOJvsKlQBJ4kual4A0gL5ochyuWnmm4mnHNWUow-LGtJRWFXKz1_e7tfElYe8)

### 4.4 Retirer la bande alpha (garder RGB)
- Ajouter un **_RasterSelector_** pour choisir les 3 bandes RGB et supprimer la bande alpha.

**RasterSelector**  
- **Description** : sélectionne (ou réordonne) des bandes raster (ex. garder 1-2-3 et supprimer la bande 4).  
- **Pourquoi ici** : la bande alpha (transparence) n’est pas utile pour coloriser des points; on ne garde que R, G, B.

#### Pour identifier les bandes
- Vous pouvez ajouter un **_RasterPropertyExtractor_** et brancher un **_ListExploder_** sur la propriété **BAND**.

**RasterPropertyExtractor**  
- **Description** : extrait des métadonnées d’un raster (nb de bandes, noms, types, etc.).  
- **Pourquoi ici** : vérifier quelle bande correspond à quelle composante (R/G/B/A) avant de configurer le RasterSelector.

**ListExploder**  
- **Description** : “déplie” une liste en lignes/entités (une entrée = une entité).  
- **Pourquoi ici** : rendre lisibles les infos de bandes (pour inspection rapide dans l’Inspector).

![](https://lh7-us.googleusercontent.com/4r23dFIHL_5dOnv7mGaMeuhtkdBjOzvswBWLmHszyi0j03XjJCht-u4JoQcpKxcMfQZ7yz_9gHLFpzdsPRcCmVhkk0Oru2_3vjKXPXeV3k4zrQHKqQZyI2sV8INRqrvMoElsD3SmTNdrvgTkSAL4ji0)

- Maintenant paramétrer le **_RasterSelector_** pour ne pas sélectionner la bande alpha.

![](https://lh7-us.googleusercontent.com/-QKH3JugKwp_mB2nsplElpVWJKJZGpzbPyQ8yKEbOT5TLL221e2BthY1BBaKFpHEAakSJh-U33UijSiWjW3cll95XETgAzbl16sOPI1cfaE6Ea6P2fWT2USdY-PcNm_DTWid7djn7c8sSir42oTtGGI)

### 4.5 Reprojeter (cohérence avec le nuage)
- Ajouter un **_EsriReprojector (2950 to 3857)_** avec les mêmes paramètres que celui de la première étape.

**Description (ce que ça fait)** : reprojette pour revenir dans le SRID de travail.  
**Pourquoi on l’utilise ici** : la colorisation et la suite du workflow (bâtiments/limites) se font en 3857; on ré-aligne donc le raster avec le nuage.

---

## Étape 5 – Jointure raster et nuage de points (ajout de couleur)

### 5.1 Injecter les valeurs RGB dans le nuage de points
- Ajoutez la couleur dans votre nuage de point en ajoutant les valeurs du raster avec un **_PointCloudOnRasterComponentSetter_**.

**Description (ce que ça fait)** : échantillonne un raster au droit de chaque point (ou cellule pertinente) et écrit ces valeurs dans des **composantes** du point cloud (ex. `color_red`, `color_green`, `color_blue`).  
**Pourquoi on l’utilise ici** : transformer un nuage LiDAR “gris” en nuage “colorisé” pour une visualisation 3D beaucoup plus interprétable (bâtiments, routes, végétation, etc.).

![](https://lh7-us.googleusercontent.com/dY5JIHwi1UcLAuXYLbpn4alqUpEUiTt3aE6AUo1YxCSbqz5BZGTsyqg9RpeEiP9m6GS-sh1_V97KA1WvxPrfSb99y_2nln2OpK08hVS9hGy7IxothGPjo5Z0SwJs3qQnQq4xElvs32XAO-Bpkpd300o)

### 5.2 Combiner en un seul nuage
- Ensuite on va combiner le résultat en 1 seul nuage avec un **_PointCloudCombiner_**.

**Description (ce que ça fait)** : regroupe à nouveau le point cloud (après traitement) en un flux unique.  
**Pourquoi on l’utilise ici** : éviter des sorties multiples et faciliter l’étape de filtrage et de coercition vers points.

![](https://lh7-us.googleusercontent.com/ssQblD32O8prpS71bphTf0P213rN1n8TyCaFOkrBEGCabU-zvm2qHUif2MWvlv6kQ2K1AUjfTyzeThR3Y_XOWY0FrdLza-xhWVVWHFD2BM1EjR5_fWnR_N2k6C09eksLJbu6rCwUmQ7NB7aw-9NRYg0)

### 5.3 Filtrer les points sans couleur
- Filtrer les valeurs du nuage de points dont le raster n’a pas donné de valeur avec un **_PointCloudFilter_**.

**Description (ce que ça fait)** : conserve/retire des points selon une expression (sur composantes ou attributs).  
**Pourquoi on l’utilise ici** : supprimer les points qui n’ont pas été correctement colorisés (souvent hors emprise raster, ou nodata), ce qui améliore la qualité et réduit le volume.

![](https://lh7-us.googleusercontent.com/7nzoKWPp2C2YA8CMAM7loWax6oBex6rxHpP_QHH46DawIJL67kpLHjIn8drdNBsWqujQSbIbcwle4ZbgEwr7wphRs6_GjkdAho0dmPAaiI-XJCEbJRCXeqMzp9tIiML-GW46JHPG8vb441H6tAHg1H4)

Pour filtrer, on va choisir les valeurs RGB qui sont toutes à 0 avec l’expression suivante :

_@Component(color_red)!=0&&@Component(color_blue)!=0&&@Component(color_green)_

> **Astuce :** si vos résultats semblent trop “vides”, vérifiez l’ordre des reprojections (raster/points) et la couverture spatiale du raster.

### 5.4 Convertir le point cloud en points vectoriels
- Transformer le nuage de points en couche de vecteurs ponctuels simple avec un **_PointCloudCoercer_**, en s’assurant de garder les composantes nécessaires pour la suite.

**Description (ce que ça fait)** : convertit un nuage de points (format point cloud) en **entités ponctuelles** classiques (points).  
**Pourquoi on l’utilise ici** : les opérations vectorielles (ex. *PointOnAreaOverlayer*) travaillent sur des points “standard”; on prépare donc un flux compatible pour joindre aux bâtiments.

![](https://lh7-us.googleusercontent.com/gXoXzzjs3Xec8DlKjAYbpmKdQ89hN70P7B5pd-byRRcjq4qC9fHf5SBMDuBXGO0mBoHc2JXR9MYV6m76ElEal871acKt3K96dOrh09t0P-Ebda6sk1TvqCzBLWtr1u1yImcr8pe3ld2o1qE2LVVPuoY)

---

# Partie 5 – Bâtiments (empreintes + détails)

## Étape 6 – Ajout des empreintes et détails de bâtiments

Maintenant que le nuage de points est nettoyé et préparé, nous allons assigner le Z et la couleur aux polygones de bâtiments.

### 6.1 Importer les shapefiles bâtiments
- Ajoutez 2 **_sources shapefiles_** :
  - empreintes de toits (**polygones**)
  - détails de toits (**lignes**)

**Description (ce que ça fait)** : lit des données vectorielles (SHP) et les convertit en entités FME.  
**Pourquoi on l’utilise ici** : les empreintes servent de “support” pour calculer une hauteur/couleur moyenne par bâtiment.

### 6.2 Reprojeter en 3857
- Reprojetez 2950 en 3857 avec un **_EsriReprojector_**.

**Description (ce que ça fait)** : reprojection des vecteurs.  
**Pourquoi on l’utilise ici** : même logique que pour le nuage—toutes les données doivent être dans le même SRID pour clipper/couper/jointer correctement.

![](https://lh7-us.googleusercontent.com/tbGFMnju_4meRi0rIcXORKSCvnPk61TPP-lN4z1am2Hcv02h6jUI3ngG4nWik-A9pScoffFYjg8sf7PpOrhYpOZYZkYq8pf8gXndIrehKBHgJ6aXl4PeDxmsxg3kVEjhc3OXV3crGuXK8hrXwJysHgM)

### 6.3 Calculer le bounding box du nuage de points
- Calculez le bounding box du nuage de points avec un **_BoundingBoxAccumulator_**.

**Description (ce que ça fait)** : calcule une emprise (minX, minY, maxX, maxY) à partir des entités en entrée.  
**Pourquoi on l’utilise ici** : découper les bâtiments à l’emprise du nuage (on évite de traiter des bâtiments qui n’ont aucun point LiDAR associé).

![](https://lh7-us.googleusercontent.com/Lwj4XiibgY6n1KKC5WoinqhOR6L4x5KuZYRhXoeDlZgxfr0XpZuUCf-cln_Lc3pGSg6wgnNP9150sY5L3C63Om-4tS0ETlCesdtRU7J2EUJVPbRMxyqW6Xlzb626KqwqoDD1SIhLSs-wSvyMku1qzY4)

### 6.4 Découper les polygones et lignes à l’emprise du nuage
- Ensuite on découpe avec un **Clipper** les polygones et les lignes.

**Description (ce que ça fait)** : même principe que précédemment, mais appliqué ici aux bâtiments (polygones/lignes).  
**Pourquoi on l’utilise ici** : limiter le volume et éviter des bâtiments hors zone, ce qui améliore la performance des étapes de jointure.

![](https://lh7-us.googleusercontent.com/l0mLLFfaY4OgeydT79M2fw8X6sQyRuncaRiPYybGVCMFeM4btoKma-93Js501WAIhC7oCE-ZRTBIrK3FFrvFte8gMA8VQ94xmscT5Oy1UPue3QarQwSJgk-kRyk3Ig6gyxJtTGFyr0N-d1aFOCH3Buk)

### 6.5 Découper les empreintes avec les détails (PolygonCutter)
- Et on découpe les empreintes de toits avec les détails avec un **_PolygonCutter_** issu du **_FMEHub_**.

**Description (ce que ça fait)** : “coupe” un polygone avec des lignes (détails), créant des sous-polygones plus détaillés.  
**Pourquoi on l’utilise ici** : obtenir une géométrie de toit plus fine (meilleure lecture visuelle et meilleure attribution de valeurs sur des sous-parties du bâtiment).

![](https://lh7-us.googleusercontent.com/JXIDSTYuqF8FWJjShtxP8P5FrgTc0j00tBp4tLdW9mRYiqBR_A7BA4fSnVMpy34lEK6unrrqAAc7k9AUIIOiz12DVtXPFzYIKgWW7yUGhftmFwGZuxektR3__FebfhDpzeV6de_lN9p2MeWB_MR9cz0)

---

# Partie 6 – Jointure points → polygones et calculs (Z + couleur)

## Étape 7 – Jointure des propriétés du nuage de points dans les polygones

### 7.1 PointOnAreaOverlayer (points dans les polygones)
- Joindre les polygones détaillés avec les points du nuage de points pour injecter les valeurs de Z et de couleur du bâtiment avec un **_PointOnAreaOverlayer_**.

**Description (ce que ça fait)** : associe des points à des polygones (point-in-polygon) et peut **accumuler** des attributs des points dans le polygone (souvent sous forme de listes).  
**Pourquoi on l’utilise ici** : transférer des infos “mesurées” (Z + couleur des points) vers une entité “bâtiment” (polygone), pour ensuite calculer des indicateurs par bâtiment.

![](https://lh7-us.googleusercontent.com/L3wJJlMpCKsN00qPn145q-32yL5CDj1LDRM6597u9TRDGGh7yg-BI5mZHb_lsy5W0uh38eeyDKgev_OFx6Fhh_wg1pMIVol_W6PzI2OmcL4EzhUagpBkWiULS4ai1fM3gjPM-GbvSYO2Rr4Wb3zShhE)

> **Attention :** ici on va accumuler des listes (Z et couleurs) afin de calculer ensuite des **moyennes** par bâtiment.

![](https://lh7-us.googleusercontent.com/CHrUVIyQiJ4RQsXYnmV44_ZXHH04Vz9aOL5e8ANcIf4K7RkfrImGwhs8GDzHlWO-x0WDGT5kTmHUrQQt-_gZOglQJKeVSH6DPe-fY5vf2cVhCacRN7RUK5D6ReeIMBJ6XR3Be1zA5_3kg5Znle5jzRU)

### 7.2 ListSummer
- On ajoute un **_ListSummer_**.

**Description (ce que ça fait)** : somme les valeurs d’une liste (ex. somme des Z, somme des R, etc.).  
**Pourquoi on l’utilise ici** : préparer le calcul de la moyenne : on a besoin de la somme et du nombre d’éléments (overlaps).

![](https://lh7-us.googleusercontent.com/_CWB0XRv0pAGYY61VkwLLCbvCRBm__TvLDdwEZpKcL9V2RrxnPl5rgT7cZCtrIht0-OGcdCEF8NZeKvnYQhIAEvXM8ZwddYvy3AvqXuCBOxKeNKa1by5rL1aoXb5WSlpEjx5M4lV0lzLrrJIPr9qMFs)

### 7.3 Calcul de la moyenne (AttributeCreator)
- Créez un attribut pour calculer la moyenne avec **_AttributeCreator_** :

_@Evaluate(@round(@Value(_sum)/@Value(_overlaps),4))_

**Description (ce que ça fait)** : crée/modifie des attributs via une expression FME.  
**Pourquoi on l’utilise ici** : transformer “somme + nombre de points” en “moyenne par polygone” (hauteur/couleur moyenne).

![](https://lh7-us.googleusercontent.com/Gi5WueaqKExbrubiyFnXUQWjV-0T34DTgLW_3FZx5htw_t1zY1fkXj2xIm8s3V5biMKsKbEfYIrbo1f0PSxl3MFezCQ8Toln3m7wm_5ZV_zNN1el2rAJfO6z9J0ZMkq_b4-pAuZSSn9kzTzatZqukew)

### 7.4 Ménage des attributs (AttributeManager)
- Garder seulement les 2 propriétés nécessaires avec un **_AttributeManager_**.

**Description (ce que ça fait)** : conserve/renomme/supprime des attributs pour ne garder que l’essentiel.  
**Pourquoi on l’utilise ici** : un GeoJSON propre et léger = plus simple à valider, plus rapide à visualiser dans le navigateur.

![](https://lh7-us.googleusercontent.com/orxTHrgymT1A0Cclwm2thQu2bPg1IT9kGtIwgIcj9Dc20uq5dJtAn8HrPLMfUmuhkP2vD7jhDaRfL6ZLEXZlEx4Pe22eYJ4Idh4ZdCVeNIjSol1G-r1yBlfXnLxlgEAiGhImb0i6PyBOtNlScEgvXJ0)

### 7.5 Convertir la couleur (ColorConverter)
- Transformer le **FME color** en **RGB/WebRGB** avec un **_ColorConverter_** (FME Hub).

**Description (ce que ça fait)** : convertit une représentation de couleur vers une autre (ex. format interne FME → RGB/WebRGB).  
**Pourquoi on l’utilise ici** : MapLibreGL attend généralement des couleurs au format web (ex. `rgb()` ou valeurs compatibles). On prépare donc une sortie “web-friendly”.

![](https://lh7-us.googleusercontent.com/3VkoCVpup8vkkWzsLU8Jpn494jQvJqRP1RXmnekJrS0042TAO8JCKJBi-_Wn57Y2i_iH64jDLFC6brQT2C6yPiZ0v4Og5Bv1bJx0D3ztHFX-Do8nG2dtL7G2IQVUdoJzdFXYbDCftnMy0x91Nracsao)

---

# Partie 7 – Export GeoJSON

## Étape 8 – Exporter le résultat

- Exportez votre résultat avec **_GeoJSONWriter_** dans le répertoire :

- _…/Lab3/results/bati3d.json_

**Description (ce que ça fait)** : écrit des entités vectorielles en GeoJSON (géométrie + attributs).  
**Pourquoi on l’utilise ici** : GeoJSON est un format simple, portable et directement consommable par un viewer web (MapLibreGL).

> **Important :** gardez ce nom exact (`bati3d.json`) pour la visualisation MapLibreGL de l’étape suivante.

---

# Partie 8 – Visualisation dans MapLibreGL

## Étape 9 – Visualisation du résultat dans MapLibreGL

### 9.1 Ouvrir le dossier Lab3
- Ouvrez un navigateur de fichiers et allez dans le dossier **Lab3**.

![](https://lh7-us.googleusercontent.com/JxIYzt5TN3UjtUMvA7IRAJMpV1nVFtXdisooujNIkqRPptpH6sfMHKF_gC6TQNo-ZxONr3BzImH_6WrrSCo7ECjpEKCsAHiKS_i8FLEzUdCx7sQ-GM8tF5vNZ7wDSVHq9JWPT2gpau4Bb66NMFClEIs)

### 9.2 Ouvrir le viewer HTML
- Ouvrez le fichier `MaplibreGL.html` en double cliquant dessus dans le répertoire :  
  `/Lab3/results/MaplibreGL.html`

### 9.3 Importer le GeoJSON
- Cliquez sur le bouton **Importer** en haut à gauche et choisissez `bati3d.json`.
- Vous pourrez ensuite naviguer et visualiser les bâtiments à votre guise.

![](https://lh7-us.googleusercontent.com/s1UkxWdJdUFiHNL-LoGJpg41PGyKRZRfxw8hyvnpT_t6A6jSDJy1dI6zvEge5imZCjWLaOVXyY2OLx6A151Dv0xbxHrK5RjZRBk4JZBjee4SgSNiMjiB0DLeDPrucKKNA-7FTn19d7OjT0-5oT5hVwo)

---

# Contrôle qualité (rapide)

Avant de remettre / valider votre travail :

1. **Le clipper** enlève-t-il bien les points hors zone terrestre ?  
2. Le nuage de points **a-t-il des composantes `color_red/green/blue`** après la jointure raster ?  
3. Les bâtiments ont-ils une hauteur moyenne plausible (Z moyen) ?  
4. Le GeoJSON s’importe-t-il correctement dans `MaplibreGL.html` ?

---

# Mini-exercice (à faire sans outil)

Expliquez en 1–2 phrases :

- Pourquoi on utilise un **Thinner** deux fois (30 puis 5) ?
- Pourquoi on filtre les points où RGB = 0 ?
- Pourquoi on calcule une **moyenne** sur Z et couleur plutôt qu’un max ?

---

# Récapitulatif des transformers (mémo)

| Étape | Transformer | Description (sommaire) | Pourquoi ici (décision) |
|---|---|---|---|
| 1.1 | LAS Reader | Lit LAS/LAZ en point cloud | Charger les tuiles sources LiDAR |
| 1.2 / 3 | Thinner | Sous-échantillonne les points | Accélérer le traitement/visualisation |
| 1.3 / 5.2 | PointCloudCombiner | Fusionne plusieurs nuages | Simplifier le flux en une seule branche |
| 1.4 / 4.5 / 6.2 | EsriReprojector | Reprojette vecteurs/nuages | Assurer la superposition (même SRID) |
| 2.1 | GeoJSONReader (URL) | Lit un GeoJSON depuis une URL | Obtenir le masque officiel sans fichier local |
| 2.1 | Reprojector | Reprojette un vecteur | Aligner le masque sur le nuage (3857) |
| 2.2 / 6.4 | Clipper | Découpe selon un polygone | Retirer données hors zone utile |
| 4.2 | Reprojector (raster) | Reprojette un raster | Stabiliser mosaïque/alignement en SRID local |
| 4.3 | RasterMosaicker | Fusionne rasters | Échantillonnage simplifié (1 raster) |
| 4.4 | RasterPropertyExtractor | Extrait métadonnées raster | Identifier les bandes (RGB/A) |
| 4.4 | ListExploder | Déplie une liste | Inspection lisible des bandes |
| 4.4 | RasterSelector | Sélectionne des bandes | Retirer l’alpha; garder RGB |
| 5.1 | PointCloudOnRasterComponentSetter | Échantillonne le raster et écrit RGB dans le point cloud | Coloriser les points LiDAR |
| 5.3 | PointCloudFilter | Filtre par expression | Enlever points non colorisés / nodata |
| 5.4 | PointCloudCoercer | Convertit point cloud → points | Compatibilité pour jointures vectorielles |
| 6.3 | BoundingBoxAccumulator | Calcule l’emprise | Limiter les bâtiments à la zone LiDAR |
| 6.5 | PolygonCutter (Hub) | Coupe polygones par lignes | Détailer les toits pour un meilleur rendu |
| 7.1 | PointOnAreaOverlayer | Point-in-polygon + agrégation | Transférer Z/couleur des points vers bâtiments |
| 7.2 | ListSummer | Somme des listes | Préparer moyenne (somme/nb) |
| 7.3 | AttributeCreator | Calcule un attribut | Produire moyennes (Z/couleur) |
| 7.4 | AttributeManager | Nettoie les attributs | Sortie GeoJSON plus légère/clair |
| 7.5 | ColorConverter (Hub) | Convertit un format couleur | Rendre la couleur compatible web |
| 8 | GeoJSONWriter | Écrit en GeoJSON | Consommable directement dans MapLibreGL |

