# CyberArk EPM Agent Installation Playbook Documentation

This Ansible playbook automates the installation of the CyberArk Endpoint Privilege Manager (EPM) Agent on Windows and Ubuntu machines. It includes setting up a server to host installation files and configuring machines to install the EPM agent, with optional proxy server setup for environments requiring proxy communication.

## Prerequisites

Ensure the following files are in the same directory as the playbook:
- `vfagentsetupx64.msi` (Windows installer)
- `epm-ubuntu.x86_64.deb` (Ubuntu installer)
- `GPG-KEY-CyberArk` (GPG key)
- `CyberArkEPMAgentSetupLinux.config` (Linux agent config)
- `signing.pol` (Signing policy file)

## Using Environment Variables

To streamline playbook execution and customization, define the following environment variables. Here's an example script to set them:

```bash
export AGENT_FILES_HOST_DIRECTORY="{{ playbook_dir }}/agent_installation_files"
export AGENT_FILES_CONTAINER_PATH="/usr/src/agent_installation_files"
export AGENT_FILES_CONTAINER_PORT="4141"
export INSTALLATION_KEY="YourInstallationKeyHere"
export DISPATCHER_URL="https://YourDispatcherURLHere"
export REGISTER_TOKEN="YourRegisterTokenHere"
export SET_ID="YourSetIDHere"
export SET_NAME="YourSetNameHere"
export CONFIG_VERSION="YourConfigVersionHere"
export IV="YourIVHere"
export SET_KEY="YourSetKeyHere"
export SIG="YourSigHere"
export MSI_CONTAINER_PORT="4141"
export MSI_FILENAME="vfagentsetupx64.msi"
export DEVICE_IP="{{ hostvars['localhost']['ansible_default_ipv4']['address'] }}"
export AGENT_DIR="C:\\Program Files\\CyberArk\\Endpoint Privilege Manager\\Agent"
export INSTALLATION_KEY_UBUNTU="YourInstallationKeyForUbuntuHere"
```

## Playbook Structure

**DISCLAIMER**: Variables are defined multiple times. Ensure all instances are consistently updated if changes are made.

### 1. Setup Server for Installation Files
A Docker container serves the necessary CyberArk EPM Agent installation files. This setup is useful where direct downloads from CyberArk or centralized distribution is preferred.

### 2. Install CyberArk EPM Agent on Windows Machines
This section handles the installation of the EPM agent on Windows hosts, including pre-installation checks, downloading the MSI file, and executing the installation.

### 3. Install CyberArk EPM Agent on Ubuntu Machines
Similar to Windows, this section deals with installing the EPM agent on Ubuntu hosts. It includes preparing the environment, downloading the DEB package, verifying its signature, and executing the installation.

## Running the Playbook
Execute the playbook with the following command:

```bash
ansible-playbook cyberark_epm-agent_install.yaml -K
```
-K is required for tasks needing sudo privileges on Ubuntu machines.

## Notes

- Conditional checks prevent re-installation where the CyberArk EPM Agent is already installed.
- The NOTICE task in the Ubuntu installation section indicates potential troubleshooting steps for environmental or permissions issues.
- Modify variables according to your CyberArk EPM deployment details.

## Proxy Server Setup

For environments requiring agents to communicate via a proxy, the beginning of the playbook outlines steps to configure a Squid proxy server. While the playbook prepares the environment, agents require manual configuration to use the proxy based on documentation available at: https://docs.cyberark.com/EPM/Latest/en/Content/Installation/ProxyConfiguration.htm