const readline = require('readline')
const Jarvis = require('./Jarvis')
const program = require('commander')

program
  .command('avengers')
  .action(function () {
    let jarvis = new Jarvis()
    jarvis.getAvengers()
  });

program.parse(process.argv);

if(!program.args.length) program.help()
