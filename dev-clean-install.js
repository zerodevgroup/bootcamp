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
  shell.exec('timedatectl set-timezone America/New_York')
  shell.exec('apt-get install -y ntp')
  shell.exec('git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim')

let escape = ''

let vimrc = `
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'Valloric/YouCompleteMe'
Plugin 'vim-syntastic/syntastic'
Plugin 'scrooloose/nerdtree'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'kristijanhusak/vim-hybrid-material'
" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"""""Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" Git plugin not hosted on GitHub
"""""Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
"""""Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
"""""Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
let g:syntastic_always_populate_loc_list = 1
""let g:syntastic_javascript_checkers
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let mapleader = "-"
:set expandtab
:set shiftwidth=2
:set softtabstop=2
:set directory=/tmp
:noh
:syntax on
:set background=dark
:colorscheme hybrid_material
:set wildmode=list:longest
:set hidden
:set wildmenu
:set showcmd
:set ignorecase
:set smartcase
:set backspace=indent,eol,start
:set autoindent
:set ruler
:set laststatus=2
:set mouse=a
:set number
:map Y y$
:map <Leader>n <plug>NERDTreeTabsToggle<CR>
:map <Leader>no  <plug>NERDTreeTabsOpen
:map <Leader>nc  <plug>NERDTreeTabsClose
:map <Leader>ntoggle  <plug>NERDTreeTabsToggle
:map <Leader>nf  <plug>NERDTreeTabsFind
:map <Leader>mir  <plug>NERDTreeMirrorOpen
:map <Leader>mirt  <plug>NERDTreeMirrorToggle
:map <Leader>ntopen  <plug>NERDTreeSteppedOpen
:map <Leader>ntclose  <plug>NERDTreeSteppedClose
:set clipboard=unnamed
filetype plugin indent on
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
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
machine bitbucket.org login ${gitUser} password ${gitPassword}
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
