import React from 'react';
import '../scss/icon.scss';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import IconButton from '@material-ui/core/IconButton';
import NoteService from "../service/NoteService";

class Icon extends React.Component {

    constructor(){
        super();
        this.state = {
            isVisible: false,
            archived: false,
            color: ['#fff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']
        }
    }

    handleClick = () => {
        this.setState({isVisible: !this.state.isVisible})
    }

    handleColor = (color) => {
        if(this.props.noteId === undefined)
        {
            this.props.setColor(color);
            this.setState({isVisible: false})
        }
        else
        {
            this.props.setColor(color, this.props.noteId);
            this.setState({isVisible: false})
        }
    }

    handleArchive = () => {
        this.setState({archived: true})
        const data = {
            isArchived: true,
            noteIdList: [this.props.noteId]
        }
        NoteService.archiveNotes(data).then((response) => {
            console.log(response)
        })
    }

    handleUnarchive = () => {
        this.setState({archived: false})
        const data = {
            isArchived: false,
            noteIdList: [this.props.noteId]
        }
        NoteService.archiveNotes(data).then((response) => {
            console.log(response)
        })
    }

    render(){
        const url = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        return(
            <div className="icons-container">
                <div className="color-container" style={ this.state.isVisible ? {visibility:'visible'} : {visibility:'hidden'} }>
                    {this.state.color.map((color,index) => <div className="color-picker" onClick={() => this.handleColor(color)} style={{backgroundColor:color}}></div>)}
                </div>
                <IconButton size="small"><AddAlertOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><PersonAddOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><ColorLensOutlinedIcon color="action" onClick={this.handleClick} fontSize="inherit" /></IconButton>
                <IconButton size="small"><ImageOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small">{this.state.archived === false ? <ArchiveOutlinedIcon fontSize="inherit" color="action" onClick={this.handleArchive} /> : <UnarchiveOutlinedIcon fontSize="inherit" color="action" onClick={this.handleUnarchive} />}</IconButton>
                <IconButton size="small"><MoreVertOutlinedIcon fontSize="inherit" color="action"/></IconButton>
            </div>
        )
    }
}

export default (Icon);