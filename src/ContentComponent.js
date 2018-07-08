import React from 'react';
var request = require('request');

class ContentComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      contentAPI: {
        content:[]
      }
    }
  }

  componentDidMount() {
    request('http://localhost:3000/content', function (error, response, body) {
      let myObj = JSON.parse(body)
      this.setState({contentAPI: myObj}, function() {
      })
    }.bind(this));
  }

  render() {
    return(
      <div>
        <form ref='uploadForm'
          id='uploadForm'
          action='http://localhost:3000/content'
          method='post'
          encType="multipart/form-data">
            <input type="file" name="sampleFile" />
            <input type='submit' value='Upload!' />
        </form>
        <div>
          {this.state.contentAPI.content.map(function(media, i) {
            return <div
              key={i}
              className="max-w-sm m-4 rounded overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <img src={'http://127.0.0.1:3000/images/' + media.imageId + '.jpg'}/>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default ContentComponent
