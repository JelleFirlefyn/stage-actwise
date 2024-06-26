# Internship Actwise - Defend against cryptolockers

## Overview
This repository is an integral part of an internship project aimed at studying the behavior and countermeasures against Cryptolocker ransomware attacks. The project focuses on comparing the effectiveness of CyberArk's Endpoint Security Solutions in mitigating these threats within a controlled environment.

## Objectives
The primary objectives of the repository include:

- **Simulation of Cryptolocker Attacks**: Crafting a scenario to simulate an attack within a test environment to analyze the behavior of Cryptolockers.
- **Implementation of CyberArk's Endpoint Security Solution**: Documenting the process of securing the test environment using CyberArk's tools and showcasing the solution's effectiveness in preventing attacks.
- **Performance Analysis**: Evaluating how CyberArk's solution impacts system performance, ensuring that security measures do not hinder daily operations.

## Methodology
Following the agile project methodologies, the internship project emphasizes iterative development, intensive communication, and quality assurance. This repository serves as a knowledge base and a record of all developmental iterations and findings throughout the internship period.

## Learning Outcomes
The repository not only serves as a testament to technical achievements but also represents a significant component of the learning journey. It documents the challenges faced, solutions implemented, and knowledge gained in the realm of cybersecurity.

## Contribution to Cybersecurity
By addressing the critical issue of ransomware attacks, the repository stands as a resource for developing robust defense mechanisms. It contributes to the broader cybersecurity community by providing insights and evidence-based strategies for combating Cryptolocker attacks.

## Directory Structure

The repository consists of three main directories, each serving a specific purpose in the project:

### PowerShell Scripts

Contains two PowerShell scripts for simulating file encryption and decryption, resembling the functionality of ransomware encryption and the potential decryption process.

Key functionalities:

- `encrypt.ps1`: Encrypts files recursively within a specified directory, simulating the file encryption process of ransomware. It uses a symmetric encryption algorithm, requiring a password to encrypt the files. This script is essential for testing the resilience of the environment against encryption-based attacks.

- `decrypt.ps1`: Provides the capability to decrypt files that were encrypted by the `encrypt.ps1` script, using the same password. This script simulates the decryption process that might be used after a ransom payment, testing the ability to recover encrypted files.

These scripts are crucial for evaluating the effectiveness of CyberArk EPM in preventing unauthorized file encryption by ransomware and ensuring the secure management of encryption keys.

### ansible

This directory contains Ansible scripts used for automating the configuration management of the testing environment. Ansible enables the efficient setup and tear-down of environments, ensuring consistent configurations across multiple virtual machines (VMs).

Key functions:
- Automating the deployment of CyberArk EPM (Endpoint Privilege Manager).
- Configuring various security policies and rules.
- Managing user privileges and application access within the test environment.

### encry-ransomware

This directory holds the core of the project - the Cryptolocker simulation scripts. These scripts are used to simulate Cryptolocker attacks within a virtual environment to test the efficacy of CyberArk's security solutions.

Key components:
- `encrypt.py`: Simulates the encryption process of a Cryptolocker attack.
- `decrypt.py`: Attempts to reverse the encryption, representing the decryption capabilities post-ransom payment.
- `server.py`: Acts as a central server to generate and distribute encryption keys, mimicking the command and control (C2) server used in real-world ransomware attacks.

### virtualbox-scripts

Contains scripts that assist with the management of VirtualBox VMs. VirtualBox is used to create a simulated network of computers where Cryptolocker attacks can be safely executed and studied.

Key functionalities:
- Automating the setup of VMs.
- Configuring network settings to simulate an enterprise network environment.
- Facilitating the snapshotting and restoration of VM states for repeated testing.

## Usage

Each directory contains a `README.md` file that provides detailed instructions on how to use the scripts within. It is crucial to follow these instructions carefully to ensure the proper functioning of the test environment.

## Contribution

As this repository is part of an ongoing internship project, contributions are limited to the project team members. However, feedback and suggestions can be sent to the repository maintainer for consideration.

# Disclaimer

This repository and all its contents, including scripts, configurations, and documentation, are provided for educational, research, ethical hacking, and security awareness purposes only. The repository's goal is to contribute to the cybersecurity community by sharing knowledge, tools, and techniques for defensive and educational purposes.

**The author(s) of this repository strictly condemn and prohibit any unauthorized, illegal, or malicious use of the materials contained within.** Users are urged to act responsibly and ethically, respecting all applicable local, state, national, and international laws and regulations when using or deploying techniques and tools shared in this repository.

**By accessing, downloading, or using any information and resources from this repository, you agree to use them in a manner consistent with ethical hacking principles, cybersecurity testing, and educational purposes only. You acknowledge that you are solely responsible for ensuring compliance with all legal and ethical standards and will not use the information contained herein for any unauthorized or illegal activities.**

The repository owner(s) and contributor(s) assume no liability and are not responsible for any misuse or damage caused by the information or tools provided. It is the end user's responsibility to ensure that their actions are lawful and comply with the ethical guidelines of the cybersecurity field.

**If you are unsure about the legality of using these tools and techniques in your jurisdiction or context, please consult with a legal professional or cybersecurity ethics expert before proceeding.**

Remember, the aim is to enhance security and knowledge, not to break it down or harm others. Use this repository to learn, protect, and improve, not to exploit or cause harm.