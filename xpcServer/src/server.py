from turtle import pos
from flask import Flask
import xpc

app = Flask(__name__)

# Members API Route


@app.route("/plane")
def plane():
    with xpc.XPlaneConnect() as client:

        # Network settings
        data_freq_dref = "sim/network/dataout/network_data_rate"
        # Network settings
        client.sendDREF(data_freq_dref, 10) # send data 10 times/second
        
        # Own airplane airplane values
        groundspeed_dref = "sim/flightmodel/position/groundspeed"
        true_airspeed_dref = "sim/flightmodel/position/true_airspeed"
        alpha_dref = "sim/flightmodel/position/alpha"
        
        while True:

            # Own airplane airplane values
            posi = client.getPOSI()
            groundspeed = client.getDREF(groundspeed_dref)
            true_airspeed = client.getDREF(true_airspeed_dref)
            alpha = client.getDREF(alpha_dref)

            return {
                "longitude": posi[1],
                "latitude": posi[0],
                "groundspeed": groundspeed[0],
                "true_airspeed": true_airspeed[0],
                "true_heading": posi[5],
                "altitude": posi[2],
                "pitch": posi[3],
                "roll": posi[4],
                "alpha": alpha[0]
            }

@app.route("/env")
def env():
    with xpc.XPlaneConnect() as client:
        
        nr_of_planes = 5
        planes_data = [0]*nr_of_planes

        while True:
            
            for i in range(len(planes_data)):
                temp = client.getPOSI(i + 1)
                planes_data[i] = {
                    "longitude": temp[1],
                    "latitude": temp[0],
                    "true_heading": temp[5]
                }

            return {"planes": planes_data}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5050', debug=True)
