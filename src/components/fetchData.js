import axios from 'axios';

/**
 * Function to fetch data
 * @function
 * @category WAD
 * @param {string} path path to data etc. "/plane"
 * @param {function} updateStateFunc call this function with new data to update data
 */
const fetchData = (path, updateStateFunc) => {
  axios.get(`/${path}`)
    .then(res => updateStateFunc(res.data))
    .catch((error) => console.log(error.message))
}

/**
 * Function to fetch data for widget, updates prev state
 * @function
 * @category Widget
 * @param {string} path path to data etc. "/plane"
 * @param {function} updateStateFunc call this function with new data to update data
 * @param {state} state state with data
 */
const fetchWidgetData = (path, updateStateFunc, state) => {
  axios.get(`/${path}`)
    .then(res => { let temp = state; temp[path] = res.data; updateStateFunc(temp) })
    .catch((error) => console.log(error.message))
}

export { fetchData, fetchWidgetData };