import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Button } from "@material-ui/core/";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import NoteService from "../service/NoteService";
import Dashboard from "./Dashboard";
const details = JSON.parse(localStorage.getItem("details"));

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            Newlabel: "",
            allLabels: [],
            labelOpen: true
        };
    }
    handleChange = async (e) => {
        this.setState({ [e.target.name]: await e.target.value });
    };

    closeLabel = () => {
        this.setState({
            labelOpen: false
        })
    };

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

    render() {
        return (
            <>
                <div>
                    <Dashboard/>
                    <Dialog aria-labelledby="simple-dialog-title" open={this.state.labelOpen}>
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
                                    style={{ marginTop: "4%" }}
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
                </div>

            </>
        );
    }
}

export default Label;