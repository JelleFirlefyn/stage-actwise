# virtualbox-scripts
This repository contains a collection of batch scripts designed to automate the management of VirtualBox virtual machines (VMs). Each script serves a specific purpose in the lifecycle and maintenance of VMs, from creation to restoration.

Scripts and their functions:
1. **create_snapshots.bat**: This script automates the creation of snapshots for the specified VMs. Snapshots capture the state of a VM at a particular point in time, which can be useful for backup purposes or for testing different configurations without altering the main VM setup.

1. **poweroff.bat**: This script is used to safely power off specified VMs. It ensures that all VMs are properly shut down, preventing any data loss or corruption that might occur with an unexpected power cut.

1. **poweron.bat**: This script facilitates the startup of specified VMs. It can be used to automate the booting process of VMs, allowing for a quick setup of the required environment.

1. **remove_sharedfolders.bat**: This script removes shared folders from specified VMs. Shared folders are often used to enable easy file sharing between the host and the guest VMs. Removing them might be a part of cleanup processes or security protocols to restrict access.

1. **restore_vms.bat**: This script automates the restoration of VMs from their snapshots. This can revert the VMs back to a previous state, which is particularly useful in case of a malfunction or if changes made to the VM need to be discarded.

## Usage Guidelines
To use these scripts, users should have VirtualBox installed on their system and the VirtualBox VMs should be correctly configured. Before executing any script, it's crucial to ensure that it is appropriately modified to point to the correct VM names and settings as per the user's setup.

**Note**: Batch files are scripts executable in a Windows environment. Users should have administrative privileges to ensure the scripts can perform operations that may require such permissions.

**Warning**: Always backup your VMs before running scripts that modify VM states, such as `restore_vms.bat` or `remove_sharedfolders.bat`, to prevent any unintended data loss.

