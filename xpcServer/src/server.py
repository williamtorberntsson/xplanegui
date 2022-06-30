from flask import Flask
import xpc


app = Flask(__name__)

# Members API Route

@app.route("/plane")
def plane():
    with xpc.XPlaneConnect() as client:
        while True:
            posi = client.getPOSI();

            return {
                "positions": [posi[1], posi[0]]
                }

@app.route("/env")
def env():
    with xpc.XPlaneConnect() as client:
        while True:
            ctrl = client.getCTRL();

            return {
                "cltr": [ctrl[1], ctrl[0], ctrl[2]]
                }
    
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5050', debug=True)