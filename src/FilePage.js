import React from 'react';
import FileComponent from './FileComponent'
import UploadComponent from './UploadComponent'

class FilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileId: this.props.match.params.fileId
    }
  }

  uploadCallback = (newFileId) => {
    this.setState({fileId: newFileId}, function() {
      this.props.history.push('/id/' + this.state.fileId);
    });
  };

  render() {
    return(
      <div>
        <div className="flex justify-center p-4">
          <div className="w-4/5">
            <FileComponent fileId={this.state.fileId}/>
          </div>
        </div>
        <div className="flex justify-center pt-10 pb-20 pl-4 pr-4">
          <div className="w-1/2">
            <UploadComponent filePageCallback={this.uploadCallback}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FilePage
