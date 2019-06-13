// import React from 'react'
// import PropTypes from 'prop-types'
// import AppBar from '@material-ui/core/AppBar'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import Divider from '@material-ui/core/Divider'
// import Drawer from '@material-ui/core/Drawer'
// import Hidden from '@material-ui/core/Hidden'
// import IconButton from '@material-ui/core/IconButton'
// import InboxIcon from '@material-ui/icons/MoveToInbox'
// import NotificationIcon from '@material-ui/icons/Notifications'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import MailIcon from '@material-ui/icons/Mail'
// import MenuIcon from '@material-ui/icons/Menu'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import {makeStyles, useTheme} from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
//
// const drawerWidth = 200;
//
// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         [theme.breakpoints.up('lg')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//     },
//     appBar: {
//         marginLeft: drawerWidth,
//         [theme.breakpoints.up('lg')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//         },
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('lg')]: {
//             display: 'none',
//         },
//     },
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));
//
// export default function Header(props) {
//     const {container} = props;
//     const classes = useStyles();
//     const theme = useTheme();
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//
//     function handleDrawerToggle() {
//         setMobileOpen(!mobileOpen);
//     }
//
//     const drawer = (
//         <div>
//             <div className={classes.toolbar}/>
//             <Divider/>
//             <List>
//                <Link to={'/teste/teste'}>
//                    <ListItem button>
//                        <ListItemIcon><NotificationIcon/></ListItemIcon>
//                        <ListItemText primary={'TESTEEE'}/>
//                    </ListItem>
//                </Link>
//             </List>
//             <Divider/>
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
//                         <ListItemText primary={text}/>
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
//
//     return (
//         <div className={classes.root}>
//             <CssBaseline/>
//             <AppBar position="fixed" className={classes.appBar}>
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="Open drawer"
//                         edge="start"
//                         onClick={handleDrawerToggle}
//                         className={classes.menuButton}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6" noWrap>
//                         Responsive drawer
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <nav className={classes.drawer} aria-label="Mailbox folders">
//                 <Hidden smUp implementation="css">
//                     <Drawer
//                         container={container}
//                         variant="temporary"
//                         anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//                         open={mobileOpen}
//                         onClose={handleDrawerToggle}
//                         classes={{
//                             paper: classes.drawerPaper,
//                         }}
//                         ModalProps={{
//                             keepMounted: true,
//                         }}
//                     >
//                         {drawer}
//                     </Drawer>
//                 </Hidden>
//                 <Hidden lgDown implementation="css">
//                     <Drawer
//                         classes={{
//                             paper: classes.drawerPaper,
//                         }}
//                         variant="permanent"
//                         open
//                     >
//                         {drawer}
//                     </Drawer>
//                 </Hidden>
//             </nav>
//             <main className={classes.content}>
//                 <div className={classes.toolbar}/>
//                 Google
//             </main>
//         </div>
//     );
// }
//
// Header.propTypes = {
//     container: PropTypes.object,
// };




























