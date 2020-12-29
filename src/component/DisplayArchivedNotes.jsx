import React, {Component} from 'react';
import Navbar from "./Navbar";
import DisplayNotes from "./DisplayNotes";

class DisplayArchivedNotes extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <DisplayNotes archived={true} pin={false}/>
            </div>
        );
    }
}

export default DisplayArchivedNotes;