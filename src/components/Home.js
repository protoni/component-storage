import React from "react";
import { FaBeer, FaPowerOff } from 'react-icons/fa';
import { DiFirebase } from 'react-icons/di';

class Home extends React.Component {
  render() {
      
      return (
          <div data-testid="Home">
              <h2>Home</h2>
              <h2 style={{color:'blue'}}>
                <FaBeer />
                </h2>
                <h2 style={{color:'#ff4d58'}}>
                <FaPowerOff />
                </h2>
                <h2 style={{color:'#027d0f'}}>
                <FaPowerOff />
                </h2>
                <h2 style={{color:'gray'}}>
                <FaPowerOff />
                </h2>
                <h2 style={{color:'gray'}}>
                <DiFirebase />
                </h2>
          </div>
      )
  }
}

export default Home