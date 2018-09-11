import React from 'react';
import axios from 'axios';
import {S3_url, GCAPI_url} from './app_configs.json';
import { Link } from "react-router-dom";

class ContentComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: []
    }
    this.loadContent = this.loadContent.bind(this);
  }

  componentWillReceiveProps() {
    this.loadContent()
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent = () => {
    const url = GCAPI_url + '/content';
    axios.get(url).then((response) => {
      this.setState({content: response.data})
    })
  };

  render() {

    return(
      <div>
      {this.state.content.map(function(media, i) {
        if (!media.isVisible) {
          return null;
        }
        return (
          <div key={i} className="w-full rounded-lg overflow-hidden bg-white shadow-lg mb-8">

          {media.isImage ? (
            <img className="w-full" src={S3_url + media.fileId + media.fileType} alt="GCMedia"/>
          ) : (
            <video className="w-full" controls>
              <source src={S3_url + media.fileId + media.fileType} type="video/mp4"/>
            </video>
          )}

            <div className="px-2 py-4">
              <Link className="font-bold text-xl text-black no-underline hover:underline" to={"/id/" + media.fileId}>{media.title}</Link>
            </div>
            {
              media.tags.map(function(name, j) {
                if (name != null && name.length > 1) {
                  return (
                    <span key={j} className="ml-2 mr-2 mb-4 inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">{name}</span>
                  )
                } else {
                  return null
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
