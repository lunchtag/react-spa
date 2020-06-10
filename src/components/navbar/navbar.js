import React from "react";
import { Link } from "react-router-dom";
import {
	Typography,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from "@material-ui/core";
import {
	DateRange,
	EventNote,
	ViewList,
	Add,
	Person,
	PersonAdd,
	Group,
	ExitToApp,
	LocalOfferOutlined,
	Fastfood,
	Dvr,

} from "@material-ui/icons";
import "./navbar.css";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 300;


const useStyles = (theme) => ({
	root: {
		display: "flex",
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
		backgroundColor: "#ebebf2",
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	decore: {
		textDecoration: "none",
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
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
				<div className={classes.toolbar}>
					<Typography variant="h3" component="h1">
						Lunch
						<LocalOfferOutlined color="secondary" fontSize="large" />
					</Typography>
				</div>
				<Divider />
				<List>
					<ListItem button component={Link} to="/dashboard">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<DateRange />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Maand" />
					</ListItem>
					<ListItem button component={Link} to="/add">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<EventNote />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Week" />
					</ListItem>
					<ListItem button component={Link} to="/lunch">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<ViewList />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Overzicht" />
					</ListItem>
				</List>
				<Divider />
				{window.sessionStorage.getItem("role") === "ADMIN" && (
					<>
						<List>
							<ListItem button component={Link} to="/secaddlunch">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Add />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Lunch toevoegen" />
							</ListItem>
							<ListItem button component={Link} to="/employee">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Fastfood />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Lunches medewerker" />
							</ListItem>
							<ListItem button component={Link} to="/seccreateuser">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<PersonAdd />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Nieuw account" />
							</ListItem>
							<ListItem button component={Link} to="/employees">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Group />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Overzicht gebruikers" />
							</ListItem>
							<ListItem button component={Link} to="/log">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Dvr />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Log" />
							</ListItem>
						</List>
						<Divider />
					</>
				)}
				<List>
					<ListItem button component={Link} to="/profile">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<Person />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Profiel" />
					</ListItem>
					<ListItem button component={Link} to="/logout">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<ExitToApp />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Uitloggen" />
					</ListItem>
				</List>
			</Drawer>
		);
	}
}

export default withStyles(useStyles)(Navbar);
