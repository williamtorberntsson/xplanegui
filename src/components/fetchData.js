import axios from 'axios';

/**
 * Function to fetch data
 * @function
 * @param {string} path path to data etc. "/plane"
 * @param {function} updateStateFunc 
 */
const fetchData = (path, updateStateFunc) => {
  axios.get(`/${path}`)
    .then(res => updateStateFunc(res.data))
    .catch((error) => console.log(error.message))
}

/**
 * Function to fetch data, updates prev state
 * @param {string} path 
 * @param {function} updateStateFunc 
 * @param {state} state
 */
const fetchWidgetData = (path, updateStateFunc, state) => {
  axios.get(`/${path}`)
    .then(res => { let temp = state; temp[path] = res.data; updateStateFunc(temp) })
    .catch((error) => console.log(error.message))
}

export { fetchData, fetchWidgetData };