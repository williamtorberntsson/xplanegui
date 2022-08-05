# Documentation and findings
This document describes how different parts of this code works together to make it easier to extend.
It also contains findings about XPlane and other software that might be interesting.

## XPlane
- XPlane **do** support missile lock/target sounds but **airplanes with FMOD soundengine** does not support that sound as of 2022/07.
- How often XPlane send data can be toggled, needs a deeper look.
- It is possible to change difficulty of CGF but not advanced behavior.
- Cannot get information when locked on from XPlaneConnect.
- When hit by other airplane everything on the AirPlane gets disabled, no realistic damage.

## JoyToKey
**[JoyToKey](https://joytokey.net/en/)** can be used to emulate mouse movements with the flight controllers.
See README for example configuration.

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

### WAD (Wide Area Display)
The WAD consists of a border with buttons (see Buttons section) and the entire display is covered by a map (see Map section).
Each position has a size (S/M/L) that can be managed with corresponding state **UL**/**ML**/**BL**/**UR**/**MR**/**BR**.
Widgets can be placed at positions by managing the **widgetPositions** state which holds a name for a widget at each position.
The recently pressed widget and position is stored in the states: **activeWidgetArea** and **activeWidget**, and updated with
**updateWidgetPosition()**.

## Research
- Insert CGF in the simulator enviroment is possible and their team status is choosen when adding a plane. The team status can be friendly, enemy or non-combat.
- The AI controlling the planes are constructed by xplane and the decision trees are not changable, the user can change the level of difficulty. There is an option to disable the AI and the planes must then be located manually each frame.
- It is not possible to see if another player/plane have locked on you.
- The HUD in 2D view is easy to modify with Plane Maker, models with a custumized 3D HUD exists but the tools or implementation of that is still unknown to us.
- Radar functions is possible to "fake", but all planes have god mode in xplane.

## Known bugs
- Sometimes the svg (images) does not load when selecting widgets when XPlane is running (maybe not enough resources for computer?)
- Sometimes the reset buttons make the screen go white and crash (look at errors in console)
- Sometimes the map doesn't load but reloading page fixes it.
- The server gets alot of errors when sending data very frequent.