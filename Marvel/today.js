const colors = require('colors')
const moment = require('moment')

class Today {
  getTime() {
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    return(currentDate)
  }
}

module.exports = Today
