import { Grid } from '@mui/material';
import arrowUp from '../assets/img/arrow-up.png'

/**
 * Shows multiple arrows over entire screen to indicate to pull up.
 * @component
 * @param {boolean} show show pull-up overlay? 
 * @returns pull up warning
 */
const WarningOverlay = ({ show }) => {

  return (
    <Grid contatiner className="overlay_container_warn" display={{ xs: show ? '' : 'none' }} style={{ backgroundColor: 'rgb(69, 69, 69, 0.7)' }}>
      <Grid item xs={4} style={{ padding: '0px', margin: '0px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <img src={arrowUp} className="warning_arrow" style={{ width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center' }} />
      </Grid>
      <Grid item xs={4} style={{ padding: '0px', margin: '0px', display: 'flex' }}>
        <img src={arrowUp} className="warning_arrow" style={{ width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center' }} />
      </Grid>
      <Grid item xs={4} style={{ padding: '0px', margin: '0px', display: 'flex' }}>
        <img src={arrowUp} className="warning_arrow" style={{ width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center' }} />
      </Grid>
    </Grid>
  )
}
export default WarningOverlay;