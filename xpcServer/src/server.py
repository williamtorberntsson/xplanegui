from distutils.log import warn
from turtle import pos
from flask import Flask
import json
import xpc
from time import perf_counter


app = Flask(__name__)

# Members API Route


@app.route("/plane")
def plane():
    with xpc.XPlaneConnect() as client:

        # Network settings
        data_freq_dref = "sim/network/dataout/network_data_rate"
        # Network settings
        client.sendDREF(data_freq_dref, 10)  # send data 10 times/second

        # Own airplane airplane values
        groundspeed_dref = "sim/flightmodel/position/groundspeed"
        true_airspeed_dref = "sim/flightmodel/position/true_airspeed"
        alpha_dref = "sim/flightmodel/position/alpha"
        weight_drefs = ["sim/flightmodel/weight/m_fuel1", "sim/flightmodel/weight/m_fuel2", "sim/flightmodel/weight/m_fuel_total",
                        "sim/flightmodel/weight/m_fixed", "sim/flightmodel/weight/m_total"]
        warning_drefs = ["sim/cockpit2/annunciators/ice",
                         "sim/cockpit2/annunciators/transonic"]
        outside_air_temp_dref = "sim/cockpit2/temperature/outside_air_temp_degc"
        speedbrake_dref = "sim/cockpit2/annunciators/speedbrake"

        start_time = perf_counter()
        while True:
            print("My program took", perf_counter()/1000 - start_time, "to run")
            start_time = perf_counter()/1000

            # Own airplane airplane values
            posi = client.getPOSI()
            groundspeed = client.getDREF(groundspeed_dref)
            true_airspeed = client.getDREF(true_airspeed_dref)
            alpha = client.getDREF(alpha_dref)
            weights = client.getDREFs(weight_drefs)
            warnings = client.getDREFs(warning_drefs)
            speedbrake = client.getDREF(speedbrake_dref)
            outside_air_temp = client.getDREF(outside_air_temp_dref)

            return {
                "longitude": posi[1],
                "latitude": posi[0],
                "groundspeed": groundspeed[0],
                "true_airspeed": true_airspeed[0],
                "true_heading": posi[5],
                "altitude": posi[2],
                "pitch": posi[3],
                "roll": posi[4],
                "alpha": alpha[0],
                "weight": {
                    "fuel1": weights[0][0],
                    "fuel2": weights[1][0],
                    "total_fuel": weights[2][0],
                    "payload": weights[3][0],
                    "total": weights[4][0]
                },
                "warnings": {
                    "ice": warnings[0][0],
                    "transonic": warnings[1][0]
                },
                "status": {
                    "temperature": {
                        "outside": outside_air_temp[0]
                    },
                    "speedbrake": speedbrake[0]
                }
            }


@app.route("/pfd")
def pfd():
    with xpc.XPlaneConnect() as client:

        # Own airplane airplane values
        groundspeed_dref = "sim/flightmodel/position/groundspeed"
        true_airspeed_dref = "sim/flightmodel/position/true_airspeed"
        alpha_dref = "sim/flightmodel/position/alpha"
        g_drefs = ["sim/flightmodel/forces/g_nrml",
                   "sim/flightmodel/forces/g_axil", "sim/flightmodel/forces/g_side"]

        while True:

            # Own airplane airplane values
            posi = client.getPOSI()
            groundspeed = client.getDREF(groundspeed_dref)
            true_airspeed = client.getDREF(true_airspeed_dref)
            alpha = client.getDREF(alpha_dref)
            g = client.getDREFs(g_drefs)

            return {
                "groundspeed": groundspeed[0],
                "true_airspeed": true_airspeed[0],
                "true_heading": posi[5],
                "altitude": posi[2],
                "pitch": posi[3],
                "roll": posi[4],
                "alpha": alpha[0],
                "g_nrml": g[0][0],
                "g_axil": g[1][0],
                "g_side": g[2][0]
            }


@app.route("/weights")
def weights():
    with xpc.XPlaneConnect() as client:

        # Own airplane airplane values
        weight_drefs = ["sim/flightmodel/weight/m_fuel1", "sim/flightmodel/weight/m_fuel2", "sim/flightmodel/weight/m_fuel_total",
                        "sim/flightmodel/weight/m_fixed", "sim/flightmodel/weight/m_total"]

        while True:

            # Own airplane airplane values
            weights = client.getDREFs(weight_drefs)

            return {
                "fuel1": weights[0][0],
                "fuel2": weights[1][0],
                "total_fuel": weights[2][0],
                "payload": weights[3][0],
                "total": weights[4][0]
            }


@app.route("/env")
def env():
    with xpc.XPlaneConnect() as client:

        nr_of_planes = 5
        planes_data = [0]*nr_of_planes

        team_status_dref = "sim/multiplayer/combat/team_status"
        planes_lat_drefs = [""]*nr_of_planes
        planes_lon_drefs = [""]*nr_of_planes
        planes_el_drefs = [""]*nr_of_planes
        planes_heading_drefs = [""]*nr_of_planes

        for i in range(nr_of_planes):
            planes_lat_drefs[i] = "sim/multiplayer/position/plane{}_lat".format(i+1)
            planes_lon_drefs[i] = "sim/multiplayer/position/plane{}_lon".format(i+1)
            planes_el_drefs[i] = "sim/multiplayer/position/plane{}_el".format(i+1)
            planes_heading_drefs[i] = "sim/multiplayer/position/plane{}_psi".format(i+1)

        while True:

            planes_lat = client.getDREFs(planes_lat_drefs)
            planes_lon = client.getDREFs(planes_lon_drefs)
            team_status = client.getDREF(team_status_dref)
            planes_altitude = client.getDREFs(planes_el_drefs)
            planes_heading = client.getDREFs(planes_heading_drefs)

            for i in range(nr_of_planes):
                planes_data[i] = {
                    "longitude": planes_lon[i],
                    "latitude": planes_lat[i],
                    "true_heading": planes_heading[i],
                    "team_status": team_status[i],
                    "altitude": planes_altitude[i]
                }

            return {
                "planes": planes_data
            }


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5050', debug=True)
