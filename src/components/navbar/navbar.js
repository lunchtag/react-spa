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
	ButtonGroup,
	Button,
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
	Language,

} from "@material-ui/icons";
import "./navbar.css";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from 'react-i18next';

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
	language: {
		position: "absolute",
		bottom: theme.spacing(0),
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
		const { classes, t, i18n } = this.props;

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
						<ListItemText primary={t("Maand")} />
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
						<ListItemText primary={t("Overzicht")} />
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
								<ListItemText primary={t("Lunch toevoegen")} />
							</ListItem>
							<ListItem button component={Link} to="/employee">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Fastfood />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={t("Lunches medewerker")} />
							</ListItem>
							<ListItem button component={Link} to="/seccreateuser">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<PersonAdd />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={t("Nieuw account")} />
							</ListItem>
							<ListItem button component={Link} to="/employees">
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<Group />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={t("Overzicht gebruikers")} />
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
				<List className={classes.language}>
				<ListItem >
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<Language />
							</Avatar>
						</ListItemAvatar>
						<ButtonGroup fullWidth  color="primary" aria-label="text primary button group">
								<Button onClick={() => { i18n.changeLanguage("nl") }}>NL</Button>
								<Button onClick={() => { i18n.changeLanguage("en") }}>EN</Button>
							</ButtonGroup>
					</ListItem>
					<ListItem button component={Link} to="/profile">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<Person />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={t("Profiel")} />
					</ListItem>
					<ListItem button component={Link} to="/logout">
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<ExitToApp />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={t("Uitloggen")} />
					</ListItem>
				</List>

				
			</Drawer>
		);
	}
}

export default withTranslation()(withStyles(useStyles)(Navbar));
