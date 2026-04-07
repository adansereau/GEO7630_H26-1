/**
 * Calcule la moyenne du nombre de points par cellule pour la couche 'joined'.
 * @returns {void}
 */
function dynamicCount() {
    var averagePtsGrid = 0;
    var totalFeatures = 0;

    // Recherche toutes les fonctionnalités de la couche 'joined' actuellement rendue sur la carte
    var features = map.queryRenderedFeatures({ layers: ['joined'] });
    totalFeatures = features.length;

    // Itère sur toutes les fonctionnalités de la couche 'joined'
    features.forEach(function (feature) {
        averagePtsGrid += feature.properties.pointCount;
    });

    // Calcule la moyenne
    var average = averagePtsGrid / totalFeatures;
    document.getElementById('kpi').value = average;
}

/**
 * Met à jour le compteur de fonctionnalités affiché pour la couche 'rdp'.
 * @returns {void}
 */
function featureCount() {
    var renderedFeatures = map.queryRenderedFeatures({ layers: ['rdp'] });
    var count = renderedFeatures.length;
    console.log('featureCount() called');
    console.log('Rendered features in rdp layer:', count);

    if (count === 0) {
        if (map.getSource('rdp-source')) {
            try {
                var sourceFeatures = map.querySourceFeatures('rdp-source');
                console.log('Source features in rdp-source:', sourceFeatures.length);
                if (sourceFeatures.length > 0) {
                    count = sourceFeatures.length;
                }
            } catch (error) {
                console.warn('featureCount: querySourceFeatures failed', error);
            }
        }

        if (count === 0 && window.randomPoints && window.randomPoints.features) {
            console.log('Source randomPoints length:', window.randomPoints.features.length);
            count = window.randomPoints.features.length;
        }
    }

    var counterInput = document.getElementById('featureCount');
    if (counterInput) {
        counterInput.value = count;
    } else {
        console.warn('featureCount: element #featureCount introuvable');
    }
}