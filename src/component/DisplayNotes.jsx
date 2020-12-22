import React, {Component} from 'react';
import '../scss/displayNotes.scss';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class DisplayNotes extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="flex-container-main">
                    <div className="card-container">
                        <div className="upper-tick"><CheckCircleIcon/></div>
                        <div className="card-title">
                            <div>title</div>
                        </div>
                        <div className="card-note">
                            <div>description</div>
                        </div>
                        <div className="card-icon-container">
                            <div className="card-icon">Icon</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayNotes;