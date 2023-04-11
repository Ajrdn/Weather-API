const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const API_KEY = '57b0311f6cedbd7612a7a70c7bb27bab'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/getWeatherInfo', (req, res) => {
  const { lon, lat } = req.body

  const options = {
    uri: 'https://api.openweathermap.org/data/2.5/onecall',
    qs: {
      appid: API_KEY,
      exclude: 'minutely',
      units: 'metric',
      lon: lon,
      lat: lat,
    },
  }

  request(options, (err, response, body) => {
    const data = JSON.parse(body)
    console.log(data)
    const timezone = data["timezone"]
    const main = data['current']['weather'][0]['main']
    const temp = data['current']['temp']
    const pressure = data['current']['pressure']
    const humidity = data['current']['humidity']

    console.log(timezone)

    res.render('index', {
      timezone : timezone,
      main: main,
      temp: temp,
      pressure: pressure,
      humidity: humidity,
    })
  })
})

const port = 3000
app.listen(port, () => {
  console.log('server listening on port http://127.0.0.1:' + port)
})
