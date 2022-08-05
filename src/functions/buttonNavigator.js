import { KEY_NAVIGATION_CONFIG as KEY, WIDGET_ORDER, VIEW_MODE_LANDING, VIEW_MODE_MINI } from "../settings";

/**
 * Manages navigation with buttons on throttle (can also use arrow keys, p and m).
 * @function
 * @category keynavigation
 * @param {number} keyCode keycode pressed key
 * @param {string} selecterMode which mode is navigater in
 * @param {string} selecter which button is selected
 * @param {function} updateSelecter function to update selecter
 * @todo split up buttonNavigator into multiple functions but keep one export
 */
const buttonNavigator = (keyCode, selecterMode, selecter, updateSelecter, updateSelecterMode, updateActiveBtn, updateWidgetPos, setUL, setUR, setBL, setBR, setSelectedWidgetPos, updateViewMode) => {

  switch (keyCode) {
    case KEY.LEFT:
      switch (selecterMode) {
        case 0:
          if ((Number(selecter) + 5) % 10 === 0) updateSelecter((10).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
        case 1:
          if ((WIDGET_ORDER.indexOf(selecter) - 1) === -1) updateSelecter(WIDGET_ORDER[WIDGET_ORDER.length - 1])
          else updateSelecter(WIDGET_ORDER[(WIDGET_ORDER.indexOf(selecter) - 1) % WIDGET_ORDER.length])
          break;
        default: // do nothing
      }
      break;
    case KEY.UP:
      switch (selecterMode) {
        case 0:
          if (Number(selecter <= 5)) {
            if ((Number(selecter) - 1) === 0) updateSelecter((5).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          } else {
            if ((Number(selecter) - 1) === 5) updateSelecter((10).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          }
          break;
        case 1:
          break;
        default: // do nothing
      }
      break;
    case KEY.RIGHT:
      switch (selecterMode) {
        case 0:
          if ((Number(selecter) + 5) % 10 === 0) updateSelecter((10).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
        case 1:
          updateSelecter(WIDGET_ORDER[(WIDGET_ORDER.indexOf(selecter) + 1) % WIDGET_ORDER.length])
          break;
        default: // do nothing
      }
      break;
    case KEY.DOWN:
      switch (selecterMode) {
        case 0:
          if (Number(selecter) <= 5) {
            if ((Number(selecter) + 1) === 6) updateSelecter((1).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          } else {
            if ((Number(selecter) + 1) === 11) updateSelecter((6).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          }
          break;
        case 1:
          break;
        default: // do nothing
      }
      break;
    case KEY.PRESS:
      if (selecterMode === 0) {
        updateActiveBtn(selecter)
        switch (selecter) {
          case '1':
            setUL('S')
            setSelectedWidgetPos('UL')
            break;
          case '2':
            setUL('M')
            setSelectedWidgetPos('UL')
            break;
          case '3':
            setUL('L')
            setBL('L')
            setSelectedWidgetPos('ML')
            break;
          case '4':
            setBL('M')
            setSelectedWidgetPos('BL')
            break;
          case '5':
            setBL('S')
            setSelectedWidgetPos('BL')
            break;
          case '6':
            setUR('S')
            setSelectedWidgetPos('UR')
            break;
          case '7':
            setUR('M')
            setSelectedWidgetPos('UR')
            break;
          case '8':
            setUR('L')
            setBR('L')
            setSelectedWidgetPos('MR')
            break;
          case '9':
            setBR('M')
            setSelectedWidgetPos('BR')
            break;
          case '10':
            setBR('S')
            setSelectedWidgetPos('BR')
            break;
          default: // do nothing
        }
      }
      else if (selecterMode === 1) {
        updateWidgetPos(selecter)
      }
      break;
    case KEY.MODE:
      updateSelecterMode((selecterMode + 1) % 2)
      break;
    case KEY.VIEW_ONE:
      updateViewMode(VIEW_MODE_LANDING)
      break;
    case KEY.VIEW_TWO:
      updateViewMode(VIEW_MODE_MINI)
      break;
    default: // do nothing
  }
}

export default buttonNavigator;