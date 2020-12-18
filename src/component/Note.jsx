import React, {Component} from 'react';
import '../scss/note.scss';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputBase from "@material-ui/core/InputBase";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import Typography from "@material-ui/core/Typography";
import ReminderIcon from "@material-ui/icons/Notifications";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteIcon from '@material-ui/icons/Palette';
import ImageIcon from '@material-ui/icons/Image';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Note extends Component {
    render() {
        return (
            <div className="accordion-main-container">
                <Accordion className="accordion-main">
                    <AccordionSummary>
                        <Typography className="take-note">Take a Note...</Typography>
                        <InsertPhotoIcon className="imageUpload"/>
                    </AccordionSummary>
                    <AccordionDetails className="details-container">
                       <div className="input-container">
                           <InputBase
                               placeholder="Title"
                               className="titleInput"
                           />
                           <InputBase
                               placeholder="Take a note ..."
                               className="descInput"
                               multiline
                           />
                       </div>
                        <div className="icon-button-container">
                            <div className="icon-container">
                                <ReminderIcon/>
                                <PersonAddIcon/>
                                <PaletteIcon/>
                                <ImageIcon/>
                                <ArchiveIcon/>
                                <MoreVertIcon/>
                            </div>
                            <div className="close-button-div">
                                <button className="button-close">Close</button>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default Note;