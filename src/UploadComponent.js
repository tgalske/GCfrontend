import React from 'react'
import {GCAPI_url} from './app_configs.json';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
const uuidv1 = require('uuid/v1');

class UploadComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: '',
        tags: [],
        fileId: uuidv1()
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();

      this.handleTagNameChange = this.handleTagNameChange.bind(this);
      this.handleAddTag = this.handleAddTag.bind(this);
      this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  // TAGS
  handleTagNameChange = (idx) => (event) => {
    let newTags = [...this.state.tags];
    newTags[idx] = event.target.value;
    this.setState({ tags: newTags });
  };

  handleAddTag = () => {
    this.setState({ tags: this.state.tags.concat(['']) });
  };

  handleRemoveTag = (idx) => () => {
    this.setState({ tags: this.state.tags.filter((s, sidx) => idx !== sidx) });
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.fileInput.current.files[0]);
    formData.append('title', this.state.title);
    formData.append('fileId', this.state.fileId);
    for (var i = 0; i < this.state.tags.length; i++) {
      formData.append('tags', this.state.tags[i]);
    }

    const url = GCAPI_url + '/content';
    axios.post(url, formData).then(() => {
       this.props.filePageCallback(this.state.fileId);
     });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="w-full bg-white p-4 rounded-lg">
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

        <div className="w-full max-w-sm">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mt-2">
            Optional Tags
          </label>
          {this.state.tags.map((tag, idx) => (
            <div key={idx}className="flex items-center py-2">
              <input
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight"
                placeholder={"Add Tag"}
                value={tag}
                onChange={this.handleTagNameChange(idx)}
                maxLength="15"
              />
              <button
                type="button"
                className="w-10 text-xl font-bold ml-4 p-2 flex-no-shrink bg-red-light hover:bg-red border-red-light hover:border-red text-sm border-4 text-white py-1 px-2 rounded"
                onClick={this.handleRemoveTag(idx)}>
                <i className="fa fa-minus"/>
              </button>
            </div>
          ))}
        </div>

        {/* Add Tag Button */}
        <div className="flex justify-start pt-4 pb-4">
          <button
          className="shadow bg-teal hover:bg-teal-dark text-white py-2 px-4 rounded"
          type="button"
          onClick={this.handleAddTag}>
            <i className="fa fa-plus"></i> Add Tag
          </button>
        </div>

        {/* Form Submit Button */}
        <div className="flex justify-center pt-4 pb-4 border-t border-t-2 border-teal">
          <button type="submit" className="bg-transparent hover:bg-teal text-teal font-semibold hover:text-white py-2 px-4 border border-teal hover:border-transparent rounded">
            <i className="fa fa-upload"/> Upload
          </button>
        </div>
      </form>
   )
  }
}

export default UploadComponent
