import { Grid } from "@mui/material"
import WidgetSelector from "./widgets/WidgetSelector"

/**
 * Component that sets the correct widget, its position and size.
 * @component
 * @category WAD
 * @prop {string} Usize size of upper widget (S/M/L)
 * @prop {string} Bsize size of bottom widget (S/M/L)
 * @prop {string} side L/R side of screen
 * @prop {string} container left or right side container
 * @prop {object} data data for all widgets
 * @prop {object} widgetPositions name for widget at every position
 * @returns one side with widgets
 */
function GridType({ Usize, Bsize, side, container, data, widgetPositions }) {
  if (Usize === 'WARN') {
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_three">

        </Grid>
      </Grid>
    )
  }

  else if (Usize === 'L' && Bsize === 'L') {
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_three">
          <WidgetSelector widget={widgetPositions[`M${side}`]} size={Usize} data={data} />
        </Grid>
      </Grid>)
  }
  else {
    if (Usize === 'L') {
      Usize = ''
    }
    else if (Bsize === 'L') {
      Bsize = ''
    }
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_one">
          <WidgetSelector widget={widgetPositions[`U${side}`]} size={Usize} data={data} />
        </Grid>
        <Grid item className={Bsize} id="wb_two">
          <WidgetSelector widget={widgetPositions[`B${side}`]} size={Bsize} data={data} />
        </Grid>
      </Grid>)
  }
}

export default GridType;