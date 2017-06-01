const readline = require('readline')
const colors = require('colors')
const program = require('commander')

const Marvel = require('./Marvel')
const Today = require('./Today')
const User = require('./User')

program
  .command('avengers')
  .action(function () {
    let marvel = new Marvel()
    marvel.getAvengers()
  });

program
  .command('time')
  .action(function () {
    let today = new Today()
    let time = today.getTime()
    console.log(time.green)
  });

program
  .command('user')
  .action(function () {
    let user = new User()
    user.getInfo()
  });

program.parse(process.argv);

if(!program.args.length) program.help()
