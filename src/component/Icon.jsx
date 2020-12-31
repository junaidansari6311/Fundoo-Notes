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
import CustomSnackBar from "./CustomSnackBar";
import Tooltip from "@material-ui/core/Tooltip";

class Icon extends React.Component {

    constructor(){
        super();
        this.state = {
            isVisible: false,
            archived: false,
            alertShow: false,
            alertResponse: "",
            severity: "success",
            isMenuVisible: false,
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
            this.setState({
                severity: "success",
                alertShow : true,
                alertResponse : "Note Archived"
            });
        })
        this.props.update();
    }

    handleUnarchive = () => {
        this.setState({archived: false})
        const data = {
            isArchived: false,
            noteIdList: [this.props.noteId]
        }
        NoteService.archiveNotes(data).then((response) => {
            this.setState({
                severity: "success",
                alertShow : true,
                alertResponse : "Note Unarchived"
            });
        })
        this.props.update();
    }

    handleMenu = () => {
        this.setState({isMenuVisible: !this.state.isMenuVisible})
    }
    handleDelete = () => {
        const data = {
            isDeleted: true,
            noteIdList: [this.props.noteId]
        }
        NoteService.deleteNotes(data).then((response) => {
            this.setState({
                severity : "success",
                alertShow : true,
                alertResponse : "Note Deleted"
            });
            this.props.update();
        })
    }

    closeAlertBox = () => {
        this.setState({ alertShow: false });
    }

    render(){
        return(
            <div className="icons-container">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox} />
                <div className="color-container" style={ this.state.isVisible ? {visibility:'visible'} : {visibility:'hidden'} }>
                    {this.state.color.map((color,index) => <div className="color-picker" onClick={() => this.handleColor(color)} style={{backgroundColor:color}}></div>)}
                </div>
                <div className="more-container" style={ this.state.isMenuVisible ? {visibility: 'visible'} : {visibility: 'hidden'} }>
                    <div className="more-options">
                        <button className="menu-button" onClick={this.handleDelete}>Delete Note</button>
                    </div>
                </div>
                <Tooltip title="Remind me">
                    <IconButton size="small">
                        <AddAlertOutlinedIcon fontSize="inherit" color="action" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Collaborator">
                    <IconButton size="small">
                        <PersonAddOutlinedIcon fontSize="inherit" color="action" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Change">
                    <IconButton size="small">
                        <ColorLensOutlinedIcon color="action" onClick={this.handleClick} fontSize="inherit" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Add Image">
                    <IconButton size="small">
                        <ImageOutlinedIcon fontSize="inherit" color="action" />
                    </IconButton>
                </Tooltip>

                {this.props.archived === this.state.archived ?
                    <Tooltip title="Archive">
                        <IconButton size="small">
                            <ArchiveOutlinedIcon fontSize="inherit" color="action" onClick={this.handleArchive}/>
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Unarchive">
                        <IconButton size="small">
                            <UnarchiveOutlinedIcon fontSize="inherit" color="action" onClick={this.handleUnarchive}/>
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title="More">
                    <IconButton size="small">
                        <MoreVertOutlinedIcon fontSize="inherit" color="action" onClick={this.handleMenu} />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
}

export default (Icon);