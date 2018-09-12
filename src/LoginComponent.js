import React from 'react';
import Lock from '@material-ui/icons/Lock';

class LoginComponent extends React.Component {

  login = () => {
    this.props.auth.login();
  };

  render() {
    return (
      <div className="flex justify-center pt-12">
        <div className="flex bg-white rounded-l-lg">
          <div className="flex-auto text-center py-2 m-2">
            <Lock className="text-red-light"/>
          </div>
          <div className="flex-auto text-center py-2 mt-3 mb-2 mr-2">
            Please login to view content.
          </div>
        </div>
        <button
          className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded-r-lg"
          onClick={this.login}>
          Login
        </button>
      </div>

    );
  }
}

export default LoginComponent
