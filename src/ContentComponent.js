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
      <div>
      {this.state.contentAPI.content.map(function(media, i) {
        return (
          <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg mb-8">

          {media.isImage ? (
            <img className="w-full" src={'http://127.0.0.1:3000/images/' + media.imageId + media.fileType} alt="GCMedia"/>
          ) : (
            <video className="w-full" controls>
              <source src={'http://127.0.0.1:3000/images/' + media.imageId + media.fileType} type="video/mp4"/>
            </video>
          )}

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{media.title}</div>
            </div>
              {
                media.tags.map(function(name, j) {
                  if (name != null && name.length > 1) {
                    return (
                      <span key={j} className="ml-2 mr-2 mb-4 inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">{name}</span>
                    )
                  } else {
                    return (
                      <span key={j}></span>
                    )
                  }
                })
              }
          </div>
        )
      })}
      </div>
    )
  }
}

export default ContentComponent
