import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

// React Router DOM
import { useHistory, useLocation } from "react-router-dom";

// Drawer
import Drawer from "@material-ui/core/Drawer";

// App Bar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// Drawer List
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";

// Material UI
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";

// Avatar
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

// Menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Icons
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineBranches,
  AiOutlineFieldTime,
  AiOutlineSchedule,
} from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { RiAdminFill, RiUserHeartLine } from "react-icons/ri";
import { GiLoveInjection } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRegRegistered, FaUsers } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { MdArchive, MdOutlinePending } from "react-icons/md";

// Sweet Alert
import Swal from "sweetalert2";

// Context
import AuthContext from "../context/auth/authContext";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  page: {
    width: "100%",
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  avatarContainer: {
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  menuContainer: {
    marginTop: theme.spacing(5),
  },
  toolbar: theme.mixins.toolbar,
  titleContainer: {
    width: "100%",
    height: "65px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  hideDisplay: {
    display: "none",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[300]),
    backgroundColor: deepOrange[300],
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "20px",
  },
  active: {
    backgroundColor: "#cac1c1",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Layout = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  // Auth Context
  const authContext = useContext(AuthContext);
  const { logout, loadAdmin, admin } = authContext;

  const { pathname } = useLocation();

  //  MENU Setting
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //  Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drop Menu Down
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleClickDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  // Drawer Navigator List
  const [drawerList, setDrawerList] = useState([
    {
      name: "Admins",
      path: "/admins",
      icon: <RiAdminFill size={25} />,
    },
    {
      name: "Vaccines",
      path: "/vaccines",
      icon: <GiLoveInjection size={25} />,
    },
    {
      name: "Branches",
      path: "/branches",
      icon: <AiOutlineBranches size={25} />,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: <AiOutlineSchedule size={25} />,
    },
    {
      name: "Child Immunization",
      path: "/children",
      icon: <AiOutlineUser size={25} />,
    },
    {
      name: "Rhu Users",
      path: "/rhuuser",
      icon: <RiUserHeartLine size={25} />,
    },
    {
      name: "Barangays",
      path: "/barangays",
      icon: <BsHouseFill size={25} />,
    },
    {
      name: "Map Branches",
      path: "/map",
      icon: <SiGooglemaps size={25} />,
    },
  ]);

  useEffect(() => {
    loadAdmin();
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.titleContainer}>
          <Typography variant="h6">
            Tanauan QR <br /> Management System
          </Typography>
        </div>
      </div>
      <Divider />
      <List>
        <ListItem
          className={pathname === "/" ? classes.active : ""}
          onClick={() => {
            history.push("/");
          }}
          button
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dash Board" />
        </ListItem>

        {/* Drop Down Menu */}
        <ListItem button onClick={handleClickDropDown}>
          <ListItemIcon>
            <FaUsers size={25} />
          </ListItemIcon>
          <ListItemText primary="Registered Users" />
          {openDropDown ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openDropDown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              onClick={() => {
                history.push("/active-user");
              }}
              button
              className={classes.nested}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Active" />
            </ListItem>

            <ListItem
              onClick={() => {
                history.push("/archieve-user");
              }}
              button
              className={classes.nested}
            >
              <ListItemIcon>
                <MdArchive size={23} />
              </ListItemIcon>
              <ListItemText primary="Archieved" />
            </ListItem>
          </List>
        </Collapse>

        {drawerList.map((nav, index) => (
          <ListItem
            className={pathname === nav.path ? classes.active : ""}
            onClick={() => {
              history.push(nav.path);
            }}
            button
            key={index}
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItem>
        ))}

        {/* <ListItem
          onClick={() => {
            window.open(`http://localhost:3000/createQRCode`, "_blank");
          }}
          button
        >
          <ListItemIcon>
            <FaRegRegistered size={25} />,
          </ListItemIcon>
          <ListItemText primary="Register QR Account" />
        </ListItem> */}
        <ListItem
          onClick={() => {
            Swal.fire({
              title: "Are you sure you want to logout?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Logout",
            }).then((result) => {
              if (result.isConfirmed) {
                logout();
              }
            });
          }}
          button
        >
          <ListItemIcon>
            <AiOutlineLogout size={25} />,
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <>
        <AppBar
          elevation={0}
          className={
            pathname === "/login" || pathname === "/createQRCode"
              ? classes.hideDisplay
              : classes.appBar
          }
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Avatar
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickMenu}
              // className={classes.avatarContainer}
              className={classes.orange}
              e
            >
              {admin !== null && admin.userName[0].toUpperCase()}
            </Avatar>
          </Toolbar>
          <Menu
            className={classes.menuContainer}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => {
                history.push("/profile");
                handleCloseMenu();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                Swal.fire({
                  title: "Are you sure you want to logout?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Confirm",
                }).then((result) => {
                  if (result.isConfirmed) {
                    logout();
                  }
                });
                handleCloseMenu();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </AppBar>

        <nav>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              className={
                pathname === "/login" || pathname === "/createQRCode"
                  ? classes.hideDisplay
                  : classes.drawer
              }
              variant="temporary"
              anchor={"left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              style={{
                display:
                  pathname === "/login"
                    ? "none"
                    : pathname === "/createQRCode"
                    ? "none"
                    : "block",
              }}
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
