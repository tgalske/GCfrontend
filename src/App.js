import React from "react";
import './App.css';
import TitleComponent from './TitleComponent';
import LoginComponent from './LoginComponent';
import MembersPage from './MembersPage';
import HomePage from './HomePage';
import SearchComponent from './SearchComponent';
import FilePage from './FilePage';
import Callback from './Callback/Callback';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class MainComponent extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <TitleComponent auth={this.props.auth}/>
          <Route exact path='/' render={(props) => (<LoginComponent {...props} auth={this.props.auth} />)}/>
          <Route exact path='/callback' render={() => (<Callback auth={this.props.auth}/>)}/>
          <PrivateRoute path="/home" component={HomePage} auth={this.props.auth} />
          <PrivateRoute path="/members" component={MembersPage} auth={this.props.auth} />
          <PrivateRoute path="/search" component={SearchComponent} auth={this.props.auth} />
          <PrivateRoute path="/id/:fileId" component={FilePage} auth={this.props.auth} />
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => rest.auth.isAuthenticated() ? (
    <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
    )
  }
  />
);

export default MainComponent;