import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TitleComponent from './TitleComponent'
import LoginComponent from './LoginComponent'
import MembersComponent from './MembersComponent'
import ContentComponent from './ContentComponent'

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true};
  }

  toggleLoginStatus = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  render() {

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
            <Route path="/members" component={MembersComponent} />
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
