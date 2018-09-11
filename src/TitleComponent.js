import React from 'react';
import { Link } from "react-router-dom";

class TitleComponent extends React.Component {

  logout = () => {
    this.props.auth.logout();
  };

  render() {
    return(
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <span className="inline-block pr-8 font-semibold text-xl tracking-tight no-underline">
            GC Media
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Home</Link>
            <Link to="/members" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Members</Link>
            <Link to="/search" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Search</Link>
          </div>
        </div>
        <Link to="/" onClick={this.logout} className="pin-r text-sm block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Logout</Link>

      </nav>
    );
  }
}


export default TitleComponent