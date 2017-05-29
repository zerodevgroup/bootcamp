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
    SHELL

end
