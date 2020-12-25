import React, {Component} from 'react';
import '../scss/displayNotes.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputBase from "@material-ui/core/InputBase";
import NoteService from "../service/NoteService";
import Icon from "./Icon";

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
            noteDetails: [],
            color: ''
        }
    }

    getNotes = () => {
        NoteService.getAllNotes().then((response) => {
            this.setState({
                noteDetails: response.data.data.data.reverse(),
            })
        })
    }

    componentWillMount() {
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
        this.componentWillMount();
    }

    handleTitleChange = async (e) => {
        this.setState({ title: await e.target.value })
    }

    handleDescriptionChange = async (e) => {
        this.setState({ description: await e.target.value })
    }

    handleUpdate = (id, title, description,color) => {
        this.setState({isDialogVisible: true , id: id,title: title, description: description,color: color})
    }

    setColor = (color, id) => {
        this.setState({color: color})
        const data = {
            color: color,
            noteIdList: [id]
        }
        NoteService.changeNoteColor(data).then((response) => {
            console.log("colorrrr")
            this.componentWillMount();
        })
    }

    render() {
        return (
            <div className="flex-container">
                {this.state.noteDetails.map((note,index)=> {
                    return (
                        <>
                        {note.isArchived === false ? (
                            <div key={note.id} className="flex-container-main">
                                <div className="card-container"
                                     onMouseOver={() => this.handleVisible(index)}
                                     onMouseOut={() => this.handleVisible('')}
                                     style={{backgroundColor: note.color}}
                                >
                                    <div className="card-title">
                                        <div
                                            onClick={() => this.handleUpdate(note.id, note.title, note.description, note.color)}>{note.title}</div>
                                    </div>
                                    <div className="card-note">
                                        <div
                                            onClick={() => this.handleUpdate(note.id, note.title, note.description, note.color)}>{note.description}</div>
                                    </div>
                                    <div className="card-icon-container"
                                         style={index === this.state.index ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                                        <div className="card-icon">
                                            <Icon setColor={this.setColor} noteId={this.state.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ("")
                        }
                        </>
                        )
                        }
                )}
                <Dialog className="dialog-box" open={this.state.isDialogVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogContent className="dialog-content" >
                        <div className="dialog-container" style={{backgroundColor : this.state.color}}>
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
                                        <Icon setColor={this.setColor} noteId={this.state.id} />
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