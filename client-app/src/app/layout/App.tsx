import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {observer} from "mobx-react-lite";
import { Route, useLocation } from 'react-router';
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 1024,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
}));

function App() {
  const classes = useStyles();
  const location = useLocation();
  return (
      <>
          <Route exact path='/' component={HomePage}/>
          <Route path={'/(.+)'}
                 render={() => (
                     <>
                         <NavBar/>
                         <Container fixed>
                             <div className={classes.root}>
                                 <Route exact path='/activities' component={ActivityDashboard}/>
                                 <Route path='/activities/:id' component={ActivityDetails}/>
                                 <Route key={location.key} path={['/createActivities', '/manage/:id']} component={ActivityForm} />
                             </div>
                         </Container>
                     </>
                 )}
          >
          </Route>
      </>
  );
}

export default observer(App);
