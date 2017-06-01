//
const api = require('marvel-api')
const readline = require('readline')


const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
})

let marvel = api.createClient({
  publicKey: '3ffd0da969c4817bd34a1fb7219d0707',
  privateKey: '89bafbb9d7e4b778f536edd16e8a96ff74bb9508'
})


class Jarvis {

  getVision() {
    marvel.characters.findByName('vision')
    .then(console.log)
    .fail(console.error)
    .done()
  }
  getAvengers() {
    marvel.characters.findByName('thor')
    .then((res) => {console.log(res.data[0].name + ' : ' + res.data[0].description)})
    .fail(console.error)
    .done()
    
    marvel.characters.findByName('spider-man')
    .then(console.log)
    .fail(console.error)
    .done()
    /*
    marvel.characters.findByName('Iron Man')
    .then(console.log)
    .fail(console.error)
    .done()
    marvel.characters.find('1010913')
    .then(console.log)
    .fail(console.error)
    .done()
    marvel.characters.find('1009351')
    .then(console.log)
    .fail(console.error)
    .done()
    */
  }



}

rl.question('Hello, would you like to know about who is currently in the Avengers?(yes or no) ',(answer) => {
  if(answer == 'yes') {
    let jarvis = new Jarvis()
    jarvis.getAvengers()
  }
  else {console.log('Ok then, have a great day')}

    rl.close()

})


