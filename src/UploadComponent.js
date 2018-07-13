import React from 'react'
import axios from 'axios';

class UploadComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: '',
        tags: [{ name: '' }],
      }

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
  handleTagNameChange = (idx) => (evt) => {
    const newTags = this.state.tags.map((tag, sidx) => {
      if (idx !== sidx) return tag;
      return { ...tag, name: evt.target.value };
    });
    this.setState({ tags: newTags });
  }

  handleAddTag = () => {
    this.setState({ tags: this.state.tags.concat([{ name: '' }]) });
    console.log(this.state.tags)
  }

  handleRemoveTag = (idx) => () => {
    this.setState({ tags: this.state.tags.filter((s, sidx) => idx !== sidx) });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    if (this.fileInput.current.files[0] != null) {
      formData.append('file', this.fileInput.current.files[0])
    }
    console.log(this.state.tags)
    formData.append('title', this.state.title);
    formData.append('tags', JSON.stringify(this.state.tags));
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const url = 'http://127.0.0.1:3000/content';
    axios.post(url, formData, config).then((response) => {
       this.props.handler()
       this.setState({title: '', })
     });
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
                value={tag.name}
                onChange={this.handleTagNameChange(idx)}
              />
              <button
                type="button"
                className="w-10 text-xl font-bold ml-4 p-2 flex-no-shrink bg-red-light hover:bg-red border-red-light hover:border-red text-sm border-4 text-white py-1 px-2 rounded"
                onClick={this.handleRemoveTag(idx)}>
                -
              </button>
            </div>
          ))}
        </div>

        {/* Add Tag Button */}
        <div className="flex justify-end pt-4 pb-4">
          <button
          className="shadow bg-teal hover:bg-teal-dark text-white py-2 px-4 rounded"
          type="button"
          onClick={this.handleAddTag}>
            Add Tag
          </button>
        </div>

        {/* Form Submit Button */}
        <button type="submit" className="bg-transparent hover:bg-teal text-teal font-semibold hover:text-white py-2 px-4 border border-teal hover:border-transparent rounded">
          Submit
        </button>
      </form>
   )
  }
}

export default UploadComponent
