/**
 * EXERCICE 1 - Clusters
 * =====================
 * Objectif : Créer une visualisation de clusters de points
 * 
 * Complétez les zones marquées par "TODO:" pour faire fonctionner le code.
 * Les TODOs demandent des valeurs numériques, des couleurs ou des configurations.
 * 
 * Difficulté : ⭐⭐ Facile/Moyen
 * Concepts : sources GeoJSON, clustering, filtres, expressions 'step', styles
 */

function generateClusters() {
    // Nettoyage de la carte
    removeAllLayersAndSources();
    
    /**
     * TODO 1 : Ajouter la source GeoJSON avec clustering
     * ====================================================
     * Complétez cette configuration :
     * - type: type de source à utiliser pour les données GeoJSON
     * - data: données à utiliser (randomPoints)
     * - cluster: booléen pour activer le clustering
     * - clusterMaxZoom: jusqu'à quel niveau de zoom les clusters apparaissent (14)
     * - clusterRadius: rayon en pixels pour grouper les points (50)
     */
    map.addSource('clusters-source', {
        type: 'TODO_1', // Quel type de source ?
        data: 'TODO_2', // Quelle variable de données ?
        cluster: 'TODO_3', // true ou false ?
        clusterMaxZoom: 'TODO_4', // Quel zoom max ?
        clusterRadius: 'TODO_5' // Quel rayon en pixels ?
    });
    
    /**
     * TODO 2 : Configurer les CLUSTERS (les cercles groupés)
     * ========================================================
     * Vous devez remplir les 3 expressions 'step' pour :
     * 1. Les couleurs basées sur le nombre de points
     * 2. Les rayons basées sur le nombre de points
     * 
     * Expression 'step' : ['step', ['get', 'property'], valeur_défaut, seuil1, valeur1, seuil2, valeur2, ...]
     * Seuils proposés : 100 points, 750 points
     * Couleurs : cyan #51bbd6, jaune #f1f075, rose #f28cb1
     * Rayons : 20px, 30px, 40px
     */
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'TODO_0.1',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                'TODO_6',    // Couleur par défaut (0-99 points) - Cyan
                'TODO_7', 'TODO_8',      // À partir de X points - Couleur jaune
                'TODO_9', 'TODO_10'      // À partir de X points - Couleur rose
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                'TODO_11',   // Rayon par défaut (0-99 points)
                'TODO_12', 'TODO_13',    // À partir de X points - Rayon 30
                'TODO_14', 'TODO_15'     // À partir de X points - Rayon 40
            ]
        }
    });
    registerLayerControl('clusters', 'Clusters');
    
    /**
     * TODO 3 : Configurer les POINTS NON-CLUSTÉRISÉS
     * ================================================
     * Complétez la configuration du style pour les points individuels :
     * - circle-color: bleu eau #11b4da
     * - circle-radius: petit cercle de 4 pixels
     * - circle-stroke-width: contour fin de 1 pixel
     * - circle-stroke-color: contour blanc #fff
     */
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'clusters-source',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',          // Quelle couleur ?
            'circle-radius': 'TODO_17',         // Quel rayon en pixels ?
            'circle-stroke-width': 'TODO_18',   // Quelle épaisseur ?
            'circle-stroke-color': 'TODO_19'    // Quelle couleur de contour ?
        }
    });

    map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'clusters-source',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['Noto Sans Regular'],
                'text-size': 12
            }
        });

    registerLayerControl('unclustered-point', 'Points non clusterisés');
}