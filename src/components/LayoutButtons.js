import { Grid, Button } from '@mui/material';
import { useState } from "react";

const LayoutButtons = (props) => {

  const [mode, setMode] = useState(0);

  const handleClick = (mode) => {
    props.lightTheme(mode);
    setMode(mode);
  }

  const changeView = (view) => {
    props.viewMode(view);
  }

  return (
    <div>
      <Button onClick={() => { handleClick(0) }} variant="contained">Light mode</Button>
      <Button onClick={() => { handleClick(1) }} variant="contained">Dark mode</Button>
      <Button onClick={() => { changeView(1) }} variant="contained">Change View</Button>
    </div>
  )
};

export default LayoutButtons;