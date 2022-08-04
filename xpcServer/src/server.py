from distutils.log import warn
from turtle import pos
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import json
import xpc


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Members API Route

# See XPlane Data Ref https://developer.x-plane.com/datarefs/


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


# Pre-defined data refs

# Network settings
data_freq_dref = "sim/network/dataout/network_data_rate"

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

weight_drefs = ["sim/flightmodel/weight/m_fuel1", "sim/flightmodel/weight/m_fuel2", "sim/flightmodel/weight/m_fuel_total",
                "sim/flightmodel/weight/m_fixed", "sim/flightmodel/weight/m_total"]

# Own airplane airplane values
groundspeed_dref = "sim/flightmodel/position/groundspeed"
true_airspeed_dref = "sim/flightmodel/position/true_airspeed"
alpha_dref = "sim/flightmodel/position/alpha"
g_drefs = ["sim/flightmodel/forces/g_nrml",
           "sim/flightmodel/forces/g_axil", "sim/flightmodel/forces/g_side"]

# Multiplayer values
nr_of_planes = 20
team_status_dref = "sim/multiplayer/combat/team_status"
planes_data = [0]*nr_of_planes


planes_lat_drefs = [""]*nr_of_planes
planes_lon_drefs = [""]*nr_of_planes
planes_el_drefs = [""]*nr_of_planes
planes_heading_drefs = [""]*nr_of_planes

for i in range(nr_of_planes):
    # (i+1) since there is no Plane0
    planes_lat_drefs[i] = "sim/multiplayer/position/plane{}_lat".format(i+1)
    planes_lon_drefs[i] = "sim/multiplayer/position/plane{}_lon".format(i+1)
    planes_el_drefs[i] = "sim/multiplayer/position/plane{}_el".format(i+1)
    planes_heading_drefs[i] = "sim/multiplayer/position/plane{}_psi".format(
        i+1)


# Socket Events

@socketio.on("setup")
def handle_setup(data):
    with xpc.XPlaneConnect() as client:

        global nr_of_planes
        nr_of_planes = data['nr_ai']
        client.sendDREF(data_freq_dref, data['freq'])  # send data data.freq times/second
        print("Setup done!")

        emit("setup", "Setup done!\nData frequency set to: {}\nAnd {} AI planes".format(data['freq'], nr_of_planes))


@socketio.on("plane")
def handle_plane(message):
    """with xpc.XPlaneConnect() as client:

        # Own airplane airplane values
        posi = client.getPOSI()
        groundspeed = client.getDREF(groundspeed_dref)
        true_airspeed = client.getDREF(true_airspeed_dref)
        alpha = client.getDREF(alpha_dref)

        global nr_of_planes
    """

    emit("plane", {
        "longitude": 15.88092,
        "latitude": 58.41157469382408,
        "groundspeed": 10,
        "true_airspeed": 30,
        "true_heading": 30,
        "altitude": 1000,
        "pitch": 3,
        "roll": 2,
        "alpha": 0.4
    })


@socketio.on('pfd')
def handle_pfd(message):
    with xpc.XPlaneConnect() as client:

        # Own airplane airplane values
        posi = client.getPOSI()
        groundspeed = client.getDREF(groundspeed_dref)
        true_airspeed = client.getDREF(true_airspeed_dref)
        alpha = client.getDREF(alpha_dref)
        g = client.getDREFs(g_drefs)

        emit("pfd", {
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
        })


@socketio.on("weights")
def handle_weights(message):
    with xpc.XPlaneConnect() as client:

        # While True:
        # Own airplane airplane values
        weights = client.getDREFs(weight_drefs)

        emit("weights", {
            "fuel1": weights[0][0],
            "fuel2": weights[1][0],
            "total_fuel": weights[2][0],
            "payload": weights[3][0],
            "total": weights[4][0]
        })


@socketio.on("status")
def handle_status(message):
    with xpc.XPlaneConnect() as client:

        # While True:
        # Own airplane airplane values
        speedbrake = client.getDREF(speedbrake_dref)
        outside_air_temp = client.getDREF(outside_air_temp_dref)

        emit("status", {
            "temperature": {
                "outside": outside_air_temp[0]
            },
            "speedbrake": speedbrake[0]
        })


@socketio.on("warnings")
def handle_warnings(message):
    with xpc.XPlaneConnect() as client:

        # While True:
        # Own airplane airplane values
        warnings = client.getDREFs(warning_drefs)

        emit("warnings", {
            "ice": warnings[0][0],
            "transonic": warnings[1][0]
        })


@socketio.on("aiplanes")
def handle_aiplanes(nr_ai):
    """with xpc.XPlaneConnect() as client:

        planes_lat = client.getDREFs(planes_lat_drefs[0:nr_ai])
        planes_lon = client.getDREFs(planes_lon_drefs[0:nr_ai])
        planes_altitude = client.getDREFs(planes_el_drefs[0:nr_ai])
        planes_heading = client.getDREFs(planes_heading_drefs[0:nr_ai])

        team_status = client.getDREF(team_status_dref)

        for i in range(nr_ai):
            planes_data[i] = {
                "longitude": planes_lon[i],
                "latitude": planes_lat[i],
                "true_heading": planes_heading[i],
                "altitude": planes_altitude[i],
                # team_status have 20 slots, the first one is always 1.0 (friendly), possible to be ourselves
                "team_status": team_status[i+1]
            }
    """

    planes_data = [{
        "longitude": 16,
        "latitude": 59,
        "true_heading": 70,
        "altitude": 2000,
        "team_status": 1
    },
    {
        "longitude": 16.5,
        "latitude": 59.2,
        "true_heading": 140,
        "altitude": 1000,
        "team_status": 2
    }
    ]

    emit("aiplanes", {
        "planes": planes_data
    })


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5050)
