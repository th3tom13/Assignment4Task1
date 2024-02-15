require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "dojo/domReady!"
], function (
    Map,
    FeatureLayer,
    MapView
) {

    // Create the map
    var map = new Map({
        basemap: "gray"
    });

    // Create the MapView
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.241939, 38.625186],
        zoom: 12
    });

    var template = { 
        title: "Neighborhood: {NHD_NAME}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "NHD_NAME",
                label: "Neighborhood Name",
                visible: true
            }, {
                fieldName: "NHD_NUM",
                label: "Neighborhood Number",
                visible: true
            }]
        }]
    };

    var symbol = {
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_St._Louis%2C_Missouri.svg/512px-Flag_of_St._Louis%2C_Missouri.svg.png",
        width: "24px",
        height: "20px"
    };

    var renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: symbol
    };

    // Create a FeatureLayer with the specified renderer
    var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template,
        renderer: renderer  // Apply the renderer directly here
    });

    map.add(featureLayer);
});