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

class Sidebar extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
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

                    <ListItem button>
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
                    <ListItem button>
                        <ListItemIcon><TrashIcon/></ListItemIcon>
                        <ListItemText primary="Trash"/>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default Sidebar;