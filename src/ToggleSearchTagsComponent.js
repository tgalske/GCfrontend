import React from 'react';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

class ToggleSearchTagsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTags: false
    };
    this.toggleShowTags = this.toggleShowTags.bind(this);
  }

  toggleShowTags = () => {
    this.setState({ showTags: !this.state.showTags })
  }

  render() {
    const tags = this.props.tags;
    if (tags.length > 0 && tags[0] !== "") {
      if (this.state.showTags) {
        return (
          <div className="pt-2">
            <RemoveCircleOutline className="-mb-2" onClick={this.toggleShowTags}/>
            {
              tags.map((name, j) => <span key={j} className="ml-2 mr-2 mb-4 inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">{name}</span>)
            }
          </div>
        )
      } else {
        return (
          <div className="pt-2">
            <AddCircleOutline onClick={this.toggleShowTags}/>
          </div>
        )
      }
    } else {
      // no tags => do nothing (do not remove)
      return (null)
    }
  }
}

export default ToggleSearchTagsComponent
