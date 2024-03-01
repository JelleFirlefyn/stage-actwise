from flask import Flask, jsonify
from keygen import generate_keys, generate_random_token
from timestamp import log_time, get_time_left
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Assume keys are stored in the same directory as the script for this example
PUBLIC_KEY_PATH = "keys/public_key.pem"
PRIVATE_KEY_PATH = "keys/private_key.pem"

# Create keypair and retrieve public key & set timestamp
@app.route('/publickey', methods=['GET'])
def get_public_key():
    id = generate_random_token(24,32)
    generate_keys(id)
    log_time(id)
    with open(f'keys/{id}/public_key.pem', 'r') as file:
        public_key = file.read()
    return jsonify({"id": id,"publickey": public_key,})

@app.route('/time/<id>/', methods=['GET'])
@cross_origin() # This enables CORS just for this route
def get_time(id):
    return jsonify(get_time_left(id))

@app.route('/wordlist/<wl>/', methods=['GET'])
def get_wordlist(wl):
    with open(f"word_lists/{wl}.txt", "r") as file:
        l = file.readlines()
    return l


if __name__ == '__main__':
    app.run(ssl_context='adhoc', host='0.0.0.0', port=5050)
