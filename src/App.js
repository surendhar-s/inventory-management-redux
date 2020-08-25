import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from "./routers/routers";
class App extends Component {
  render() {
    return (
      <div>
        {/* <DummyEmployeeComponent /> */}
        <Router>
          <Switch>
            {
              Routes.map(({ path, component: C, access }) => {
                return (
                  <Route
                    exact
                    path={path}
                    key={Math.random()}
                    render={props => (
                      <C {...props} />
                    )}
                  />
                )
              })
            }
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
