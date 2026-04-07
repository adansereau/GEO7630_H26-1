// Cette fonction supprime toutes les couches et sources de la carte
function removeAllLayersAndSources() {
    var allSources = map.getStyle().sources;
    console.log(allSources)
    // Supprimer chaque couche
    myLayers.forEach(function (layerName) {
        if (map.getLayer(layerName)) {
            map.removeLayer(layerName);
        }
    })

    // Supprimer chaque source
    myLayers.forEach(function (layerName) {
        if (allSources.hasOwnProperty(`${layerName}-source`)) {
            map.removeSource(`${layerName}-source`);
        }
    });

    if (typeof clearLayerMenu === 'function') {
        clearLayerMenu();
    }
}


function getLayerVisibility(layerId) {
    var layer = map.getLayer(layerId);
    if (!layer) return true;
    var visibility = map.getLayoutProperty(layerId, 'visibility');
    return visibility !== 'none';
}


/**
 * Active ou désactive l'affichage d'une couche.
 * @param {string} layerId
 * @param {boolean} visible
 */
function setLayerVisibility(layerId, visible) {
    if (!map.getLayer(layerId)) return;
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
}


// Ajouter un événement de clic sur le bouton "resetMap"
// pour supprimer toutes les couches et sources de la carte
document
    .getElementById('resetMap')
    .addEventListener('click', removeAllLayersAndSources);