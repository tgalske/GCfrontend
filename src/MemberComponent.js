import React from 'react';
import axios from "axios";
import {GCAPI_url} from "./app_configs";

class MemberComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    this.loadQuotes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.member.id !== prevProps.member.id) {
      this.loadQuotes()
    }
  }

  loadQuotes = () => {
    const url = GCAPI_url + '/quotes/' + this.props.member.id;
    axios.get(url).then((response) => {
      this.setState({quotes: response.data.quotes});
    })
  };

  render() {
    return(
      <div className="sticky pin-t pt-4">
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

        {this.state.quotes.map(function(quote, i) {
          return (
            <div className="shadow-md rounded bg-white hover:bg-grey-lightest text-black text-lg leading-loose m-4 p-4" key={i}>{quote}</div>
          )
        })}
      </div>
    )
  }
}

export default MemberComponent
