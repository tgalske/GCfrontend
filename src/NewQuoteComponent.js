import React from 'react';
import axios from "axios";
import {GCAPI_url} from './app_configs';
import ArrowFoward from '@material-ui/icons/ArrowForward';
const uuidv1 = require('uuid/v1');

class NewQuoteComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      member: this.props.member,
      newQuote: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.newPost = this.newPost.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.member !== prevProps.member) {
      this.setState({member: this.props.member});
    }
  }

  handleChange(event) {
    if (event.target.value.length > 3) {
      this.showError('');
    }
    this.setState({newQuote: event.target.value})
  }

  newPost(event) {
    if (this.state.newQuote.length <= 3) {
      this.showError("Please enter a quote longer than three characters.");
      return;
    }
    const url = GCAPI_url + '/quotes';
    let data = {
      id: uuidv1(),
      memberId: this.state.member.id,
      quote: this.state.newQuote,
      isVisible: true
    };
    axios.post(url, data).then(() => {
      this.props.newQuoteCallback({id: data.id, quote: this.state.newQuote});
      this.setState({newQuote: ''})
    }).catch((error) => {
      console.log(error);
      this.showError("There was an error submitting the quote.");
    })
  };

  showError(message) {
    this.setState({errorMessage: message});
  }

  render() {
    return(
      <div className="bg-grey-lightest rounded shadow-lg p-4">
        <form className="w-full rounded">
          <textarea
            className="w-full px-2 leading-normal rounded text-2xl"
            type="textarea"
            placeholder={"Add a new quote for " + this.props.member.firstname + "..."}
            value={this.state.newQuote}
            onChange={this.handleChange}
          />
          <p className="text-red">{this.state.errorMessage}</p>
          <button
            className="bg-teal hover:bg-teal-light border-teal hover:border-teal-light text-sm border-4 text-white mt-4 py-1 px-2 rounded"
            type="button"
            onClick={this.newPost}>
            <ArrowFoward/>
          </button>
        </form>
      </div>
    )
  }
}

export default NewQuoteComponent
