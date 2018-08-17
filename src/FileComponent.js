import React from 'react';
import {S3_url, GCAPI_url} from './app_configs.json';
import ToggleSearchTagsComponent from './ToggleSearchTagsComponent'
import axios from 'axios';

class FileComponent extends React.Component {

  constructor(props) {
    super(props)
    this.loadFile = this.loadFile.bind(this);
    this.state = {
      validResponse: false
    }
  }

  componentDidMount() {
    this.loadFile()
    console.log(this.state)
  }

  loadFile = () => {
    let fileId = this.props.fileId
    const url = GCAPI_url + '/content/id/' + fileId;
    axios.get(url).then((response) => {
      this.setState( {file: response.data, validResponse: true});
    });
  }

  render() {
    if (this.state.validResponse) {
      return(
        <div className="w-full rounded overflow-hidden shadow-lg bg-white">
          <img className="w-full" src={S3_url + this.state.file.fileId + this.state.file.fileType} alt="File"/>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{this.state.file.title}</div>
            <ToggleSearchTagsComponent className="text-black" tags={this.state.file.tags}/>
          </div>
        </div>
      )
    }
    return(
      <div>
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    )
  }
}

export default FileComponent
