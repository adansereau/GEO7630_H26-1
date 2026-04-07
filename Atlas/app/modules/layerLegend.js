
function clearLayerMenu() {
    var layerList = document.getElementById('layerList');
    if (!layerList) return;
    layerList.innerHTML = '';
    registeredLayerIds = {};
}

/**
 * Ajoute une entrée de coupe dans le panneau de contrôle des couches.
 * @param {string} layerId
 * @param {string} label
 */
function addLayerMenuEntry(layerId, label) {
    var isVisible = getLayerVisibility(layerId);
    var item = document.createElement('div');
    item.className = 'list-group-item bg-dark border-0 p-1';
    item.innerHTML = '<div class="layer-control-item d-flex justify-content-between align-items-center mb-0">' +
        '<span class="layer-label text-white me-2">' + label + '</span>' +
        '<div class="form-check form-switch mb-0">' +
        '<input class="form-check-input" type="checkbox" id="layer-toggle-' + layerId + '"' + (isVisible ? ' checked' : '') + '>' +
        '<label class="form-check-label" for="layer-toggle-' + layerId + '"></label>' +
        '</div>' +
        '</div>';

    document.getElementById('layerList').appendChild(item);

    document.getElementById('layer-toggle-' + layerId).addEventListener('change', function(event) {
        setLayerVisibility(layerId, event.target.checked);
    });
}

/**
 * Enregistre une couche et son libellé dans le panneau des couches.
 * @param {string} layerId
 * @param {string} label
 */
function registerLayerControl(layerId, label) {
    if (!layerId) return;
    if (!label) {
        label = layerId;
    }
    if (map.getLayer(layerId)) {
        addLayerMenuEntry(layerId, label);
    } else {
        // Si la couche est ajoutée plus tard, on attend son existence
        var listener = function() {
            if (map.getLayer(layerId)) {
                addLayerMenuEntry(layerId, label);
                map.off('data', listener);
            }
        };
        map.on('data', listener);
    }
}

/**
 * Renvoie un label lisible pour une couche.
 * @param {string} layerId
 * @returns {string}
 */
function getLayerLabel(layerId) {
    var labels = {
        'rdp': 'Points aléatoires',
        'buffer': 'Buffer',
        'union': 'Fusion',
        'joined': 'Jointure spatiale',
        'grid': 'Grille hexagonale',
        'clusters': 'Clusters',
        'unclustered-point': 'Points non clusterisés',
        'heatmap': 'Heatmap',
        'extrusion': '2.5D extrusion'
    };
    return labels[layerId] || layerId;
}