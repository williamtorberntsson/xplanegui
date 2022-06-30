from flask import Flask
from time import sleep
import xpc

app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
    return{"members": ["Member144","Member2","Member3"]}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5050', debug=True)