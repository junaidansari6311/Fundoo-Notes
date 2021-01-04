import React, {Component} from 'react';
import '../scss/sidebar.scss';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ArchiveIcon from '@material-ui/icons/Archive';
import ReminderIcon from '@material-ui/icons/Notifications';
import TrashIcon from '@material-ui/icons/Delete';
import NoteIcon from '@material-ui/icons/EmojiObjects';
import EditIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import NoteService from "../service/NoteService";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
const details = JSON.parse(localStorage.getItem("details"));

class Sidebar extends Component {
    constructor(props) {
        super();
        this.state = {
            allLabels: [],
            isLabel: false,
            label: "",
            Newlabel: "",
        }
    }

    getAllLabels = () => {
        NoteService.getNoteLabelList().then((response) => {
            this.setState({
                allLabels: response.data.data.details,
            })
        })
    }

    componentWillMount() {
        this.getAllLabels();
    }

    handleEditLabel = () => {
        console.log("Label called")
        this.setState({
            isLabel: true
        })
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: await e.target.value });
    };

    closeLabel = () => {
        this.setState({
            isLabel: false
        })
    };


    postLabel = () => {
        let data = {
            label: this.state.label,
            isDeleted: false,
            userId: details.userId
        };
        NoteService.noteLabels(data).then((res) => {
            this.setState({ label: "" });
            this.componentWillMount();
        });
    };

    deleteLabel = (id) => {
        let data = {
            id: id,
        };
        NoteService.deleteNoteLabels(data).then((response) => {
            console.log(response);
            this.componentWillMount();
        });
    };

    editLabel = (id) => {
        let data = {
            label: this.state.Newlabel,
            isDeleted: false,
            userId: details.userId,
            id: id,
        };
        NoteService.updateNoteLabels(data).then((response) => {
            this.componentWillMount();
        });
    };

    getLabelsByValue = (value) =>{
        NoteService.getNotesListByLabels(value).then((response) => {
            this.setState({
                allNotes: response.data.data.data,
            })
        })
    }

    render() {
        return (
            <>
            <Drawer variant='persistent' open={this.props.openSidebar} >
                <List>
                    <Link to= "/dashboard">
                        <ListItem button>
                            <ListItemIcon><NoteIcon/></ListItemIcon>
                            <ListItemText primary="Note"/>
                        </ListItem>
                    </Link>

                    <ListItem button >
                        <ListItemIcon><ReminderIcon/></ListItemIcon>
                        <ListItemText primary="Reminder"/>
                    </ListItem>

                    <Divider/>
                        {this.state.allLabels.map((value, index) => {
                            return (
                                <>
                                    {value !== null ? (
                                        <ListItem
                                            button
                                            onClick={() => this.getLabelsByValue(value.label)}
                                        >
                                            <ListItemIcon>
                                                <LabelOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={value.label} />
                                        </ListItem>
                                    ) : (
                                        ""
                                    )}
                                </>
                            );
                        })}

                        <ListItem button onClick={this.handleEditLabel}>
                            <ListItemIcon><EditIcon/></ListItemIcon>
                            <ListItemText primary="Edit Label"/>
                        </ListItem>

                    <Divider/>
                    <Link to= "/archive">
                        <ListItem button >
                            <ListItemIcon><ArchiveIcon/></ListItemIcon>
                            <ListItemText primary="Archive"/>
                        </ListItem>
                    </Link>

                    <Link to="/trash">
                        <ListItem button>
                            <ListItemIcon><TrashIcon/></ListItemIcon>
                            <ListItemText primary="Trash"/>
                        </ListItem>
                    </Link>

                </List>
            </Drawer>
        <Dialog aria-labelledby="simple-dialog-title" open={this.state.isLabel}>
            <DialogTitle id="simple-dialog-title">Edit label</DialogTitle>
            <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                <FormControl
                    style={{
                        width: "100%",
                        marginTop: "-15%",
                    }}
                >
                    <Input
                        id="standard-adornment-password"
                        placeholder="Create New Label"
                        style={{ marginTop: "4%" ,marginBottom:"14%"}}
                        value={this.state.label}
                        name="label"
                        onChange={this.handleChange}
                        startAdornment={
                            <>
                                <InputAdornment position="start">
                                    <IconButton aria-label="toggle password visibility">
                                        {
                                            <CloseIcon
                                                onClick={() => {
                                                    this.setState({ label: "" });
                                                }}
                                            />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            </>
                        }
                        endAdornment={
                            <>
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility">
                                        {<CheckIcon onClick={this.postLabel} />}
                                    </IconButton>
                                </InputAdornment>
                            </>
                        }
                    />
                </FormControl>
            </DialogTitle>
            <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                <FormControl
                    style={{
                        width: "100%",
                        marginTop: "-25%",
                    }}
                >
                    {this.state.allLabels.map((value, index) => {
                        return (
                            <>
                                <Input
                                    placeholder="Create New Label"
                                    type="text"
                                    style={{ marginTop: "2%" }}
                                    defaultValue={value.label}
                                    name="Newlabel"
                                    onChange={this.handleChange}
                                    startAdornment={
                                        <>
                                            <InputAdornment position="start">
                                                <IconButton
                                                >
                                                    <DeleteIcon
                                                        onClick={() => this.deleteLabel(value.id)}
                                                    ></DeleteIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        </>
                                    }
                                    endAdornment={
                                        <>
                                            <InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility">
                                                    {
                                                        <EditIcon
                                                            onClick={() => this.editLabel(value.id)}
                                                        />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        </>
                                    }
                                />
                            </>
                        );
                    })}
                </FormControl>
            </DialogTitle>
            <Button variant="outlined" color="primary" style={{ color: "black" }}
                    onClick={this.closeLabel}
            >
                Close
            </Button>
        </Dialog>

            </>
        );
    }
}

export default Sidebar;