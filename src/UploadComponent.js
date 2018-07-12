import React from 'react'
import axios from 'axios';

class UploadComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  handleClear(event) {
    this.setState({title: '', })
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    if (this.fileInput.current.files[0] != null) {
      formData.append('file', this.fileInput.current.files[0])
    }
    formData.append('title', this.state.title)
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const url = 'http://127.0.0.1:3000/content';
    axios.post(url, formData, config).then(function (response) {
      this.props.handler()
      this.handleClear()
    }.bind(this))

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="w-full max-w-md">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              file
            </label>
            <input
              required
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
              type="file"
              ref={this.fileInput}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              image / video name
            </label>
            <input
              required
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button type="submit" className="bg-transparent hover:bg-teal text-teal font-semibold hover:text-white py-2 px-4 border border-teal hover:border-transparent rounded">
          Submit
        </button>
      </form>
   )
  }
}

export default UploadComponent
