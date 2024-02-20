from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import secrets
import random
import os

def generate_random_token(min_length, max_length):
    return secrets.token_hex(nbytes=random.randint(min_length, max_length)//2)

def generate_keys(id):
    # Create key directory
    os.mkdir(f"keys/{id}")

    # Generate RSA keys
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend())
    public_key = private_key.public_key()

    # Serialize private key
    pem = private_key.private_bytes(encoding=serialization.Encoding.PEM,
                                    format=serialization.PrivateFormat.TraditionalOpenSSL,
                                    encryption_algorithm=serialization.NoEncryption())

    # Write private key to file
    with open(f"keys/{id}/private_key.pem", "wb") as priv_file:
        priv_file.write(pem)

    # Serialize public key
    pem = public_key.public_bytes(encoding=serialization.Encoding.PEM,
                                  format=serialization.PublicFormat.SubjectPublicKeyInfo)

    # Write public key to file
    with open(f"keys/{id}/public_key.pem", "wb") as pub_file:
        pub_file.write(pem)
