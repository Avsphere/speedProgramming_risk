import MidiBasic from './RiskClient'
import TestingCircle from './TestingCircle'
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RiskPageContainer from './RiskPageContainer';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={createMuiTheme()}> {/* The custom theme is due to react strict showing material UI is using a deprecated feature*/}
      <CssBaseline />
      <div className="App">
        <main>
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={RiskPageContainer}></Route>
          </Switch>
        </BrowserRouter>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
