async function addAgol(map){

    // Load a point layer from the service URL
    const pointService = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0";
    const trailheads = await maplibreArcGIS.FeatureLayer.fromUrl(pointService);
    trailheads.addSourcesAndLayersTo(map);

    // Load a polyline layer from the service URL and query
    const lineService = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    const trails = await maplibreArcGIS.FeatureLayer.fromUrl(lineService, {query: {
    outFields: ['TRL_ID', 'ELEV_MIN', 'ELEV_MAX'],
    where: 'ELEV_MIN > 200'
    }});
    trails.addSourcesAndLayersTo(map);

    // Load a polygon layer from from portal item ID
    const parks = await maplibreArcGIS.FeatureLayer.fromPortalItem('f2ea5d874dad427294641d2d45097c0e');
    parks.addSourcesAndLayersTo(map);
}
