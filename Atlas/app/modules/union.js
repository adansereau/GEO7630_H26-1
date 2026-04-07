
/**
 * Crée une grille hexagonale et l'ajoute à la carte.
 * @returns {void}
 */
function generateGrid () {

    // Supprimer la couche et la source 'grid' si elles existent
    if (map.getLayer('grid')) {
        map.removeLayer('grid');
    }
    if (map.getSource('grid-source')) {
        map.removeSource('grid-source');
    }

    // Définir les coordonnées de la zone d'étude
    const bbox = [-73.990959, 45.410154, -73.467327, 45.705839];
    // Définir la taille des cellules
    const cellSide = document.getElementById('hexagonRadius').value ;
    // Définir les options de l'objet de la grille
    const options = { units: 'meters' };
    // Créer la grille hexagonale
    const hexgrid = turf.hexGrid(bbox, cellSide, options);
    // Ajouter les données de la grille à la carte

    map.addSource('grid-source', {
        type: "geojson",
        data: hexgrid
    })
    // Ajouter la couche à la carte
    map.addLayer({
        id: 'grid',
        type: 'line',
        source: 'grid-source',
        paint: {
            "line-opacity": 0.25
        }
    })

    registerLayerControl('grid', 'Grille hexagonale');
}

/**
 * Calcule la jointure spatiale entre points et grille, puis affiche le résultat coloré.
 * @returns {void}
 */
function union() {
    console.log('test')
        // Supprimer la couche et la source 'grid' si elles existent
        if (map.getLayer('grid')) {
            map.removeLayer('grid');
        }
        if (map.getSource('grid-source')) {
            map.removeSource('grid-source');
        }

        // Définir les coordonnées de la zone d'étude
        const bbox = [-73.990959, 45.410154, -73.467327, 45.705839];
        // Définir la taille des cellules
        const cellSide = document.getElementById('hexagonRadius').value ;
        // Définir les options de l'objet de la grille
        const options = { units: 'meters' };
        // Créer la grille hexagonale
        const hexgrid = turf.hexGrid(bbox, cellSide, options);
        // Compter le nombre de points dans chaque cellule de la grille
        const joined = countPointsInPolygons(randomPoints, hexgrid)
        map.addSource('grid-source', {
            type: "geojson",
            data: joined
  
        })
  
        map.addLayer({
            id: 'joined',
            type: 'fill',
            source: 'grid-source',
            paint: {
                "fill-color": {
                    property: 'pointCount',
                    stops: [[0, '#f3e79b'], [3, '#fac484'], [5, '#eb7f86'], [8, '#ce6693'], [10, '#a059a0']]
                    // #f3e79b,#fac484,#f8a07e,#eb7f86,#ce6693,#a059a0,#5c53a5
                },
                "fill-opacity": 0.5
            }
        })

        registerLayerControl('joined', 'Jointure spatiale');
    }

/**
 * Crée un buffer, le dissout et l'affiche sur la carte.
 * @returns {void}
 */
function dissolver () {
     // Supprimer la couche et la source 'union' si elles existent
     if (map.getLayer('union')) {
         map.removeLayer('union');
     }
     if (map.getSource('union-source')) {
         map.removeSource('union-source');
     }

     // Récupérer le rayon sélectionné par l'utilisateur
     const radiusInput = document.getElementById('radiusInput').value
     // Créer un buffer pour chaque point généré aléatoirement
     const buffers = createBuffer(randomPoints, radiusInput)
     // Fusionner les buffers créés
     const unionized = unionFeatures(buffers)
     // Ajouter les données fusionnées à la carte
     map.addSource('union-source', {
         type: "geojson",
         data: unionized
     })
     // Ajouter la couche à la carte
     map.addLayer({
         id: 'union',
         type: 'fill',
         source: 'union-source',
         paint: {
             'fill-color': 'orange',
             'fill-opacity': 0.5
         }
     })

     registerLayerControl('union', 'Fusion');
}

/**
 * Dissout une FeatureCollection en une seule géométrie.
 * @param {FeatureCollection} featureCollection - Une collection de géométries à dissoudre.
 * @returns {FeatureCollection} Une collection de géométries dissoutes.
 */
function unionFeatures(featureCollection) {
    const mergedFeature = turf.dissolve(featureCollection);
    return mergedFeature;
}

// Ajoute un événement click sur le bouton de génération de grille
document
    .getElementById('gridder')
    .addEventListener('click', generateGrid);

// Ajoute un événement click sur le bouton de jointure spatiale
document
    .getElementById('union')
    .addEventListener('click', union);

// Ajoute un événement click sur le bouton de dissolution
document
    .getElementById('dissolve')
    .addEventListener('click', dissolver);

