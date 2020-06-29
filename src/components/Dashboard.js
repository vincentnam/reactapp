import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import TrafficCount from './TrafficCount';
import RecentAuthenticationTable from './RecentAuthenticationTable';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonGroup from "./PeriodRadioButton";
import ListItemText from "@material-ui/core/ListItemText";
import GeoMap from "./Map";
import AdminTable from "./AdminTable";
import AddGateForm from "./AddGatesForm";
import AddCarForm from "./AddCarForm"
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [period, setPeriod] = React.useState("day");
  const [nbalert, setAlert] = React.useState(0);
  const addAlert = (nb) =>{
    setAlert(nbalert + nb);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handlePeriodChoice = ( period ) => {
    setPeriod(period);

  };

  const retNbCar= (period) => {
    if (period==="day"){
      return 2000;
    }
    if (period==="week"){
      return 325000;
    }
    if (period==="month"){
      return 4000;
    }
    if (period==="year"){
      return 8000;
    }

  };
  console.log("NB ALERTE");
  console.log(nbalert);

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Overview {period}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={nbalert} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      { /* Debut de la side bar*/}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />

        <List>
          <ListItem alignItems='flex-start'>
            <ListItemIcon>
              <RadioButtonGroup handleCallback={handlePeriodChoice}/>
            </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>

      </Drawer>
      { /* Fin de la side bar */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* ICI ##########################################*/}

                <GeoMap period={period} handlerAlert={addAlert}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart period={period}/>

              </Paper>
            </Grid>
            {/* Traffic Count */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>

                <TrafficCount nbcar={retNbCar(period)}/>
              </Paper>
            </Grid>
            {/* Recent authentications */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* ICI ##########################################*/}
                <AdminTable/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* ICI ##########################################*/}
                <AddGateForm/>
              </Paper>
            </Grid>
             <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* ICI ##########################################*/}
                <AddCarForm/>
              </Paper>
            </Grid>

          </Grid>

        </Container>

      </main>
    </div>
  );
}


/**TODO : Remplir le admintable avec les data : pb dans le state : data arrive pas à être rempli par la requête JSON **/