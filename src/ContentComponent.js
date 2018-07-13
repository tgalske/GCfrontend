import React from 'react';
var request = require('request');

class ContentComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      contentAPI: {
        content:[]
      }
    }
    this.loadContent = this.loadContent.bind(this);
  }

  componentWillReceiveProps() {
    this.loadContent()
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
    request('http://localhost:3000/content', function (error, response, body) {
      let myObj = JSON.parse(body)
      this.setState({contentAPI: myObj})
    }.bind(this));
  }

  render() {
    return(
      <div className="border-1 border-black rounded shadow-lg p-4">
        {this.state.contentAPI.content.map(function(media, i) {
          return <div key={i}>
            <img className="rounded" alt='GCMedia' src={'http://127.0.0.1:3000/images/' + media.imageId + '.jpg'}/>
            <div className="text-center">{media.title}</div>
          </div>
        })}
      </div>
    )
  }
}

export default ContentComponent
