# Xplane GUI
This project creates a flask-server that connects to X-Plane and sends data from/to X-Plane with a react frontend.

### Generate documenation website with JSdoc
Run `npm run jsdoc` and then `npm run open-docs`

## Run and install

### Installation
- Install flask (python)
- Run `npm install`

### How to run
Start up X-plane together with front-end and back-end on the same computer.

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
on the left side correspond to the left area of the screen and the same for the right side, the sides are independant.

The button in the middle will make the entire side to one widget that will take up the whole side (size L).
Byt using the buttons at the top/bottom and the buttons between the middle button will devide the side into two widget positions.
The buttons at the top/bottom will make the corresponding widget small (size S). And the button in between the top/bottom and middle button
will make the widget medium sized (size M).

The buttons at the bottom select what widget should be placed at the recently select position.

## Structure Back-end
The server gets data from X-plane and sends it to the Front-end. What data is send or recieved to/from Xplane
is decided with a reference to a specific data with the help of a plugin, [XPlaneConnect](https://github.com/nasa/XPlaneConnect).
The plugin has a gigantic data reference page for all data that can be send and recieved.