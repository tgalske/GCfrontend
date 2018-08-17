import React from 'react';
import { Redirect } from "react-router-dom";
import AuthenticationComponent from './AuthenticationComponent'

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      isLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  login = () => {
    AuthenticationComponent.authenticate(() => {
      this.setState({ isLoggedIn: true });
    });
  };

  handleChange(event) {
    this.setState({phone: event.target.value});
  }

  clearForm(event) {
    this.setState({phone: ''})
    this.refs.phone.focus()
    event.preventDefault();
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/home" } };
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <form className="w-full max-w-sm m-4 p-8 pt-6 border-teal border-2 rounded-lg bg-white">
        <div className="text-grey-darker text-sm font-bold mb-2">Log in to view content</div>
        <div className="flex items-center border-b border-b-2 border-teal py-2">
          <input
            autoFocus
            className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight"
            type="tel"
            placeholder="Phone"
            ref="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <button
            className="flex-no-shrink bg-teal hover:bg-teal-dark border-teal hover:border-teal-dark text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={this.login}>
            Log In
          </button>
          <input
            className="flex-no-shrink border-transparent border-4 text-teal hover:text-teal-darker text-sm py-1 px-2 rounded"
            type="button"
            value="Clear"
            onClick={this.clearForm}
          />
        </div>
      </form>
    );
  }
}

export default LoginComponent
