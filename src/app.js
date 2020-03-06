const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'WF'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: ' help title',
        message:' you need sum help ig...'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You need to provide an address to get the weather"
        })
    }else{
        // res.send(req.query.address)
        
            geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
                if (error) {
                    return res.send({error})
                }
                // else if(latitude == 0 && longitude == 0){
                //     return alert("No city with that name");
                // }
                try{
                    forecast(latitude, longitude, (error, forecastData) => {
                        if (error) {
                            return res.send({error})
                        }
                        res.render('weather', {
                            title: "Weather forecast",
                            location,
                            forecastData
                        })
                    })
                }
                catch(error) {
                    alert("No city with that name");
                }
            })
       

    }
})

app.get('*', (req,res) => {
    res.send('404 page')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})