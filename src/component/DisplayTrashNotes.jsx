import React, {Component} from 'react';
import Navbar from "./Navbar";
import DisplayNotes from "./DisplayNotes";

class DisplayTrashNotes extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <DisplayNotes archived={false} pin={false} deleted={true}/>
            </div>
        );
    }
}

export default DisplayTrashNotes;