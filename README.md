# ESRI Map Joining API
This is a simple javascript function the allows you to connect to a esri mapserver or featureserver and marry your data to that service. An fully featured example is built inside the index.html file of this project.

### Using the API
In order to use the api you will call the following function.
```
joinToMapService(mapUrl, mapFields, mapKeyField, joiningKeyField)
```
This allows you to input any type of data, and marry that data to a geography. An example of using the service would be the following.
```
let mapUrl = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_States_Generalized/FeatureServer/0"

let mapFields = ["STATE_ABBR", "STATE_NAME", "POPULATION", "MED_AGE"];

let joiningKeyField = "abbreviation";

let mapKeyField = "STATE_ABBR";

 let dataSet = [{
    "name": "Alabama",
    "abbreviation": "AL",
    "number_of_accidents": 8
}, {
    "name": "Alaska",
    "abbreviation": "AK",
    "number_of_accidents": 56
}];

// Set function equal to a variable
let joinData = joinToMapService(mapUrl, mapFields, mapKeyField, joiningKeyField)

// After are query is complete do the following
joinData.then(mapData => {
    // Loop thru the user data and map service data and join them on their key
    dataSet.forEach(feature => {
        mapData.features.forEach(mapFeature => {
            if (mapFeature.properties[mapKeyField] == feature[joiningKeyField]) {
                for (field in feature) {
                    if (field != joiningKeyField) {
                        mapFeature.properties[field] = feature[field]
                    }
                }
            }
        })
    })

    // Add data to map
    geojson = L.geoJson(mapData).addTo(map);
});
````
