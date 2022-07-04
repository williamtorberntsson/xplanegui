from flask import Flask
import xpc


app = Flask(__name__)

# Members API Route


@app.route("/plane")
def plane():
    with xpc.XPlaneConnect() as client:

        # Network settings
        data_freq_dref = "sim/network/dataout/network_data_rate"
        client.sendDREF(data_freq_dref, 60) # send data 60 times/second

        # Own airplane airplane values
        groundspeed_dref = "sim/flightmodel/position/groundspeed"
        indicated_airspeed_dref = "sim/flightmodel/position/indicated_airspeed"
        true_airspeed_dref = "sim/flightmodel/position/true_airspeed"
        heading_dref = "sim/flightmodel/position/true_psi"
        elevation_dref = "sim/flightmodel/position/elevation"
        thete_dref =  "sim/flightmodel/position/theta"
        phi_dref = "sim/flightmodel/position/phi"
        alpha_dref = "sim/flightmodel/position/alpha"

        while True:

            # Own airplane airplane values
            posi = client.getPOSI()
            groundspeed = client.getDREF(groundspeed_dref)
            indicated_airspeed = client.getDREF(indicated_airspeed_dref)
            true_airspeed = client.getDREF(true_airspeed_dref)
            heading = client.getDREF(heading_dref)
            elevation = client.getDREF(elevation_dref)
            theta = client.getDREF(thete_dref)
            phi = client.getDREF(phi_dref)
            alpha = client.getDREF(alpha_dref)

            return {
                "longitude": posi[1],
                "latitude": posi[0],
                "groundspeed": groundspeed[0],
                "indicated_airspeed": indicated_airspeed[0],
                "true_airspeed": true_airspeed[0],
                "heading": heading[0],
                "altitude": elevation[0],
                "pitch": theta[0],
                "roll": phi[0],
                "alpha": alpha[0]
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
