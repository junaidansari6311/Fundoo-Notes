import React, {Component} from 'react';
import '../scss/navbar.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {withRouter} from "react-router";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-start">
                        <div className="menu-icon">
                            <MenuIcon/>
                        </div>
                        <div className="fundoo-container">
                            <div className="fundoo-logo">Fundoo Notes</div>
                        </div>
                    </div>
                    <div className="navbar-middle">
                        <div className="search-container">
                            <div className="search-icon">
                                <SearchIcon className="search"/>
                            </div>
                            <div className="search-textfield">
                                <input className="search-field" type="text" placeholder="Search..."/>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="account-icon">
                            <AccountCircleIcon className="account" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Navbar);