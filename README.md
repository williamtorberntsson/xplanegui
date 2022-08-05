# Xplane GUI
This project creates a flask-server that connects to X-Plane and sends data from/to X-Plane with a react frontend.

### Generate documenation website with JSdoc
To see all documented implementations run `npm run jsdoc` and then `npm run open-docs`.

## Run and install

### Installation
- Install flask (python)
- Run `npm install` (might have to use ``--legacy-peer-deps`)

### How to run
Start up:
- X-plane
- Front-End
- Back-End
- JoyToKey 
- JoyToKey or equivalent software (required if navigating with throttle)

If runned without Xplane, set the **USE_XPLANE_DATA** in **settings.js** to **false**.
The number of airplanes in XPlane needs to be set with **NR_AI_PLANES** in **settings.js**. 

#### Back-end
Start the python server `server.py`

#### Front-end
Run `npm start` and the app can be seen in your browser at http://localhost:3000
You might have to refresh the webpage.

## Structure Front-end
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
the mode key **'m'** on the keyboard.

## Button configutation
When using flight controllers the buttons needs to be mapped to buttons on the keyboard.
JoyToKey or any other equivalent software can be used. The keyboard configuration can be changed with
**KEY_NAVIGATION_CONFIG** in **settings.js**.


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


## Structure Back-end
The server gets data from X-plane and sends it to the Front-end. What data is send or recieved to/from Xplane
is decided with a reference to a specific data with the help of a plugin, [XPlaneConnect](https://github.com/nasa/XPlaneConnect).
There is a gigantic **[data reference page](https://developer.x-plane.com/datarefs/)** for all data that can be send and recieved and can be used with the plugin. For sending data see [this](#Getting-data-from-Back-end).

### oldServerSetup (slow)
Contains another version of server setup with xpc. This version is slow and works only with low frequency of GET request. There is however no errors on the server side. **fetchData.js** is used to get data from Flask server with Axios. A proxy is used to get data from different routes.
The settings.js contains configuration numbers, like nr of airplanes map should draw and zoom level.