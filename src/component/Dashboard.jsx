import React, {Component} from 'react';
import '../scss/dashboard.scss';
import Navbar from "./Navbar";
import Note from "./Note";
import DisplayNotes from "./DisplayNotes";
class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Note/>
                <DisplayNotes/>
            </React.Fragment>
        );
    }
}

export default Dashboard;