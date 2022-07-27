import { KEY_NAVIGATION_CONFIG as KEY, WIDGET_ORDER } from "./constants";

/**
 * Manages navigation with buttons on throttle (can also use arrow keys).
 * This only manages arrow keys, not select and mode keys.
 * For updating mode handleKeyDown() in WAD.js
 * @function
 * @category keynavigation
 * @param {number} keyCode keycode pressed key
 * @param {string} selecterMode which mode is navigater in
 * @param {string} selecter which button is selected
 * @param {function} updateSelecter function to update selecter
 */
const buttonNavigator = (keyCode, selecterMode, selecter, updateSelecter) => {

  switch (keyCode) {
    case KEY.LEFT_ARROW:
      switch (selecterMode) {
        case 0:
          if ((Number(selecter) + 5) % 10 == 0) updateSelecter((10).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
        case 1:
          if ((WIDGET_ORDER.indexOf(selecter) - 1) == -1) updateSelecter(WIDGET_ORDER[WIDGET_ORDER.length - 1])
          else updateSelecter(WIDGET_ORDER[(WIDGET_ORDER.indexOf(selecter) - 1) % WIDGET_ORDER.length])
          break;
      }
      break;
    case KEY.UP_ARROW:
      switch (selecterMode) {
        case 0:
          if (Number(selecter <= 5)) {
            if ((Number(selecter) - 1) == 0) updateSelecter((5).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          } else {
            if ((Number(selecter) - 1) == 5) updateSelecter((10).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          }
          break;
        case 1:
          break;
      }
      break;
    case KEY.RIGHT_ARROW:
      switch (selecterMode) {
        case 0:
          if ((Number(selecter) + 5) % 10 == 0) updateSelecter((1).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
        case 1:
          console.log("right")
          updateSelecter(WIDGET_ORDER[(WIDGET_ORDER.indexOf(selecter) + 1) % WIDGET_ORDER.length])
          break;
      }
      break;
    case KEY.DOWN_ARROW:
      switch (selecterMode) {
        case 0:
          if (Number(selecter) <= 5) {
            if ((Number(selecter) + 1) == 6) updateSelecter((1).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          } else {
            if ((Number(selecter) + 1) == 11) updateSelecter((6).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          }
          break;
        case 1:

          break;
      }
  }
}

export default buttonNavigator;