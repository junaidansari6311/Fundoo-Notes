import React, {Component} from 'react';
import '../scss/displayNotes.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ReminderIcon from "@material-ui/icons/Notifications";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteIcon from "@material-ui/icons/Palette";
import ImageIcon from "@material-ui/icons/Image";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InputBase from "@material-ui/core/InputBase";
import NoteService from "../service/NoteService";
import Masonry from "react-masonry-css";

class DisplayNotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            isDialogVisible: false,
            index: '',
            id: '',
            title: '',
            description: '',
            noteDetails: []
        }
    }

    getNotes = () => {
        NoteService.getAllNotes().then((response) => {
            this.setState({noteDetails: response.data.data.data})
        })
    }

    componentDidMount() {
        this.getNotes();
    }

    handleVisible = (index) => {
        this.setState({index: index})
    }

    handleClose = () => {
        const data = {
            noteId: this.state.id,
            title: this.state.title,
            description: this.state.description
        }
        NoteService.updateNote(data).then((response) => {
            console.log(response)
        })
        this.setState({isDialogVisible: false});
    }

    handleTitleChange = async (e) => {
        this.setState({ title: await e.target.value })
    }

    handleDescriptionChange = async (e) => {
        this.setState({ description: await e.target.value })
    }

    handleUpdate = (id, title, description) => {
        this.setState({isDialogVisible: true , id: id,title: title, description: description})
    }

    render() {
        return (
            <div className="flex-container">
                    {this.state.noteDetails.map((note,index)=>
                        <div key={note.id} className="flex-container-main">
                        <div className="card-container"
                             onMouseOver={() => this.handleVisible(index)} onMouseOut={() => this.handleVisible('')}>
                            <div className="card-title">
                                <div onClick={() => this.handleUpdate(note.id, note.title, note.description)}>{note.title}</div>
                            </div>
                            <div className="card-note">
                                <div onClick={() => this.handleUpdate(note.id, note.title, note.description)}>{note.description}</div>
                            </div>
                            <div className="card-icon-container"
                                 style={index === this.state.index ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                                <div className="card-icon">
                                    <ReminderIcon/>
                                    <PersonAddIcon/>
                                    <PaletteIcon/>
                                    <ImageIcon/>
                                    <ArchiveIcon/>
                                    <MoreVertIcon/>
                                </div>
                            </div>
                        </div>
                    </div>)}
                <Dialog className="dialog-box" open={this.state.isDialogVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent className="dialog-content">
                        <div className="dialog-container">
                            <div className="dailog-title">
                                <InputBase
                                    placeholder="Title"
                                    onChange={this.handleTitleChange}
                                    onClick={this.handleVisible}
                                    value={this.state.title}
                                />
                            </div>
                            <div className="dailog-note">
                                <InputBase
                                    placeholder="Take a note ..."
                                    onChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                    onClick={this.handleVisible}
                                    multiline
                                />
                            </div>
                                <div className="item-icons">
                                    <div className="items">
                                        <ReminderIcon/>
                                        <PersonAddIcon/>
                                        <PaletteIcon/>
                                        <ImageIcon/>
                                        <ArchiveIcon/>
                                        <MoreVertIcon/>
                                    </div>
                                    <div className="close-container">
                                        <button className="close-button" onClick={this.handleClose}>Close</button>
                                    </div>
                                </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default DisplayNotes;