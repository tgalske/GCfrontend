import React from 'react';
var request = require('request');

class MembersComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      memberAPI: {
        members:[]
      }
    }
  }

  componentDidMount() {
    request('http://localhost:3000/members', function (error, response, body) {
      let myObj = JSON.parse(body)
      this.setState({memberAPI: myObj}, function() {
      })
    }.bind(this));
  }

  render() {

    return(
      <div>
        {this.state.memberAPI.members.map(function(member, i) {
          return <div
            key={i}
            className={"text-white m-4 hover:bg-grey-dark max-w-sm m-4 rounded overflow-hidden shadow-lg " + member.college.color}
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
        })}
      </div>
    )
  }
}

export default MembersComponent
