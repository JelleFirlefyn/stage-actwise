# CyberArk EPM Agent Installation Playbook Documentation

This Ansible playbook is designed to automate the installation of the CyberArk Endpoint Privilege Manager (EPM) Agent on both Windows and Ubuntu machines. It consists of two main parts: setting up a server to host the necessary installation files and executing the installation on the target machines.

## Prerequisites

Before running this playbook, ensure the following files are present in the same directory as the playbook:

- `vfagentsetupx64.msi` (Windows installation package)
- `epm-ubuntu.x86_64.deb` (Ubuntu installation package)
- `GPG-KEY-CyberArk` (GPG key for package verification)
- `CyberArkEPMAgentSetupLinux.config` (Configuration file for the Linux agent)
- `signing.pol` (Signing policy file)

## Playbook Structure

**DISCLAIMER**: some variables are defined twice, in the case you want to change them, change them EVERYWHERE.

1. **Setup Server for Installation Files**: A Docker container is used to serve the necessary CyberArk EPM Agent installation files. This is useful in environments where direct download from the CyberArk website is not feasible or where centralized distribution is preferred.

    #### Variables:
    - `agent_files_host_directory`: The directory on the Ansible control node where the installation files are stored.
    - `agent_files_container_path`: The path inside the Docker container where the installation files will be mounted.
    - `agent_files_container_port`: The port on which the Docker container will serve the installation files.
    - `agent_files`: A list of the installation files to be served. This includes the MSI file for Windows, DEB package for Ubuntu, the GPG key, the Linux configuration file, and the signing policy.


2. **Install CyberArk EPM Agent on Windows Machines**: This section of the playbook handles the installation of the EPM agent on Windows hosts. It includes tasks to check if the agent is already installed, create a temporary directory, download the MSI file, and execute the installation.

    #### Variables:
    - `installation_key`: The key provided by CyberArk necessary for the agent's installation.
    - `dispatcher_url`: The URL to the CyberArk dispatcher.
    - `register_token`, `set_id`, `set_name`, `config_version`, `iv`, `set_key`, `sig`: Configuration details for the EPM Agent installation.
    - `msi_container_port`: Port used to access the installation files from the Docker server.
    - `msi_filename`: Name of the MSI file to be installed.
    - `device_ip`: The IP address of the Docker server hosting the installation files.
    - `agent_dir`: The directory path where the CyberArk EPM Agent is expected to be installed on the Windows machines.


3. **Install CyberArk EPM Agent on Ubuntu Machines**: Similar to the Windows installation, this part deals with Ubuntu hosts. It includes steps for installing `debsig-verify`, setting up GPG keyrings and policies, downloading and verifying the DEB package, and activating the agent.

    #### Variables:
    - `device_ip`: The IP address of the Docker server hosting the installation 
    - `agent_files_container_port`: The port on which the Docker container will 
    - `installation_key`: Used during the agent's activation process on Ubuntu machines.

## Running the Playbook

To run the playbook, use the following command:

```bash
ansible-playbook cyberark_epm-agent_install.yaml -e "device_ip=10.0.0.1" -K
```

device_ip is required only when multiple network interfaces are present to specify which IP address should be used by the Docker container to serve the files. This ensures the playbook selects the correct IP address for file distribution.
-K is necessary for executing tasks that require sudo privileges on Ubuntu machines.

# Notes

- The playbook uses conditional checks to prevent re-installation on machines where the CyberArk EPM Agent is already installed. For Windows, it checks for the agent directory, and for Ubuntu, the installation steps proceed only if certain conditions are not met (this logic needs to be implemented based on the output of the epmcli --status command or similar).

- The NOTICE task indicates potential areas in the Ubuntu installation process that may not consistently succeed due to environmental factors or permissions issues. Subsequent tasks include a delay and a check for the agent's operational status as troubleshooting aids.

- Modification of variables such as installation_key, dispatcher_url, register_token, etc., should be done in accordance with your specific CyberArk EPM deployment details.