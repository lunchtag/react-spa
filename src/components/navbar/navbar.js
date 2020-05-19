import React from "react";
import { Link } from "react-router-dom";
import { Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Inbox, DateRange, EventNote, ViewList, Add, Person, PersonAdd, Group, ExitToApp } from '@material-ui/icons'
import "./navbar.css";
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    decore: {
        textDecoration: 'none',
    }
});

class Navbar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}><Typography variant="h3" component="h1">Lunchtag</Typography></div>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon className={classes.decore}><DateRange /></ListItemIcon>
                        <ListItemText primary="Maand" />
                    </ListItem>
                    <ListItem button component={Link} to="/add">
                        <ListItemIcon className={classes.decore}><EventNote /></ListItemIcon>
                        <ListItemText primary="Week" />
                    </ListItem>
                    <ListItem button component={Link} to="/lunch">
                        <ListItemIcon className={classes.decore}><ViewList /></ListItemIcon>
                        <ListItemText primary="Overzicht" />
                    </ListItem>
                </List>
                <Divider />
                {window.sessionStorage.getItem("role") === "ADMIN" && (
                    <>
                        <List>
                            <ListItem button component={Link} to="/secaddlunch">
                                <ListItemIcon className={classes.decore}><Add /></ListItemIcon>
                                <ListItemText primary="Nieuwe lunch" />
                            </ListItem>
                            <ListItem button component={Link} to="/employee">
                                <ListItemIcon className={classes.decore}><Person /></ListItemIcon>
                                <ListItemText primary="Medewerker details" />
                            </ListItem>
                            <ListItem button component={Link} to="/seccreateuser">
                                <ListItemIcon className={classes.decore}><PersonAdd /></ListItemIcon>
                                <ListItemText primary="Nieuw account" />
                            </ListItem>
                            <ListItem button component={Link} to="/employees">
                                <ListItemIcon className={classes.decore}><Group /></ListItemIcon>
                                <ListItemText primary="Overzicht gebruikers" />
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                )}
                <List>
                    <ListItem  button component={Link} to="/logout">
                        <ListItemIcon className={classes.decore}><ExitToApp /></ListItemIcon>
                        <ListItemText primary="Uitloggen" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }

}



export default withStyles(useStyles)(Navbar);