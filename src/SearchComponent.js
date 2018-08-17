import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import ToggleSearchTagsComponent from './ToggleSearchTagsComponent'
import {S3_url, GCAPI_url} from './app_configs.json';
import 'font-awesome/css/font-awesome.min.css';

class SearchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.getSearchResults = _.debounce(this.getSearchResults, 500);
  }

  clearForm(event) {
    this.setState({query: ''})
    this.setState({results: []})
    this.refs.query.focus()
    event.preventDefault();
  }

  handleChange(event) {
    this.getSearchResults.cancel();
    this.setState({query: event.target.value}, () => {
      if(!this.state.query.length) {
        this.setState( { results: [] })
        return
      }
      this.getSearchResults();
    });
  }

  getSearchResults = () => {
    const url = GCAPI_url + '/content/search?query=' + this.state.query;
    axios.get(url).then((response) => {
      this.setState({results: response.data})
    })
  }

  render() {
    return(
      <div className="rounded-lg bg-white mt-4">
        <form className="w-full p-4">
          <div className="flex items-center py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight"
              type="text"
              placeholder="Search"
              ref="query"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <button
              className="flex-no-shrink border-transparent border-4 text-teal hover:text-teal-darker text-sm py-1 px-2 rounded"
              type="button"
              onClick={this.clearForm}
            >
              <div className="text-red">
                <i className="fa fa-times"/> Clear
              </div>
            </button>
          </div>
        </form>

        {this.state.results.map(function(media, i) {
          return (
            <div key={i} className="w-full overflow-hidden p-4">
              <div>
                {media.isImage ? (
                  <img className="w-full rounded" src={S3_url + media.fileId + media.fileType} alt="GCMedia"/>
                ) : (
                  <video className="w-full rounded" controls>
                    <source src={S3_url + media.fileId + media.fileType} type="video/mp4"/>
                  </video>
                )}
              </div>
              <div className="pt-2">
                <div className="text-black">{media.title}</div>
                <ToggleSearchTagsComponent className="text-black" tags={media.tags}/>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchComponent
