/**
 * Génère une collection de points aléatoires dans les limites de l'île de Montréal.
 * @param {number|string} [numPoints] - Nombre de points à générer.
 * @returns {FeatureCollection} Une collection GeoJSON de points aléatoires.
 */
function generateRandomPoints(numPoints) {
    const parsedCount = parseInt(numPoints, 10);
    const count = Number.isFinite(parsedCount)
        ? Math.max(0, Math.min(parsedCount, 10000))
        : Math.max(0, Math.min(parseInt(document.getElementById('randomInput').value, 10) || 1000, 10000));

    const bounds = [-73.990959, 45.410154, -73.467327, 45.705839];
    const points = [];

    for (let i = 0; i < count; i++) {
        const position = turf.randomPosition(bounds);
        points.push(turf.point(position));
    }

    return turf.featureCollection(points);
}

/**
 * Charge une couche de points aléatoires sur la carte.
 */
function loadRandomPointsLayer() {
    randomPoints = generateRandomPoints();
    removeAllLayersAndSources();

    map.addSource('rdp-source', {
        type: "geojson",
        data: randomPoints
    });

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

    registerLayerControl('rdp', 'Points aléatoires');

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

document
    .getElementById('loadLayer')
    .addEventListener('click', loadRandomPointsLayer); 