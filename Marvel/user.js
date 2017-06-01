const colors = require('colors')
const moment = require('moment')
const Today = require('./Today')

class User {
  getInfo() {
    let userName = process.env['USER']
    let today = new Today()
    let time = today.getTime()
    console.log(`Hello ${userName}`.yellow)
    console.log(`The current time is ${time}`.green)
  }
}

module.exports = User
