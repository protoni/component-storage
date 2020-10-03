import React from 'react';
import { FaPowerOff } from 'react-icons/fa';

class SettingsBar extends React.Component {
  constructor(props) {
    super(props);
    this.connected = true;
  }

  render() {
    let showDbConnected;
    if (this.connected) {
      showDbConnected = <h2 style={{ color: '#027d0f' }}><FaPowerOff /></h2>;
    } else {
      showDbConnected = <h2 style={{ color: '#ff4d58' }}><FaPowerOff /></h2>;
    }
    return (
      <div data-testid="Settings" className="rightSidebar">
        <h2 className="settingHeader">Settings</h2>
        {showDbConnected}
        <p>Database Ok</p>
      </div>
    );
  }
}

export default SettingsBar;
