import React from 'react';
import { NavLink, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import homeIcon from '../assets/icons/home-2x.png';
import personIcon from '../assets/icons/person-2x.png';
import settingsIcon from '../assets/icons/cog-2x.png';
import statusIcon from '../assets/icons/power-standby-2x.png';

const newHistory = createBrowserHistory();

export default class NavigationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(view) {
    console.log(`NavigationPanel! pressed:${view}`);
    this.props.onChange(view);
  }

  render() {
    return (
      <div>
        <ul className="linkList">
          <li className="nav_home_text">
            <NavLink data-testid="HomeLink" className="nav_home_text" exact activeClassName="active" to="/" onMouseDown={() => this.handleChange('home')}>
              Home
            </NavLink>
          </li>
          <li className="nav_home_icon">
            <NavLink data-testid="HomeLink" className="nav_home_icon" exact activeClassName="active" to="/" onMouseDown={() => this.handleChange('home')}>
              <img src={homeIcon} alt="" />
            </NavLink>
          </li>
          <li className="nav_storage_text">
            <NavLink data-testid="StorageLink" className="nav_storage_text" exact activeClassName="active" to="/storage" onMouseDown={() => this.handleChange('storage')}>
              Storage
            </NavLink>
          </li>
          <li className="nav_storage_icon">
            <NavLink testid="StorageLink" className="nav_storage_icon" exact activeClassName="active" to="/storage" onMouseDown={() => this.handleChange('storage')}>
              <img src={personIcon} alt="" />
            </NavLink>
          </li>

          <li className="nav_settings_text">
            <NavLink data-testid="SettingsLink1" className="nav_settings_text" to="/" onMouseDown={() => this.handleChange('settings')}>
              Settings
            </NavLink>
          </li>
          <li className="nav_settings_icon">
            <NavLink data-testid="SettingsLink2" className="nav_settings_icon" to="/" onMouseDown={() => this.handleChange('settings')}>
              <img src={settingsIcon} alt="" />
            </NavLink>
          </li>

          <li className="nav_status_text">
            <NavLink data-testid="StatusLink1" className="nav_status_text" to="/" onMouseDown={() => this.handleChange('status')}>
              Status
            </NavLink>
          </li>
          <li className="nav_status_icon">
            <NavLink data-testid="StatusLink2" className="nav_status_icon" to="/" onMouseDown={() => this.handleChange('status')}>
              <img src={statusIcon} alt="" />
            </NavLink>
          </li>

        </ul>
      </div>
    );
  }
}
