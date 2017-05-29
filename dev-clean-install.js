#!/usr/bin/node

var shell = require('shelljs')
var fs = require('fs')
var program = require('commander')

function DevCleanInstall() {
}

DevCleanInstall.prototype.setup = function(user, gitUser, gitEmail, gitPassword) {
  let home = process.env['HOME']

  shell.exec('apt-get install -y curl')
  shell.exec('apt-get install -y git')
  shell.exec('apt-get install -y vim')
  shell.exec('apt-get install -y terminator')
  shell.exec('apt-get install -y chromium-browser')
  shell.exec('apt-get install -y gimp')
  shell.exec('apt-get install -y gedit')
  shell.exec('apt-get install -y build-essential')
  shell.exec('apt-get install -y cmake')
  shell.exec('mkdir -p ~/.vim/autoload ~/.vim/bundle && curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim')
  shell.exec('git clone https://github.com/scrooloose/nerdtree.git ~/.vim/bundle/nerdtree')

let escape = ''

let vimrc = `
:set mouse=nicr
:set directory=/tmp
:set expandtab
:set shiftwidth=2
:set softtabstop=2
:set ruler
:set number
:set autoindent
:set clipboard=unnamed
:noh
:syntax on
execute pathogen#infect()
map <C-n> :NERDTreeToggle<CR>
`
  fs.writeFileSync(`${home}/.vimrc`, vimrc)

let bashrc = `
# Set up vi options
set -o vi
export EDITOR=vi
export VISUAL=vi

# Set prompt
export PS1='
$PWD
$> '

export NPM_GLOBAL="$HOME/.npm-global"
export ACCELERATE_HOME="$HOME/zerodevgroup/accelerate"

export PATH="$ACCELERATE_HOME/tools:$NPM_GLOBAL/bin:$PATH"
`
  fs.appendFileSync(`${home}/.bashrc`, bashrc)

  shell.exec(`git config --global user.name ${gitUser}`)
  shell.exec(`git config --global user.email ${gitEmail}`)
  shell.exec('git config --global core.fileMode false')
  shell.exec('git config --global push.default simple')
  shell.exec('git config core.fileMode false')

let netrc = `
machine github.com login ${gitUser} password ${gitPassword}
`

  fs.writeFileSync(`${home}/.netrc`, netrc)

let npmrc = `
prefix=~/.npm-global
`

  fs.writeFileSync(`${home}/.npmrc`, npmrc)

  shell.cd(`${home}`)
  shell.mkdir('.npm-global')

  shell.exec(`chmod -R 775 ${home}`)
  shell.exec(`chown -R ${user}:${user} ${home}`)

  //----------------------------
  // Install MongoDB
  //----------------------------
  shell.exec('apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6')
  shell.exec('echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list')
  shell.exec('apt-get update')
  shell.exec('apt-get install -y mongodb-org')
let mongodbService = `
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
`

  fs.writeFileSync('/etc/systemd/system/mongodb.service', mongodbService)

  shell.exec('systemctl start mongodb')
  shell.exec('systemctl enable mongodb')

}

DevCleanInstall.prototype.setupDocker = function() {
  let home = process.env['HOME']
  let user = process.env['USER']

  shell.exec('apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D')

  shell.exec("apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'")
  shell.exec('apt-get update')
  shell.exec('apt-cache policy docker-engine')
  shell.exec('apt-get install -y docker-engine')

  shell.exec('systemctl status docker')
  shell.exec(`usermod -aG docker ${user}`)
  shell.exec('apt-get install -y docker-compose')
}

var devCleanInstall = new DevCleanInstall()

program
  .command('setup <user> <gitUser> <gitEmail> <gitPassword>')
  .action(function (user, gitUser, gitEmail, gitPassword) {
    devCleanInstall.setup(user, gitUser, gitEmail, gitPassword)
  });

program
  .command('setupDocker')
  .action(function () {
    devCleanInstall.setupDocker()
  });

program.parse(process.argv);

if(!program.args.length) program.help()
