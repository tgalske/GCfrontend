import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TitleComponent from './TitleComponent'
import MembersComponent from './MembersComponent'
import ContentComponent from './ContentComponent'
import UploadComponent from './UploadComponent'

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      needsUpdate: false
    }
    this.handler = this.handler.bind(this)
  }

  handler() { this.setState({ needsUpdate: true }) }

  toggleLoginStatus = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  render() {
    return (
      <Router>
        <div>
          <TitleComponent/>
          <div className="flex mb-4">
            <div className="w-1/3 m-4">
              <ContentComponent needsUpdate={this.state.needsUpdate}/>
            </div>
            <div className="w-1/3 m-4">
              <UploadComponent handler={this.handler} needsUpdate={this.state.needsUpdate}/>
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
