from flask import Flask
import xpc


app = Flask(__name__)

# Members API Route


@app.route("/plane")
def plane():
    with xpc.XPlaneConnect() as client:
        while True:
            posi = client.getPOSI()

            groundspeed_dref = "sim/flightmodel/position/groundspeed"
            indicated_airspeed_dref = "sim/flightmodel/position/indicated_airspeed"
            heading_dref = "sim/flightmodel/position/true_psi"
            groundspeed = client.getDREF(groundspeed_dref)
            indicated_airspeed = client.getDREF(indicated_airspeed_dref)
            heading = client.getDREF(heading_dref)
            (groundspeed[0], indicated_airspeed[0], heading[0])

            return {
                "longitude": posi[0],
                "latitude": posi[1],
                "groundspeed": groundspeed[0],
                "indicated_airspeed": indicated_airspeed[0],
                "heading": heading[0],
            }


@app.route("/env")
def env():
    with xpc.XPlaneConnect() as client:
        while True:
            ctrl = client.getCTRL()

            return {
                "cltr": [ctrl[1], ctrl[0], ctrl[2]]
            }


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5050', debug=True)
