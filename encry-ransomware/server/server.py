from flask import Flask, jsonify
from keygen import generate_keys, generate_random_token

app = Flask(__name__)

# Assume keys are stored in the same directory as the script for this example
PUBLIC_KEY_PATH = "keys/public_key.pem"
PRIVATE_KEY_PATH = "keys/private_key.pem"

# Create keypair and retrieve public key
@app.route('/publickey', methods=['GET'])
def get_public_key():
    id = generate_random_token(24,32)
    generate_keys(id)
    with open(f'keys/{id}/public_key.pem', 'r') as file:
        public_key = file.read()
    return jsonify({"id": id,"publickey": public_key,})


if __name__ == '__main__':
    app.run(ssl_context='adhoc', host='0.0.0.0')
