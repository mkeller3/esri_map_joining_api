// Function that joins a json arry of objects to an ArcGIS map service
function joinToMapService(mapUrl, mapFields, mapKeyField, joiningKeyField) {
    // Create a promise to return data
    return new Promise((resolve, reject) => {
        // An empty array to contain all field values to join on
        let fieldValuesToJoinOn = [];
        // Check to validate each feature has the preset joining key field
        dataSet.forEach(feature => {
            // An empty array to contain all field names for each feature
            let dataFields = [];
            // Loop thru and append field names to array
            for (field in feature) {
                dataFields.push(field);
            }
            // If feature does not contain the joining key field do not proceed.
            if (!dataFields.includes(joiningKeyField)) {
                reject({
                    "Error": "Your dataset is an object that contains your set joining key field"
                })
            }
            // Add field value to array
            fieldValuesToJoinOn.push(feature[joiningKeyField]);

        });

        // Generate query to ArcGIS Service to return filtered data
        $.ajax(`${mapUrl}/query`, {
            dataType: 'json',
            data: {
                "where": `${mapKeyField} in ('${fieldValuesToJoinOn.join("','")}')`,
                "returnGeometry": "true",
                "outfields": mapFields.join(","),
                "f": "geojson",
            },
            success: function (data, status, xhr) {
                // Return geojson data
                resolve(data)
            },
            error: function (jqXhr, textStatus, errorMessage) {
                // Return error
                reject(errorMessage)
            }
        });
    });
}