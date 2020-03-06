const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/504452fee7dc4040c446361254242f0c/'+ latitude +',' + longitude + '?units=si'
    request({url: url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to internet', undefined)
        }else if(body.error){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined,{
                weather: body.currently.summary,
                temperature: body.currently.temperature,
                hourly: body.hourly.summary
            })
        }
    })
}
module.exports = forecast