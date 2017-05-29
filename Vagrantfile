Vagrant.configure(2) do |config|
    config.vm.box = "box-cutter/ubuntu1604-desktop"

    config.vm.provider "virtualbox" do |vb|
        # Display the VirtualBox GUI when booting the machine
        vb.gui = true

        # Customize the amount of memory on the VM:
        vb.memory = "2048"
    end

    config.vm.provision "shell", inline: <<-SHELL
        apt-get --yes install git
        apt-get --yes install vim
        apt-get --yes install terminator
        apt-get --yes install chromium-browser
        sudo apt-get remove --purge --yes gnome-terminal*
        sudo apt-get remove --purge --yes libreoffice*
        sudo apt-get remove --purge --yes thunderbird*
        sudo apt-get remove --purge --yes firefox*
        sudo apt-get clean
        sudo apt-get --yes autoremove
    SHELL

end
