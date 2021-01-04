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
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(3),
    },
}));

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
            open: false,
            labelOpen: false,
            anchorEl: null,
            allLabels: [],
            checkedValues: [],
            labelId: null,
            color: ['#fff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']
        }
    }

    getLabels = () => {
        NoteService.getNoteLabelList().then((response) => {
            this.setState({
                allLabels: response.data.data.details,
            });
        });
    }

    componentWillMount() {
        this.getLabels();
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

    handlePopoverClick = (event) => {
        this.setState({ open: true });
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ open: false, labelOpen: false });
    };

    LabelNote = () => {
        this.setState({ labelOpen: true });
    };

    handleCheck(e, x, id) {
        this.setState((state) => ({
            checkedValues: state.checkedValues.includes(x)
                ? state.checkedValues.filter((c) => c !== x)
                : [...state.checkedValues, x],
        }));
        let data = {
            NoteId: this.props.noteId,
            lableId: id,
        };
        NoteService.addLabelToNotes(data).then((res) => {
            console.log(res);
            this.setState({ open: false, labelOpen: false });
            this.props.update();
        });
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
                        <>
                            <MoreVertOutlinedIcon
                                style={{color:"black"}}
                                variant="contained"
                                color="primary"
                                title="Remind me"
                                onClick={this.handlePopoverClick}
                            ></MoreVertOutlinedIcon>
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                PaperProps={{
                                    className: "more",
                                }}
                            >
                                <Typography className={useStyles.typography}>
                                    <p style={{ marginTop: "-1%", color: "black" }}>
                                        <Button
                                            color="primary"
                                            style={{ color: "black" }}
                                            onClick={this.handleDelete}
                                        >
                                            Delete Note
                                        </Button>
                                    </p>
                                    <p style={{ marginTop: "-11%" }}>
                                        <Button
                                            color="primary"
                                            style={{ color: "black" }}
                                            onClick={this.LabelNote}
                                        >
                                            Add Label
                                        </Button>
                                    </p>
                                </Typography>
                            </Popover>

                            <Popover
                                aria-labelledby="simple-dialog-title"
                                open={this.state.labelOpen}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                    display: "flex",
                                }}
                                PaperProps={{
                                    className: "more",
                                }}
                            >
                                <FormLabel component="legend"
                                style={{fontWeight:"bold",color:"black"}}>Label note</FormLabel>
                                {this.state.allLabels.map((value, x) => {
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    label={x}
                                                    key={x.toString()}
                                                    onChange={(e) => this.handleCheck(e, x, value.id)}
                                                    checked={this.state.checkedValues.includes(x)}
                                                />
                                            }
                                            label={value.label}
                                        />
                                    );
                                })}
                            </Popover>
                        </>
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
}

export default (Icon);