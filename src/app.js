const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./geoCode')
const weather = require('./weather')

const app = express()

const port = process.env.PORT || 3000

//define paths for config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')


//setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'nuwan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'nuwan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'hellllp me',
        title: 'Help',
        name: 'nuwan'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'provide valid address'
        })
    }


    geoCode(address, (err, geoData) => {
        
        if(err){
            res.send({err})
        } else {
            
            weather(geoData.body.features[0].center[1], geoData.body.features[0].center[0], (err, weatherData) => {
                if (err) {
                    res.send({err})
                } else {
                    const summary = `Current temperature is ${weatherData.body.currently.temperature} and it is ${weatherData.body.currently.summary} outside`
                    res.send({
                        summary: summary,
                        city: geoData.body.features[0].place_name,
                        ProvidedAddress: address
                    })
                }
            } )
        }
    })

  
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        msg:'help article is not found',
        name:'nuwan',
        title: '404'
    })
})

//404 pages
app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page is not found',
        name:'nuwan',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+ port);
})