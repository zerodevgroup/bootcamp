Vagrant.configure(2) do |config|
    config.vm.box = "box-cutter/ubuntu1604-desktop"

    config.vm.provider "virtualbox" do |vb|
        # Display the VirtualBox GUI when booting the machine
        vb.gui = true

        # Customize the amount of memory on the VM:
        vb.memory = "4096"
    end

    config.vm.provision "shell", inline: <<-SHELL
        # Update OS
        apt-get update
        apt-get -y upgrade

        apt-get --yes install git
        apt-get --yes install vim
        apt-get --yes install terminator
        apt-get --yes install chromium-browser
        apt-get --yes install ant
        apt-get --yes install build-essential
        apt-get --yes install cmake
        apt-get --yes install curl
        apt-get --yes install gimp
        apt-get --yes install ubuntu-gnome-desktop

    SHELL
end
