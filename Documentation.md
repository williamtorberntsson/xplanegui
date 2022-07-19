# Documentation and findings
This document describes how different parts of this code works together to make it easier to extend.
It also contains findings about XPlane and other software that might be interesting.

### XPlane
- XPlane **do** support missile lock/target sounds but **airplanes with FMOD breakes** that feature as of 2022/07.
- How often XPlane send data can be toggled, needs a deeper look.
- It is possible to change difficulty of CGF but not advanced behavior.
- Cannot get information about which CGF is friendly or not.
- Cannot get information when locked on from XPlaneConnect.

## Code
For installation and how to use: see README.md (in source code) 

### Map
The map is loaded using ArcGis maps. Esri-loader is used to load the map. Markers are used to mark own
airplane and other airplanes. If CGF are friendly or not has to be toggled in XPlane game itself and
therefor the markers has be hardcoded. The markers can be designed and use own svg.

### Data
fetchData.js is used to get data from Flask server with Axios. A proxy is used to get data from different routes.
The constants.js contains configuration numbers, like nr of airplanes map should draw and zoom level.

### WAD (Wide Area Display)
The WAD consists of a border with buttons (see Buttons section) and the entire display is covered by a map (see Map section).
Each position has a size (S/M/L) that can be managed with corresponding state **UL**/**ML**/**BL**/**UR**/**MR**/**BR**.
Widgets can be placed at positions by managing the **widgetPositions** state which holds a name for a widget at each position.
The recently pressed widget and position is stored in the states: **activeWidgetArea** and **activeWidget**, and updated with
**updateWidgetPosition()**.