import React from 'react';
import {S3_url, GCAPI_url} from './app_configs.json';
import ToggleSearchTagsComponent from './ToggleSearchTagsComponent'
import axios from 'axios';

class FileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.loadFile = this.loadFile.bind(this);
    this.state = {
      validResponse: false
    }
  }

  componentDidMount() {
    this.loadFile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileId !== prevProps.fileId) {
      this.setState({validResponse: false}, () => {
        this.loadFile();
      });
    }
  }

  loadFile = () => {
    let fileId = this.props.fileId;
    const url = GCAPI_url + '/content/id/' + fileId;
    axios.get(url).then((response) => {
      if (response.data === "") {
        setTimeout(this.loadFile, 1000);
      } else {
        this.setState( {file: response.data, validResponse: true});
      }
    });
  };

  render() {
    if (this.state.validResponse) {
      return(
        <div className="w-full rounded overflow-hidden shadow-lg bg-white">
          <img className="w-full" src={S3_url + this.state.file.fileId + this.state.file.fileType} alt="File"/>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{this.state.file.title}</div>
            {this.state.file.tags != null &&
            <ToggleSearchTagsComponent className="text-black" tags={this.state.file.tags}/>
            }
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
