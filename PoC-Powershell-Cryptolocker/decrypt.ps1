# Load the necessary assembly
Add-Type -AssemblyName System.Security

# Specify the folder containing encrypted files you want to decrypt, including subfolders
$folderPath = "C:\Users\jelle\Desktop\dd"

# Optional entropy used during encryption - must match exactly
$optionalEntropy = $null # Replace with the entropy used during encryption, if any
$scope = [System.Security.Cryptography.DataProtectionScope]::CurrentUser

# Decrypt each file in the folder and its subfolders
Get-ChildItem -Path $folderPath -File -Recurse | ForEach-Object {
    try {
        # Read the encrypted file contents
        $encryptedContent = [System.IO.File]::ReadAllBytes($_.FullName)
        
        # Decrypt the content
        $decryptedContent = [System.Security.Cryptography.ProtectedData]::Unprotect($encryptedContent, $optionalEntropy, $scope)
        
        # Write the decrypted content back to the file
        [System.IO.File]::WriteAllBytes($_.FullName, $decryptedContent)
        
        Write-Output "Decrypted file: $($_.FullName)"
    } catch {
        Write-Error "Failed to decrypt file: $($_.FullName). Error: $_"
    }
}
