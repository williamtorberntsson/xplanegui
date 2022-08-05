# Xplane GUI
This App contains a WAD (Wide Area Display) that shows information from XPlane with different widgets. It communicates with XPlane though a socket between React and Flask. Flask uses XPlaneConnect to get/send data from XPlane. Server can easily be edited to use other data than from XPlane.

## Run and install

### Installation

#### XPlane (required for live data)
Install [XPlaneConnect](https://github.com/nasa/XPlaneConnect) plugin to XPlane.

#### React (Client)
```bash
npm install # might have to use `--legacy-peer-deps'
```

#### Flask (Server)
```bash
pip install Flask \
    simple-websocket \
    flask-socketio
```

### How to run
See instructions further below for more details.
Start up:
- X-plane (required for live data)
- Flask
- React
- JoyToKey or equivalent software (required if navigating WAD with flight controlls)

- The number of airplanes in XPlane needs to be set with **NR_AI_PLANES** in **src/settings.js**. 
- When not using Xplane, set the **USE_XPLANE_DATA** in **src/settings.js** to **false**.

#### Start Flask
```bash
python3 xpcServer/src/server.py
```

#### Start React
```bash
npm start
```
and the app can be seen in your browser at http://localhost:3000
You might have to refresh the webpage.

### Generate documenation website with JSdoc
To see all documented implementations run:
```bash
npm run jsdoc
npm run open-docs
```

## How to use and description
In the middle of the screen there is a WAD (wide area display) and buttons around for configuring
the WAD. The whole WAD is covered by a map that shows your own plane (orange) and other airplanes (green/red).
There are widgets that you can place at the different locations on the WAD with different buttons.

### Buttons
The buttons at the left and right side decides how the widgets will be placed on the screen. The buttons
on the left side correspond to the left area of the screen and the right side correspond to the right area of the screen.
Each side works identically and independantly of each other. Each side is divided into three areas where a widget can be placed.
One of the areas take up the entire side and the other two take up half the side, one for the upper region and the other for the lower region.

The button in the middle will make the entire side to one widget (size L).
The other four buttons (not the one in the middle) are used to select a size for a widget at the top and bottom area.
The button at the top and the bottom will make the corresponding widget the smallest size (size S) and the one below/above
with make the corresponding widget take up the upper/lower side of the screen (size M).

The buttons at the bottom select what widget should be placed at the recently select position. The recently
selected **side button** is lit up in green.

### Navigating the buttons
All buttons are clickable but right now only the buttons on the side and at the bottom do something.
The **arrow keys** can be used to navigate the buttons. A blue border is shown on the button that you have
navigated to. The buttons can be pressed with **'p'** on the keyboard. The buttons on the side and the ones
on the bottom are divided into two modes. You can switch between the side buttons and bottom buttons by pressing
the mode key **'m'** on the keyboard. The buttons can be configured in
**src/settings.js**.

## Button configutation
When using flight controllers the buttons needs to be mapped to buttons on the keyboard.
JoyToKey or any other equivalent software can be used. The keyboard configuration can be changed with
**KEY_NAVIGATION_CONFIG** in **src/settings.js**.


### JoyToKey configuration
Hotas Warthog throttle configuration
Joystick 2
- Stick1:   ←  Mouse: ←(50) Adjust(50%)
- Stick1:   →  Mouse: →(50) Adjust(50%)
- Stick1:   ↑  Mouse: ↑(50) Adjust(50%)
- Stick1:   ↓  Mouse: ↓(50) Adjust(50%)
- Button1   Mouse:L-click
- Button2   P
- Button3   ↑
- Button4   →
- Button5   ↓
- Button6   ←
- Button8   M
- Button9   2
- Button10  1


## branch: oldServerSetup (slow)
Contains another version of server setup with xpc. This version is slow and works only with low frequency of GET request. Might be helpful for debugging the socket version. There is however no errors on the server side. **fetchData.js** is used to get data from Flask server with Axios. A proxy is used to get data from different routes.
The **src/settings.js** contains configuration numbers, like nr of airplanes map should draw and zoom level.