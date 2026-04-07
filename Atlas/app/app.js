// création de la carte Mapbox GL
var map = new maplibregl.Map({
    container: 'map', // identifiant de l'élément HTML conteneur de la carte
    style: 'https://api.maptiler.com/maps/dataviz/style.json?key=JhO9AmIPH59xnAn5GiSj', // URL du style de la carte
    center: [-73.55, 45.55], // position centrale de la carte
    zoom: 9, // niveau de zoom initial
    hash: true // activation du hash pour la gestion de l'historique de la carte
});

// Variable pour stocker les couches de visualisation
var myLayers = ['rdp', 'buffer', 'union', 'joined', 'grid', 'clusters', 'heatmap', 'extrusion'];

/**
 * Génère une visualisation de clusters à partir des points aléatoires
 */
function generateClusters() {
    // Supprimer toutes les couches et sources existantes
    removeAllLayersAndSources();
    
    // Ajouter la source des points avec clustering activé
    map.addSource('clusters-source', {
        type: 'geojson',
        data: randomPoints,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });
    
    // Couche pour les clusters
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'clusters-source',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100, '#f1f075',
                750, '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100, 30,
                750, 40
            ]
        }
    });
    
    // Couche pour les points non-clusterisés
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'clusters-source',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
}

/**
 * Génère une heatmap à partir des points aléatoires
 */
function generateHeatmap() {
    // Supprimer toutes les couches et sources existantes
    removeAllLayersAndSources();
    
    // Ajouter la source des points pour la heatmap
    map.addSource('heatmap-source', {
        type: 'geojson',
        data: randomPoints
    });
    
    // Ajouter la couche heatmap
    map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'heatmap-source',
        paint: {
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0,
                22, 1
            ],
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0,
                22, 1.2
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',
                0.1, 'royalblue',
                0.3, 'cyan',
                0.5, 'lime',
                0.7, 'yellow',
                1, 'red'
            ],
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                22, 20
            ],
            'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 1,
                9, 0.8
            ]
        }
    });
}

/**
 * Génère une visualisation 2.5D avec extrusion basée sur le nombre de points
 */
function generate3D() {
    // Vérifier si la union existe, sinon l'union doit être créée en premier
    if (!map.getLayer('union')) {
        dissolver();
    }
    
    // Ajouter une couche d'extrusion 3D basée sur les propriétés des géometries
    if (!map.getLayer('extrusion')) {
        map.addLayer({
            id: 'extrusion',
            type: 'fill-extrusion',
            source: 'union-source',
            paint: {
                'fill-extrusion-color': '#627BC1',
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0,
                    15.05, ['get', 'extrusion-height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0,
                    15.05, ['get', 'extrusion-base']
                ],
                'fill-extrusion-opacity': 0.6
            }
        }, 'water');
    }
}

function updateFeatureCountOnMove() {
    if (typeof featureCount === 'function') {
        console.log('Calling featureCount() from map moveend event');
        featureCount();
    } else {
        console.warn('featureCount function not available in map moveend event');
    }
}

map.on('load', function() {
    map.on('moveend', updateFeatureCountOnMove);
    updateFeatureCountOnMove();
});

// Ajouter les event listeners pour les boutons de visualisation avancée
document.getElementById('generateClusters').addEventListener('click', generateClusters);
document.getElementById('generateHeatmap').addEventListener('click', generateHeatmap);
document.getElementById('generate3D').addEventListener('click', generate3D);