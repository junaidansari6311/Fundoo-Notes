import React from 'react';
import '../scss/icon.scss';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import IconButton from '@material-ui/core/IconButton';

class Icon extends React.Component {

    constructor(){
        super();
        this.state = {
            isVisible: false,
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

    render(){
        return(
            <div className="icons-container">
                <div className="color-container" style={ this.state.isVisible ? {visibility:'visible'} : {visibility:'hidden'} }>
                    {this.state.color.map((color,index) => <div className="color-picker" onClick={() => this.handleColor(color)} style={{backgroundColor:color}}></div>)}
                </div>
                <IconButton size="small"><AddAlertOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><PersonAddOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><ColorLensOutlinedIcon color="action" onClick={this.handleClick} fontSize="inherit" /></IconButton>
                <IconButton size="small"><ImageOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><ArchiveOutlinedIcon fontSize="inherit" color="action" /></IconButton>
                <IconButton size="small"><MoreVertOutlinedIcon fontSize="inherit" color="action"/></IconButton>
            </div>
        )
    }
}

export default (Icon);