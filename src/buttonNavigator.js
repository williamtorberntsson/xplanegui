import { KEY_NAVIGATION_CONFIG as KEY, WIDGET_ORDER } from "./constants";

/**
 * Manages navigation with buttons on throttle (can also use arrow keys, p and m).
 * @function
 * @category keynavigation
 * @param {number} keyCode keycode pressed key
 * @param {string} selecterMode which mode is navigater in
 * @param {string} selecter which button is selected
 * @param {function} updateSelecter function to update selecter
 */
const buttonNavigator = (keyCode, selecterMode, selecter, updateSelecter, updateSelecterMode, updateActiveBtn, updateWidgetPos, setUL, setUR, setBL, setBR, setSelectedWidgetPos) => {

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
        updateActiveBtn(selecter.toString());

        /*
        Usize('S')
        selectedPos("U" + side)
        btnUpdate('1')
        */

        //function update(name, size, side)
        switch (selecter) {
          case '1':
            setUL('S')
            setSelectedWidgetPos('U' + 'L')
            updateActiveBtn(selecter)
            break;
          case '2':
            setUL('M')
            setSelectedWidgetPos('U' + 'L')
            updateActiveBtn(selecter)
            break;
          case '3':
            setUL('L')
            setBL('L')
            setSelectedWidgetPos('M' + 'L')
            updateActiveBtn(selecter)
            break;
          case '4':
            setBL('M')
            setSelectedWidgetPos('B' + 'L')
            updateActiveBtn(selecter)
            break;
          case '5':
            setBL('S')
            setSelectedWidgetPos('B' + 'L')
            updateActiveBtn(selecter)
            break;
          case '6':
            setUR('S')
            setSelectedWidgetPos('U' + 'R')
            updateActiveBtn(selecter)
            break;
          case '7':
            setUR('M')
            setSelectedWidgetPos('U' + 'R')
            updateActiveBtn(selecter)
            break;
          case '8':
            setUR('L')
            setBR('L')
            setSelectedWidgetPos('M' + 'R')
            updateActiveBtn(selecter)
            break;
          case '9':
            setBR('M')
            setSelectedWidgetPos('B' + 'R')
            updateActiveBtn(selecter)
            break;
          case '10':
            setBR('S')
            setSelectedWidgetPos('B' + 'R')
            updateActiveBtn(selecter)
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

  }
}

export default buttonNavigator;