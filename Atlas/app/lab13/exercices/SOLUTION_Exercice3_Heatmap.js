/**
 * SOLUTION EXERCICE 3 - Heatmap (Réponses Complètes)
 * ===================================================
 * Ceci est la version COMPLÉTÉE de exercice3_Heatmap.js
 * À utiliser pour vérifier votre travail ou si vous êtes bloqué
 * 
 * Pour utiliser cette solution :
 * 1. Copiez le code complet ci-dessous
 * 2. Ouvrez la console du navigateur (F12)
 * 3. Collez le code
 * 4. Appelez : generateHeatmap()
 * 
 * La visualisation doit apparaître sur la carte avec :
 * ✓ Dégradé bleu → rouge selon la densité
 * ✓ Points fusionnées dans les zones rouges
 * ✓ Progression lisse au zoom
 * ✓ Entrée dans le panneau de contrôle
 */

function generateHeatmap() {
    // Nettoyage de la carte
    removeAllLayersAndSources();
    
    // Création de la source GeoJSON simple
    map.addSource('heatmap-source', {
        type: 'geojson',
        data: randomPoints
    });
    
    /**
     * Couche heatmap avec 5 propriétés paint interpolées
     */
    map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'heatmap-source',
        paint: {
            /**
             * Poids de chaque point (contribution à la heatmap)
             * RÉPONSE TODO_1-5: Interpolation de zoom 0→1
             */
            'heatmap-weight': [
                'interpolate',              // RÉPONSE TODO_1
                ['linear'],                 // RÉPONSE TODO_2
                ['zoom'],                   // RÉPONSE TODO_3
                0, 0,                       // RÉPONSE TODO_4: zoom 0 = poids 0
                22, 1                       // RÉPONSE TODO_5: zoom 22 = poids 1
            ],
            
            /**
             * Intensité (contraste) de la heatmap
             * RÉPONSE TODO_6-12: Interpolation de zoom 0→1.2
             */
            'heatmap-intensity': [
                'interpolate',              // RÉPONSE TODO_6
                ['linear'],                 // RÉPONSE TODO_7
                ['zoom'],                   // RÉPONSE TODO_8
                0, 0,                       // RÉPONSE TODO_9,10: zoom 0 = intensité 0
                22, 1.2                     // RÉPONSE TODO_11,12: zoom 22 = intensité 1.2
            ],
            
            /**
             * Dégradé de couleur selon DENSITÉ (pas zoom !)
             * RÉPONSE TODO_13-23: Dégradé 7 couleurs
             */
            'heatmap-color': [
                'interpolate',                      // RÉPONSE TODO_13
                ['linear'],                         // RÉPONSE TODO_14
                ['heatmap-density'],                // RÉPONSE TODO_15 (ATTENTION: pas zoom!)
                0, 'rgba(0, 0, 255, 0)',            // RÉPONSE TODO_16: 0% = transparent
                0.1, 'royalblue',                   // RÉPONSE TODO_17: 10% = bleu royal
                0.3, 'cyan',                        // RÉPONSE TODO_18: 30% = cyan
                0.5, 'lime',                        // RÉPONSE TODO_19,20: 50% = vert citron
                0.7, 'yellow',                      // RÉPONSE TODO_21,22: 70% = jaune
                1, 'red'                            // RÉPONSE TODO_23: 100% = rouge
            ],
            
            /**
             * Rayon d'influence de chaque point
             * RÉPONSE TODO_24-30: Interpolation de zoom 0→22
             */
            'heatmap-radius': [
                'interpolate',              // RÉPONSE TODO_24
                ['linear'],                 // RÉPONSE TODO_25
                ['zoom'],                   // RÉPONSE TODO_26
                0, 2,                       // RÉPONSE TODO_27,28: zoom 0 = rayon 2px
                22, 20                      // RÉPONSE TODO_29,30: zoom 22 = rayon 20px
            ],
            
            /**
             * Opacité globale selon le zoom
             * RÉPONSE TODO_31-37: Diminue légèrement au zoom 9+
             */
            'heatmap-opacity': [
                'interpolate',              // RÉPONSE TODO_31
                ['linear'],                 // RÉPONSE TODO_32
                ['zoom'],                   // RÉPONSE TODO_33
                7, 1,                       // RÉPONSE TODO_34,35: zoom 7 = opacity 1.0
                9, 0.8                      // RÉPONSE TODO_36,37: zoom 9 = opacity 0.8
            ]
        }
    });
    
    registerLayerControl('heatmap', 'Heatmap');
}

console.log('✅ Solution exercice3_Heatmap chargée');
console.log('Appelez: generateHeatmap() pour tester');
