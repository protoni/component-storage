import React from 'react';
import {NavLink} from 'react-router-dom';
import homeIcon from '../assets/icons/home-2x.png';
import personIcon from '../assets/icons/person-2x.png';
import contactIcon from '../assets/icons/envelope-closed-2x.png';
import editorIcon from '../assets/icons/pencil-2x.png'
import settingsIcon from '../assets/icons/cog-2x.png'
import statusIcon from '../assets/icons/power-standby-2x.png'
import blogIcon from '../assets/icons/book-2x.png'

export default class NavigationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    state = {
        id: null,
        view: "home"
    }

    handleChange(view) {
        console.log("NavigationPanel! pressed:" + view)
        this.props.onChange(view);
    }

    render() {
        return (
            <div>
            <ul class="linkList">
                <li class="nav_home_text">
                    <NavLink className="nav_home_text" exact activeClassName="active" to="/" onMouseDown={ () => this.handleChange("home")}>
                        Home
                    </NavLink>
                </li>
                <li class="nav_home_icon">
                    <NavLink className="nav_home_icon" exact activeClassName="active" to="/" onMouseDown={ () => this.handleChange("home")}>
                        <img src={homeIcon} alt="" />
                    </NavLink>
                </li>
                <li class="nav_user_text">
                    <NavLink className="nav_user_text" exact activeClassName="active" to="/users" onMouseDown={ () => this.handleChange("users")}>
                        Users
                    </NavLink>
                </li>
                <li class="nav_user_icon">
                    <NavLink className="nav_user_icon" exact activeClassName="active" to="/users" onMouseDown={ () => this.handleChange("users")}>
                        <img src={personIcon} alt="" />
                    </NavLink>
                </li>

                <li class="nav_contact_text">
                    <NavLink className="nav_contact_text" exact activeClassName="active" to="/contact" onMouseDown={ () => this.handleChange("contact")}>
                        Contact
                    </NavLink>
                </li>
                <li class="nav_contact_icon">
                    <NavLink className="nav_contact_icon" exact activeClassName="active" to="/contact" onMouseDown={ () => this.handleChange("contact")}>
                    <img src={contactIcon} alt="" />
                    </NavLink>
                </li>

                <li class="nav_editor_text">
                    <NavLink className="nav_editor_text" exact activeClassName="active" to="/editor" onMouseDown={ () => this.handleChange("editor")}>
                        Editor
                    </NavLink>
                </li>
                <li class="nav_editor_icon">
                    <NavLink className="nav_editor_icon" exact activeClassName="active" to="/editor" onMouseDown={ () => this.handleChange("editor")}>
                    <img src={editorIcon} alt="" />
                    </NavLink>
                </li>

                <li class="nav_settings_text">
                    <NavLink className="nav_settings_text"  onMouseDown={ () => this.handleChange("settings")}>
                        Settings
                    </NavLink>
                </li>
                <li class="nav_settings_icon">
                    <NavLink className="nav_settings_icon"  onMouseDown={ () => this.handleChange("settings")}>
                    <img src={settingsIcon} alt="" />
                    </NavLink>
                </li>

                <li class="nav_status_text">
                    <NavLink className="nav_status_text"  onMouseDown={ () => this.handleChange("status")}>
                        Status
                    </NavLink>
                </li>
                <li class="nav_status_icon">
                    <NavLink className="nav_status_icon"  onMouseDown={ () => this.handleChange("status")}>
                    <img src={statusIcon} alt="" />
                    </NavLink>
                </li>

                <li class="nav_blog_text">
                    <NavLink className="nav_blog_text" exact activeClassName="active" to="/blog" onMouseDown={ () => this.handleChange("blog")}>
                        Blog
                    </NavLink>
                </li>
                <li class="nav_blog_icon">
                    <NavLink className="nav_blog_icon" exact activeClassName="active" to="/blog" onMouseDown={ () => this.handleChange("blog")}>
                    <img src={blogIcon} alt="" />
                    </NavLink>
                </li>

            </ul>
        </div>
        )
    }
}