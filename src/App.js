import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TitleComponent from './TitleComponent'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import MembersComponent from './MembersComponent'
import ContentComponent from './ContentComponent'

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false};
  }

  toggleLoginStatus = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  render() {
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/home">Home Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/home" component={HomeComponent} />
        <Route path="/members" component={MembersComponent} />
      </div>
    </Router>

    if (this.state.isLoggedIn) {
      return (
        <div>
        <TitleComponent/>
          <button
            className="bg-transparent hover:bg-teal text-teal-dark font-semibold hover:text-white mt-4 py-2 px-4 border border-teal hover:border-transparent rounded"
            onClick={this.toggleLoginStatus.bind(this)}>
            Log Out
          </button>
          <Router>
            <MembersComponent/>
          </Router>
          <ContentComponent/>
        </div>
      )
    } else {
      return (
        <div>
          <TitleComponent/>
          <LoginComponent
            isLoggedIn={this.state.isLoggedIn}
            callbackFromParent={this.toggleLoginStatus}
          />
        </div>
      )
    }
  }
}

export default MainComponent;
