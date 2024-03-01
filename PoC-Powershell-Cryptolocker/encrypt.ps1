# Load the necessary assembly
Add-Type -AssemblyName System.Security

# Specify the folder containing files you want to encrypt
$folderPath = "C:\Users\jelle\Desktop\dd"

# Optional entropy for the encryption method - keep it secure and constant to decrypt
$optionalEntropy = $null # Replace with actual entropy if needed, and keep it secure
$scope = [System.Security.Cryptography.DataProtectionScope]::CurrentUser

# Optional entropy for the encryption method - keep it secure and constant to decrypt
$optionalEntropy = $null # Replace with actual entropy if needed, and keep it secure
$scope = [System.Security.Cryptography.DataProtectionScope]::CurrentUser

# Encrypt each file in the folder and its subfolders
Get-ChildItem -Path $folderPath -File -Recurse | ForEach-Object {
    try {
        # Read the file contents
        $content = [System.IO.File]::ReadAllBytes($_.FullName)
        
        # Encrypt the content
        $encryptedContent = [System.Security.Cryptography.ProtectedData]::Protect($content, $optionalEntropy, $scope)
        
        # Write the encrypted content back to the file
        [System.IO.File]::WriteAllBytes($_.FullName, $encryptedContent)
        
        Write-Output "Encrypted file: $($_.FullName)"
    } catch {
        Write-Error "Failed to encrypt file: $($_.FullName). Error: $_"
    }
}
