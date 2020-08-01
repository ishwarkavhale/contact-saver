import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Home from './component/pages/Home';
import About from './component/pages/About';
import ContactState from './context/contacts/ContactState';
import Register from './component/auth/Register';
import AuthState from './context/auth/AuthState';
import Login from './component/auth/Login';
import AlertState from './context/alerts/AlertState';
import Alerts from './component/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar title="Contact Keeper" icon="fa fa-id-card-alt" />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
