const request = require('request')

const weather = (lat, lon, callback) => {
    const URL = `https://api.darksky.net/forecast/430d73624004d9bb991f86ebfd1e9a94/${lat},${lon}?units=si`

    request({ url: URL, json: true }, (error, response) => {
        if (error) {
            callback(error)             
            
        } else if (response.body.error) {
            callback(response.body.error);
            
        }else {
            callback(undefined, response)
            
        } 
    })
}

module.exports = weather 