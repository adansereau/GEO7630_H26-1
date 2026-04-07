/**
 * EXERCICE 3 - Heatmap (Carte de Chaleur)
 * ========================================
 * Objectif : Créer une visualisation de densité avec dégradé de couleurs
 * 
 * Complétez les zones marquées par "TODO:" pour faire fonctionner le code.
 * Les TODOs demandent des niveaux de zoom, des seuils de densité et des couleurs.
 * 
 * Difficulté : ⭐⭐⭐⭐ Difficile
 * Concepts : expressions interpolate complexes, densité heatmap, dégradés de couleurs
 */

function generateHeatmap() {
    // Nettoyage de la carte
    removeAllLayersAndSources();
    
    // Création de la source
    map.addSource('heatmap-source', {
        type: 'geojson',
        data: randomPoints
    });
    
    /**
     * TODO 1 : Configurer la couche heatmap complète
     * ===============================================
     * Vous devez configurer 5 propriétés paint avec des expressions 'interpolate' :
     * 
     * 1. heatmap-weight : poids de chaque point (zoom 0→1)
     * 2. heatmap-intensity : intensité/contraste (zoom 0→1.2)
     * 3. heatmap-color : dégradé de couleurs (densité 0→1)
     * 4. heatmap-radius : rayon d'influence (zoom 0→22)
     * 5. heatmap-opacity : opacité (zoom 7→9)
     * 
     * Toutes les expressions possèdent le format :
     * ['interpolate', ['linear'], [entrée], valeur1, résultat1, valeur2, résultat2, ...]
     */
    map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'heatmap-source',
        paint: {
            /**
             * TODO 1a : Poids de chaque point (contribution à la heatmap)
             * ==========================================================
             * Progression de zoom 0 à 22 :
             * - Zoom 0 : poids = 0 (pas d'effet)
             * - Zoom 22 : poids = 1 (effet maximal)
             * 
             * Complétez l'expression :
             */
            'heatmap-weight': [
                'TODO_1',           // Type d'expression ?
                ['TODO_2'],         // Type d'interpolation ?
                ['TODO_3'],         // Entrée (zoom) ?
                0, 'TODO_4',        // Zoom 0 -> poids ?
                22, 'TODO_5'        // Zoom 22 -> poids ?
            ],
            
            /**
             * TODO 1b : Intensité (contraste de la heatmap)
             * ==============================================
             * Progression de zoom 0 à 22 :
             * - Zoom 0 : intensité = 0
             * - Zoom 22 : intensité = 1.2 (contraste accru)
             */
            'heatmap-intensity': [
                'TODO_6',           // Expression ?
                ['TODO_7'],         // Type ?
                ['TODO_8'],         // Entrée ?
                'TODO_9', 'TODO_10', // Zoom 0 -> 0
                'TODO_11', 'TODO_12' // Zoom 22 -> 1.2
            ],
            
            /**
             * TODO 1c : Dégradé de couleur selon la DENSITÉ
             * ================================================
             * ATTENTION : Pas ['zoom'] mais ['heatmap-density'] !
             * 
             * Densité va de 0 (aucun point) à 1 (hotspot maximum)
             * Créez un dégradé froid->chaud avec 7 couleurs :
             * 
             * - 0.0 densité : rgba(0, 0, 255, 0) [transparent]
             * - 0.1 densité : 'royalblue' [bleu foncé]
             * - 0.3 densité : 'cyan' [cyan]
             * - 0.5 densité : 'lime' [vert citron]
             * - 0.7 densité : 'yellow' [jaune]
             * - 1.0 densité : 'red' [rouge]
             */
            'heatmap-color': [
                'TODO_13',                      // Expression ?
                ['TODO_14'],                    // Type ?
                ['TODO_15'],                    // Entrée (densité!) ?
                0, 'TODO_16',                   // 0% -> transparent
                0.1, 'TODO_17',                 // 10% -> bleu royal
                0.3, 'TODO_18',                 // 30% -> cyan
                'TODO_19', 'TODO_20',           // 50% -> vert citron
                'TODO_21', 'TODO_22',           // 70% -> jaune
                1, 'TODO_23'                    // 100% -> rouge
            ],
            
            /**
             * TODO 1d : Rayon d'influence de chaque point
             * ============================================
             * Rayon en pixels de la contribution de chaque point
             * Progression de zoom 0 à 22 :
             * - Zoom 0 : rayon = 2 pixels (points serrés)
             * - Zoom 22 : rayon = 20 pixels (points dispersés)
             */
            'heatmap-radius': [
                'TODO_24',          // Expression ?
                ['TODO_25'],        // Type ?
                ['TODO_26'],        // Entrée ?
                'TODO_27', 'TODO_28', // Zoom 0 -> 2
                'TODO_29', 'TODO_30'  // Zoom 22 -> 20
            ],
            
            /**
             * TODO 1e : Opacité globale de la heatmap
             * =========================================
             * Variation entre zoom 7 et 9 :
             * - Zoom 7 : opacité = 1.0 (100% visible)
             * - Zoom 9 : opacité = 0.8 (80% visible, 20% transparent)
             * 
             * Cela réduit le "bruit" au zoom très élevé
             */
            'heatmap-opacity': [
                'TODO_31',          // Expression ?
                ['TODO_32'],        // Type ?
                ['TODO_33'],        // Entrée ?
                'TODO_34', 'TODO_35', // Zoom 7 -> 1.0
                'TODO_36', 'TODO_37'  // Zoom 9 -> 0.8
            ]
        }
    });
    registerLayerControl('heatmap', 'Heatmap');
}

/**
 * CONCEPT CLÉ : Différence entre ['zoom'] et ['heatmap-density']
 * ===============================================================
 * 
 * ['zoom'] : Niveau de zoom actuel de la carte (0-28)
 * - Utilisé pour adapter la visualisation au niveau de zoom
 * - Ex: plus grand rayon au zoom élevé
 * 
 * ['heatmap-density'] : Densité CALCULÉE des points à chaque pixel (0-1)
 * - Pas liée au zoom
 * - Représente la concentration de points
 * - 0 = pas de points, 1 = concentration maximale
 * - Permet les dégradés de couleur réalistes
 */
