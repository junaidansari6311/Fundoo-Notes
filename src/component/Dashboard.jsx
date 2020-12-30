import React, {Component} from 'react';
import '../scss/dashboard.scss';
import Navbar from "./Navbar";
import Note from "./Note";
import DisplayNotes from "./DisplayNotes";
import Typography from "@material-ui/core/Typography";

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Note/>
                <Typography className="pinned">PINNED</Typography>
                <DisplayNotes pin={true} archived={false} deleted={false}/>
                <Typography className="others">OTHERS</Typography>
                <DisplayNotes pin={false} archived={false} deleted={false}/>
            </React.Fragment>
        );
    }
}

export default Dashboard;