import React from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

class MemberListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      members:[]
    };
    this.memberClick = this.memberClick.bind(this);
  }

  componentDidMount() {
    const url = "https://s3.amazonaws.com/s3-gc-configs/members.json";
    axios.get(url).then((response) => {
      this.setState({members: response.data.members});
    });
  }

  memberClick = (member) => {
    this.props.membersPageCallback(member)
  };

  render() {
    return(
      <div className="bg-grey-lightest shadow-lg rounded pt-1 pb-1">
        {this.state.members.map(function(member, i) {
         return <div
            key={i}
            className={"text-white m-4 hover:bg-grey-darker rounded overflow-hidden shadow-lg " + member.college.color}
            onClick={()=>this.memberClick(member)}
          >
            <div className="px-6 py-4">
              <div className="text-2xl">
                <span>{member.firstname} {member.lastname}</span>
                <span className="ml-4 mb-4 align-top inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                  {member.phone}
                </span>
              </div>
              <div className="text-md mb-2">
                {member.college.name} ({member.college.city}, {member.college.state})
              </div>
            </div>
          </div>
        }, this)}

      </div>
    )
  }
}

export default MemberListComponent
