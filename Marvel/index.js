const readline = require('readline')
const program = require('commander')

const Marvel = require('./Marvel')
const Today = require('./Today')

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
    today.getTime()
  });

program.parse(process.argv);

if(!program.args.length) program.help()
