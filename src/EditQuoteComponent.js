import React from 'react';
import CloudDone from '@material-ui/icons/CloudDone';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import {GCAPI_url} from "./app_configs";
import axios from "axios";
const styles = {
  smallIcon: {
    width: 30,
    height: 30,
  }
};

class EditQuoteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quoteId: this.props.quoteId,
      newQuote: this.props.quote,
      oldQuote: this.props.quote
    }
  }

  editQuote = () => {
    if (this.state.newQuote.length <= 3) {
      this.showError("Please enter a quote longer than three characters.");
      return;
    }
    const url = GCAPI_url + '/quotes/id/' + this.state.quoteId;
    let data = {
      quoteId: this.state.quoteId,
      quote: this.state.newQuote
    };
    axios.put(url, data).then(() => {
      this.setState({newQuote: ''});
      this.props.editQuoteCallback(data);
    }).catch((error) => {
      console.log(error);
    });
  };

  handleChange = (event) => {
    if (event.target.value.length > 3) {
      this.showError('');
    }
    this.setState({newQuote: event.target.value})
  };

  handleFocus(event) {
    event.target.select();
  }

  cancelEdit = () => {
    this.props.cancelEditQuoteCallback();
  };

  showError(message) {
    this.setState({errorMessage: message});
  }

  deleteQuote = () => {
    const url = GCAPI_url + '/quotes/id/hide/' + this.state.quoteId;
    let data = {
      quoteId: this.state.quoteId
    };
    axios.put(url, data).then(() => {
      this.props.editQuoteCallback(null);
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    return(
      <div className="bg-grey-lightest rounded shadow-lg pl-4 pr-4 pt-4">
        <textarea
          className="w-full px-2 leading-normal rounded text-2xl"
          type="textarea"
          value={this.state.newQuote}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          autoFocus={true}
        >
        {this.props.quote}
        </textarea>
        <p className="text-red">{this.state.errorMessage}</p>
        <span className="ml-2 mr-4"><button><CloudDone style={styles.smallIcon} className="text-green" onClick={this.editQuote}/></button> </span>
        <span className="mr-4"><button><Clear style={styles.smallIcon} className="text-black" onClick={this.cancelEdit}/></button></span>
        <span><button><Delete style={styles.smallIcon} className="text-red" onClick={this.deleteQuote}/></button></span>
      </div>
    )
  }
}

export default EditQuoteComponent
