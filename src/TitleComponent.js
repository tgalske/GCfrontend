import React from 'react';
import { Link, withRouter } from "react-router-dom";
import AuthenticationComponent from './AuthenticationComponent'

class TitleComponent extends React.Component {

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
        <AuthButton/>
      </nav>
    );
  }
}

const AuthButton = withRouter(
  ({ history }) =>
    AuthenticationComponent.isAuthenticated ? (
      <p>
        <button
          className="bg-white px-2 py-1 rounded"
          onClick={() => {
            AuthenticationComponent.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <span></span>
    )
);

export default TitleComponent
