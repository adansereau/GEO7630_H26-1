/**
 * SOLUTION EXERCICE 2 - Extrusion 3D (Réponses Complètes)
 * ========================================================
 * Ceci est la version COMPLÉTÉE de exercice2_Extrusion.js
 * À utiliser pour vérifier votre travail ou si vous êtes bloqué
 * 
 * Pour utiliser cette solution :
 * 1. Copiez le code complet ci-dessous
 * 2. Ouvrez la console du navigateur (F12)
 * 3. Collez le code
 * 4. Appelez : generateExtrusion()
 * 
 * La visualisation doit apparaître sur la carte avec :
 * ✓ Polygones extrudés en fonction de la densité de points
 * ✓ Couleurs variant selon pointCount
 * ✓ Base au sol et opacité modérée
 * ✓ Entrée dans le panneau de contrôle
 */

function generateExtrusion() {
    // Vérifier que la couche extrusion n'existe pas encore
    if (!map.getLayer('extrusion')) {
        map.addLayer({
            id: 'extrusion',
            type: 'fill-extrusion',
            source: 'grid-source',
            paint: {
                'fill-extrusion-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'pointCount'],
                    0, 'rgba(243, 231, 155, 1)',
                    1, '#fac484',
                    3, '#eb7f86',
                    5, '#ce6693',
                    10, '#a059a0'
                ],
                'fill-extrusion-height': ['*', ['get', 'pointCount'], 1000],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.6
            }
        });

        registerLayerControl('extrusion', '2.5D extrusion');
    }
}

console.log('✅ Solution exercice2_Extrusion chargée');
console.log('Appelez: generateExtrusion() pour tester');
