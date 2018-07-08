import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainComponent from './App'
import MembersComponent from './MembersComponent'

class TitleComponent extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <span className="inline-block pr-8 font-semibold text-xl tracking-tight no-underline">
                <Link to="/">GC Media</Link>
              </span>
              <span className="inline-block pr-8 font-semibold text-xl tracking-tight no-underline">
                <Link to="/members">Members</Link>
              </span>
            </div>
          </nav>
          <Route path="/members" component={MembersComponent} />
        </div>
      </Router>
    );
  }
}

export default TitleComponent
