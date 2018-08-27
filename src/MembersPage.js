import React from 'react';
import MemberListComponent from './MemberListComponent';
import MemberComponent from './MemberComponent';

class MembersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      member: null,
      greeting: "hello!"
    };
  }

  memberCallback = (member) => {
    this.setState({member: member});
  };

  render() {
    return(
      <div>
        {this.state.member == null ? (
          <div className="flex mb-4">
            <div className="w-full m-4 max-w-lg">
              <MemberListComponent membersPageCallback={this.memberCallback}/>
            </div>
          </div>
          ) : (
          <div className="flex mb-4">
            <div className="w-1/3 m-4 max-w-md">
              <MemberListComponent membersPageCallback={this.memberCallback}/>
            </div>
            <div className="w-2/3 m-4">
              <MemberComponent member={this.state.member}/>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MembersPage
