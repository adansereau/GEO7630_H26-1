/**
 * Génère une collection de points aléatoires dans les limites de l'île de Montréal.
 * @returns {FeatureCollection} Une collection GeoJSON de points aléatoires.
 */
function generateRandomPoints() {
    // Récupère le nombre de points à générer depuis l'élément 'randomInput' du document
    const numPoints = document.getElementById('randomInput').value; 
    // Définit les limites de l'île de Montréal
    const bounds = [-73.990959, 45.410154, -73.467327, 45.705839];

    // Génère un tableau de points aléatoires dans les limites définies
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const position = turf.randomPosition(bounds); // Génère une position aléatoire dans les limites
        const point = turf.point(position); // Crée un point TurfJS à partir de la position aléatoire
        points.push(point); // Ajoute le point au tableau
    }
    // Crée une collection de features TurfJS à partir des points générés
    const featureCollection = turf.featureCollection(points);
    // Retourne la collection de features TurfJS
    return featureCollection;
}

/**
 * Charge une couche de points aléatoires sur la carte.
 */
function loadRandomPointsLayer() {
    // Récupère une nouvelle collection de points aléatoires en fonction de la valeur de 'randomInput'
    randomPoints = generateRandomPoints(document.getElementById('randomInput').value);
    // Supprime toutes les couches et sources existantes de la carte
    removeAllLayersAndSources();
    // Ajoute la collection de points aléatoires en tant que source de données
    map.addSource('rdp-source', {
        type: "geojson",
        data: randomPoints
    })
    // Ajoute une couche 'circle' à la carte avec la source de données 'rdp-source' et une taille de cercle qui varie en fonction du niveau de zoom
    map.addLayer({
        'id': 'rdp',
        'type': 'circle',
        'source': 'rdp-source',
        'paint': {
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [12, 2],
                    [22, 180]
                ]
            },
        }
    });

    // Met à jour le compteur de points avec la fonction du module dynamicCounts.js
    if (typeof featureCount === 'function') {
        console.log('Calling featureCount() from createRandomPoints.js after idle');
        map.once('idle', function() {
            console.log('Map idle reached, running featureCount()');
            featureCount();
        });
    } else {
        console.warn('featureCount function not available in createRandomPoints.js');
    }
}

// Ajoute un événement 'click' sur le bouton 'generateRandomPoints' qui appelle la fonction 'loadRandomPointsLayer'
document
    .getElementById('generateRandomPoints')
    .addEventListener('click', loadRandomPointsLayer); 