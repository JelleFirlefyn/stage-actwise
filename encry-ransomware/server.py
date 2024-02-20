from flask import Flask, jsonify
import os

app = Flask(__name__)

# Assume keys are stored in the same directory as the script for this example
PUBLIC_KEY_PATH = "keys/public_key.pem"
PRIVATE_KEY_PATH = "keys/private_key.pem"


@app.route('/publicKey', methods=['GET'])
def get_public_key():
    with open(PUBLIC_KEY_PATH, 'r') as file:
        public_key = file.read()
    return jsonify({"publicKey": public_key})


if __name__ == '__main__':
    app.run(ssl_context='adhoc', host='0.0.0.0')
