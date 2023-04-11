const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const API_KEY = '57b0311f6cedbd7612a7a70c7bb27bab'

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/getWeatherInfo', (req, res) => {
  const {lon, lat} = req.body

  const options = {
    uri: 'https://api.openweathermap.org/data/2.5/onecall',
    qs: {
      appid: API_KEY,
      exclude: 'minutely',
      units: 'metric',
      lon: lon,
      lat: lat,
    }
  };
  request(options, (err, response, body) => {
    console.log(err)
    console.log(response)
    console.log(body)

    res.send(response)
  })
})

const port = 3000
app.listen(port, () => {
  console.log('server listening on port http://127.0.0.1:' + port)
})
