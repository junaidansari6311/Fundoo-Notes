import React, {Component} from 'react';
import '../scss/navbar.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {withRouter} from "react-router";
import Sidebar from "./Sidebar";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from "@material-ui/core/IconButton";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen:false,
        };
        this.handleSidebar = this.handleSidebar.bind(this);
    }

    handleSidebar = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    handleClickAway = () => {
        this.setState({ isOpen : false});
    }


    render() {
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-start">
                        <div className="menu-icon" onClick={this.handleSidebar}>
                            <MenuIcon/>
                            <Sidebar openSidebar={this.state.isOpen}/>
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
            </ClickAwayListener>
        );
    }
}

export default withRouter(Navbar);