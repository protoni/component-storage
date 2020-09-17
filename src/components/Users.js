import React from 'react'

class Users extends React.Component {
    render() {
        let msg = "";
        for(let i = 0; i < 10000; i++) {
            msg += "ASD\r\n";
        }
        return (
            <div class="usersDiv">
                <h2>Users</h2>
                <p>{msg}</p>
            </div>
        )
    }
  }
  
export default Users

