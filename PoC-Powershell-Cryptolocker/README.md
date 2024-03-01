# PowerShell File Encryption and Decryption Scripts

This repository contains two PowerShell scripts for encrypting and decrypting files in Windows environments. These scripts are designed to provide a straightforward method for securing files on your system using symmetric encryption with a password.

## Getting Started

These instructions will guide you through the setup and usage of the encryption and decryption scripts on your local machine for development and testing purposes.

### Prerequisites

- Windows operating system with PowerShell 5.1 or higher.
- Basic understanding of PowerShell and command-line usage.

### Installing

No installation is necessary. However, you may need to adjust your PowerShell execution policy to run these scripts. You can do this by opening PowerShell as an administrator and running:

```powershell
Set-ExecutionPolicy RemoteSigned
```

# Usage

## Encrypting Files

To encrypt files, use the `encrypt.ps1` script. This script recursively encrypts all files in the specified directory, excluding the script itself and any system files.

``` cli
.\encrypt.ps1 -FolderPath "C:\Path\To\Your\Directory" -Password "YourStrongPassword"
```

**Parameters:**

- `-FolderPath`: The path to the directory containing the files you wish to encrypt.
- `Password`: The password used to generate the encryption key. Remember this password, as it will be required for decryption.

## Decryptig Files

To decrypt your files, use the decrypt.ps1 script with the same password used for encryption.

``` powershell
.\decrypt.ps1 -FolderPath "C:\Path\To\Your\Encrypted\Directory" -Password "YourStrongPassword"
```

**Parameters**

- `FolderPath`: The path to the directory containing the files you wish to decrypt.
- `Password`: The password used during the encryption process.

# Security Considerations

- Always remember your encryption password. Without it, you cannot decrypt your encrypted files.
- It is recommended to backup your data before running encryption or decryption operations.
- These scripts are intended for basic file encryption and should not be relied upon for securing highly sensitive information.

# Contributing

Contributions to improve the encryption and decryption scripts are welcome. Please feel free to fork the repository and submit pull requests.