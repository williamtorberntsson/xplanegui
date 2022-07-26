
/**
 * Manages navigation with buttons on throttle (can also use arrow keys)
 * @function
 * @param {number} keyCode keycode pressed key
 * @param {string} selecterMode which mode is navigater in
 * @param {string} selecter which button is selected
 * @param {function} updateSelecter function to update selecter
 * @param {function} updateSelecterMode function to update selecter mode
 */
const buttonNavigator = (keyCode, selecterMode, selecter, updateSelecter, updateSelecterMode) => {
  switch (keyCode) {
    case 37: // left
      switch (selecterMode) {
        case "sidebuttons":
          if ((Number(selecter) + 5) % 10 == 0) updateSelecter((10).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
      }
      break;
    case 38: // up
      switch (selecterMode) {
        case "sidebuttons":
          if (Number(selecter <= 5)) {
            if ((Number(selecter) - 1) == 0) updateSelecter((5).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          } else {
            if ((Number(selecter) - 1) == 5) updateSelecter((10).toString())
            else updateSelecter(((Number(selecter) - 1)).toString())
          }
          break;
      }
      break;
    case 39: // right
      switch (selecterMode) {
        case "sidebuttons":
          if ((Number(selecter) + 5) % 10 == 0) updateSelecter((1).toString())
          else updateSelecter(((Number(selecter) + 5) % 10).toString())
          break;
      }
      break;
    case 40: // down
      switch (selecterMode) {
        case "sidebuttons":
          if (Number(selecter) <= 5) {
            if ((Number(selecter) + 1) == 6) updateSelecter((1).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          } else {
            if ((Number(selecter) + 1) == 11) updateSelecter((6).toString())
            else updateSelecter(((Number(selecter) + 1)).toString())
          }
          break;
      }
      break;
  }
}

export default buttonNavigator;