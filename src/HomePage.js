import React from 'react';
import SearchComponent from './SearchComponent'
import ContentComponent from './ContentComponent'
import UploadComponent from './UploadComponent'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      needsUpdate: false
    };
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({ needsUpdate: true })
  }

  toggleLoginStatus = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  };

  uploadCallback = (fileId) => {
    this.props.history.push('/id/' + fileId);
  };

  render() {
    return(
      <div>
        <div className="flex mb-4">
          <div className="w-2/3 m-4">
            <ContentComponent needsUpdate={this.props.needsUpdate}/>
          </div>
          <div className="w-1/3 m-4">
            <UploadComponent handler={this.handler} needsUpdate={this.props.needsUpdate} filePageCallback={this.uploadCallback}/>
            <SearchComponent/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
