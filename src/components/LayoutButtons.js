import { Grid, Button } from '@mui/material';
import { useState } from "react";

const LayoutButtons = (props) => {
  
  const [mode, setMode] = useState(0);


  const handleClick = (mode) => {
    props.parentCallback(mode);
    setMode(mode);
  }

  return (
    <Grid container>
      <Grid item>
        <Button onClick={() => { handleClick("white") }} variant="contained">Light mode</Button>
        <Button onClick={() => { handleClick("black") }} variant="contained">Dark mode</Button>
      </Grid>
    </Grid>
  )
};

export default LayoutButtons;