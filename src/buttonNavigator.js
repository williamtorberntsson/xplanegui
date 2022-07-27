import { KEY_NAVIGATION_CONFIG as KEY, WIDGET_ORDER, VIEW_MODE_LANDING, VIEW_MODE_MINI } from "./constants";

/**
 * Manages navigation with buttons on throttle (can also use arrow keys, p and m).
 * @function
 * @category keynavigation
 * @param {number} keyCode keycode pressed key
 * @param {string} selecterMode which mode is navigater in
 * @param {string} selecter which button is selected
 * @param {function} updateSelecter function to update selecter
 */
const buttonNavigator = (keyCode, selecterMode, selecter, updateSelecter, updateSelecterMode, updateActiveBtn, updateWidgetPos, setUL, setUR, setBL, setBR, setSelectedWidgetPos, updateViewMode) => {

  console.log("Key pressed: ", keyCode, " Mode: ", selecterMode, " selected: ", selecter)
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
      break;
    case KEY.P:
      if (selecterMode == 0) {
        updateActiveBtn(selecter)
        switch (selecter) {
          case '1':
            setUL('S')
            setSelectedWidgetPos('U' + 'L')
            break;
          case '2':
            setUL('M')
            setSelectedWidgetPos('U' + 'L')
            break;
          case '3':
            setUL('L')
            setBL('L')
            setSelectedWidgetPos('M' + 'L')
            break;
          case '4':
            setBL('M')
            setSelectedWidgetPos('B' + 'L')
            break;
          case '5':
            setBL('S')
            setSelectedWidgetPos('B' + 'L')
            break;
          case '6':
            setUR('S')
            setSelectedWidgetPos('U' + 'R')
            break;
          case '7':
            setUR('M')
            setSelectedWidgetPos('U' + 'R')
            break;
          case '8':
            setUR('L')
            setBR('L')
            setSelectedWidgetPos('M' + 'R')
            break;
          case '9':
            setBR('M')
            setSelectedWidgetPos('B' + 'R')
            break;
          case '10':
            setBR('S')
            setSelectedWidgetPos('B' + 'R')
            break;
        }
      }
      else if (selecterMode == 1) {
        updateWidgetPos(selecter)
      }
      break;
    case KEY.M:
      updateSelecterMode((selecterMode + 1) % 2)
      break;
    case KEY.ONE:
      updateViewMode(VIEW_MODE_LANDING)
      break;
    case KEY.TWO:
      updateViewMode(VIEW_MODE_MINI)
      break;

  }
}

export default buttonNavigator;