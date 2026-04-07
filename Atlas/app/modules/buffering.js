/**
 * Crée un buffer autour de la FeatureCollection fournie avec le rayon donné.
 * @param {FeatureCollection} featureCollection - Un ensemble de points Turf à bufferiser.
 * @param {number} radiusInput - Le rayon du buffer en mètres.
 * @returns {FeatureCollection} Un GeoJSON représentant le buffer.
 */
function createBuffer(featureCollection, radiusInput) {
    console.log(radiusInput)
    // Utilisation de la méthode buffer de turf
    const buffer = turf.buffer(featureCollection, radiusInput, {units: 'meters'});
    return buffer;
  }
  
  /**
   * Charge le buffer créé à partir des points aléatoires sur la carte Mapbox.
   */
  function loadBuffer() {
    // Supprimer la couche et la source 'buffer' si elles existent
    if (map.getLayer('buffer')) {
      map.removeLayer('buffer');
    }
    if (map.getSource('buffer-source')) {
      map.removeSource('buffer-source');
    }

    // Récupère la valeur du rayon entrée par l'utilisateur
    const radiusInput = document.getElementById('radiusInput').value
    // Crée le buffer à partir des points aléatoires et du rayon entré
    const buffers = createBuffer(randomPoints, radiusInput)
    // Ajoute la source de données contenant le buffer sur la carte Mapbox
    map.addSource(
      'buffer-source', {
      type: 'geojson',
      data: buffers
      }
    )
    // Ajoute la couche représentant le buffer sur la carte Mapbox
    map.addLayer({
      'id': 'buffer',
      'type': 'fill',
      'source': 'buffer-source',
      'paint': {
        // Définit la couleur de remplissage du buffer
        'fill-color': 'rgba(12,122,122,0.5)'
      }
    })

    registerLayerControl('buffer', 'Buffer');
  }
  
  // Ajoute un événement 'click' sur l'élément HTML avec l'id 'buffer' pour charger le buffer sur la carte Mapbox
  document
    .getElementById('buffer')
    .addEventListener('click', loadBuffer);