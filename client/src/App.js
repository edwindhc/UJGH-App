import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import Drawer from './components/dashboard/drawer'
import contact from './components/contact'
import about from './components/about'
import Teachers from './components/teacher'
// import PrivateRoute from './components/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { createHashHistory } from 'history'
import './assets/icons/icons-v2.css';

const history = createHashHistory()
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121'
    },
    secondary: {
      main: '#29ABE2'
    },
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: false
    }
  }

  render() {
    console.log(theme, ' props')
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history}>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/contact' component={contact}/>
              <Route exact path='/about' component={about}/>
              {/* <PrivateRoute exact roles={'user' || 'admin'} path='/' component={Dashboard} /> */}
              <Drawer>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/teachers' component={Teachers} />
              </Drawer>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>

    );
  }
}

export default App;