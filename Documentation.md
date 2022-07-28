# Documentation and findings
This document describes how different parts of this code works together to make it easier to extend.
It also contains findings about XPlane and other software that might be interesting.

## XPlane
- XPlane **do** support missile lock/target sounds but **airplanes with FMOD soundengine** does not support that sound as of 2022/07.
- How often XPlane send data can be toggled, needs a deeper look.
- It is possible to change difficulty of CGF but not advanced behavior.
- Cannot get information when locked on from XPlaneConnect.

## JoyToKey
**[JoyToKey](https://joytokey.net/en/)** can be used to emulate mouse movements with the flight controllers.

## Modify planes
There are multiple ways airplanes can be modified with in several ways.

### Plane Maker
Airplanes can be modified with **[Plane Maker](https://developer.x-plane.com/manuals/planemaker/)**. In Plane Maker it is possible to
edit/create anything from wingsize to creating a hud or another instrument panel. There are already lots of already working instruments
that can be added with a simple drag and drop and it works without need to write any code.

Instruments can also be created with own png and animations they are called generic instruments. But it seems like the generic instruments are not possible to be in the hud.

With Plane Maker the HUD can be modified to a certain degree. There are predefined elements
that can be moved and added/removed but the elements themselves are unchangeable.

### FlyWithLua
The plugin **[FlyWithLua](https://github.com/X-Friese/FlyWithLua)** makes it possible to make scripts. It is possible to make simple clickable HUD elements that can display numbers and text but they are more of a element on screen than a HUD in the actual airplane.

## Code
For installation and how to use: see README.md (in source code) 

### Map
The map is loaded using **[ArcGis](https://developers.arcgis.com/javascript/latest/api-reference/)**. **[Esri-loader](https://github.com/Esri/esri-loader)** is used to load the map. Markers are used to mark own
airplane and other airplanes. If CGF are friendly or not has to be toggled in the XPlane game itself.
The markers can be designed and use your own svg.
To create a marker you need a GraphicsLayer, a Point and a Graphic.
An enemy, friendly and own airplane-markers have been created as examples in the **Map.js** component.

### Data
**fetchData.js** is used to get data from Flask server with Axios. A proxy is used to get data from different routes.
The constants.js contains configuration numbers, like nr of airplanes map should draw and zoom level.

### WAD (Wide Area Display)
The WAD consists of a border with buttons (see Buttons section) and the entire display is covered by a map (see Map section).
Each position has a size (S/M/L) that can be managed with corresponding state **UL**/**ML**/**BL**/**UR**/**MR**/**BR**.
Widgets can be placed at positions by managing the **widgetPositions** state which holds a name for a widget at each position.
The recently pressed widget and position is stored in the states: **activeWidgetArea** and **activeWidget**, and updated with
**updateWidgetPosition()**.

## Known bugs
- Sometimes the svg (images) does not load when selecting widgets when XPlane is running (maybe not enough resources for computer?)