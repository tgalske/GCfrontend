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
  }

  componentWillReceiveProps() {
    console.log("Component will receive props")
    this.componentDidMount()
  }

  componentDidMount() {
    console.log("Content needsUpdate: " + this.props.needsUpdate)
    request('http://localhost:3000/content', function (error, response, body) {
      let myObj = JSON.parse(body)
      this.setState({contentAPI: myObj}, function() {
      })
    }.bind(this));
  }

  render() {
    return(
      <div>
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
