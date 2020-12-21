import React, {Component} from 'react';
import '../scss/note.scss';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputBase from "@material-ui/core/InputBase";
import Pin from '../assets/Pin.svg';
import Unpin from '../assets/Unpin.svg';
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import Typography from "@material-ui/core/Typography";
import ReminderIcon from "@material-ui/icons/Notifications";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteIcon from '@material-ui/icons/Palette';
import ImageIcon from '@material-ui/icons/Image';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import NoteService from "../service/NoteService";

class Note extends Component {
    constructor() {
        super();
        this.state = {
            expanded : false,
            pin : true,
            title: "",
            description:""
        };
        this.toggleExpansion = this.toggleExpansion.bind(this);
    }

    toggleExpansion = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    handlePin = () => {
        this.setState (prevState => ({ pin: !prevState.pin }));
    }

    handleTitle = async (e) => {
        this.setState ({ title: await e.target.value})
    }

    handleDescription = async (e) =>{
        this.setState ({ description: await e.target.value})
    }

    handleCloseButton = () => {
        this.setState({ expanded: false
            });
        if(this.state.title != null || this.state.description !=null) {
            let note={
                title: this.state.title,
                description: this.state.description
            };
            NoteService.saveNote(note,(response) => {
                if(response.status === 200) {
                    console.log("Note saved");
                }
                else {
                    console.log("Note Save Failed");
                }
            })
        }
    }


    render() {
        return (
            <div className="accordion-main-container">
                <Accordion className="accordion-main"
                           onChange={this.toggleExpansion}
                           expanded={this.state.expanded}
                >
                    <AccordionSummary>
                        {this.state.expanded ?
                            <div className="title-icon-div1">
                                <Typography className="take-note1"></Typography>
                                <IconButton className="iconPin" onClick={this.handlePin} >
                                    { (this.state.pin === true )  ?
                                        <img classname="imgPin" src={Pin} alt="Pin icon" />
                                        :
                                        <img src={Unpin} alt="Pin icon" />
                                    }
                                </IconButton>
                            </div>

                            :

                            <div className="title-icon-div">
                                <Typography className="take-note">Take a Note...</Typography>
                                <div className="icon-div">
                                    <CheckBoxIcon className="checkBox"/>
                                    <InsertPhotoIcon className="imageUpload"/>
                                </div>
                            </div>
                        }

                    </AccordionSummary>
                    <AccordionDetails className="details-container">
                       <div className="input-container">
                           <InputBase
                               placeholder="Title"
                               className="titleInput"
                               onChange={this.handleTitle}
                           />
                           <InputBase
                               placeholder="Take a note ..."
                               className="descInput"
                               onChange={this.handleDescription}
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
                                <button className="button-close" onClick={this.handleCloseButton}>Close</button>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default Note;