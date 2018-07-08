import React from 'react';
var request = require('request');

class ContentComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      memberAPI: {
        members:[]
      }
    }
  }

  componentDidMount() {
    request('http://localhost:3000/members', function (error, response, body) {
      let myObj = JSON.parse(body)
      this.setState({memberAPI: myObj}, function() {
      })
    }.bind(this));
  }

  render() {
    return(
      <div>
        <code>Show me some content!</code>
      </div>
    )
  }
}

export default ContentComponent
