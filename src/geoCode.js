const request = require('request')

const geoCode = (address, callback) => {
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibnV3YW53aWNrOTkiLCJhIjoiY2s2NjNtbTlhMDR5ZzNscWo0NnltaDd1YyJ9.UzQrSaWebsHOWClHSpRAow`
    
    request({ url: URL, json: true}, (error, response) => {
        
        if (error) {
            callback('Error occured')
            
        } else if (response.body.features.length === 0) {
            callback('No matching features')
        } else {
            callback(undefined, response)
        }
        
    })
}

module.exports = geoCode