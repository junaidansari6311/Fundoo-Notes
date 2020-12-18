import React, {Component} from 'react';
import '../scss/dashboard.scss';
import Navbar from "./Navbar";
import Note from "./Note";
class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Note/>
            </React.Fragment>
        );
    }
}

export default Dashboard;