import React from 'react';
import axios from "axios";
import NewQuoteComponent from './NewQuoteComponent';
import {GCAPI_url} from "./app_configs";
import Edit from '@material-ui/icons/Edit';
import EditQuoteComponent from './EditQuoteComponent';
const styles = {
  smallIcon: {
    width: 25,
    height: 25,
  }
};

class MemberComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      currentlyEditedQuoteIndex: -1
    };
    this.loadQuotes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.member !== prevProps.member) {
      this.loadQuotes();
      this.setState({currentlyEditedQuoteIndex: -1});
    }
  }

  // loads quotes where isVisible is true
  loadQuotes = () => {
    const url = GCAPI_url + '/quotes/member/' + this.props.member.id;
    axios.get(url).then((response) => {
      this.setState({quotes: response.data});
    })
  };

  newQuoteCallback = (newQuote) => {
    this.setState({quotes: [newQuote, ...this.state.quotes]});
  };

  editQuoteCallback = (newQuote) => {
    var updatedQuotes = this.state.quotes;
    updatedQuotes[this.state.currentlyEditedQuoteIndex] = newQuote;
    this.setState({currentlyEditedQuoteIndex: -1});
  };

  cancelEditQuoteCallback = () => {
    this.setState({currentlyEditedQuoteIndex: -1});
  };

  onClickEditQuote(index) {
    this.setState({currentlyEditedQuoteIndex: index});
  }

  render() {
    return(
      <div className="sticky pin-t pt-4" onClick={this.onQuoteClick}>
        <div className={"w-full shadow-lg rounded text-white mb-4 " + this.props.member.college.color}>
          <div className="inline-flex items-center rounded bg-white m-4">
            <div className="flex-initial text-black p-4 text-3xl">{this.props.member.firstname} {this.props.member.lastname}</div>
            <div className="p-4">
              <div className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-lg font-semibold text-grey-darker">
                  {this.props.member.phone}
              </div>
            </div>
          </div>
        </div>
        <NewQuoteComponent member={this.props.member} newQuoteCallback={this.newQuoteCallback}/>
        {this.state.quotes.map(function(props, i) {
          if (i === this.state.currentlyEditedQuoteIndex) {
            return (
              <div className="mt-4" key={i}>
                <EditQuoteComponent quote={props.quote} quoteId={props.id} cancelEditQuoteCallback={this.cancelEditQuoteCallback} editQuoteCallback={this.editQuoteCallback}/>
              </div>
            )
          } else if(!props) {
            return null;
          }
          return (
            <div className="w-full shadow-md rounded bg-white hover:bg-grey-lightest text-black text-lg leading-loose pl-4 pr-4 pt-4 mt-4" key={i}>
              <div>
                {props.quote}
              </div>
              <div>
                <button className="mt-4" onClick={this.onClickEditQuote.bind(this, i)}><Edit style={styles.smallIcon}/></button>
              </div>
            </div>
          )
        }, this)}
      </div>
    )
  }
}

export default MemberComponent
