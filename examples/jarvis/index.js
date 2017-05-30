var rp = require('request-promise-native')

class Jarvis {
  getWeather() {
    rp('http://samples.openweathermap.org/data/2.5/weather?zip=28105,us&appid=b1b15e88fa797225412429c1c50c122a1')
    .then(function (payload) {
      // Process html...
      console.log(payload)
    })
    .catch(function (err) {
      // Crawling failed...
    });
  }
}

let jarvis = new Jarvis()

jarvis.getWeather()
