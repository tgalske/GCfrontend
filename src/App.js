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

    return (
      <Router>
        <div>
          <TitleComponent/>
          <div className="flex mb-4">
            <div className="w-2/3 h-full">
              <ContentComponent/>
            </div>
            <div className="m-4 w-1/3">
              <MembersComponent/>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default MainComponent;
