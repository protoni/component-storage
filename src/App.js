import React from 'react';
import './App.css';
import NavigationPanel from './components/NavigationPanel';
import Main from './components/Main';
import SettingsBar from './components/SettingsBar';
import StatusBar from './components/StatusBar';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };

    // Settings panel
    this.showSettingsBar = false;
    this.settingsBar = null;

    // Status panel
    this.showStatusBar = false;
    this.statusBar = null;

    // Initialization method
    this.init();

    this.handleViewChange = this.handleViewChange.bind(this);
    this.consoleLoggingOn = true;
  }
  
  // Initialization function ran by constructor
  init() {
    this.updateSettingsBar();
    this.updateStatusBar();
  }

  log = (text) => {
    if(this.consoleLoggingOn) {
      console.log(text);
    }
  }


  // NavigationPanel callback function. Determine what to do when a link is clicked 
  // on the navigation panel. 'view' parameter is a String given by onMouseDown method of a link.
  handleViewChange = (view) => {
    this.log("current view: " + view)

    if(view === "settings") {
      if(this.showSettingsBar) {
        this.showSettingsBar = false;
      } else {
        this.showStatusBar = false;
        this.showSettingsBar = true;
      }
    }

    if(view === "status") {
      if(this.showStatusBar) {
        this.showStatusBar = false;
      } else {
        this.showSettingsBar = false;
        this.showStatusBar = true;
      }
    }

    this.setState({view: view})
    this.updateSettingsBar();
    this.updateStatusBar();
    this.log("current state: " + this.state.view)
  }

  // Created a <div> element for settings bar. if this.showSettingsBar is false, creates
  // a empty <div> element.
  updateSettingsBar = () => {
    if(this.showSettingsBar) {
      this.log("settings panel on ")
      this.settingsBar = <SettingsBar />
    } else {
      this.log("settings panel off ")
      this.settingsBar=<div></div>
    }
  }

  // Created a <div> element for status bar. if this.showStatusBar is false, creates
  // a empty <div> element.
  updateStatusBar = () => {
    if(this.showStatusBar) {
      this.log("Status panel on ")
      this.statusBar = <StatusBar />
    } else {
      this.log("Status panel off ")
      this.statusBar=<div></div>
    }
  }

  render(){
  return (
    
    <div className="wrapper">

      <div className="leftSidebar">
        <NavigationPanel onChange={this.handleViewChange} />
      </div>

      <div className="main">
        <Main />
      </div>
      
      {this.settingsBar}

      {this.statusBar}
      
    </div>
    
    
  );
}
}

export default App;
