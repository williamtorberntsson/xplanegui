import './App.css';
import PFD from './components/PFD';
import Map from './components/Map';
import Future from './components/Future';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container>
      <Grid item xl={4}>
        <item><PFD /></item>
      </Grid>
      <Grid item xl={4}>
        <item><Map /></item>
      </Grid>
      <Grid item xl={4}>
        <item><Future /></item>
      </Grid>
    </Grid>
  );
}

export default App;