import React from "react";
import TitleComponent from './TitleComponent'
import LoginComponent from './LoginComponent'
import MembersComponent from './MembersComponent'
import HomePage from './HomePage'
import SearchComponent from './SearchComponent'
import FilePage from './FilePage'
import AuthenticationComponent from './AuthenticationComponent'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

class MainComponent extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <TitleComponent/>
          <Route exact path="/" component={LoginComponent} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/members" component={MembersComponent} />
          <PrivateRoute path="/search" component={SearchComponent} />
          <PrivateRoute path="/id/:fileId" component={FilePage} />
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthenticationComponent.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default MainComponent;
