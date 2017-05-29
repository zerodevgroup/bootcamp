## Setup (host operating system)

(Note: The following steps are to be performed on the host operating system)

### Install Virtual Box
https://www.virtualbox.org/

### Install Vagrant
https://www.vagrantup.com/downloads.html

### Clone this repo
```
git clone https://github.com/zerodevgroup/bootcamp.git
```

### Create box with vagrant

(Note: This may take a while. Make sure you let this process completely finish.)
```
cd bootcamp
vagrant up
```

## Setup (guest operating system)

(Note: The following steps are to be performed on the guest operating system after all previous processes are complete.)

### Clone this repo

Open Terminator

```
git clone https://github.com/zerodevgroup/bootcamp.git
```

### Update operating system
```
sudo apt-get update
sudo apt-get -y upgrade
```

(Note: towards the end of the upgrade, you will be asked for GRUB options. Don't select any options, just navigate to the OK button (tab to get there) and confirm you don't want any GRUB options installed.)

### Install Node JS
```
cd bootcamp
cat ubuntu-node-install | sudo -E bash -
```

### Dev Install

```
npm install
sudo ./dev-clean-install.js setup $USER <gitUser> <gitEmail> <gitPassword>
```

(Note: Please replace with actual github info)

Example:

```
sudo ./dev-clean-install.js setup $USER iamgroot groot@gmail.com 'guardian' 
```
